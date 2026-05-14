// ============================================================================
// TIPOS COMPARTIDOS DEL TEMPLATE DE HISTORIAL
//
// Define las estructuras de datos utilizadas por los componentes del historial:
// - GroupedExpenses: agrupación de transacciones por día (formato YYYY-MM-DD)
// ============================================================================

import { Transaction } from '@/store/useVaultStore/index.types';

// ----------------------------------------------------------------------------
// TIPOS PRINCIPALES
// ----------------------------------------------------------------------------

/**
 * Representa un grupo de transacciones que ocurrieron en la misma fecha.
 * Se utiliza para mostrar encabezados separadores en la lista de historial.
 */
export interface GroupedExpenses {
  /** Fecha en formato ISO (YYYY-MM-DD) utilizada como clave de agrupación */
  date: string;
  /** Lista de transacciones registradas en esa fecha (ordenadas de más reciente a más antigua) */
  items: Transaction[];
}