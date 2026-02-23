// ============================================================================
// HOOK PERSONALIZADO: useSettingsHaptics
//
// Encapsula la lógica de la preferencia de vibración para la pantalla de ajustes:
// - Lectura del valor actual (hapticFeedback)
// - Manejador para cambiar el valor (toggle)
// ============================================================================

import { useCallback } from 'react';
import { useVaultStore } from '@/store/useVaultStore';

export const useSettingsHaptics = () => {
  // --------------------------------------------------------------------------
  // SELECTORES INDIVIDUALES (suscripción fina)
  // --------------------------------------------------------------------------
  const hapticFeedback = useVaultStore(
    (state) => state.notificationPreferences.hapticFeedback
  );

  const setNotificationPreferences = useVaultStore(
    (state) => state.setNotificationPreferences
  );

  // --------------------------------------------------------------------------
  // MANEJADOR DE CAMBIO
  // --------------------------------------------------------------------------
  const handleHapticToggle = useCallback((value: boolean) => {
    setNotificationPreferences({ hapticFeedback: value });
  }, [setNotificationPreferences]);

  return {
    hapticFeedback,
    handleHapticToggle,
  };
};