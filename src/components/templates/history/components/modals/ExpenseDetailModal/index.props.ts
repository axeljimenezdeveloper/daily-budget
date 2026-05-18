// ============================================================================
// PROPS DEL MODAL DE DETALLE DE GASTO (ExpenseDetailModal)
//
// Define las propiedades necesarias para mostrar un modal con toda la
// información de una transacción: categoría, monto, fecha y nota completa.
// ============================================================================

import { Transaction } from '@/store/useVaultStore/index.types';

export interface ExpenseDetailModalProps {
  /** Controla si el modal está visible */
  isOpen: boolean;
  /** Callback para cerrar el modal */
  onClose: () => void;
  /** Transacción a mostrar (puede ser null mientras no se seleccione ninguna) */
  transaction: Transaction | null;
  /** Símbolo de la moneda actual para formatear el monto */
  currency: string;
}