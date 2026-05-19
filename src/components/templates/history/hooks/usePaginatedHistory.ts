// ============================================================================
// HOOK PERSONALIZADO: usePaginatedHistory
//
// Gestiona la paginación de los grupos de gastos (por día) en el historial.
// Permite cargar más grupos bajo demanda, manteniendo el estado de página
// y reiniciando automáticamente cuando cambian los grupos subyacentes
// (ej. al eliminar un gasto o agregar uno nuevo).
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import { useState, useCallback, useEffect } from 'react';

// ----------------------------------------------------------------------------
// CONSTANTES LOCALES
// ----------------------------------------------------------------------------
import { HISTORY_PAGE_SIZE } from '@/constants/pagination';

// ----------------------------------------------------------------------------
// TIPOS COMPARTIDOS DEL TEMPLATE
// ----------------------------------------------------------------------------
import { GroupedExpenses } from '../types';

// ----------------------------------------------------------------------------
// INTERFAZ DE RETORNO DEL HOOK
// ----------------------------------------------------------------------------

/**
 * Interfaz que describe el objeto retornado por usePaginatedHistory.
 */
export interface UsePaginatedHistoryReturn {
  /** Grupos de la página actual (solo los primeros PAGE_SIZE * página) */
  paginatedGroups: GroupedExpenses[];
  /** Función para cargar la siguiente página (agrega más grupos) */
  loadMore: () => Promise<void>;
  /** Indica si existen más grupos para cargar después de la página actual */
  hasMore: boolean;
  /** Indica si se está ejecutando una carga asíncrona (útil para mostrar spinner) */
  isLoadingMore: boolean;
  /** Reinicia la paginación a la página 1 (se llama automáticamente al cambiar los grupos) */
  resetPagination: () => void;
}

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * Hook que implementa paginación cliente-side sobre un array de grupos de gastos.
 *
 * @param groupedExpenses - Array completo de grupos (días) proveniente de useHistory.
 * @returns Objeto con los grupos paginados, control de carga, y funciones para avanzar/reiniciar.
 *
 * @example
 * const { groupedExpenses } = useHistory();
 * const { paginatedGroups, loadMore, hasMore, isLoadingMore } = usePaginatedHistory(groupedExpenses);
 */
export const usePaginatedHistory = (
  groupedExpenses: GroupedExpenses[]
): UsePaginatedHistoryReturn => {
  // --------------------------------------------------------------------------
  // ESTADOS INTERNOS
  // --------------------------------------------------------------------------
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // --------------------------------------------------------------------------
  // CÁLCULOS DERIVADOS
  // --------------------------------------------------------------------------
  const totalGroups = groupedExpenses.length;
  const totalPages = Math.ceil(totalGroups / HISTORY_PAGE_SIZE);
  const hasMore = page < totalPages;

  // --------------------------------------------------------------------------
  // GRUPOS PAGINADOS (desde el inicio hasta el final de la página actual)
  // --------------------------------------------------------------------------
  const paginatedGroups = groupedExpenses.slice(0, page * HISTORY_PAGE_SIZE);

  // --------------------------------------------------------------------------
  // FUNCIÓN PARA CARGAR MÁS (siguiente página)
  // --------------------------------------------------------------------------
  /**
   * Incrementa la página actual si hay más grupos y no hay una carga en curso.
   * Se usa un pequeño retardo asíncrono para mantener la consistencia del estado
   * y permitir que el UI muestre el spinner.
   */
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    // Pequeño retardo para forzar microtareas y evitar conflictos de estado
    // (no es necesario para la lógica, pero mejora la experiencia visual)
    await new Promise((resolve) => setTimeout(resolve, 0));
    setPage((prev) => prev + 1);
    setIsLoadingMore(false);
  }, [hasMore, isLoadingMore]);

  // --------------------------------------------------------------------------
  // REINICIO DE PAGINACIÓN
  // --------------------------------------------------------------------------
  /**
   * Resetea la página a 1 y limpia el flag de carga.
   * Se utiliza automáticamente cuando cambian los grupos (ej. eliminación/agregado).
   */
  const resetPagination = useCallback(() => {
    setPage(1);
    setIsLoadingMore(false);
  }, []);

  // --------------------------------------------------------------------------
  // EFECTO PARA REINICIAR CUANDO CAMBIAN LOS GRUPOS (nuevas transacciones o eliminación)
  // --------------------------------------------------------------------------
  // Si la lista completa de grupos cambia (length diferente o referencia nueva),
  // reiniciamos la página para evitar mostrar grupos huérfanos o páginas vacías.
  useEffect(() => {
    resetPagination();
  }, [groupedExpenses, resetPagination]);

  // --------------------------------------------------------------------------
  // RETORNO DEL HOOK
  // --------------------------------------------------------------------------
  return {
    paginatedGroups,
    loadMore,
    hasMore,
    isLoadingMore,
    resetPagination,
  };
};