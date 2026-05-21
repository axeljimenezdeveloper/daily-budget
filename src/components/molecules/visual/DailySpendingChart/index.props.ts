// ============================================================================
// PROPS DEL COMPONENTE DailySpendingChart
// ============================================================================

import { Transaction } from '@/store/useVaultStore/index.types';

export interface DailySpendingChartProps {
  /** Lista de transacciones para calcular los gastos diarios */
  transactions: Transaction[];
  /** Símbolo de la moneda para formatear los tooltips */
  currency: string;
  /** Número de días a mostrar (por defecto 7) */
  daysCount?: number;
  /** Altura máxima de la línea en píxeles (por defecto 80) */
  maxBarHeight?: number;
  /** (Opcional) Presupuesto diario ideal – si no se pasa, no se muestra el footer */
  originalIdeal?: number;
  /** (Opcional) Gasto de hoy – si no se pasa, no se muestra el footer */
  todaySpent?: number;
  /** (Opcional) Desviación del gasto – si no se pasa, no se muestra mensaje */
  spentDeviation?: number;
  /** (Opcional) Presupuesto restante total – para mostrar en el footer */
  remainingBudget?: number;
  /** (Opcional) Días restantes – para mostrar en el footer */
  remainingDays?: number;
}