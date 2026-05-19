// ============================================================================
// CONSTANTES DE PAGINACIÓN
//
// Define valores globales para la paginación en toda la aplicación.
// Centraliza el tamaño de página para el historial de gastos y otras listas
// que puedan requerir paginación en el futuro.
// ============================================================================

// ----------------------------------------------------------------------------
// TAMAÑO DE PÁGINA PARA EL HISTORIAL
// ----------------------------------------------------------------------------

/**
 * Número máximo de grupos (días) que se muestran por página en la pantalla
 * de historial. Este valor puede ajustarse según pruebas de rendimiento.
 * Un valor de 5 grupos equivale aproximadamente a 5 días de gastos,
 * independientemente de cuántos gastos tenga cada día.
 */
export const HISTORY_PAGE_SIZE = 5;