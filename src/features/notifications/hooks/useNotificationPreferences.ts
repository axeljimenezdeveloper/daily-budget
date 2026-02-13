import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useVaultStore } from "@/store/useVaultStore";
import {
  getDateFromTimeString,
  getTodayISO,
} from "@/store/useVaultStore/index.utils";
import { useNotificationScheduler } from "./useNotificationScheduler";
import { NOTIFICATION_CHANNELS, NOTIFICATION_IDS } from "../constants";

export const useNotificationPreferences = () => {
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);

  const preferences = useVaultStore((state) => state.notificationPreferences);
  const scheduledDate = useVaultStore(
    (state) => state.notificationsScheduledForDate,
  );
  const setPrefs = useVaultStore((state) => state.setNotificationPreferences);
  const setScheduledToday = useVaultStore(
    (state) => state.setNotificationsScheduledForToday,
  );
  const requestStorePermissions = useVaultStore(
    (state) => state.requestNotificationPermissions,
  );
  const hasHydrated = useVaultStore((state) => state._hasHydrated); // ✅ Flag de rehidratación

  const { scheduleDailyReminder, requestPermissions, cancelNotificationById } =
    useNotificationScheduler();

  const handleReschedule = useCallback(
    async (targetPrefs: typeof preferences) => {
      if (!targetPrefs.dailyReminder) return;

      setIsSaving(true);
      try {
        const granted = await requestPermissions();
        if (granted) {
          requestStorePermissions();

          const date = getDateFromTimeString(targetPrefs.reminderTime);
          await scheduleDailyReminder(
            date.getHours(),
            date.getMinutes(),
            t("notifications.daily_reminder.title"),
            t("notifications.daily_reminder.body"),
            { channelId: NOTIFICATION_CHANNELS.REMINDERS.id },
          );
          setScheduledToday();
        }
      } catch (e) {
        console.error("[SURV] Error en scheduler:", e);
      } finally {
        setIsSaving(false);
      }
    },
    [
      requestPermissions,
      scheduleDailyReminder,
      t,
      setScheduledToday,
      requestStorePermissions,
    ],
  );

  const updatePreferences = useCallback(
    async (partialPrefs: Partial<typeof preferences>) => {
      const newFullPrefs = { ...preferences, ...partialPrefs };

      setPrefs(partialPrefs);

      if (partialPrefs.dailyReminder === false) {
        await cancelNotificationById(NOTIFICATION_IDS.DAILY_REMINDER);
      } else {
        await handleReschedule(newFullPrefs);
      }
    },
    [preferences, setPrefs, cancelNotificationById, handleReschedule],
  );

  // ⚠️ Programación automática al montar: solo si ya hay hidratación y no está programado hoy
  useEffect(() => {
    if (!hasHydrated) return;

    const today = getTodayISO();
    if (scheduledDate === today) return;
    if (preferences.dailyReminder) {
      handleReschedule(preferences);
    }
  }, [hasHydrated]);
  // }, [hasHydrated, preferences.dailyReminder, scheduledDate, handleReschedule]);

  return {
    preferences,
    updatePreferences,
    isSaving,
    rescheduleDailyReminder: () => handleReschedule(preferences),
  };
};
