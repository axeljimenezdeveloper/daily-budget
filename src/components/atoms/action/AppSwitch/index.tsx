// ============================================================================
// SWITCH PERSONALIZADO CON ANIMACIÓN - AppSwitch
//
// Reemplaza el Switch nativo de React Native con una implementación propia
// que permite animaciones suaves y consistentes con el sistema de diseño.
// Utiliza el hook useToggleAnimation para manejar la transición entre estados.
// ============================================================================

import React from 'react';
import { Animated } from 'react-native';
import AppPressable from '../AppPressable';
import { useToggleAnimation } from '@/hooks/useToggleAnimation';
import { AppSwitchProps } from './index.props';
import { styles, SWITCH_COLORS, SWITCH_SIZES } from './index.styles';

export default function AppSwitch({
  value,
  onValueChange,
  disabled = false,
  style,
}: AppSwitchProps) {
  // --------------------------------------------------------------------------
  // HOOK DE ANIMACIÓN
  // --------------------------------------------------------------------------
  // Se configura useNativeDriver: false para permitir animación de color
  // (backgroundColor) junto con transform. Al finalizar la animación,
  // se notifica el cambio mediante onValueChange.
  const { animatedValue, toggle } = useToggleAnimation({
    value,
    onAnimated: onValueChange,
    useNativeDriver: false,
  });

  // --------------------------------------------------------------------------
  // INTERPOLACIONES
  // --------------------------------------------------------------------------
  // Color de fondo del track: transiciona entre inactivo (0) y activo (1)
  const trackBackground = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SWITCH_COLORS.inactiveTrack, SWITCH_COLORS.activeTrack],
  });

  // Desplazamiento horizontal del thumb:
  // desde 0 (posición inicial) hasta el ancho disponible dentro del track
  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      SWITCH_SIZES.trackWidth - SWITCH_SIZES.thumbSize - 2 * SWITCH_SIZES.thumbMargin,
    ],
  });

  // Color del thumb: cambia si el componente está deshabilitado
  const thumbColor = disabled ? SWITCH_COLORS.disabledThumb : SWITCH_COLORS.thumb;

  // --------------------------------------------------------------------------
  // MANEJADOR DE PRESIÓN
  // --------------------------------------------------------------------------
  const handlePress = () => {
    if (!disabled) {
      toggle(); // Invierte el valor actual (false → true, true → false)
    }
  };

  return (
    <AppPressable onPress={handlePress} disabled={disabled} style={style}>
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