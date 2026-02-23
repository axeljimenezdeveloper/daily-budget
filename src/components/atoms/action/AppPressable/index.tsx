// ============================================================================
// COMPONENTE PRESIONABLE BASE - AppPressable
//
// Proporciona feedback táctil unificado (opacidad, escala) y ahora soporta
// throttling opcional para prevenir pulsaciones rápidas repetidas,
// así como retroalimentación háptica configurable.
// ============================================================================

import React, { useCallback } from "react";
import { Pressable, ViewStyle, StyleProp } from "react-native";
import { useThrottledCallback } from "@/hooks/useThrottledCallback";
import { useHaptic } from "@/hooks/useHaptic";
import { AppPressableProps, HapticFeedbackType } from "./index.props";

export default function AppPressable({
  children,
  onPress,
  style,
  disabled = false,
  throttleMs,
  hapticFeedback,
}: AppPressableProps) {
  const haptic = useHaptic();

  // --------------------------------------------------------------------------
  // MANEJADOR DE PRESIÓN CON HÁPTICO
  // --------------------------------------------------------------------------
  const handlePressWithHaptic = useCallback(() => {
    // Disparar háptico si está habilitado
    if (hapticFeedback && !disabled) {
      // Determinar el tipo de háptico
      let type: HapticFeedbackType = 'light';
      if (typeof hapticFeedback === 'string') {
        type = hapticFeedback;
      }

      // Mapear tipo a método del hook
      switch (type) {
        case 'light':
          haptic.light();
          break;
        case 'medium':
          haptic.medium();
          break;
        case 'heavy':
          haptic.heavy();
          break;
        case 'selection':
          haptic.selection();
          break;
        case 'success':
          haptic.success();
          break;
        case 'warning':
          haptic.warning();
          break;
        case 'error':
          haptic.error();
          break;
        default:
          // Por si acaso, light por defecto
          haptic.light();
      }
    }

    // Ejecutar la función original
    onPress();
  }, [hapticFeedback, disabled, haptic, onPress]);

  // --------------------------------------------------------------------------
  // APLICAR THROTTLE SI SE SOLICITA
  // --------------------------------------------------------------------------
  const handlePress = throttleMs && throttleMs > 0
    ? useThrottledCallback(handlePressWithHaptic, throttleMs)
    : handlePressWithHaptic;

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