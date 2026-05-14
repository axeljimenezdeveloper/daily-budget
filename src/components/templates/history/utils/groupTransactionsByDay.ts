// ============================================================================
// UTILIDAD DE AGRUPACIÓN DE TRANSACCIONES POR DÍA
//
// Función pura que transforma un array de transacciones en un array de grupos
// agrupados por fecha (YYYY-MM-DD). Cada grupo contiene las transacciones
// de ese día, ordenadas por fecha descendente (más reciente primero).
// ============================================================================

import { Transaction } from '@/store/useVaultStore/index.types';
import { GroupedExpenses } from '../types';

/**
 * Agrupa un listado de transacciones por día (formato YYYY-MM-DD) y ordena
 * los grupos de forma descendente (el día más reciente aparece primero).
 *
 * @param transactions - Lista de transacciones a agrupar.
 * @returns Array de grupos, cada uno con la fecha como string y la lista de
 *          transacciones de ese día (ordenadas según el orden original,
 *          que ya es descendente por defecto en el store).
 *
 * @example
 * const grouped = groupTransactionsByDay([
 *   { id: '1', date: '2025-04-15T10:00:00Z', amount: 10, category: 'Café' },
 *   { id: '2', date: '2025-04-15T12:00:00Z', amount: 15, category: 'Comida' },
 *   { id: '3', date: '2025-04-14T09:00:00Z', amount: 5, category: 'Taxi' }
 * ]);
 * // Resultado:
 * // [
 * //   { date: '2025-04-15', items: [transacción1, transacción2] },
 * //   { date: '2025-04-14', items: [transacción3] }
 * // ]
 */
export const groupTransactionsByDay = (
  transactions: Transaction[]
): GroupedExpenses[] => {
  const groups: Record<string, Transaction[]> = {};

  // 1. Agrupar por fecha (solo la parte YYYY-MM-DD)
  for (const tx of transactions) {
    const dateKey = tx.date.split('T')[0]; // "2025-04-15"
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(tx);
  }

  // 2. Convertir a array de grupos y ordenar descendente por fecha
  return Object.entries(groups)
    .map(([date, items]) => ({ date, items }))
    .sort((a, b) => b.date.localeCompare(a.date));
};