// ============================================================================
// LÍMITES DE VALIDACIÓN PARA EL PRESUPUESTO
//
// Define los valores mínimos y máximos permitidos para el presupuesto inicial
// durante el flujo de configuración. Estos límites son utilizados por el hook
// useSetupValidation para mostrar errores y deshabilitar el botón de continuar.
// ============================================================================

// ----------------------------------------------------------------------------
// PRESUPUESTO - VALORES MÍNIMO Y MÁXIMO
// ----------------------------------------------------------------------------

/**
 * Monto mínimo permitido para el presupuesto inicial.
 * Se establece en 1 unidad monetaria para garantizar que el usuario
 * no pueda iniciar con presupuesto cero o negativo.
 */
export const MIN_BUDGET = 1;

/**
 * Monto máximo permitido para el presupuesto inicial.
 * Se limita a 1,000,000 de unidades monetarias para evitar valores
 * excesivamente altos que puedan causar problemas de formato o usabilidad.
 */
export const MAX_BUDGET = 1000000;