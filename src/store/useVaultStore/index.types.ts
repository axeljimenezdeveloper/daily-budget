// ============================================================================
// TIPOS Y CONTRATOS DEL STORE GLOBAL (useVaultStore)
//
// Este archivo centraliza todas las definiciones TypeScript relacionadas con
// el estado de la bóveda, las transacciones y las acciones disponibles.
// Sirve como contrato único para garantizar consistencia en toda la aplicación.
// ============================================================================

// ----------------------------------------------------------------------------
// ENTIDADES PRINCIPALES
// ----------------------------------------------------------------------------

/**
 * Representa un movimiento (gasto) registrado en la bóveda.
 */
export interface Transaction {
  /** Identificador único (timestamp en string) */
  id: string;
  /** Monto positivo del gasto (siempre se resta del presupuesto) */
  amount: number;
  /** Fecha ISO 8601 en que se registró el gasto */
  date: string;
  /** Categoría del gasto (Ej. "Vital", "Lujo" o traducciones equivalentes) */
  category: string;
  /** Nota opcional ingresada por el usuario */
  note?: string;
}

/**
 * Resumen calculado del estado actual de la bóveda.
 * Se obtiene a través de la acción `getSummary()`.
 */
export interface VaultSummary {
  /** Total gastado hasta el momento (presupuesto inicial - restante) */
  totalSpent: number;
  /** Días transcurridos desde la configuración (mínimo 1) */
  daysPassed: number;
  /** Indica si se ha excedido el presupuesto total (restante negativo) */
  isOverBudget: boolean;
  /** Gasto promedio diario (total gastado / días transcurridos) */
  dailyAverage: number;
}

// ----------------------------------------------------------------------------
// PREFERENCIAS DE NOTIFICACIÓN
// ----------------------------------------------------------------------------

/**
 * Configuración de notificaciones locales del usuario.
 * Se almacena en el store persistido y se utiliza para programar
 * recordatorios y alertas relacionadas con el control de gasto.
 */
export interface NotificationPreferences {
  /** Activa el recordatorio diario para registrar gastos */
  dailyReminder: boolean;
  /** Activa la alerta cuando se activa el modo cuidado (extreme mode) */
  extremeModeAlert: boolean;
  /** Activa la alerta cuando el presupuesto restante es negativo */
  budgetExceededAlert: boolean;
  /**
   * Hora del recordatorio diario en formato HH:mm (24h).
   * @default "20:00"
   */
  reminderTime: string;
}

// ----------------------------------------------------------------------------
// ESTADO GLOBAL Y ACCIONES
// ----------------------------------------------------------------------------

/**
 * Interface completa del store de la bóveda.
 * Combina el estado persistido y las acciones para modificarlo.
 */
export interface VaultState {
  // --- Estado ---
  /** Indica si la bóveda ya fue inicializada (setup completado) */
  isConfigured: boolean;
  /** Marca que el usuario completó onboarding + setup */
  hasFinishedOnboarding: boolean;
  /**
   * Modo "cuidado" – se activa cuando el ritmo de gasto supera el 20% del ideal
   * o cuando el presupuesto restante es negativo.
   * @see checkExtremeMode en index.utils.ts
   */
  isExtremeMode: boolean;
  /** Presupuesto total inicial (configurado en setup) */
  totalBudget: number;
  /** Presupuesto restante después de restar gastos */
  remainingBudget: number;
  /** Historial de gastos (ordenado de más reciente a más antiguo) */
  transactions: Transaction[];
  /** Duración del período en días (configurado en setup) */
  daysDuration: number;
  /** Fecha ISO en que se ejecutó initVault (inicio del período) */
  startDate: string | null;
  /** Símbolo de la moneda (ej. "$", "Bs", "€") */
  currency: string;
  /** Código de idioma activo ('es' | 'en') */
  language: string;

  /** 
   * Indica si el store ya fue rehidratado desde AsyncStorage.
   * Se usa para evitar ejecutar efectos antes de que las preferencias
   * persistidas estén disponibles.
   */
  _hasHydrated: boolean;

  // --- Preferencias de seguridad ---
  /**
   * Indica si el usuario ha activado la autenticación biométrica (huella dactilar)
   * para proteger el acceso a la aplicación.
   * @default false
   */
  isBiometricEnabled: boolean;

  // --- Notificaciones ---
  /** Preferencias actuales de notificaciones del usuario */
  notificationPreferences: NotificationPreferences;
  /**
   * Fecha (YYYY-MM-DD) de la última vez que se programó el recordatorio diario.
   * Se usa para evitar reprogramaciones innecesarias.
   */
  notificationsScheduledForDate: string | null;
  /** Indica si ya se solicitó permiso de notificaciones en esta sesión/instalación */
  hasRequestedPermissions: boolean;

  // --- Acciones ---
  /** Marca el onboarding como completado (se ejecuta al finalizar setup) */
  setFinishedOnboarding: () => void;
  /**
   * Inicializa la bóveda con los datos del setup.
   * @param amount - Presupuesto total (número positivo)
   * @param days - Duración del período en días
   * @param currency - Símbolo de la moneda
   */
  initVault: (amount: number, days: number, currency: string) => void;
  /**
   * Registra un gasto, actualiza remainingBudget y recalcula isExtremeMode.
   * @param amount - Monto del gasto (debe ser positivo)
   * @param category - Categoría (generalmente "Vital" o "Lujo")
   * @param note - Nota opcional
   */
  addTransaction: (amount: number, category: string, note?: string) => void;
  /** Reinicia la bóveda al estado inicial y fuerza el idioma a español */
  resetVault: () => void;
  /**
   * Calcula y retorna un resumen derivado del estado actual.
   * @returns VaultSummary con total gastado, días transcurridos, etc.
   */
  getSummary: () => VaultSummary;
  /**
   * Cambia el idioma de la aplicación.
   * Actualiza el store y sincroniza i18next.
   * @param lang - Código de idioma ('es' | 'en')
   */
  setLanguage: (lang: string) => void;

  // --- Acciones de Notificaciones ---
  /**
   * Actualiza parcialmente las preferencias de notificación.
   * Las claves no provistas conservan su valor actual.
   * @param prefs - Objeto parcial con las preferencias a modificar.
   */
  setNotificationPreferences: (prefs: Partial<NotificationPreferences>) => void;

  /**
   * Marca que ya se solicitaron permisos de notificaciones.
   * No ejecuta la solicitud real; solo actualiza el flag del store.
   */
  requestNotificationPermissions: () => void;

  /**
   * Registra la fecha actual como la última vez que se programó
   * el recordatorio diario. Útil para evitar reprogramar en el mismo día.
   */
  setNotificationsScheduledForToday: () => void;

  /**
   * Reinicia el flag de programación diaria (útil al cambiar la hora o al resetear).
   */
  clearNotificationsScheduledFlag: () => void;

  // --- Acciones de Seguridad ---
  /**
   * Activa o desactiva la preferencia de bloqueo biométrico.
   * @param enabled - true para activar, false para desactivar
   */
  setBiometricEnabled: (enabled: boolean) => void;
}