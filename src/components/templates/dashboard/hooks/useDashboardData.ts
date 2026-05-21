// ============================================================================
// HOOK PERSONALIZADO: useDashboardData
// ============================================================================
// Proporciona todos los datos derivados necesarios para el dashboard principal.
// - Consume el store useVaultStore con selectores finos.
// - Memoiza cálculos como días restantes, porcentaje de progreso, ideal hoy,
//   gasto de hoy y transacciones recientes.
// - Utiliza useShallow para obtener el resumen (getSummary) y evitar re-renders
//   innecesarios si el objeto no cambia profundamente.
// ============================================================================

import { useMemo } from 'react';
import { useVaultStore } from '@/store/useVaultStore';
import { useShallow } from 'zustand/react/shallow';

/**
 * Hook personalizado que encapsula toda la lógica de datos para el dashboard.
 *
 * @returns {Object} Objeto con los siguientes campos:
 *   - totalBudget: number – Presupuesto total inicial.
 *   - remainingBudget: number – Presupuesto restante.
 *   - daysDuration: number – Duración total del período en días.
 *   - isExtremeMode: boolean – Indica si el modo cuidado está activo.
 *   - currency: string – Símbolo de la moneda.
 *   - hasHydrated: boolean – Flag de hidratación del store.
 *   - summary: VaultSummary – Resumen (totalSpent, daysPassed, isOverBudget, dailyAverage).
 *   - remainingDays: number – Días que quedan (mínimo 0).
 *   - progressPercent: number – Porcentaje gastado (0-100).
 *   - recentTransactions: Transaction[] – Últimas 3 transacciones.
 *   - idealToday: number – Presupuesto ideal para hoy (remainingBudget / remainingDays).
 *   - todaySpent: number – Total gastado en el día de hoy.
 *   - originalIdeal: number – Ideal diario original (totalBudget / daysDuration).
 *   - spentDeviation: number – Diferencia entre gastado hoy y el ideal original (todaySpent - originalIdeal).
 *   - adjustedDaily: number – Alias de idealToday, representa el presupuesto diario ajustado.
 *   - transactions: Transaction[] – Lista completa de transacciones (para el gráfico).
 */
export const useDashboardData = () => {
  const totalBudget = useVaultStore((state) => state.totalBudget);
  const remainingBudget = useVaultStore((state) => state.remainingBudget);
  const daysDuration = useVaultStore((state) => state.daysDuration);
  const isExtremeMode = useVaultStore((state) => state.isExtremeMode);
  const currency = useVaultStore((state) => state.currency);
  const transactions = useVaultStore((state) => state.transactions); // ✅ Añadido
  const hasHydrated = useVaultStore((state) => state._hasHydrated);

  const summary = useVaultStore(
    useShallow((state) => state.getSummary())
  );

  const remainingDays = useMemo(() => {
    return Math.max(0, daysDuration - summary.daysPassed);
  }, [daysDuration, summary.daysPassed]);

  const progressPercent = useMemo(() => {
    if (totalBudget === 0) return 0;
    const spent = totalBudget - remainingBudget;
    return (spent / totalBudget) * 100;
  }, [totalBudget, remainingBudget]);

  const idealToday = useMemo(() => {
    if (remainingDays <= 0) return remainingBudget;
    return remainingBudget / remainingDays;
  }, [remainingBudget, remainingDays]);

  // Gasto de hoy
  const todaySpent = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return transactions
      .filter((tx) => tx.date.startsWith(today))
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 3);
  }, [transactions]);

  // Nuevos campos derivados para la UI mejorada
  const originalIdeal = useMemo(() => {
    if (daysDuration <= 0) return 0;
    return totalBudget / daysDuration;
  }, [totalBudget, daysDuration]);

  const spentDeviation = useMemo(() => {
    return todaySpent - originalIdeal;
  }, [todaySpent, originalIdeal]);

  const adjustedDaily = idealToday; // Alias semántico

  return {
    totalBudget,
    remainingBudget,
    daysDuration,
    isExtremeMode,
    currency,
    hasHydrated,
    summary,
    remainingDays,
    progressPercent,
    recentTransactions,
    idealToday,
    todaySpent,
    originalIdeal,
    spentDeviation,
    adjustedDaily,
    transactions, // ✅ Añadido al retorno
  };
};