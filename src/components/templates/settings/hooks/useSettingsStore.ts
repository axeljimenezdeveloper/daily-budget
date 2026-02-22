// ============================================================================
// HOOK PERSONALIZADO: useSettingsStore
//
// Encapsula los datos y acciones del store global (useVaultStore) que son
// relevantes para la pantalla de ajustes. Facilita la composición en useSettings.
// ============================================================================

import { useVaultStore } from '@/store/useVaultStore';

export const useSettingsStore = () => {
  const {
    language,
    setLanguage,
    totalBudget,
    daysDuration,
    startDate,
    isExtremeMode,
    currency,
    isBiometricEnabled,
    setBiometricEnabled,
    resetVault,
  } = useVaultStore();

  return {
    language: language as 'es' | 'en',
    setLanguage,
    totalBudget,
    daysDuration,
    startDate,
    isExtremeMode,
    currency,
    isBiometricEnabled,
    setBiometricEnabled,
    resetVault,
  };
};