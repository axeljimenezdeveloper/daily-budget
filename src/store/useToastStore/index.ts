// ============================================================================
// STORE GLOBAL: useToastStore (con límite, validación y anti-duplicados)
// ============================================================================

import { create } from 'zustand';
import { ToastItem, ToastState } from './index.types';

// ----------------------------------------------------------------------------
// CONSTANTES DE CONFIGURACIÓN
// ----------------------------------------------------------------------------
/** Número máximo de toasts visibles simultáneamente */
const MAX_VISIBLE_TOASTS = 3;

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  /**
   * Añade un nuevo toast a la cola.
   * - Si el título está vacío, no se añade y retorna null.
   * - Si ya existe un toast exactamente igual (variant, title, description), se ignora (anti-spam).
   * - Si se excede el límite MAX_VISIBLE_TOASTS, se elimina el toast más antiguo.
   * @returns ID del toast creado, o null si no se pudo crear.
   */
  addToast: ({ variant, title, description, duration }) => {
    // Validar que el título no esté vacío (ni solo espacios)
    if (!title || title.trim() === '') {
      if (__DEV__) {
        console.warn('[useToastStore] Intento de añadir toast con título vacío');
      }
      return null;
    }

    // Evitar duplicados exactos (misma variante, título y descripción)
    const existing = get().toasts.find(
      (t) => t.variant === variant && t.title === title && t.description === description
    );
    if (existing) {
      if (__DEV__) {
        console.warn('[useToastStore] Toast duplicado ignorado', { variant, title, description });
      }
      return null;
    }

    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastItem = {
      id,
      variant,
      title,
      description,
      duration,
      createdAt: Date.now(),
    };

    set((state) => {
      let newToasts = [...state.toasts, newToast];

      // Si supera el límite, eliminar el más antiguo (menor createdAt)
      if (newToasts.length > MAX_VISIBLE_TOASTS) {
        const sorted = [...newToasts].sort((a, b) => a.createdAt - b.createdAt);
        const oldestId = sorted[0].id;
        newToasts = newToasts.filter((t) => t.id !== oldestId);
      }

      return { toasts: newToasts };
    });

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  clearToasts: () => set({ toasts: [] }),
}));