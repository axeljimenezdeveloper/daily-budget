import React, { useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppKeyboardAvoidingViewProps } from "./index.props";
import { styles } from "./index.styles";
import {
  getDefaultKeyboardOffset,
  getDefaultBehavior,
} from "./index.utils";

export default function AppKeyboardAvoidingView({
  children,
  behavior = getDefaultBehavior(),
  keyboardVerticalOffset = getDefaultKeyboardOffset(),
  enabled = true,
  style,
  contentContainerStyle,
  scrollEnabled = true,
  showsVerticalScrollIndicator = false,
  keyboardShouldPersistTaps = "handled",
}: AppKeyboardAvoidingViewProps) {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  // Configuración específica para iOS
  const iosBehavior = Platform.OS === "ios" ? behavior : undefined;

  useEffect(() => {
    const keyboardEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const keyboardHideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardDidShowListener = Keyboard.addListener(keyboardEvent, () => {
      // Opcional: Lógica para scroll automático
    });

    const keyboardDidHideListener = Keyboard.addListener(keyboardHideEvent, () => {
      // Opcional: Restaurar posición
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Calcular el offset final
  const finalKeyboardOffset = keyboardVerticalOffset + insets.bottom;

  const content = (
    <TouchableWithoutFeedback 
      onPress={handleDismissKeyboard}
      accessible={false}
    >
      <View style={[styles.content, contentContainerStyle]}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );

  if (!enabled) {
    return <View style={[styles.container, style]}>{content}</View>;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={iosBehavior}
      keyboardVerticalOffset={finalKeyboardOffset}
      enabled={enabled}
    >
      {scrollEnabled ? (
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          contentContainerStyle={[
            // CAMBIO CLAVE: Quitamos el minHeight basado en screenHeight
            { flexGrow: 1 }, 
            contentContainerStyle,
          ]}
          bounces={false}
          scrollEventThrottle={16}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </KeyboardAvoidingView>
  );
}