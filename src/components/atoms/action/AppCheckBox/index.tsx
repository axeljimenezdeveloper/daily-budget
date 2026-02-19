// ============================================================================
// CHECKBOX ANIMADO - AppCheckBox
//
// Componente de checkbox con etiqueta opcional y animaciones suaves:
// - El borde y fondo del cuadro cambian de color gradualmente.
// - El icono de check aparece con una escala progresiva.
// Utiliza el hook useToggleAnimation para gestionar la transición.
// Ahora soporta throttling opcional para prevenir pulsaciones rápidas.
// ============================================================================

import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { PALETTE } from '@/constants/colors';
import { ANIMATION } from '@/constants/animations'; // ← Importamos constante global
import { useToggleAnimation } from '@/hooks/useToggleAnimation';
import AppPressable from '../AppPressable';
import AppIcon from '../../content/AppIcon';
import AppText from '../../content/AppText';
import { AppCheckBoxProps } from './index.props';
import { styles } from './index.styles';

export default function AppCheckBox({
  value,
  onValueChange,
  label,
  disabled = false,
  style,
  fullWidth = false,
  throttleMs = ANIMATION.DEFAULT_PRESS_THROTTLE_MS, // ← Valor por defecto
}: AppCheckBoxProps) {
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
  const activeColor = PALETTE.sunsetOrange;

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [PALETTE.darkBorder, activeColor],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', activeColor],
  });

  const iconScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // --------------------------------------------------------------------------
  // MANEJADOR DE PRESIÓN
  // --------------------------------------------------------------------------
  const handlePress = () => {
    if (!disabled) {
      toggle();
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
      throttleMs={throttleMs} // ← Pasamos la prop
    >
      {/* CUADRO ANIMADO */}
      <Animated.View
        style={[
          styles.box,
          {
            borderColor,
            backgroundColor,
          },
        ]}
      >
        <Animated.View style={{ transform: [{ scale: iconScale }] }}>
          <AppIcon name="checkmark" size="s" color="primary" />
        </Animated.View>
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