// ============================================================================
// HOOK PERSONALIZADO: useSettingsBiometrics
//
// Encapsula la lógica de autenticación biométrica para la pantalla de ajustes:
// - Estado del hardware y enrolamiento
// - Cargas (disponibilidad y autenticación)
// - Manejador de toggle con autenticación
// ============================================================================

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useBiometricAuth } from '@/features/biometrics/hooks/useBiometricAuth';
import { useSettingsStore } from './useSettingsStore'; // Ajusta la ruta según sea necesario

export const useSettingsBiometrics = () => {
  const { t } = useTranslation();
  const { setBiometricEnabled } = useSettingsStore();

  const {
    hasHardware,
    isEnrolled,
    loading: biometricAvailabilityLoading,
    authLoading,
    authenticate,
  } = useBiometricAuth();

  const [biometricToggleLoading, setBiometricToggleLoading] = useState(false);

  const handleBiometricToggle = useCallback(async (newValue: boolean) => {
    if (!newValue) {
      setBiometricEnabled(false);
      return;
    }
    if (!hasHardware || !isEnrolled) {
      return;
    }
    setBiometricToggleLoading(true);
    const result = await authenticate({
      promptMessage: t('settings.biometric_prompt_message'),
      disableDeviceFallback: false,
    });
    setBiometricToggleLoading(false);
    if (result.success) {
      setBiometricEnabled(true);
    }
  }, [hasHardware, isEnrolled, authenticate, setBiometricEnabled, t]);

  return {
    hasHardware,
    isEnrolled,
    biometricAvailabilityLoading,
    authLoading,
    biometricToggleLoading,
    handleBiometricToggle,
  };
};