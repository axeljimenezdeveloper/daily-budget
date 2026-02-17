// ============================================================================
// HOOK PERSONALIZADO: useNotificationScheduler (ACTUALIZADO)
// ============================================================================

import { useEffect, useRef, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import {
  NOTIFICATION_CHANNELS,
  NOTIFICATION_DEBOUNCE_MS,
  NOTIFICATION_IDS,
} from '../constants';

export const useNotificationScheduler = () => {
  const lastNotificationTimesRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (Platform.OS === 'android') {
      const channels = Object.values(NOTIFICATION_CHANNELS);
      channels.forEach((channel) => {
        Notifications.setNotificationChannelAsync(channel.id, {
          name: channel.name,
          description: channel.description,
          importance: channel.importance,
          sound: 'default',
        });
      });
    }
  }, []);

  const getPermissionsStatus = useCallback(async (): Promise<'granted' | 'denied' | 'undetermined'> => {
    const { status } = await Notifications.getPermissionsAsync();
    return status as 'granted' | 'denied' | 'undetermined';
  }, []);

  const requestPermissions = useCallback(async (): Promise<boolean> => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }, []);

  // --------------------------------------------------------------------------
  // PROGRAMAR RECORDATORIO DIARIO (con datos de navegación)
  // --------------------------------------------------------------------------
  const scheduleDailyReminder = useCallback(
    async (
      hour: number,
      minute: number,
      title: string,
      body: string,
      options?: { channelId?: string; data?: Record<string, unknown> }
    ) => {
      await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_IDS.DAILY_REMINDER);

      await Notifications.scheduleNotificationAsync({
        identifier: NOTIFICATION_IDS.DAILY_REMINDER,
        content: {
          title,
          body,
          sound: 'default',
          data: options?.data, // ← NUEVO: datos de navegación
          ...(options?.channelId && Platform.OS === 'android' ? { channelId: options.channelId } : {}),
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour,
          minute,
        },
      });
    },
    []
  );

  // --------------------------------------------------------------------------
  // PROGRAMAR NOTIFICACIÓN DE UNA SOLA VEZ (con datos de navegación)
  // --------------------------------------------------------------------------
  const scheduleOneTimeNotification = useCallback(
    async (
      identifier: string,
      seconds: number,
      title: string,
      body: string,
      channelId?: string,
      data?: Record<string, unknown> // ← ya existía, lo mantenemos
    ) => {
      const lastTime = lastNotificationTimesRef.current.get(identifier) ?? 0;
      const now = Date.now();

      if (now - lastTime < NOTIFICATION_DEBOUNCE_MS) {
        return;
      }

      lastNotificationTimesRef.current.set(identifier, now);

      await Notifications.scheduleNotificationAsync({
        identifier,
        content: {
          title,
          body,
          data,
          sound: 'default',
          ...(channelId && Platform.OS === 'android' ? { channelId } : {}),
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds,
        },
      });
    },
    []
  );

  const cancelAllNotifications = useCallback(async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    lastNotificationTimesRef.current.clear();
  }, []);

  const cancelNotificationById = useCallback(async (identifier: string) => {
    await Notifications.cancelScheduledNotificationAsync(identifier);
    lastNotificationTimesRef.current.delete(identifier);
  }, []);

  return {
    getPermissionsStatus,
    requestPermissions,
    scheduleDailyReminder,
    scheduleOneTimeNotification,
    cancelAllNotifications,
    cancelNotificationById,
  };
};