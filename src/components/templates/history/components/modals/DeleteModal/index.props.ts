// ============================================================================
// PROPS DEL MODAL DE CONFIRMACIÓN DE ELIMINACIÓN (DeleteModal)
//
// Define las propiedades que recibe el componente DeleteModal para controlar
// su visibilidad, el mensaje de confirmación y las acciones de cierre/confirmación.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - DeleteModalProps
// ----------------------------------------------------------------------------

/**
 * Props del componente DeleteModal.
 *
 * @property isOpen      - Controla si el modal está visible.
 * @property onClose     - Callback para cerrar el modal (cancelar).
 * @property onConfirm   - Callback que se ejecuta al confirmar la eliminación.
 * @property title       - Título del modal (opcional, por defecto traducido).
 * @property message     - Mensaje de confirmación (opcional, por defecto traducido).
 * @property cancelText  - Texto del botón de cancelar (opcional, por defecto traducido).
 * @property confirmText - Texto del botón de confirmar (opcional, por defecto traducido).
 */
export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
}