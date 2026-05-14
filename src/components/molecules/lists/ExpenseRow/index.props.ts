// ============================================================================
// PROPS DEL COMPONENTE EXPENSE ROW
//
// Define las propiedades necesarias para renderizar una fila de gasto individual
// en el historial. El componente muestra categoría, nota (opcional), monto
// formateado y un botón para eliminar.
// ============================================================================

import { Transaction } from '@/store/useVaultStore/index.types';

export interface ExpenseRowProps {
  /** Transacción a mostrar (categoría, nota, monto, id) */
  transaction: Transaction;
  /** Símbolo de la moneda (ej. "$", "€") para formatear el monto */
  currency: string;
  /** Callback que se ejecuta al presionar el botón de eliminar */
  onDelete: (id: string) => void;
}