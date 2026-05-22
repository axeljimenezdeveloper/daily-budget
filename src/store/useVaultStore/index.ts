// ============================================================================
// STORE GLOBAL: useVaultStore
//
// Administra el estado de la bóveda del usuario usando Zustand con persistencia.
// - Almacena presupuesto, transacciones, configuración y preferencias.
// - Persiste automáticamente en AsyncStorage (clave: "vault-storage").
// - Sincroniza el idioma con i18next al rehidratar y al cambiar.
// - Aplica migraciones automáticas cuando la versión del store es inferior.
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
import { CURRENT_STORE_VERSION } from "@/constants/app";
import { migrations } from "./migrations";

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
      language: "es", // ← MEJORA: el tipo ahora es 'es' | 'en' (se reflejará en types)

      // --- Flag de rehidratación y versión del store ---
      _hasHydrated: false,
      _storeVersion: 0,

      // --- Preferencias de seguridad ---
      isBiometricEnabled: false,

      // --- Estado inicial de notificaciones ---
      notificationPreferences: {
        dailyReminder: true,
        extremeModeAlert: true,
        budgetExceededAlert: true,
        reminderTime: "20:00",
        hapticFeedback: true,
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
      initVault: (amount, days, currency) => {
        // ← MEJORA: validar que amount y days sean números positivos
        if (amount <= 0 || days <= 0) {
          console.warn('[Vulpis] initVault: amount y days deben ser positivos');
          return; // No actualizamos el estado
        }
        set({
          totalBudget: amount,
          remainingBudget: amount,
          daysDuration: days,
          currency: currency,
          startDate: new Date().toISOString(),
          transactions: [],
          isConfigured: true,
          isExtremeMode: false,
        });
      },

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
          // ← MEJORA: validar que amount sea positivo
          if (amount <= 0) {
            console.warn('[Vulpis] addTransaction: amount debe ser positivo');
            return state; // No hay cambios
          }

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
       * Elimina una transacción por su ID.
       * - Restaura el monto al presupuesto restante.
       * - Recalcula el modo cuidado (isExtremeMode) con los nuevos valores.
       *
       * @param id - Identificador de la transacción a eliminar
       */
      deleteTransaction: (id) =>
        set((state) => {
          const transactionToDelete = state.transactions.find((t) => t.id === id);
          if (!transactionToDelete) {
            console.warn('[Vulpis] deleteTransaction: transacción no encontrada', id);
            return state;
          }

          const newRemaining = state.remainingBudget + transactionToDelete.amount;
          const newTransactions = state.transactions.filter((t) => t.id !== id);

          const shouldBeExtreme = checkExtremeMode(
            state.totalBudget,
            newRemaining,
            state.daysDuration,
            state.startDate
          );

          return {
            remainingBudget: newRemaining,
            transactions: newTransactions,
            isExtremeMode: shouldBeExtreme,
          };
        }),

      /**
       * Actualiza una transacción existente.
       * - Ajusta el presupuesto restante según la diferencia de monto.
       * - Reemplaza la transacción en el array (manteniendo el orden original).
       * - Recalcula el modo cuidado (isExtremeMode) con los nuevos valores.
       *
       * @param id      - Identificador de la transacción a actualizar
       * @param updates - Objeto parcial con los campos a modificar (amount, category, note)
       */
      updateTransaction: (id, updates) =>
        set((state) => {
          // Buscar la transacción original
          const oldTransaction = state.transactions.find((t) => t.id === id);
          if (!oldTransaction) {
            console.warn('[Vulpis] updateTransaction: transacción no encontrada', id);
            return state;
          }

          // Construir la nueva transacción (fusionar cambios)
          const updatedTransaction: Transaction = {
            ...oldTransaction,
            ...updates,
          };

          // Calcular la diferencia de monto (nuevo - antiguo)
          const amountDiff = updatedTransaction.amount - oldTransaction.amount;

          // Actualizar el presupuesto restante (restar la diferencia positiva, sumar si es negativa)
          const newRemaining = state.remainingBudget - amountDiff;

          // Reemplazar la transacción en el array (manteniendo la posición)
          const newTransactions = state.transactions.map((t) =>
            t.id === id ? updatedTransaction : t
          );

          // Recalcular el modo cuidado
          const shouldBeExtreme = checkExtremeMode(
            state.totalBudget,
            newRemaining,
            state.daysDuration,
            state.startDate
          );

          return {
            remainingBudget: newRemaining,
            transactions: newTransactions,
            isExtremeMode: shouldBeExtreme,
          };
        }),

      /**
       * Reinicia completamente la bóveda al estado inicial.
       * - Fuerza el idioma a español (i18next y store).
       * - Limpia presupuesto, transacciones y fechas.
       * - Restaura las preferencias de notificación a sus valores por defecto.
       * - Establece hasFinishedOnboarding a false para que el usuario vuelva al onboarding.
       * - Establece la versión del store a la actual.
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
          hasFinishedOnboarding: false,
          language: "es",
          currency: "$",
          _hasHydrated: true,
          _storeVersion: CURRENT_STORE_VERSION,
          isBiometricEnabled: false,
          notificationPreferences: {
            dailyReminder: true,
            extremeModeAlert: true,
            budgetExceededAlert: true,
            reminderTime: "20:00",
            hapticFeedback: true,
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
       */
      setLanguage: (lang) => {
        // ← MEJORA: podríamos validar que lang sea 'es' o 'en', pero el tipo ya lo restringe
        i18next.changeLanguage(lang);
        set({ language: lang });
      },

      // ----------------------------------------------------------------------
      // RESTAURACIÓN DESDE BACKUP
      // ----------------------------------------------------------------------
      /**
       * Restaura completamente el estado de la bóveda.
       * Se asume que los datos ya han sido validados y descifrados.
       * @param data - Estado completo de la bóveda
       */
      restoreFromBackup: (data) => {
        // Sincronizar idioma con i18next
        if (data.language) {
          i18next.changeLanguage(data.language);
        }
        set({
          ...data,
          _hasHydrated: true,
          _storeVersion: CURRENT_STORE_VERSION,
        });
      },

      // --- Acciones de Notificaciones ---

      setNotificationPreferences: (prefs) =>
        set((state) => ({
          notificationPreferences: {
            ...state.notificationPreferences,
            ...prefs,
          },
        })),

      requestNotificationPermissions: () =>
        set({ hasRequestedPermissions: true }),

      setNotificationsScheduledForToday: () => {
        const today = new Date().toISOString().split('T')[0];
        set({ notificationsScheduledForDate: today });
      },

      clearNotificationsScheduledFlag: () =>
        set({ notificationsScheduledForDate: null }),

      // --- Acciones de Seguridad ---
      setBiometricEnabled: (enabled) => set({ isBiometricEnabled: enabled }),
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
       *       1. Aplicar migraciones si la versión almacenada es inferior.
       *       2. Sincronizar el idioma persistido con i18next.
       *       3. Marcar que el store ya fue hidratado (_hasHydrated = true).
       */
      onRehydrateStorage: (preState) => {
        // Esta función se ejecuta ANTES de rehidratar
        return (rehydratedState, error) => {
          if (error) {
            console.warn('[Vulpis] Error al rehidratar store:', error);
            // Marcamos como hidratado para no bloquear la UI, aunque haya error
            useVaultStore.setState({ _hasHydrated: true, _storeVersion: CURRENT_STORE_VERSION });
            return;
          }

          let finalState: any;

          if (!rehydratedState) {
            // Primera ejecución (sin datos guardados) → usar estado inicial con versión actual
            finalState = {
              ...preState,
              _storeVersion: CURRENT_STORE_VERSION,
              _hasHydrated: true,
            };
          } else {
            // Fusionamos el estado inicial con los datos persistidos
            const merged = { ...preState, ...rehydratedState };
            const storedVersion = merged._storeVersion ?? 0; // Si no existe, es v0

            if (storedVersion < CURRENT_STORE_VERSION) {
              // Aplicar migraciones secuenciales
              let migrated = merged;
              for (let v = storedVersion; v < CURRENT_STORE_VERSION; v++) {
                const migrateFn = migrations[v];
                if (!migrateFn) {
                  console.warn(`[Vulpis] Migración no encontrada para v${v} → v${v+1}`);
                  break;
                }
                migrated = migrateFn(migrated);
              }
              finalState = {
                ...migrated,
                _storeVersion: CURRENT_STORE_VERSION,
                _hasHydrated: true,
              };
            } else {
              // Ya está en versión actual (o superior) → solo aseguramos la versión y el flag
              finalState = {
                ...merged,
                _storeVersion: CURRENT_STORE_VERSION,
                _hasHydrated: true,
              };
            }
          }

          // Aplicar idioma persistido (si existe) después de la migración
          if (finalState.language) {
            i18next.changeLanguage(finalState.language);
          }

          // Actualizamos el store con el estado final (sobrescribe lo que haya puesto persist automáticamente)
          useVaultStore.setState(finalState);
        };
      },
    }
  )
);