// ============================================================================
// HOOK PERSONALIZADO: useNotificationPreferences (CON DEEP LINKING)
// ============================================================================

import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Platform } from "react-native";
import { useVaultStore } from "@/store/useVaultStore";
import {
  getDateFromTimeString,
  getTodayISO,
} from "@/store/useVaultStore/index.utils";
import { useNotificationScheduler } from "./useNotificationScheduler";
import { NOTIFICATION_CHANNELS, NOTIFICATION_IDS } from "../constants";
import { ROUTES } from "@/constants/navigation";

export const useNotificationPreferences = () => {
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);

  // --- Selectores individuales (suscripción fina) ---
  const dailyReminder = useVaultStore(
    (state) => state.notificationPreferences.dailyReminder
  );
  const extremeModeAlert = useVaultStore(
    (state) => state.notificationPreferences.extremeModeAlert
  );
  const budgetExceededAlert = useVaultStore(
    (state) => state.notificationPreferences.budgetExceededAlert
  );
  const reminderTime = useVaultStore(
    (state) => state.notificationPreferences.reminderTime
  );

  // --- Otros estados del store (para compatibilidad y efectos) ---
  const scheduledDate = useVaultStore(
    (state) => state.notificationsScheduledForDate
  );
  const setPrefs = useVaultStore((state) => state.setNotificationPreferences);
  const setScheduledToday = useVaultStore(
    (state) => state.setNotificationsScheduledForToday
  );
  const requestStorePermissions = useVaultStore(
    (state) => state.requestNotificationPermissions
  );
  const hasHydrated = useVaultStore((state) => state._hasHydrated);

  // --- Hook de programación ---
  const { scheduleDailyReminder, requestPermissions, cancelNotificationById } =
    useNotificationScheduler();

  // --- Función interna handleReschedule ---
  const handleReschedule = useCallback(
    async (targetPrefs: { dailyReminder: boolean; reminderTime: string }): Promise<boolean> => {
      if (!targetPrefs.dailyReminder) return false;

      setIsSaving(true);
      try {
        const granted = await requestPermissions();
        if (!granted) {
          if (Platform.OS === 'android') {
            Alert.alert(
              t('common.error'),
              t('notifications.permission_denied') || 
                'Para recibir recordatorios, activa los permisos en Ajustes.'
            );
          }
          return false;
        }

        requestStorePermissions();

        const date = getDateFromTimeString(targetPrefs.reminderTime);
        await scheduleDailyReminder(
          date.getHours(),
          date.getMinutes(),
          t("notifications.daily_reminder.title"),
          t("notifications.daily_reminder.body"),
          {
            channelId: NOTIFICATION_CHANNELS.REMINDERS.id,
            data: {
              screen: ROUTES.MAIN.INDEX, // Redirige al dashboard (donde está el BottomSheet)
              from: 'daily_reminder',
            },
          }
        );

        setScheduledToday();
        return true;
      } catch (e) {
        console.error("[DailyBudget] Error en scheduler:", e);
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [
      requestPermissions,
      requestStorePermissions,
      scheduleDailyReminder,
      setScheduledToday,
      t,
    ],
  );

  // --- updatePreferences (adaptada para usar valores individuales) ---
  const updatePreferences = useCallback(
    async (partialPrefs: Partial<{
      dailyReminder: boolean;
      extremeModeAlert: boolean;
      budgetExceededAlert: boolean;
      reminderTime: string;
    }>) => {
      // Guardar valores anteriores (necesitamos acceder a los actuales)
      const prevDaily = dailyReminder;
      const prevTime = reminderTime;

      // Aplicar cambio optimista
      setPrefs(partialPrefs);

      // Si se desactiva dailyReminder
      if (partialPrefs.dailyReminder === false) {
        await cancelNotificationById(NOTIFICATION_IDS.DAILY_REMINDER);
        return;
      }

      // Si se activa o cambia la hora
      if (partialPrefs.dailyReminder === true || partialPrefs.reminderTime) {
        const newDaily = partialPrefs.dailyReminder ?? prevDaily;
        const newTime = partialPrefs.reminderTime ?? prevTime;
        const success = await handleReschedule({
          dailyReminder: newDaily,
          reminderTime: newTime,
        });

        if (!success && partialPrefs.dailyReminder === true) {
          // Revertir solo dailyReminder
          setPrefs({ dailyReminder: false });
          if (partialPrefs.reminderTime) {
            setPrefs({ reminderTime: prevTime });
          }
        }
      }
    },
    [dailyReminder, reminderTime, setPrefs, cancelNotificationById, handleReschedule],
  );

  // --- Efecto de reprogramación al iniciar (dependencias ajustadas) ---
  useEffect(() => {
    if (!hasHydrated) return;
    const today = getTodayISO();
    if (scheduledDate === today) return;
    if (dailyReminder) {
      handleReschedule({ dailyReminder, reminderTime });
    }
  }, [hasHydrated, dailyReminder, reminderTime, scheduledDate, handleReschedule]);

  // --- API pública ---
  return {
    // Objeto completo (mantenido por si hay código legacy)
    preferences: {
      dailyReminder,
      extremeModeAlert,
      budgetExceededAlert,
      reminderTime,
    },
    // Valores individuales (recomendados para componentes memoizados)
    dailyReminder,
    extremeModeAlert,
    budgetExceededAlert,
    reminderTime,
    // Funciones y estados
    updatePreferences,
    isSaving,
    rescheduleDailyReminder: () => handleReschedule({ dailyReminder, reminderTime }),
  };
};