// ============================================================================
// HOOK PERSONALIZADO: useSettingsNotifications
//
// Encapsula la lógica de notificaciones para la pantalla de ajustes:
// - Preferencias (recordatorio diario, alertas)
// - Programación de notificaciones (permisos, prueba)
// - Manejadores de cambios y prueba
// ============================================================================

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/useToast';
import { useNotificationPreferences } from '@/features/notifications/hooks/useNotificationPreferences';
import { useNotificationScheduler } from '@/features/notifications/hooks/useNotificationScheduler';
import {
  NOTIFICATION_CHANNELS,
} from '@/features/notifications/constants';

export const useSettingsNotifications = () => {
  const { t } = useTranslation();
  const toast = useToast();

  // Preferencias
  const {
    dailyReminder,
    extremeModeAlert,
    budgetExceededAlert,
    reminderTime,
    isSaving,
    updatePreferences,
  } = useNotificationPreferences();

  // Scheduler
  const { requestPermissions, scheduleOneTimeNotification } = useNotificationScheduler();

  // Manejadores
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
        toast.error(t('notifications.permission_denied') || 'Permiso denegado');
        return;
      }
      await scheduleOneTimeNotification(
        'test-notification',
        1,
        t('notifications.test.title') || 'Prueba',
        t('notifications.test.body') || 'Esta es una notificación de prueba',
        NOTIFICATION_CHANNELS.REMINDERS.id
      );
      toast.success(t('notifications.test.sent') || 'Notificación enviada');
    } catch (error) {
      console.error('[SURV] Error sending test notification:', error);
      toast.error(t('notifications.test.error') || 'Error al enviar notificación de prueba');
    }
  }, [requestPermissions, scheduleOneTimeNotification, toast, t]);

  return {
    dailyReminder,
    extremeModeAlert,
    budgetExceededAlert,
    reminderTime,
    isSaving,
    handleDailyReminderChange,
    handleExtremeAlertChange,
    handleBudgetExceededChange,
    handleReminderTimeChange,
    handleTestNotification,
  };
};