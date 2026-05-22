// ============================================================================
// PROPS DEL MODAL DE EDICIÓN DE GASTO (EditExpenseModal)
//
// Define las propiedades necesarias para mostrar un modal que permite
// editar una transacción existente: monto, categoría y nota opcional.
// ============================================================================

import { Transaction } from '@/store/useVaultStore/index.types';

export interface EditExpenseModalProps {
  /** Controla si el modal está visible */
  isOpen: boolean;
  /** Callback para cerrar el modal (sin guardar o después de guardar) */
  onClose: () => void;
  /** Transacción a editar (puede ser null mientras no se seleccione ninguna) */
  transaction: Transaction | null;
  /** Símbolo de la moneda actual para formatear el monto (no se usa directamente en el formulario, pero se pasa por consistencia) */
  currency: string;
  /**
   * Callback opcional que se ejecuta después de guardar exitosamente.
   * Útil para refrescar la lista o ejecutar acciones adicionales.
   */
  onSuccess?: () => void;
}