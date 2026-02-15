// ============================================================================
// STORE GLOBAL: useVaultStore
//
// Administra el estado de la bóveda del usuario usando Zustand con persistencia.
// - Almacena presupuesto, transacciones, configuración y preferencias.
// - Persiste automáticamente en AsyncStorage (clave: "vault-storage").
// - Sincroniza el idioma con i18next al rehidratar y al cambiar.
//
// Flujo de uso típico:
//   1. setup-duration.tsx → initVault() + setFinishedOnboarding()
//   2. add-expense (futuro) → addTransaction()
//   3. Dashboard (futuro)   → getSummary(), isExtremeMode, etc.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";

// ----------------------------------------------------------------------------
// TIPOS Y UTILIDADES LOCALES
// ----------------------------------------------------------------------------
import { VaultState, Transaction, NotificationPreferences } from "./index.types";
import { calculateDaysPassed, checkExtremeMode } from "./index.utils";

// ----------------------------------------------------------------------------
// IMPLEMENTACIÓN DEL STORE CON PERSISTENCIA
// ----------------------------------------------------------------------------
export const useVaultStore = create<VaultState>()(
  persist(
    (set, get) => ({
      // --- Estado inicial (valores por defecto) ---
      totalBudget: 0,
      remainingBudget: 0,
      transactions: [],
      daysDuration: 0,
      startDate: null,
      isConfigured: false,
      hasFinishedOnboarding: false,
      isExtremeMode: false,
      currency: "$",
      language: "es",

      // --- Flag de rehidratación ---
      _hasHydrated: false,

      // --- Estado inicial de notificaciones ---
      notificationPreferences: {
        dailyReminder: true,
        extremeModeAlert: true,
        budgetExceededAlert: true,
        reminderTime: "20:00",
      },
      notificationsScheduledForDate: null,
      hasRequestedPermissions: false,

      // --- Acciones ---

      /**
       * Marca el flujo de onboarding como completado.
       * Se ejecuta desde setup-duration.tsx después de initVault.
       */
      setFinishedOnboarding: () => set({ hasFinishedOnboarding: true }),

      /**
       * Inicializa la bóveda con los parámetros definidos por el usuario.
       * Resetea transacciones, establece la fecha de inicio y desactiva el modo cuidado.
       *
       * @param amount  - Presupuesto total (número positivo)
       * @param days    - Duración del período en días
       * @param currency - Símbolo de la moneda (ej. "$", "Bs")
       */
      initVault: (amount, days, currency) =>
        set({
          totalBudget: amount,
          remainingBudget: amount,
          daysDuration: days,
          currency: currency,
          startDate: new Date().toISOString(),
          transactions: [],
          isConfigured: true,
          isExtremeMode: false, // Se recalculará en el primer addTransaction
        }),

      /**
       * Registra un gasto, resta del presupuesto y actualiza el modo cuidado.
       * Las transacciones se agregan al inicio del array (más reciente primero).
       *
       * @param amount   - Monto del gasto (debe ser positivo)
       * @param category - Categoría ("Vital", "Lujo", etc.)
       * @param note     - Nota opcional
       */
      addTransaction: (amount, category, note) =>
        set((state) => {
          const newTransaction: Transaction = {
            id: Date.now().toString(),
            amount,
            category,
            note,
            date: new Date().toISOString(),
          };

          const newRemaining = state.remainingBudget - amount;

          const shouldBeExtreme = checkExtremeMode(
            state.totalBudget,
            newRemaining,
            state.daysDuration,
            state.startDate
          );

          return {
            remainingBudget: newRemaining,
            transactions: [newTransaction, ...state.transactions],
            isExtremeMode: shouldBeExtreme,
          };
        }),

      /**
       * Reinicia completamente la bóveda al estado inicial.
       * - Fuerza el idioma a español (i18next y store).
       * - Limpia presupuesto, transacciones y fechas.
       * - Restaura las preferencias de notificación a sus valores por defecto.
       * - Establece hasFinishedOnboarding a false para que el usuario vuelva al onboarding.
       *
       * @note Esta acción es utilizada actualmente en test-store.tsx y debug-reset.tsx
       */
      resetVault: () => {
        i18next.changeLanguage("es");
        set({
          totalBudget: 0,
          remainingBudget: 0,
          transactions: [],
          daysDuration: 0,
          startDate: null,
          isConfigured: false,
          isExtremeMode: false,
          hasFinishedOnboarding: false,   // ← AHORA SE REINICIA CORRECTAMENTE
          language: "es",
          currency: "$",                   // ← Moneda por defecto
          _hasHydrated: true,              // Se mantiene en true tras reset, ya fue hidratado
          // Reiniciar estado de notificaciones
          notificationPreferences: {
            dailyReminder: true,
            extremeModeAlert: true,
            budgetExceededAlert: true,
            reminderTime: "20:00",
          },
          notificationsScheduledForDate: null,
          hasRequestedPermissions: false,
        });
      },

      /**
       * Calcula un resumen derivado del estado actual.
       * - totalSpent: presupuesto inicial - restante
       * - daysPassed: días transcurridos desde startDate
       * - isOverBudget: si remainingBudget es negativo
       * - dailyAverage: gasto total / días transcurridos
       *
       * @returns VaultSummary
       *
       * @todo Optimizar con memoización (useSelector o createSelector) si se usa frecuentemente.
       */
      getSummary: () => {
        const state = get();
        const totalSpent = state.totalBudget - state.remainingBudget;
        const daysPassed = calculateDaysPassed(state.startDate);

        return {
          totalSpent,
          daysPassed,
          isOverBudget: state.remainingBudget < 0,
          dailyAverage: totalSpent / daysPassed,
        };
      },

      /**
       * Cambia el idioma de la aplicación.
       * - Actualiza i18next (inmediato)
       * - Persiste la preferencia en el store
       *
       * @param lang - Código de idioma ('es' | 'en')
       *
       * @note i18n.ts fuerza el idioma del dispositivo al inicio, sobrescribiendo
       *       el valor persistido. Esto puede causar desincronización momentánea.
       * @see i18n.ts – detección de idioma del dispositivo
       */
      setLanguage: (lang) => {
        i18next.changeLanguage(lang);
        set({ language: lang });
      },

      // --- Acciones de Notificaciones ---

      /**
       * Actualiza parcialmente las preferencias de notificación.
       * Conserva las claves no especificadas.
       */
      setNotificationPreferences: (prefs) =>
        set((state) => ({
          notificationPreferences: {
            ...state.notificationPreferences,
            ...prefs,
          },
        })),

      /**
       * Marca que ya se solicitaron permisos de notificaciones.
       * No ejecuta la solicitud real (eso se hace desde los hooks).
       */
      requestNotificationPermissions: () =>
        set({ hasRequestedPermissions: true }),

      /**
       * Establece la fecha de hoy como la última vez que se programó
       * el recordatorio diario. El formato es YYYY-MM-DD.
       */
      setNotificationsScheduledForToday: () => {
        const today = new Date().toISOString().split('T')[0];
        set({ notificationsScheduledForDate: today });
      },

      /**
       * Limpia el flag de programación diaria.
       * Útil cuando el usuario cambia la hora del recordatorio
       * o cuando se resetea la bóveda.
       */
      clearNotificationsScheduledFlag: () =>
        set({ notificationsScheduledForDate: null }),
    }),
    {
      // ------------------------------------------------------------------------
      // CONFIGURACIÓN DE PERSISTENCIA (Zustand + AsyncStorage)
      // ------------------------------------------------------------------------
      name: "vault-storage",
      storage: createJSONStorage(() => AsyncStorage),

      /**
       * Hook que se ejecuta durante la rehidratación.
       * - Se llama antes de la rehidratación (función externa)
       * - Luego, después de rehidratar, se ejecuta el callback interno
       *
       * @note Se utiliza para:
       *       1. Manejar errores de rehidratación.
       *       2. Sincronizar el idioma persistido con i18next.
       *       3. Marcar que el store ya fue hidratado (_hasHydrated = true).
       */
      onRehydrateStorage: (state) => {
        // Esta función se ejecuta ANTES de rehidratar
        return (rehydratedState, error) => {
          if (error) {
            console.warn('[SURV] Error al rehidratar store:', error);
          }
          if (rehydratedState) {
            // Aplicamos el idioma persistido (ya existente)
            if (rehydratedState.language) {
              i18next.changeLanguage(rehydratedState.language);
            }
            // ✅ Marcamos que la rehidratación terminó
            useVaultStore.setState({ _hasHydrated: true });
          }
        };
      },
    }
  )
);