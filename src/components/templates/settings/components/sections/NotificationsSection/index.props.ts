// ============================================================================
// PROPS DE LA SECCIÓN DE NOTIFICACIONES (NotificationsSection)
//
// Define las propiedades que recibe el componente NotificationsSection para
// gestionar todas las opciones relacionadas con notificaciones.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - NotificationsSectionProps
// ----------------------------------------------------------------------------

/**
 * Props del componente NotificationsSection.
 *
 * @property dailyReminder        - Indica si el recordatorio diario está activado.
 * @property extremeModeAlert     - Indica si la alerta de modo cuidado está activada.
 * @property budgetExceededAlert  - Indica si la alerta de presupuesto excedido está activada.
 * @property reminderTime         - Hora del recordatorio diario en formato HH:mm.
 * @property isSaving             - Estado de carga durante la actualización de preferencias.
 * @property onDailyReminderChange - Callback al cambiar el switch de recordatorio diario.
 * @property onExtremeAlertChange  - Callback al cambiar el switch de alerta de modo cuidado.
 * @property onBudgetExceededChange - Callback al cambiar el switch de alerta de presupuesto excedido.
 * @property onReminderTimeChange   - Callback al cambiar la hora del recordatorio.
 * @property onTestNotification     - Callback al presionar el botón de notificación de prueba.
 */
export interface NotificationsSectionProps {
  dailyReminder: boolean;
  extremeModeAlert: boolean;
  budgetExceededAlert: boolean;
  reminderTime: string;
  isSaving: boolean;
  onDailyReminderChange: (value: boolean) => void;
  onExtremeAlertChange: (value: boolean) => void;
  onBudgetExceededChange: (value: boolean) => void;
  onReminderTimeChange: (time: string) => void;
  onTestNotification: () => void;
}