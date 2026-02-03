import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  View,
  TouchableOpacity,
  Dimensions,
  DimensionValue,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppModalProps } from "./index.props";
import { styles } from "./index.styles";
import { shouldCloseOnRelease, animateIn, animateOut } from "./index.utils";

// Componentes atómicos
import AppOverlay from "../AppOverlay";
import AppText from "../../content/AppText";
import AppIcon from "../../content/AppIcon";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function AppModal({
  children,
  isOpen,
  onClose,
  title = "",
  showHeader = true,
  height = "auto",
  swipeToClose = true,
  backdropOpacity = 0.7,
  showCloseButton = true,
  closeOnBackdropPress = true,
  style,
  contentStyle,
}: AppModalProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const contentHeightRef = useRef(0);
  const [internalHeight, setInternalHeight] = useState<DimensionValue>(height);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => swipeToClose,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx * 2);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (shouldCloseOnRelease(gestureState, contentHeightRef.current)) {
          handleClose();
        } else {
          animateIn(translateY, 0).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isOpen) {
      animateIn(translateY, 0).start();
    } else {
      animateOut(translateY, contentHeightRef.current || SCREEN_HEIGHT).start();
    }
  }, [isOpen]);

  const handleClose = () => {
    animateOut(translateY, contentHeightRef.current || SCREEN_HEIGHT).start(() => {
      onClose();
    });
  };

  const handleContentLayout = (event: any) => {
    const { height: measuredHeight } = event.nativeEvent.layout;
    
    // El padding inferior del Safe Area ya está incluido en el layout
    if (measuredHeight === contentHeightRef.current) return;
    contentHeightRef.current = measuredHeight;
    
    if (height === "auto") {
      setInternalHeight(measuredHeight);
      if (!isOpen) translateY.setValue(measuredHeight);
    }
  };

  return (
    <AppOverlay
      isOpen={isOpen}
      onClose={closeOnBackdropPress ? handleClose : undefined}
      backgroundColor={`rgba(0,0,0,${backdropOpacity})`}
    >
      <View style={styles.container} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.content,
            {
              height: height === "auto" ? internalHeight : height,
              transform: [{ translateY }],
              // 👈 Aquí solucionamos el espacio de abajo
              paddingBottom: Math.max(insets.bottom, 20), 
            } as any,
            contentStyle,
          ]}
          onLayout={handleContentLayout}
          {...panResponder.panHandlers}
        >
          {swipeToClose && <View style={styles.dragIndicator} />}

          {showHeader && (
            <View style={styles.header}>
              <AppText variant="h3" style={{ flex: 1 }}>{title}</AppText>
              {showCloseButton && (
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                  <AppIcon name="close" size="m" color="primary" />
                </TouchableOpacity>
              )}
            </View>
          )}

          <View style={[styles.body, style]}>
            {children}
          </View>
        </Animated.View>
      </View>
    </AppOverlay>
  );
}