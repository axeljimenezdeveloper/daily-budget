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
import { VaultState, Transaction } from "./index.types";
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
          language: "es",
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
    }),
    {
      // ------------------------------------------------------------------------
      // CONFIGURACIÓN DE PERSISTENCIA (Zustand + AsyncStorage)
      // ------------------------------------------------------------------------
      name: "vault-storage",
      storage: createJSONStorage(() => AsyncStorage),

      /**
       * Hook que se ejecuta después de rehidratar el estado desde el almacenamiento.
       * Sincroniza el idioma guardado con i18next para que la UI refleje la preferencia persistida.
       *
       * @note Actualmente, i18n.ts inicializa i18next con el idioma del dispositivo,
       *       y luego este callback lo sobrescribe con el idioma guardado.
       *       Esto es intencional para que el usuario pueda cambiar el idioma
       *       y mantenerlo entre sesiones, pero puede generar un breve destello
       *       del idioma del dispositivo antes de aplicar el persistido.
       */
      onRehydrateStorage: (state) => {
        return (rehydratedState) => {
          if (rehydratedState?.language) {
            i18next.changeLanguage(rehydratedState.language);
          }
        };
      },
    }
  )
);