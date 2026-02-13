import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { useVaultStore } from '@/store/useVaultStore';
import { useNotificationScheduler } from './useNotificationScheduler';
import { NOTIFICATION_IDS, NOTIFICATION_CHANNELS } from '../constants';

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

  useEffect(() => {
    const { extremeModeAlert } = notificationPreferences;

    if (!extremeModeAlert) {
      extremeModeNotifiedRef.current = false;
      return;
    }

    if (isExtremeMode && !extremeModeNotifiedRef.current) {
      scheduleOneTimeNotification(
        NOTIFICATION_IDS.EXTREME_MODE_ALERT,
        1,
        t('notifications.extreme_mode_alert.title'),
        t('notifications.extreme_mode_alert.body'),
        NOTIFICATION_CHANNELS.ALERTS.id
      );
      extremeModeNotifiedRef.current = true;
    } else if (!isExtremeMode && extremeModeNotifiedRef.current) {
      extremeModeNotifiedRef.current = false;
    }
  }, [isExtremeMode, notificationPreferences.extremeModeAlert, scheduleOneTimeNotification, t]);

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
        NOTIFICATION_CHANNELS.ALERTS.id
      );
      budgetExceededNotifiedRef.current = true;
    } else if (!isExceeded && budgetExceededNotifiedRef.current) {
      budgetExceededNotifiedRef.current = false;
    }
  }, [remainingBudget, notificationPreferences.budgetExceededAlert, scheduleOneTimeNotification, t]);
};