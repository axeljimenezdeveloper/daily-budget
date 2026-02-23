// ============================================================================
// CONSTANTES DEL SISTEMA DE NOTIFICACIONES
//
// Centraliza identificadores, canales, tiempos y configuraciones utilizadas
// por los hooks y componentes de notificaciones. Facilita el mantenimiento
// y evita strings mágicos en el código.
// ============================================================================

import { AndroidImportance } from 'expo-notifications';

// ----------------------------------------------------------------------------
// IDENTIFICADORES DE NOTIFICACIONES (para cancelación selectiva)
// ----------------------------------------------------------------------------

export const NOTIFICATION_IDS = {
  /** Identificador único para el recordatorio diario */
  DAILY_REMINDER: 'vulpis-days.daily_reminder',
  /** Identificador para la alerta de modo cuidado */
  EXTREME_MODE_ALERT: 'vulpis-days.extreme_mode_alert',
  /** Identificador para la alerta de presupuesto excedido */
  BUDGET_EXCEEDED_ALERT: 'vulpis-days.budget_exceeded_alert',
} as const;

// ----------------------------------------------------------------------------
// CANALES DE NOTIFICACIÓN (Android)
// ----------------------------------------------------------------------------

export const NOTIFICATION_CHANNELS = {
  /** Canal para recordatorios programados */
  REMINDERS: {
    id: 'vulpis-days_reminders',
    name: 'Recordatorios',
    description: 'Recordatorios diarios para registrar tus gastos',
    importance: AndroidImportance.HIGH, // Nivel de prioridad en Android
  },
  /** Canal para alertas de estado (modo cuidado, presupuesto) */
  ALERTS: {
    id: 'vulpis-days_alerts',
    name: 'Alertas',
    description: 'Alertas cuando tu presupuesto requiere atención',
    importance: AndroidImportance.HIGH,
  },
} as const;

// ----------------------------------------------------------------------------
// CONFIGURACIÓN DE SONIDO Y COMPORTAMIENTO
// ----------------------------------------------------------------------------

export const NOTIFICATION_SOUND = {
  /** Sonido por defecto (usar null para silencio, 'default' para el sistema) */
  DEFAULT: 'default',
  /** Sin sonido */
  SILENT: null,
} as const;

// ----------------------------------------------------------------------------
// TIEMPOS POR DEFECTO
// ----------------------------------------------------------------------------

/** Hora por defecto para el recordatorio diario (20:00) */
export const DEFAULT_REMINDER_TIME = '20:00';

/** Duración mínima para evitar spam de notificaciones (milisegundos) */
export const NOTIFICATION_DEBOUNCE_MS = 5000;