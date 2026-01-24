import React, { useEffect, useRef, useState } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";
import { AppOverlayProps } from "./index.props";
import { styles } from "./index.styles";
import { getBackgroundColor } from "./index.utils";

export default function AppOverlay({
  children,
  isOpen,
  onClose,
  backgroundColor,
  style,
  ...rest
}: AppOverlayProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setShouldRender(false));
    }
  }, [isOpen, fadeAnim]);

  if (!shouldRender) return null;

  return (
    <Animated.View 
      style={[
        styles.overlay, 
        { 
          backgroundColor: getBackgroundColor(backgroundColor),
          opacity: fadeAnim,
        },
        style
      ]}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {children}
    </Animated.View>
  );
}