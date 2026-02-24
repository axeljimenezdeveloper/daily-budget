// ============================================================================
// UTILIDADES DE CÁLCULO – BÓVEDA (useVaultStore)
//
// Contiene funciones puras para la lógica de negocio relacionada con:
//   - Cálculo de días transcurridos
//   - Detección de "modo cuidado" (extreme mode)
//   - Formateo de cantidades monetarias
//   - Manejo de fechas y horas para notificaciones
//
// Estas funciones son independientes del store y pueden ser probadas
// unitariamente sin necesidad de estado global.
// ============================================================================

// ----------------------------------------------------------------------------
// IMPORTACIONES DE TIPOS
// ----------------------------------------------------------------------------
import { Transaction, VaultSummary } from './index.types';

// ----------------------------------------------------------------------------
// FECHAS Y TIEMPO
// ----------------------------------------------------------------------------

/**
 * Calcula los días enteros transcurridos desde la fecha de inicio.
 * 
 * Lógica: se cuenta el día de inicio como día 1. Si han pasado menos de 24h,
 * se considera 1 día. Si han pasado entre 24h y 48h, son 2 días, etc.
 *
 * @param startDate - Fecha ISO de inicio (o null si no existe)
 * @returns Número de días transcurridos (mínimo 1 para evitar división por cero)
 *
 * @example
 * calculateDaysPassed('2025-01-01T00:00:00.000Z') 
 * // Si hoy es 2025-01-01T10:00:00.000Z → 1
 * // Si hoy es 2025-01-02T01:00:00.000Z → 2
 */
export const calculateDaysPassed = (startDate: string | null): number => {
  if (!startDate) return 1;
  const start = new Date(startDate).getTime();
  const now = new Date().getTime();
  const diff = now - start;
  // ← MEJORA: floor + 1 para contar días completos transcurridos
  // Ejemplo: 24h exactas → floor(1) + 1 = 2? No: 24h = 86400000ms, floor(1) = 1, +1 = 2 (eso sería incorrecto)
  // Revisemos: queremos que 24h exactas sean 2 días? Depende de la definición. 
  // Si el inicio fue a las 00:00 del día 1, y ahora son las 00:00 del día 2, han pasado 24h exactas, debería ser día 2.
  // Con floor(1) + 1 = 2, es correcto.
  // Si han pasado 23h, floor(0) + 1 = 1, correcto.
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, days);
};

// ----------------------------------------------------------------------------
// ESTADO DE ALERTA (MODO CUIDADO)
// ----------------------------------------------------------------------------

/**
 * Determina si el usuario debe estar en "modo cuidado".
 *
 * Condiciones de activación:
 * 1. El presupuesto restante es negativo (sobrepasado).
 * 2. El gasto diario real supera en un 20% el gasto diario ideal.
 *
 * @param totalBudget - Presupuesto total inicial
 * @param remainingBudget - Presupuesto restante actual
 * @param daysDuration - Duración total del período en días
 * @param startDate - Fecha de inicio del período (ISO o null)
 * @returns `true` si se debe activar el modo cuidado, `false` en caso contrario
 */
export const checkExtremeMode = (
  totalBudget: number,
  remainingBudget: number,
  daysDuration: number,
  startDate: string | null
): boolean => {
  // Condición 1: presupuesto agotado o negativo
  if (remainingBudget < 0) return true;

  const daysPassed = calculateDaysPassed(startDate);
  const actualDailySpend = (totalBudget - remainingBudget) / daysPassed;
  const idealDailySpend = totalBudget / daysDuration;

  // Condición 2: gasto real supera el 20% del ideal diario
  return actualDailySpend > idealDailySpend * 1.2;
};

// ----------------------------------------------------------------------------
// FORMATEO DE MONEDA
// ----------------------------------------------------------------------------

/**
 * Formatea una cantidad numérica con el símbolo de moneda y dos decimales.
 * Utiliza locale 'en-US' para garantizar formato consistente (punto como separador de miles,
 * coma decimal) independientemente de la configuración regional del dispositivo.
 *
 * @param amount - Número a formatear
 * @param currency - Símbolo de la moneda (ej. "$", "€", "Bs")
 * @returns String con formato: "{símbolo} {cantidad con 2 decimales}"
 *
 * @example
 * formatMoney(1234.5, "$") // => "$ 1,234.50"
 */
export const formatMoney = (amount: number, currency: string): string => {
  // ← MEJORA: locale fijo 'en-US' para consistencia
  return `${currency} ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// ============================================================================
// UTILIDADES DE FECHAS Y HORAS (PARA NOTIFICACIONES)
// ============================================================================

// ----------------------------------------------------------------------------
// FORMATEO DE HORA
// ----------------------------------------------------------------------------

/**
 * Convierte una hora en formato HH:mm a un objeto Date para el día actual.
 * Útil para programar notificaciones con expo-notifications.
 *
 * @param timeString - Hora en formato "HH:mm" (24h).
 * @returns Objeto Date con la hora especificada en el día de hoy.
 *
 * @example
 * getDateFromTimeString("20:00") // => 2025-04-08T20:00:00.000Z (hora local)
 */
export const getDateFromTimeString = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

/**
 * Formatea un objeto Date a string HH:mm.
 * Útil para mostrar la hora en la UI o persistir en el store.
 *
 * @param date - Objeto Date.
 * @returns Hora en formato "HH:mm" (24h).
 *
 * @example
 * formatTimeToHHMM(new Date()) // => "20:00"
 */
export const formatTimeToHHMM = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// ----------------------------------------------------------------------------
// COMPARACIÓN DE FECHAS
// ----------------------------------------------------------------------------

/**
 * Verifica si dos fechas corresponden al mismo día calendario.
 *
 * @param date1 - Primera fecha (Date o string ISO).
 * @param date2 - Segunda fecha (Date o string ISO). Por defecto, la fecha actual.
 * @returns true si ambas fechas tienen el mismo año, mes y día.
 */
export const isSameDay = (date1: Date | string, date2: Date | string = new Date()): boolean => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

/**
 * Retorna la fecha actual en formato YYYY-MM-DD.
 * Útil para comparar con notificationsScheduledForDate.
 */
export const getTodayISO = (): string => {
  return new Date().toISOString().split('T')[0];
};

// ============================================================================
// UTILIDAD DE EXPORTACIÓN A CSV
// ============================================================================

/**
 * Escapa un campo CSV si contiene caracteres especiales (comillas, punto y coma, saltos de línea).
 * Envuelve el campo entre comillas dobles y duplica las comillas internas.
 *
 * @param field - Cadena a escapar
 * @returns Campo listo para insertar en CSV
 */
const escapeCSVField = (field: string): string => {
  if (field.includes('"') || field.includes(';') || field.includes('\n')) {
    // Duplicar comillas dobles
    const escaped = field.replace(/"/g, '""');
    return `"${escaped}"`;
  }
  return field;
};

/**
 * Genera una cadena CSV con las transacciones y un resumen del período.
 *
 * Formato:
 * - Cabeceras: "Fecha";"Concepto";"Monto"
 * - Por cada transacción:
 *     Fecha en formato DD/MM/YYYY
 *     Concepto: categoría + (nota) si existe
 *     Monto: con símbolo de moneda y dos decimales
 * - Al final, tres filas de resumen:
 *     "Total gastado";;{totalSpent}
 *     "Días transcurridos";;{daysPassed}
 *     "Promedio diario";;{dailyAverage}
 *
 * @param transactions - Lista de transacciones (ordenadas por fecha descendente)
 * @param summary - Resumen obtenido de getSummary()
 * @param currency - Símbolo de moneda (ej. "$")
 * @returns String con el contenido CSV
 */
export const generateCSV = (
  transactions: Transaction[],
  summary: VaultSummary,
  currency: string
): string => {
  const rows: string[] = [];

  // Cabeceras
  rows.push(escapeCSVField('Fecha') + ';' + escapeCSVField('Concepto') + ';' + escapeCSVField('Monto'));

  // Transacciones
  transactions.forEach((t) => {
    // Formatear fecha a DD/MM/YYYY
    const date = new Date(t.date);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    // Construir concepto: categoría + nota entre paréntesis (si existe)
    let concept = t.category;
    if (t.note) {
      concept += ` (${t.note})`;
    }

    // Formatear monto con moneda y dos decimales (usa formatMoney con locale fijo)
    const formattedAmount = formatMoney(t.amount, currency);

    rows.push(
      escapeCSVField(formattedDate) + ';' +
      escapeCSVField(concept) + ';' +
      escapeCSVField(formattedAmount)
    );
  });

  // Línea en blanco opcional antes del resumen
  rows.push('');

  // Resumen
  const totalSpentFormatted = formatMoney(summary.totalSpent, currency);
  const dailyAverageFormatted = formatMoney(summary.dailyAverage, currency);

  rows.push(escapeCSVField('Total gastado') + ';;' + escapeCSVField(totalSpentFormatted));
  rows.push(escapeCSVField('Días transcurridos') + ';;' + summary.daysPassed.toString());
  rows.push(escapeCSVField('Promedio diario') + ';;' + escapeCSVField(dailyAverageFormatted));

  return rows.join('\n');
};