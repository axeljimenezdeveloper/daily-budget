// ============================================================================
// HOOK PERSONALIZADO: useDashboardData (con idealToday y todaySpent)
// ============================================================================

import { useMemo } from 'react';
import { useVaultStore } from '@/store/useVaultStore';
import { useShallow } from 'zustand/react/shallow';

export const useDashboardData = () => {
  const totalBudget = useVaultStore((state) => state.totalBudget);
  const remainingBudget = useVaultStore((state) => state.remainingBudget);
  const daysDuration = useVaultStore((state) => state.daysDuration);
  const isExtremeMode = useVaultStore((state) => state.isExtremeMode);
  const currency = useVaultStore((state) => state.currency);
  const transactions = useVaultStore((state) => state.transactions);
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
    todaySpent, // <-- nuevo campo
  };
};