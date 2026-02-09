import { PeriodOption } from '../types';

export const PERIOD_OPTIONS: PeriodOption[] = [
  { label: "Semanal", value: 7, description: "7 días" },
  { label: "Quincenal", value: 15, description: "15 días" },
  { label: "Mensual", value: 30, description: "30 días" },
  { label: "Personalizado", value: 0, description: "Elige tus días" },
];

export const MIN_DAYS = 1;
export const MAX_DAYS = 365;