// ============================================================================
// PROPS DE LA LISTA DE GASTOS AGRUPADA
//
// Define las propiedades necesarias para renderizar la lista completa de gastos
// agrupados por día, incluyendo encabezados de fecha, filas individuales,
// controles de paginación (cargar más) y modo de grupo único (para FlatList).
// ============================================================================

import { GroupedExpenses } from '../../../types';
import { Transaction } from '@/store/useVaultStore/index.types';

export interface ExpensesListProps {
  /**
   * Array de grupos de transacciones (cada grupo representa un día).
   * Se usa en modo lista completa (pagina por botón o scroll).
   */
  groupedExpenses?: GroupedExpenses[];

  /**
   * Grupo único para renderizar un solo día.
   * Si se proporciona, ignora groupedExpenses y las props de paginación.
   * Útil para usar dentro de FlatList (carga infinita).
   */
  singleGroup?: GroupedExpenses;

  /** Símbolo de la moneda actual (ej. "$", "€") para formatear montos */
  currency: string;

  /** Callback que se ejecuta al presionar el botón de eliminar de un gasto */
  onDeletePress: (id: string) => void;

  /**
   * Callback que se ejecuta al presionar una fila (excepto los botones de acción).
   * Recibe la transacción completa para mostrar el modal de detalle.
   */
  onDetailPress?: (transaction: Transaction) => void;

  /**
   * Callback que se ejecuta al presionar el botón de editar de un gasto.
   * Recibe la transacción completa para editarla.
   */
  onEditPress?: (transaction: Transaction) => void;

  // --------------------------------------------------------------------------
  // PROPS DE PAGINACIÓN (solo para modo lista completa)
  // --------------------------------------------------------------------------
  /** Función que se ejecuta al presionar "Cargar más" */
  onLoadMore?: () => void;

  /** Indica si se está cargando la siguiente página (muestra spinner) */
  isLoadingMore?: boolean;

  /** Indica si existen más grupos para cargar (muestra botón u oculta) */
  hasMore?: boolean;
}