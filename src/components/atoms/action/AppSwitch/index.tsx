// ============================================================================
// SWITCH PERSONALIZADO CON ANIMACIÓN - AppSwitch
//
// Reemplaza el Switch nativo de React Native con una implementación propia
// que permite animaciones suaves y consistentes con el sistema de diseño.
// Utiliza el hook useToggleAnimation para manejar la transición entre estados.
// Ahora soporta throttling opcional para prevenir pulsaciones rápidas.
// ============================================================================

import React from 'react';
import { Animated } from 'react-native';
import { ANIMATION } from '@/constants/animations'; // ← Importamos constante global
import AppPressable from '../AppPressable';
import { useToggleAnimation } from '@/hooks/useToggleAnimation';
import { AppSwitchProps } from './index.props';
import { styles, SWITCH_COLORS, SWITCH_SIZES } from './index.styles';

export default function AppSwitch({
  value,
  onValueChange,
  disabled = false,
  style,
  throttleMs = ANIMATION.DEFAULT_PRESS_THROTTLE_MS, // ← Valor por defecto
}: AppSwitchProps) {
  // --------------------------------------------------------------------------
  // HOOK DE ANIMACIÓN
  // --------------------------------------------------------------------------
  const { animatedValue, toggle } = useToggleAnimation({
    value,
    onAnimated: onValueChange,
    useNativeDriver: false,
  });

  // --------------------------------------------------------------------------
  // INTERPOLACIONES
  // --------------------------------------------------------------------------
  const trackBackground = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SWITCH_COLORS.inactiveTrack, SWITCH_COLORS.activeTrack],
  });

  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      SWITCH_SIZES.trackWidth - SWITCH_SIZES.thumbSize - 2 * SWITCH_SIZES.thumbMargin,
    ],
  });

  const thumbColor = disabled ? SWITCH_COLORS.disabledThumb : SWITCH_COLORS.thumb;

  // --------------------------------------------------------------------------
  // MANEJADOR DE PRESIÓN
  // --------------------------------------------------------------------------
  const handlePress = () => {
    if (!disabled) {
      toggle();
    }
  };

  return (
    <AppPressable
      onPress={handlePress}
      disabled={disabled}
      style={style}
      throttleMs={throttleMs}
      hapticFeedback="selection"
    >
      <Animated.View
        style={[
          styles.track,
          {
            backgroundColor: trackBackground,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: thumbColor,
              transform: [{ translateX: thumbTranslateX }],
            },
          ]}
        />
      </Animated.View>
    </AppPressable>
  );
}