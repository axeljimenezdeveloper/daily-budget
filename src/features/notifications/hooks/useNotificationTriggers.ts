// ============================================================================
// HOOK PERSONALIZADO: useNotificationTriggers (CON DEEP LINKING)
//
// Dispara notificaciones automáticas cuando se activa el modo cuidado
// o cuando el presupuesto se excede. Incluye datos de navegación para
// que al tocar la notificación se pueda abrir la pantalla adecuada.
// ============================================================================

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { useVaultStore } from '@/store/useVaultStore';
import { useNotificationScheduler } from './useNotificationScheduler';
import { NOTIFICATION_IDS, NOTIFICATION_CHANNELS } from '../constants';
import { ROUTES } from '@/constants/navigation'; // <-- NUEVA IMPORTACIÓN

export const useNotificationTriggers = () => {
  const { t } = useTranslation();

  const { isExtremeMode, remainingBudget, notificationPreferences } = useVaultStore(
    useShallow((state) => ({
      isExtremeMode: state.isExtremeMode,
      remainingBudget: state.remainingBudget,
      notificationPreferences: state.notificationPreferences,
    }))
  );

  const { scheduleOneTimeNotification } = useNotificationScheduler();

  const extremeModeNotifiedRef = useRef(false);
  const budgetExceededNotifiedRef = useRef(false);

  // --------------------------------------------------------------------------
  // ALERTA DE MODO CUIDADO
  // --------------------------------------------------------------------------
  useEffect(() => {
    const { extremeModeAlert } = notificationPreferences;

    if (!extremeModeAlert) {
      extremeModeNotifiedRef.current = false;
      return;
    }

    if (isExtremeMode && !extremeModeNotifiedRef.current) {
      scheduleOneTimeNotification(
        NOTIFICATION_IDS.EXTREME_MODE_ALERT,
        1, // Se dispara a 1 segundo (prueba rápida)
        t('notifications.extreme_mode_alert.title'),
        t('notifications.extreme_mode_alert.body'),
        NOTIFICATION_CHANNELS.ALERTS.id,
        {
          screen: ROUTES.MAIN,
          highlight: 'extreme', // Identificador para resaltar en UI
          from: 'extreme_mode_alert',
        }
      );
      extremeModeNotifiedRef.current = true;
    } else if (!isExtremeMode && extremeModeNotifiedRef.current) {
      extremeModeNotifiedRef.current = false;
    }
  }, [isExtremeMode, notificationPreferences.extremeModeAlert, scheduleOneTimeNotification, t]);

  // --------------------------------------------------------------------------
  // ALERTA DE PRESUPUESTO EXCEDIDO
  // --------------------------------------------------------------------------
  useEffect(() => {
    const { budgetExceededAlert } = notificationPreferences;

    if (!budgetExceededAlert) {
      budgetExceededNotifiedRef.current = false;
      return;
    }

    const isExceeded = remainingBudget < 0;

    if (isExceeded && !budgetExceededNotifiedRef.current) {
      scheduleOneTimeNotification(
        NOTIFICATION_IDS.BUDGET_EXCEEDED_ALERT,
        1,
        t('notifications.budget_exceeded_alert.title'),
        t('notifications.budget_exceeded_alert.body'),
        NOTIFICATION_CHANNELS.ALERTS.id,
        {
          screen: ROUTES.MAIN,
          highlight: 'budget',
          from: 'budget_exceeded_alert',
        }
      );
      budgetExceededNotifiedRef.current = true;
    } else if (!isExceeded && budgetExceededNotifiedRef.current) {
      budgetExceededNotifiedRef.current = false;
    }
  }, [remainingBudget, notificationPreferences.budgetExceededAlert, scheduleOneTimeNotification, t]);
};