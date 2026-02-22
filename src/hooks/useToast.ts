// ============================================================================
// HOOK GLOBAL: useToast
//
// Proporciona métodos sencillos para mostrar notificaciones temporales (toasts)
// en la aplicación. Internamente utiliza el store useToastStore.
// ============================================================================

import { useCallback } from 'react';
import { useToastStore } from '@/store/useToastStore';
import { AppToastVariant } from '@/components/molecules/feedback/AppToast/index.props';

/** Duración por defecto de los toasts (3 segundos) */
const DEFAULT_DURATION = 3000;

/**
 * Hook para disparar toasts desde cualquier componente.
 * 
 * @example
 * const toast = useToast();
 * toast.success('Operación exitosa');
 * toast.error('Error al guardar', 'Intenta de nuevo', 5000);
 */
export const useToast = () => {
  const { addToast } = useToastStore();

  /**
   * Método base para mostrar un toast.
   * @param variant - Tipo de toast (success, info, warning, error)
   * @param title - Título del mensaje (no puede estar vacío)
   * @param description - Descripción opcional
   * @param duration - Duración en ms (por defecto 3000)
   * @returns ID del toast creado, o null si no se pudo crear (título vacío)
   */
  const showToast = useCallback(
    (variant: AppToastVariant, title: string, description?: string, duration = DEFAULT_DURATION) => {
      return addToast({ variant, title, description, duration });
    },
    [addToast]
  );

  /** Toast de éxito */
  const success = useCallback(
    (title: string, description?: string, duration?: number) =>
      showToast('success', title, description, duration),
    [showToast]
  );

  /** Toast informativo */
  const info = useCallback(
    (title: string, description?: string, duration?: number) =>
      showToast('info', title, description, duration),
    [showToast]
  );

  /** Toast de advertencia */
  const warning = useCallback(
    (title: string, description?: string, duration?: number) =>
      showToast('warning', title, description, duration),
    [showToast]
  );

  /** Toast de error */
  const error = useCallback(
    (title: string, description?: string, duration?: number) =>
      showToast('error', title, description, duration),
    [showToast]
  );

  return { showToast, success, info, warning, error };
};