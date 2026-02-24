// ============================================================================
// COMPONENTE MOLECULAR: AppCircularProgress
//
// Anillo de progreso interactivo con doble métrica (porcentaje/dinero).
// Incluye animación de llenado, feedback háptico y overlay azul al presionar.
// ============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// Componentes atómicos
import AppText from '@/components/atoms/content/AppText';

// Constantes y utilidades
import { PALETTE } from '@/constants/colors';
import { formatMoney } from '@/store/useVaultStore/index.utils';
import { useHaptic } from '@/hooks/useHaptic';

// Estilos y props
import { styles } from './index.styles';
import { AppCircularProgressProps } from './index.props';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const AppCircularProgress: React.FC<AppCircularProgressProps> = ({
  progress,
  remaining,
  total,
  currency,
  isExtremeMode = false,
  spentLabel = 'Gastado',
  availableLabel = 'Disponible',
  spentFooter,
  availableFooter,
  onPress: externalOnPress,
}) => {
  const [showMoney, setShowMoney] = useState(false);
  const haptic = useHaptic();

  const animatedValue = useRef(new Animated.Value(progress / 100)).current;
  const feedbackOpacity = useRef(new Animated.Value(0)).current;

  // Animación del anillo cuando cambia el progreso
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress / 100,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const size = 220;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const handlePressIn = () => {
    Animated.timing(feedbackOpacity, {
      toValue: 0.25,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(feedbackOpacity, {
      toValue: 0,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    haptic.light();
    if (externalOnPress) {
      externalOnPress();
    } else {
      setShowMoney(!showMoney);
    }
  };

  const displayValue = showMoney
    ? formatMoney(remaining, currency)
    : `${Math.round(progress)}%`;

  const label = showMoney ? availableLabel : spentLabel;

  // Color del anillo: naranja en modo dinero, rojo si modo cuidado y mostrando porcentaje, verde en caso contrario
  const ringColor = showMoney
    ? PALETTE.sunsetOrange
    : isExtremeMode
      ? PALETTE.errorRed
      : PALETTE.successGreen;

  // Footers por defecto si no se proporcionan
  const defaultSpentFooter = (
    <AppText variant="caption" color="secondary" style={styles.footerText}>
      Te quedan{' '}
      <AppText variant="caption" color="primary" style={{ fontWeight: '600' }}>
        {formatMoney(remaining, currency)}
      </AppText>{' '}
      para {Math.max(0, Math.ceil(remaining / (total / 30)))} días
    </AppText>
  );

  const defaultAvailableFooter = (
    <AppText variant="caption" color="secondary" style={styles.footerText}>
      Presupuesto inicial:{' '}
      <AppText variant="caption" color="primary" style={{ fontWeight: '600' }}>
        {formatMoney(total, currency)}
      </AppText>
    </AppText>
  );

  const footer = showMoney
    ? availableFooter ?? defaultAvailableFooter
    : spentFooter ?? defaultSpentFooter;

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <Svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          rotation={-90}
        >
          {/* Círculo de fondo */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={PALETTE.slateGray}
            strokeWidth={strokeWidth}
            fill="none"
            opacity={0.3}
          />
          {/* Círculo de progreso animado */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={ringColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>

        {/* Círculo interior con contenido */}
        <View style={styles.content}>
          <View style={styles.inner}>
            <AppText variant="label" color="secondary" style={styles.upperLabel}>
              {label}
            </AppText>
            <AppText
              variant="h1"
              color="primary"
              style={styles.mainValue}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {displayValue}
            </AppText>
            {footer}
          </View>
        </View>

        {/* Overlay de feedback azul */}
        <Animated.View
          style={[
            styles.content,
            styles.feedbackOverlay,
            {
              opacity: feedbackOpacity,
              backgroundColor: PALETTE.infoBlue,
            },
          ]}
          pointerEvents="none"
        />
      </View>
    </TouchableOpacity>
  );
};

export default AppCircularProgress;