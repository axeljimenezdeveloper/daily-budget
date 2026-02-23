// ============================================================================
// HOOK PERSONALIZADO: useDashboardData
//
// Encapsula la suscripción al store global (useVaultStore) para la pantalla
// principal (dashboard). Proporciona todos los datos necesarios de forma
// optimizada, evitando re-renders innecesarios mediante selectores finos
// y memoización.
//
// Responsabilidades:
// - Obtener valores primitivos del store (totalBudget, currency, etc.)
// - Obtener el resumen calculado (getSummary) y estabilizarlo con useShallow
// - Calcular valores derivados como remainingDays y progressPercent
// - Devolver las últimas 3 transacciones para la sección de rastros recientes
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import { useMemo } from 'react';
import { useVaultStore } from '@/store/useVaultStore';
import { useShallow } from 'zustand/react/shallow';

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------
export const useDashboardData = () => {
  // --------------------------------------------------------------------------
  // SELECTORES INDIVIDUALES (valores primitivos)
  // --------------------------------------------------------------------------
  // Cada selector escucha únicamente cambios en la propiedad específica,
  // minimizando la cantidad de re-renders.
  const totalBudget = useVaultStore((state) => state.totalBudget);
  const remainingBudget = useVaultStore((state) => state.remainingBudget);
  const daysDuration = useVaultStore((state) => state.daysDuration);
  const isExtremeMode = useVaultStore((state) => state.isExtremeMode);
  const currency = useVaultStore((state) => state.currency);
  const transactions = useVaultStore((state) => state.transactions);
  const hasHydrated = useVaultStore((state) => state._hasHydrated);

  // --------------------------------------------------------------------------
  // RESUMEN CALCULADO (getSummary)
  // --------------------------------------------------------------------------
  // Usamos useShallow para comparar superficialmente el objeto retornado.
  // Así solo provocará re-render si alguna de sus propiedades (totalSpent,
  // daysPassed, etc.) cambia realmente.
  const summary = useVaultStore(
    useShallow((state) => state.getSummary())
  );

  // --------------------------------------------------------------------------
  // VALORES DERIVADOS (memoizados)
  // --------------------------------------------------------------------------
  const remainingDays = useMemo(() => {
    // Días de tranquilidad restantes (nunca negativo)
    return Math.max(0, daysDuration - summary.daysPassed);
  }, [daysDuration, summary.daysPassed]);

  const progressPercent = useMemo(() => {
    if (daysDuration === 0) return 0;
    return (summary.daysPassed / daysDuration) * 100;
  }, [summary.daysPassed, daysDuration]);

  // --------------------------------------------------------------------------
  // ÚLTIMAS TRANSACCIONES (para la lista)
  // --------------------------------------------------------------------------
  const recentTransactions = useMemo(() => {
    // El store ya mantiene las transacciones ordenadas de más reciente a más antigua
    return transactions.slice(0, 3);
  }, [transactions]);

  // --------------------------------------------------------------------------
  // RETORNO
  // --------------------------------------------------------------------------
  return {
    // Datos primitivos
    totalBudget,
    remainingBudget,
    daysDuration,
    isExtremeMode,
    currency,
    hasHydrated,
    // Resumen (objeto)
    summary,
    // Derivados
    remainingDays,
    progressPercent,
    recentTransactions,
  };
};