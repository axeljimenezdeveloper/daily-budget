// ============================================================================
// UTILIDAD DE AGRUPACIÓN DE TRANSACCIONES POR DÍA (VERSIÓN LOCAL)
//
// Función pura que transforma un array de transacciones en un array de grupos
// agrupados por fecha local (YYYY-MM-DD). Cada grupo contiene las transacciones
// de ese día, ordenadas por fecha descendente (más reciente primero).
// ============================================================================

import { Transaction } from '@/store/useVaultStore/index.types';
import { GroupedExpenses } from '../types';
import { getLocalDateKey } from '@/utils/date'; // <-- NUEVA IMPORTACIÓN

/**
 * Agrupa un listado de transacciones por día (usando la fecha local del dispositivo)
 * y ordena los grupos de forma descendente (el día más reciente aparece primero).
 *
 * @param transactions - Lista de transacciones a agrupar.
 * @returns Array de grupos, cada uno con la fecha como string (YYYY-MM-DD local)
 *          y la lista de transacciones de ese día (ordenadas según el orden original,
 *          que ya es descendente por defecto en el store).
 *
 * @example
 * const grouped = groupTransactionsByDay([
 *   { id: '1', date: '2025-04-15T10:00:00Z', amount: 10, category: 'Café' },
 *   { id: '2', date: '2025-04-15T12:00:00Z', amount: 15, category: 'Comida' },
 *   { id: '3', date: '2025-04-14T09:00:00Z', amount: 5, category: 'Taxi' }
 * ]);
 * // Resultado (si la zona horaria local es UTC-3, por ejemplo):
 * // [
 * //   { date: '2025-04-14', items: [...] },  // el día local puede diferir de UTC
 * //   ...
 * // ]
 */
export const groupTransactionsByDay = (
  transactions: Transaction[]
): GroupedExpenses[] => {
  const groups: Record<string, Transaction[]> = {};

  // 1. Agrupar por fecha local (formato YYYY-MM-DD)
  for (const tx of transactions) {
    const localKey = getLocalDateKey(tx.date);
    if (!groups[localKey]) {
      groups[localKey] = [];
    }
    groups[localKey].push(tx);
  }

  // 2. Convertir a array de grupos y ordenar descendente por fecha (la clave local ya es YYYY-MM-DD, ordenable)
  return Object.entries(groups)
    .map(([date, items]) => ({ date, items }))
    .sort((a, b) => b.date.localeCompare(a.date));
};