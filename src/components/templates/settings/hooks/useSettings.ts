// ============================================================================
// HOOK PERSONALIZADO: useSettings
//
// Centraliza toda la lógica y datos necesarios para la pantalla de ajustes.
// Combina el store global, hooks de notificaciones, biometría, exportación,
// y maneja los estados locales de modales.
// ============================================================================

import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useVaultStore } from '@/store/useVaultStore';
import { useBiometricAuth } from '@/features/biometrics/hooks/useBiometricAuth';
import { useNotificationPreferences } from '@/features/notifications/hooks/useNotificationPreferences';
import { useNotificationScheduler } from '@/features/notifications/hooks/useNotificationScheduler';
import { useExportCSV } from '@/hooks/useExportCSV';
import { calculateDaysPassed } from '@/store/useVaultStore/index.utils';
import { ROUTES } from '@/constants/navigation';
import {
  NOTIFICATION_IDS,
  NOTIFICATION_CHANNELS,
} from '@/features/notifications/constants';

// ----------------------------------------------------------------------------
// TIPO DE RETORNO DEL HOOK
// ----------------------------------------------------------------------------

export interface UseSettingsReturn {
  // Datos del store
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  totalBudget: number;
  daysDuration: number;
  startDate: string | null;
  isExtremeMode: boolean;
  currency: string;
  isBiometricEnabled: boolean;

  // Datos de notificaciones
  dailyReminder: boolean;
  extremeModeAlert: boolean;
  budgetExceededAlert: boolean;
  reminderTime: string;
  isSaving: boolean;

  // Datos de exportación
  isExporting: boolean;
  exportError: string | null;

  // Datos de biometría
  hasHardware: boolean | null;
  isEnrolled: boolean | null;
  biometricAvailabilityLoading: boolean;
  authLoading: boolean;
  biometricToggleLoading: boolean;

  // Cálculos derivados
  remainingDays: number;
  daysPassed: number;

  // Estados de modales
  showLanguageModal: boolean;
  showResetModal: boolean;
  setShowLanguageModal: (show: boolean) => void;
  setShowResetModal: (show: boolean) => void;

  // Manejadores
  handleBiometricToggle: (newValue: boolean) => Promise<void>;
  handleEditPlan: () => void;
  handleExportCSV: () => Promise<void>;
  handleResetConfirm: () => void;
  handleDailyReminderChange: (value: boolean) => void;
  handleExtremeAlertChange: (value: boolean) => void;
  handleBudgetExceededChange: (value: boolean) => void;
  handleReminderTimeChange: (time: string) => void;
  handleTestNotification: () => Promise<void>;
  handleLanguageSelect: (lang: 'es' | 'en') => void;
}

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------

export const useSettings = (): UseSettingsReturn => {
  const { t } = useTranslation();
  const router = useRouter();

  // --- Store ---
  const {
    language,
    setLanguage,
    totalBudget,
    daysDuration,
    startDate,
    isExtremeMode,
    currency,
    resetVault,
    isBiometricEnabled,
    setBiometricEnabled,
  } = useVaultStore();

  // --- Biometría ---
  const {
    hasHardware,
    isEnrolled,
    loading: biometricAvailabilityLoading,
    authLoading,
    authenticate,
  } = useBiometricAuth();

  const [biometricToggleLoading, setBiometricToggleLoading] = useState(false);

  // --- Notificaciones (preferencias) ---
  const {
    dailyReminder,
    extremeModeAlert,
    budgetExceededAlert,
    reminderTime,
    isSaving,
    updatePreferences,
  } = useNotificationPreferences();

  // --- Notificaciones (scheduler) ---
  const { requestPermissions, scheduleOneTimeNotification } = useNotificationScheduler();

  // --- Exportación CSV ---
  const { exportCSV, isExporting, error: exportError } = useExportCSV();

  // --- Cálculos derivados ---
  const daysPassed = calculateDaysPassed(startDate);
  const remainingDays = Math.max(0, daysDuration - daysPassed);

  // --- Estados de modales ---
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // --- Efecto para errores de exportación ---
  useEffect(() => {
    if (exportError) {
      Alert.alert(t('common.error'), exportError, [{ text: t('common.ok', 'OK') }]);
    }
  }, [exportError, t]);

  // --- Manejadores ---

  const handleExportCSV = useCallback(async () => {
    await exportCSV();
  }, [exportCSV]);

  const handleResetConfirm = useCallback(() => {
    resetVault();
    setShowResetModal(false);
    router.replace(ROUTES.WELCOME.ONBOARDING1);
  }, [resetVault, router]);

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

  const handleEditPlan = useCallback(() => {
    Alert.alert(
      t('settings.edit_plan'),
      t('settings.coming_soon', 'Funcionalidad próxima')
    );
  }, [t]);

  // Notificaciones
  const handleDailyReminderChange = useCallback((value: boolean) => {
    updatePreferences({ dailyReminder: value });
  }, [updatePreferences]);

  const handleExtremeAlertChange = useCallback((value: boolean) => {
    updatePreferences({ extremeModeAlert: value });
  }, [updatePreferences]);

  const handleBudgetExceededChange = useCallback((value: boolean) => {
    updatePreferences({ budgetExceededAlert: value });
  }, [updatePreferences]);

  const handleReminderTimeChange = useCallback((time: string) => {
    updatePreferences({ reminderTime: time });
  }, [updatePreferences]);

  const handleTestNotification = useCallback(async () => {
    try {
      const granted = await requestPermissions();
      if (!granted) {
        Alert.alert(
          t('common.error'),
          t('notifications.permission_denied') || 'Permiso denegado'
        );
        return;
      }
      await scheduleOneTimeNotification(
        'test-notification',
        1,
        t('notifications.test.title') || 'Prueba',
        t('notifications.test.body') || 'Esta es una notificación de prueba',
        NOTIFICATION_CHANNELS.REMINDERS.id
      );
      Alert.alert(
        t('common.success'),
        t('notifications.test.sent') || 'Notificación enviada'
      );
    } catch (error) {
      console.error('[SURV] Error sending test notification:', error);
      Alert.alert(
        t('common.error'),
        t('notifications.test.error') || 'Error al enviar notificación de prueba'
      );
    }
  }, [requestPermissions, scheduleOneTimeNotification, t]);

  const handleLanguageSelect = useCallback((lang: 'es' | 'en') => {
    setLanguage(lang);
    setShowLanguageModal(false);
  }, [setLanguage]);

  return {
    // Datos del store
    language: language as 'es' | 'en',
    setLanguage,
    totalBudget,
    daysDuration,
    startDate,
    isExtremeMode,
    currency,
    isBiometricEnabled,

    // Notificaciones
    dailyReminder,
    extremeModeAlert,
    budgetExceededAlert,
    reminderTime,
    isSaving,

    // Exportación
    isExporting,
    exportError,

    // Biometría
    hasHardware,
    isEnrolled,
    biometricAvailabilityLoading,
    authLoading,
    biometricToggleLoading,

    // Cálculos
    remainingDays,
    daysPassed,

    // Modales
    showLanguageModal,
    showResetModal,
    setShowLanguageModal,
    setShowResetModal,

    // Manejadores
    handleBiometricToggle,
    handleEditPlan,
    handleExportCSV,
    handleResetConfirm,
    handleDailyReminderChange,
    handleExtremeAlertChange,
    handleBudgetExceededChange,
    handleReminderTimeChange,
    handleTestNotification,
    handleLanguageSelect,
  };
};