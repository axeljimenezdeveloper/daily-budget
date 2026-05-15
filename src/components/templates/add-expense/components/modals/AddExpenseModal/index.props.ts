// ============================================================================
// PROPS DEL MODAL DE REGISTRO DE GASTOS (AddExpenseModal)
//
// Define las propiedades que recibe el componente AddExpenseModal para controlar
// su visibilidad y las acciones de cierre/éxito.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - AddExpenseModalProps
// ----------------------------------------------------------------------------

/**
 * Props del componente AddExpenseModal.
 *
 * @property isOpen    - Controla si el modal está visible.
 * @property onClose   - Callback para cerrar el modal sin guardar.
 * @property onSuccess - Callback opcional que se ejecuta después de guardar
 *                       exitosamente un gasto (además de cerrar el modal).
 */
export interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}