// ============================================================================
// PROPS DEL COMPONENTE EXPENSE ROW
//
// Define las propiedades necesarias para renderizar una fila de gasto individual
// en el historial. El componente muestra categoría, nota truncada (2 líneas),
// monto formateado, un botón de editar y un botón de eliminar.
// ============================================================================

import { Transaction } from '@/store/useVaultStore/index.types';

export interface ExpenseRowProps {
  /** Transacción a mostrar (categoría, nota, monto, id) */
  transaction: Transaction;
  /** Símbolo de la moneda (ej. "$", "€") para formatear el monto */
  currency: string;
  /** Callback que se ejecuta al presionar el botón de eliminar */
  onDelete: (id: string) => void;
  /**
   * Callback que se ejecuta al presionar la fila (excepto los botones de acción).
   * Recibe la transacción completa para mostrar sus detalles.
   */
  onDetailPress?: (transaction: Transaction) => void;
  /**
   * Callback que se ejecuta al presionar el botón de editar.
   * Recibe la transacción completa para editarla.
   */
  onEdit?: (transaction: Transaction) => void;
}