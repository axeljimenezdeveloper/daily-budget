// ============================================================================
// PROPS DE LA LISTA DE GASTOS AGRUPADA
//
// Define las propiedades necesarias para renderizar la lista completa de gastos
// agrupados por día, incluyendo encabezados de fecha y las filas individuales.
// ============================================================================

import { GroupedExpenses } from '../../../types';

export interface ExpensesListProps {
  /** Array de grupos de transacciones (cada grupo representa un día) */
  groupedExpenses: GroupedExpenses[];
  /** Símbolo de la moneda actual (ej. "$", "€") para formatear montos */
  currency: string;
  /** Callback que se ejecuta al presionar el botón de eliminar de un gasto */
  onDeletePress: (id: string) => void;
}