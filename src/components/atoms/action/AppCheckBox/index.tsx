// ============================================================================
// CHECKBOX ANIMADO - AppCheckBox
//
// Componente de checkbox con etiqueta opcional y animaciones suaves:
// - El borde y fondo del cuadro cambian de color gradualmente.
// - El icono de check aparece con una escala progresiva.
// Utiliza el hook useToggleAnimation para gestionar la transición.
// ============================================================================

import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { PALETTE } from '@/constants/colors';
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
}: AppCheckBoxProps) {
  // --------------------------------------------------------------------------
  // HOOK DE ANIMACIÓN
  // --------------------------------------------------------------------------
  // Se usa nativeDriver: false porque animamos backgroundColor y borderColor.
  // El callback onAnimated ejecuta onValueChange cuando la animación termina.
  const { animatedValue, toggle } = useToggleAnimation({
    value,
    onAnimated: onValueChange,
    useNativeDriver: false,
  });

  // --------------------------------------------------------------------------
  // INTERPOLACIONES
  // --------------------------------------------------------------------------
  const activeColor = PALETTE.sunsetOrange;

  // Color del borde: transiciona entre darkBorder (inactivo) y sunsetOrange (activo)
  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [PALETTE.darkBorder, activeColor],
  });

  // Color de fondo: transiciona entre transparente (inactivo) y sunsetOrange (activo)
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', activeColor],
  });

  // Escala del icono de check: de 0 (invisible) a 1 (tamaño normal)
  const iconScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // --------------------------------------------------------------------------
  // MANEJADOR DE PRESIÓN
  // --------------------------------------------------------------------------
  const handlePress = () => {
    if (!disabled) {
      toggle(); // Invierte el valor actual
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
    <AppPressable onPress={handlePress} disabled={disabled} style={containerStyle}>
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
        {/* El icono siempre presente pero con escala animada */}
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