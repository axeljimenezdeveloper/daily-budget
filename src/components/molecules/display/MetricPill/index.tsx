// ============================================================================
// COMPONENTE MOLECULAR: MetricPill
//
// Pequeña tarjeta para mostrar una métrica con etiqueta y valor.
// Utilizado en el dashboard para "Ideal hoy" y "Ciclo".
// ============================================================================

import React from 'react';
import { View } from 'react-native';
import AppText from '@/components/atoms/content/AppText';
import { styles } from './index.styles';
import { MetricPillProps, MetricPillStatus } from './index.props';

const getValueColorStyle = (status: MetricPillStatus) => {
  switch (status) {
    case 'success':
      return styles.valueSuccess;
    case 'warning':
      return styles.valueWarning;
    case 'error':
      return styles.valueError;
    default:
      return styles.valueDefault;
  }
};

export const MetricPill: React.FC<MetricPillProps> = ({
  label,
  value,
  status = 'default',
}) => {
  const valueColorStyle = getValueColorStyle(status);

  return (
    <View style={styles.container}>
      <AppText variant="label" style={styles.label}>
        {label}
      </AppText>
      <AppText variant="body" style={[styles.value, valueColorStyle]}>
        {value}
      </AppText>
    </View>
  );
};

export default MetricPill;