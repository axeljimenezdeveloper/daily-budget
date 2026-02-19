// ============================================================================
// COMPONENTE PRESIONABLE BASE - AppPressable
//
// Proporciona feedback táctil unificado (opacidad, escala) y ahora soporta
// throttling opcional para prevenir pulsaciones rápidas repetidas.
// ============================================================================

import React from "react";
import { Pressable, ViewStyle, StyleProp } from "react-native";
import { useThrottledCallback } from "@/hooks/useThrottledCallback";
import { AppPressableProps } from "./index.props";

export default function AppPressable({
  children,
  onPress,
  style,
  disabled = false,
  throttleMs,
}: AppPressableProps) {
  // --------------------------------------------------------------------------
  // APLICAR THROTTLE SI SE SOLICITA
  // --------------------------------------------------------------------------
  const handlePress = throttleMs && throttleMs > 0
    ? useThrottledCallback(onPress, throttleMs)
    : onPress;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }): StyleProp<ViewStyle> =>
        [
          style,
          { opacity: pressed ? 0.8 : 1 },
          pressed && { transform: [{ scale: 0.98 }] },
          disabled && { opacity: 0.5 },
        ].filter(Boolean) as StyleProp<ViewStyle>
      }
    >
      {children}
    </Pressable>
  );
}