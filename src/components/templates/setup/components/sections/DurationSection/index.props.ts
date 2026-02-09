import { Currency, PeriodOption } from "../../../types"; 

export interface DurationSectionProps {
  currency: Currency;
  numericBudget: number;
  selectedPeriod: PeriodOption;
  customDays: string;
  error: string | null;
  actualDays: number;
  dailyBudget: number;
  isDaysValid: boolean;
  getPeriodDisplayText: () => string;
  getInputStatus: () => "error" | "success" | "neutral";
  onOpenModal: () => void;
  onCustomDaysChange: (value: string) => void;
}