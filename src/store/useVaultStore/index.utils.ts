export const calculateDaysPassed = (startDate: string | null): number => {
  if (!startDate) return 1;
  const start = new Date(startDate).getTime();
  const now = new Date().getTime();
  const diff = now - start;
  // Convertimos ms a días y redondeamos hacia arriba
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

export const checkExtremeMode = (
  totalBudget: number,
  remainingBudget: number,
  daysDuration: number,
  startDate: string | null
): boolean => {
  if (remainingBudget < 0) return true;
  
  const daysPassed = calculateDaysPassed(startDate);
  const actualDailySpend = (totalBudget - remainingBudget) / daysPassed;
  const idealDailySpend = totalBudget / daysDuration;

  // Alerta si el gasto actual supera el 20% del presupuesto ideal diario
  return actualDailySpend > idealDailySpend * 1.2;
};

export const formatMoney = (amount: number, currency: string): string => {
  return `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};