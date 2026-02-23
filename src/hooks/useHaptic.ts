// ============================================================================
// HOOK PERSONALIZADO: useHaptic
//
// Proporciona métodos para disparar retroalimentación háptica (vibración)
// en la aplicación. Respeta la preferencia global `hapticFeedback` almacenada
// en el store y maneja fallos silenciosos mediante try/catch.
//
// Uso recomendado en componentes interactivos para mejorar la experiencia
// de usuario con feedback táctil sutil.
// ============================================================================

import * as Haptics from 'expo-haptics';
import { useVaultStore } from '@/store/useVaultStore';

/**
 * Hook para acceder a los métodos de vibración.
 * Todos los métodos son no-op si la preferencia `hapticFeedback` está desactivada
 * o si ocurre un error en la plataforma subyacente.
 */
export const useHaptic = () => {
  // Nota: No usamos un selector de Zustand para evitar re-renders innecesarios.
  // En su lugar, obtenemos el valor actual directamente en cada llamada.

  /**
   * Vibración de impacto ligero.
   * Ideal para confirmar toques en botones o elementos pequeños.
   */
  const light = () => {
    const enabled = useVaultStore.getState().notificationPreferences.hapticFeedback;
    if (!enabled) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.warn('[Vulpis Days] Haptic feedback failed (light):', error);
    }
  };

  /**
   * Vibración de impacto medio.
   * Útil para acciones más significativas, como abrir un modal.
   */
  const medium = () => {
    const enabled = useVaultStore.getState().notificationPreferences.hapticFeedback;
    if (!enabled) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.warn('[Vulpis Days] Haptic feedback failed (medium):', error);
    }
  };

  /**
   * Vibración de impacto fuerte.
   * Para acciones de alta importancia, como eliminar un elemento.
   */
  const heavy = () => {
    const enabled = useVaultStore.getState().notificationPreferences.hapticFeedback;
    if (!enabled) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.warn('[Vulpis Days] Haptic feedback failed (heavy):', error);
    }
  };

  /**
   * Vibración de notificación de éxito.
   * Confirma que una operación se completó correctamente.
   */
  const success = () => {
    const enabled = useVaultStore.getState().notificationPreferences.hapticFeedback;
    if (!enabled) return;
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.warn('[Vulpis Days] Haptic feedback failed (success):', error);
    }
  };

  /**
   * Vibración de notificación de advertencia.
   * Indica una situación que requiere atención, pero no es error.
   */
  const warning = () => {
    const enabled = useVaultStore.getState().notificationPreferences.hapticFeedback;
    if (!enabled) return;
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (error) {
      console.warn('[Vulpis Days] Haptic feedback failed (warning):', error);
    }
  };

  /**
   * Vibración de notificación de error.
   * Avisa de que algo salió mal.
   */
  const error = () => {
    const enabled = useVaultStore.getState().notificationPreferences.hapticFeedback;
    if (!enabled) return;
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      console.warn('[Vulpis Days] Haptic feedback failed (error):', error);
    }
  };

  /**
   * Vibración de selección.
   * Retroalimentación sutil para cambios de estado (ej. cambio de switch, check).
   */
  const selection = () => {
    const enabled = useVaultStore.getState().notificationPreferences.hapticFeedback;
    if (!enabled) return;
    try {
      Haptics.selectionAsync();
    } catch (error) {
      console.warn('[Vulpis Days] Haptic feedback failed (selection):', error);
    }
  };

  /**
   * Método genérico para impacto con estilo personalizado.
   * @param style - Estilo de impacto ('light' | 'medium' | 'heavy' | 'soft' | 'rigid')
   */
  const impact = (style: Haptics.ImpactFeedbackStyle) => {
    const enabled = useVaultStore.getState().notificationPreferences.hapticFeedback;
    if (!enabled) return;
    try {
      Haptics.impactAsync(style);
    } catch (error) {
      console.warn(`[Vulpis Days] Haptic feedback failed (impact: ${style}):`, error);
    }
  };

  /**
   * Método genérico para notificación con tipo personalizado.
   * @param type - Tipo de notificación ('success' | 'warning' | 'error')
   */
  const notification = (type: Haptics.NotificationFeedbackType) => {
    const enabled = useVaultStore.getState().notificationPreferences.hapticFeedback;
    if (!enabled) return;
    try {
      Haptics.notificationAsync(type);
    } catch (error) {
      console.warn(`[Vulpis Days] Haptic feedback failed (notification: ${type}):`, error);
    }
  };

  return {
    light,
    medium,
    heavy,
    success,
    warning,
    error,
    selection,
    impact,
    notification,
  };
};