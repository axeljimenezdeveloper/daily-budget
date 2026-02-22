// ============================================================================
// TIPOS PARA EL STORE DE TOASTS (useToastStore) - Actualizado
// ============================================================================

import { AppToastVariant } from '@/components/molecules/feedback/AppToast/index.props';

export interface ToastItem {
  /** Identificador único (timestamp + sufijo) */
  id: string;
  /** Variante del toast */
  variant: AppToastVariant;
  /** Título del mensaje */
  title: string;
  /** Descripción opcional */
  description?: string;
  /** Duración en milisegundos antes de auto-cerrarse (0 = no auto-cierre) */
  duration: number;
  /** Timestamp de creación (para ordenar) */
  createdAt: number;
}

export interface ToastState {
  /** Lista de toasts activos */
  toasts: ToastItem[];

  // Acciones
  /**
   * Añade un nuevo toast a la cola.
   * @returns ID del toast creado, o null si no se pudo crear (ej. título vacío).
   */
  addToast: (toast: Omit<ToastItem, 'id' | 'createdAt'>) => string | null;

  /** Elimina un toast por su id */
  removeToast: (id: string) => void;

  /** Elimina todos los toasts */
  clearToasts: () => void;
}