// ============================================================================
// PROPS DEL MODAL DE REINICIO DE BÓVEDA (ResetModal)
//
// Define las propiedades que recibe el componente ResetModal para controlar
// su visibilidad, el mensaje de confirmación y las acciones de cierre/confirmación.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - ResetModalProps
// ----------------------------------------------------------------------------

/**
 * Props del componente ResetModal.
 *
 * @property isOpen      - Controla si el modal está visible.
 * @property onClose     - Callback para cerrar el modal.
 * @property onConfirm   - Callback que se ejecuta al confirmar el reinicio.
 * @property title       - Título del modal (opcional, por defecto traducido).
 * @property message     - Mensaje de confirmación (opcional, por defecto traducido).
 * @property cancelText  - Texto del botón de cancelar (opcional, por defecto traducido).
 * @property confirmText - Texto del botón de confirmar (opcional, por defecto traducido).
 */
export interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
}