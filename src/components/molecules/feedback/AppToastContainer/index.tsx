// ============================================================================
// COMPONENTE PRINCIPAL: AppToastContainer
//
// Contenedor absoluto que renderiza la lista de toasts activos con
// animaciones y gestión de posición (top/bottom).
// ============================================================================

import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToastStore } from '@/store/useToastStore';
import { AppToastContainerProps } from './index.props';
import { DEFAULT_SPACING, DEFAULT_OFFSET } from './index.utils';
import { styles } from './index.styles';
import { AnimatedToast } from './components/AnimatedToast';

export const AppToastContainer: React.FC<AppToastContainerProps> = ({
  position = 'top',
  spacing = DEFAULT_SPACING,
  offset = DEFAULT_OFFSET,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  // Ajuste dinámico según la zona segura del dispositivo
  const topOffset = Math.max(offset, insets.top);
  const bottomOffset = Math.max(offset, insets.bottom);

  const positionStyle =
    position === 'top'
      ? { top: topOffset }
      : { bottom: bottomOffset, flexDirection: 'column-reverse' as const };

  return (
    <View
      pointerEvents="box-none"
      style={[styles.container, positionStyle, style]}
    >
      {toasts.map((toast) => (
        <AnimatedToast
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
          marginBottom={spacing}
        />
      ))}
    </View>
  );
};