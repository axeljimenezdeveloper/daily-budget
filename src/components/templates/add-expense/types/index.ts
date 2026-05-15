// ============================================================================
// TIPOS COMPARTIDOS DEL TEMPLATE ADD-EXPENSE
//
// Define las estructuras de datos utilizadas por los hooks y componentes
// del formulario de registro de gastos.
// ============================================================================

// ----------------------------------------------------------------------------
// TIPOS PRINCIPALES
// ----------------------------------------------------------------------------

/**
 * Representa los datos del formulario de nuevo gasto.
 * Se utiliza tanto en el estado local del hook como para la comunicación
 * entre componentes.
 *
 * @property amount     - Monto del gasto como string (para control de input controlado).
 *                        Se parseará a número en el momento de enviar.
 * @property categoryId - Identificador de la categoría seleccionada (ej. 'food', 'transport').
 *                        Corresponde al campo 'id' de los objetos en CATEGORIES.
 * @property note       - Nota opcional ingresada por el usuario.
 */
export interface FormData {
  amount: string;
  categoryId: string;
  note: string;
}

/**
 * Representa los errores de validación del formulario.
 * Cada clave opcional corresponde a un campo del formulario.
 */
export interface ValidationErrors {
  /** Mensaje de error para el campo de monto (si existe) */
  amount?: string;
  /** Mensaje de error para el selector de categoría (si existe) */
  category?: string;
}