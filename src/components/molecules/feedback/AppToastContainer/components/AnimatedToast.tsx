// ============================================================================
// COMPONENTE INTERNO: AnimatedToast
//
// Gestiona la animación de entrada/salida y el cierre automático de un toast
// individual.
// ============================================================================

import React, { useEffect, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { ToastItem } from '@/store/useToastStore/index.types';
import { AppToast } from '../../AppToast';

interface AnimatedToastProps {
  toast: ToastItem;
  onRemove: (id: string) => void;
  marginBottom: number;
}

export const AnimatedToast: React.FC<AnimatedToastProps> = ({
  toast,
  onRemove,
  marginBottom,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      onRemove(toast.id);
    });
  }, [fadeAnim, onRemove, toast.id]);

  useEffect(() => {
    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Programar salida automática si duration > 0
    if (toast.duration > 0) {
      timeoutRef.current = setTimeout(handleClose, toast.duration);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [fadeAnim, toast.duration, handleClose]);

  return (
    <Animated.View
      style={{
        width: '90%',
        opacity: fadeAnim,
        marginBottom: marginBottom,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-10, 0],
            }),
          },
        ],
      }}
    >
      <AppToast
        variant={toast.variant}
        title={toast.title}
        description={toast.description}
        onClose={handleClose}
      />
    </Animated.View>
  );
};