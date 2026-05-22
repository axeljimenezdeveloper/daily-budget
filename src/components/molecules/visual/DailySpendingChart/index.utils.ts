// ============================================================================
// UTILIDADES PARA EL GRÁFICO DE GASTOS DIARIOS
// ============================================================================

import { Transaction } from '@/store/useVaultStore/index.types';
import i18next from 'i18next';
import { getLocalDateKey } from '@/utils/date'; // <-- NUEVA IMPORTACIÓN

export interface DailySpendingData {
  date: Date;
  amount: number;
  dayLabel: string;
  isFuture: boolean;
  isToday: boolean; // flag para identificar el día actual
}

/**
 * Obtiene la inicial del día según el idioma actual.
 * @param date - Fecha
 * @returns Inicial de un carácter (ej. 'L', 'M', 'X', 'J', 'V', 'S', 'D')
 */
const getLocalizedDayInitial = (date: Date): string => {
  try {
    // Formateador según el idioma actual (ej. 'es' o 'en')
    const formatter = new Intl.DateTimeFormat(i18next.language, { weekday: 'narrow' });
    return formatter.format(date);
  } catch (error) {
    // Fallback en caso de error (ej. 'en' devuelve 'M', 'T', 'W', etc.)
    const fallback = new Intl.DateTimeFormat('en', { weekday: 'narrow' });
    return fallback.format(date);
  }
};

/**
 * Obtiene los últimos N días (por defecto 7) con sus respectivos gastos.
 * @param transactions - Lista de transacciones
 * @param daysCount - Número de días a considerar
 * @returns Array ordenado de más antiguo a más reciente
 */
export const getLastDaysSpending = (
  transactions: Transaction[],
  daysCount: number = 7
): DailySpendingData[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalizar a medianoche (hora local)
  
  // Mapa de gastos por fecha local YYYY-MM-DD
  const spendingByDate: Record<string, number> = {};
  transactions.forEach((tx) => {
    // Obtener la clave de fecha local (resuelve zona horaria)
    const localKey = getLocalDateKey(tx.date);
    spendingByDate[localKey] = (spendingByDate[localKey] || 0) + tx.amount;
  });

  const result: DailySpendingData[] = [];
  for (let i = daysCount - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    // Obtener clave de fecha local para este día del rango
    const dateKey = getLocalDateKey(date);
    const amount = spendingByDate[dateKey] || 0;
    const isFuture = date > today;
    // Comparación robusta usando string de fecha (ignora hora y zona horaria)
    const isToday = date.toDateString() === today.toDateString();
    
    // Inicial localizada
    const dayLabel = getLocalizedDayInitial(date);
    
    result.push({
      date,
      amount,
      dayLabel,
      isFuture,
      isToday,
    });
  }
  return result;
};

/**
 * Escala un valor al rango [0, maxHeight] basado en el máximo del conjunto.
 * @param amount - Valor a escalar
 * @param maxAmount - Valor máximo del conjunto (si es 0, retorna 0)
 * @param maxHeight - Altura máxima en píxeles (por defecto 80)
 * @returns Altura escalada
 */
export const scaleAmountToHeight = (
  amount: number,
  maxAmount: number,
  maxHeight: number = 80
): number => {
  if (maxAmount === 0) return 0;
  return (amount / maxAmount) * maxHeight;
};