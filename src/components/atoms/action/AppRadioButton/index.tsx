// ============================================================================
// RADIO BUTTON ANIMADO - AppRadioButton
//
// Componente de radio button con etiqueta opcional y animaciones suaves:
// - El borde del círculo exterior cambia de color gradualmente.
// - El punto interior aparece con escala progresiva y cambio de color.
// Utiliza el hook useToggleAnimation para gestionar la transición.
// ============================================================================

import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { PALETTE } from '@/constants/colors';
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
}: AppRadioButtonProps) {
  // --------------------------------------------------------------------------
  // HOOK DE ANIMACIÓN
  // --------------------------------------------------------------------------
  // Se usa nativeDriver: false porque animamos backgroundColor y borderColor.
  // El callback onAnimated ejecuta onSelect cuando la animación termina.
  const { animatedValue, toggle } = useToggleAnimation({
    value: selected,
    onAnimated: onSelect,
    useNativeDriver: false,
  });

  // --------------------------------------------------------------------------
  // INTERPOLACIONES
  // --------------------------------------------------------------------------
  const activeColor = STATE_COLORS[status];

  // Color del borde exterior: transiciona entre darkBorder (inactivo) y activeColor (seleccionado)
  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [PALETTE.darkBorder, activeColor],
  });

  // Color del punto interior: transiciona desde el color de fondo (transparente cuando inactivo)
  // pero como el punto solo es visible cuando selected = true, usamos la misma interpolación
  // para el color de fondo del punto, que va de transparente a activeColor.
  // Alternativamente, podríamos mantener el punto siempre presente con escala 0/1.
  const dotBackground = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', activeColor],
  });

  // Escala del punto interior: de 0 a 1
  const dotScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // --------------------------------------------------------------------------
  // MANEJADOR DE PRESIÓN
  // --------------------------------------------------------------------------
  const handlePress = () => {
    if (!disabled) {
      toggle(true); // Siempre selecciona este radio button (no toggle inverso)
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
      {/* CÍRCULO EXTERIOR ANIMADO */}
      <Animated.View style={[styles.outerCircle, { borderColor }]}>
        {/* PUNTO INTERIOR ANIMADO: siempre presente pero con escala y color dinámicos */}
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