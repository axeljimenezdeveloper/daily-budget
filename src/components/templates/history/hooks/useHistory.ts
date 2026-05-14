// ============================================================================
// HOOK PERSONALIZADO: useHistory
//
// Punto de entrada para la lógica del historial de gastos.
// Obtiene las transacciones y la moneda del store global, y las agrupa por día
// utilizando una función pura. También expone un flag para saber si hay
// transacciones registradas.
// ============================================================================

import { useMemo } from 'react';
import { useVaultStore } from '@/store/useVaultStore';
import { groupTransactionsByDay } from '../utils/groupTransactionsByDay';

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * Hook que provee la lógica principal para la pantalla de historial.
 *
 * @returns Objeto con:
 *   - groupedExpenses: Transacciones agrupadas por día (orden descendente).
 *   - currency: Símbolo de la moneda actual (ej. "$").
 *   - hasTransactions: Booleano que indica si existen transacciones.
 */
export const useHistory = () => {
  // --------------------------------------------------------------------------
  // SELECTORES FINOS DEL STORE (suscripción a solo lo necesario)
  // --------------------------------------------------------------------------
  const transactions = useVaultStore((state) => state.transactions);
  const currency = useVaultStore((state) => state.currency);

  // --------------------------------------------------------------------------
  // AGRUPACIÓN MEMOIZADA (solo se recalcula si cambian las transacciones)
  // --------------------------------------------------------------------------
  const groupedExpenses = useMemo(
    () => groupTransactionsByDay(transactions),
    [transactions]
  );

  // --------------------------------------------------------------------------
  // FLAG PARA SABER SI HAY GASTOS (evita recorrer groupedExpenses si no es necesario)
  // --------------------------------------------------------------------------
  const hasTransactions = transactions.length > 0;

  return {
    groupedExpenses,
    currency,
    hasTransactions,
  };
};