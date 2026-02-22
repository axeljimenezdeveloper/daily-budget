// ============================================================================
// PROPS DEL COMPONENTE TOAST
// ============================================================================

export type AppToastVariant = 'success' | 'info' | 'warning' | 'error';

export interface AppToastProps {
  /** Tipo de toast que define el color del círculo y el ícono */
  variant: AppToastVariant;
  /** Título del mensaje (obligatorio) */
  title: string;
  /** Descripción opcional (texto secundario) */
  description?: string;
  /** Función opcional al cerrar. Si se provee, se muestra el botón de cierre */
  onClose?: () => void;
  /** Duración en ms antes de auto‑cerrarse (reservado para fases posteriores) */
  duration?: number;
}