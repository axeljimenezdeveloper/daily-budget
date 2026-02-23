// ============================================================================
// RADIO BUTTON ANIMADO - AppRadioButton
//
// Componente de radio button con etiqueta opcional y animaciones suaves:
// - El borde del círculo exterior cambia de color gradualmente.
// - El punto interior aparece con escala progresiva y cambio de color.
// Utiliza el hook useToggleAnimation para gestionar la transición.
// Ahora soporta throttling opcional para prevenir pulsaciones rápidas.
// ============================================================================

import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { PALETTE } from '@/constants/colors';
import { ANIMATION } from '@/constants/animations'; // ← Importamos constante global
import { useToggleAnimation } from '@/hooks/useToggleAnimation';
import { STATE_COLORS } from './index.utils';
import AppPressable from '../AppPressable';
import AppText from '../../content/AppText';
import { AppRadioButtonProps } from './index.props';
import { styles } from './index.styles';

export default function AppRadioButton({
  selected,
  onSelect,
  label,
  status = 'info',
  disabled = false,
  style,
  fullWidth = false,
  throttleMs = ANIMATION.DEFAULT_PRESS_THROTTLE_MS, // ← Valor por defecto
}: AppRadioButtonProps) {
  // --------------------------------------------------------------------------
  // HOOK DE ANIMACIÓN
  // --------------------------------------------------------------------------
  const { animatedValue, toggle } = useToggleAnimation({
    value: selected,
    onAnimated: onSelect,
    useNativeDriver: false,
  });

  // --------------------------------------------------------------------------
  // INTERPOLACIONES
  // --------------------------------------------------------------------------
  const activeColor = STATE_COLORS[status];

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [PALETTE.darkBorder, activeColor],
  });

  const dotBackground = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', activeColor],
  });

  const dotScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // --------------------------------------------------------------------------
  // MANEJADOR DE PRESIÓN
  // --------------------------------------------------------------------------
  const handlePress = () => {
    if (!disabled) {
      toggle(true); // Siempre selecciona este radio button
    }
  };

  // --------------------------------------------------------------------------
  // ESTILOS DINÁMICOS DEL CONTENEDOR
  // --------------------------------------------------------------------------
  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    fullWidth && { width: '100%' },
    style,
    { opacity: disabled ? 0.5 : 1 },
  ];

  return (
    <AppPressable
      onPress={handlePress}
      disabled={disabled}
      style={containerStyle}
      throttleMs={throttleMs}
      hapticFeedback="selection"
    >
      {/* CÍRCULO EXTERIOR ANIMADO */}
      <Animated.View style={[styles.outerCircle, { borderColor }]}>
        {/* PUNTO INTERIOR ANIMADO */}
        <Animated.View
          style={[
            styles.innerDot,
            {
              backgroundColor: dotBackground,
              transform: [{ scale: dotScale }],
            },
          ]}
        />
      </Animated.View>

      {/* ETIQUETA (si existe) */}
      {label && (
        <AppText
          variant="body"
          color={disabled ? 'secondary' : 'primary'}
          style={styles.label}
        >
          {label}
        </AppText>
      )}
    </AppPressable>
  );
}