// ============================================================================
// PANTALLA DE AJUSTES (Settings)
//
// Permite al usuario configurar sus preferencias de notificaciones locales.
// - Recordatorio diario (hora configurable)
// - Alerta de modo cuidado
// - Alerta de presupuesto excedido
//
// Utiliza el hook useNotificationPreferences para leer y modificar el store,
// y useNotificationScheduler para enviar notificaciones de prueba (dev).
//
// Todas las cadenas visibles están internacionalizadas mediante i18n.
// ============================================================================

import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import AppContainer from '@/components/atoms/structure/AppContainer';
import AppStack from '@/components/atoms/structure/AppStack';
import AppText from '@/components/atoms/content/AppText';
import AppDivider from '@/components/atoms/structure/AppDivider';
import AppSpacer from '@/components/atoms/structure/AppSpacer';
import AppButton from '@/components/atoms/action/AppButton';

import NotificationSection from '@/features/notifications/components/NotificationSection';
import { useNotificationPreferences } from '@/features/notifications/hooks/useNotificationPreferences';
import { useNotificationScheduler } from '@/features/notifications/hooks/useNotificationScheduler';
import { NOTIFICATION_IDS, NOTIFICATION_CHANNELS } from '@/features/notifications/constants';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * Pantalla de ajustes de la aplicación.
 * Muestra los controles de configuración de notificaciones y un botón de prueba
 * (solo en desarrollo) para verificar el funcionamiento del sistema.
 */
export default function SettingsScreen() {
  const { t } = useTranslation();

  // --------------------------------------------------------------------------
  // Hooks de notificaciones
  // --------------------------------------------------------------------------
  const { preferences, updatePreferences, isSaving } = useNotificationPreferences();
  const { scheduleOneTimeNotification } = useNotificationScheduler();

  // --------------------------------------------------------------------------
  // Manejadores de eventos
  // --------------------------------------------------------------------------
  const handleDailyReminderToggle = useCallback(
    (value: boolean) => {
      updatePreferences({ dailyReminder: value });
    },
    [updatePreferences]
  );

  const handleReminderTimeChange = useCallback(
    (time: string) => {
      updatePreferences({ reminderTime: time });
    },
    [updatePreferences]
  );

  const handleExtremeModeToggle = useCallback(
    (value: boolean) => {
      updatePreferences({ extremeModeAlert: value });
    },
    [updatePreferences]
  );

  const handleBudgetExceededToggle = useCallback(
    (value: boolean) => {
      updatePreferences({ budgetExceededAlert: value });
    },
    [updatePreferences]
  );

  // --------------------------------------------------------------------------
  // Notificación de prueba (solo en desarrollo)
  // --------------------------------------------------------------------------
  const handleTestNotification = useCallback(async () => {
    await scheduleOneTimeNotification(
      'surv.test_notification',
      1, // 1 segundo
      t('notifications.daily_reminder.title'),
      t('settings.test_button'),
      NOTIFICATION_CHANNELS.REMINDERS.id,
      { type: 'test' }
    );
  }, [scheduleOneTimeNotification, t]);

  return (
    <AppContainer>
      <AppStack direction="vertical" gap="l" style={{ paddingVertical: 16 }}>
        {/* ----------------------------------------------------------------
          TÍTULO DE LA PANTALLA
        ---------------------------------------------------------------- */}
        <AppText variant="h2" align="center" style={{ textTransform: 'uppercase' }}>
          {t('settings.title')}
        </AppText>

        <AppSpacer size="s" />

        {/* ----------------------------------------------------------------
          SECCIÓN: RECORDATORIO DIARIO
          - Incluye selector de hora
        ---------------------------------------------------------------- */}
        <NotificationSection
          title={t('settings.daily_reminder_title')}
          description={t('settings.daily_reminder_description')}
          enabled={preferences.dailyReminder}
          onToggle={handleDailyReminderToggle}
          showTimePicker={true}
          timeValue={preferences.reminderTime}
          onTimeChange={handleReminderTimeChange}
          disabled={isSaving}
        />

        <AppDivider />

        {/* ----------------------------------------------------------------
          SECCIÓN: ALERTA DE MODO CUIDADO
        ---------------------------------------------------------------- */}
        <NotificationSection
          title={t('settings.extreme_alert_title')}
          description={t('settings.extreme_alert_description')}
          enabled={preferences.extremeModeAlert}
          onToggle={handleExtremeModeToggle}
          disabled={isSaving}
        />

        <AppDivider />

        {/* ----------------------------------------------------------------
          SECCIÓN: ALERTA DE PRESUPUESTO EXCEDIDO
        ---------------------------------------------------------------- */}
        <NotificationSection
          title={t('settings.budget_exceeded_title')}
          description={t('settings.budget_exceeded_description')}
          enabled={preferences.budgetExceededAlert}
          onToggle={handleBudgetExceededToggle}
          disabled={isSaving}
        />

        {/* ----------------------------------------------------------------
          BOTÓN DE PRUEBA (SOLO EN DESARROLLO)
        ---------------------------------------------------------------- */}
        {__DEV__ && (
          <>
            <AppSpacer size="l" />
            <View style={{ alignItems: 'center' }}>
              <AppButton
                variant="outline"
                onPress={handleTestNotification}
                disabled={isSaving}
                style={{ minWidth: 200 }}
              >
                {t('settings.test_button')}
              </AppButton>
            </View>
          </>
        )}
      </AppStack>
    </AppContainer>
  );
}