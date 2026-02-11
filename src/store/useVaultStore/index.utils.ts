// ============================================================================
// UTILIDADES DE CÁLCULO – BÓVEDA (useVaultStore)
//
// Contiene funciones puras para la lógica de negocio relacionada con:
//   - Cálculo de días transcurridos
//   - Detección de "modo cuidado" (extreme mode)
//   - Formateo de cantidades monetarias
//
// Estas funciones son independientes del store y pueden ser probadas
// unitariamente sin necesidad de estado global.
// ============================================================================

// ----------------------------------------------------------------------------
// FECHAS Y TIEMPO
// ----------------------------------------------------------------------------

/**
 * Calcula los días enteros transcurridos desde la fecha de inicio.
 *
 * @param startDate - Fecha ISO de inicio (o null si no existe)
 * @returns Número de días transcurridos (mínimo 1 para evitar división por cero)
 *
 * @example
 * calculateDaysPassed('2025-01-01T00:00:00.000Z') // => días entre esa fecha y ahora
 */
export const calculateDaysPassed = (startDate: string | null): number => {
  if (!startDate) return 1;
  const start = new Date(startDate).getTime();
  const now = new Date().getTime();
  const diff = now - start;
  // Se redondea hacia arriba para considerar cualquier fracción como un día completo
  // Math.max asegura que nunca retorne 0 (evita divisiones por cero en otros cálculos)
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
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
 *
 * @param amount - Número a formatear
 * @param currency - Símbolo de la moneda (ej. "$", "€", "Bs")
 * @returns String con formato: "{símbolo} {cantidad con 2 decimales}"
 *
 * @example
 * formatMoney(1234.5, "$") // => "$ 1,234.50"
 */
export const formatMoney = (amount: number, currency: string): string => {
  return `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};