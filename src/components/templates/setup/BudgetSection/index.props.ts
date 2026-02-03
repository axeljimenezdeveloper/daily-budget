export interface PeriodOption {
  label: string;
  value: number;
  description: string;
}

export interface Currency {
  symbol: string;
  name: string;
  code: string;
  flag: string;
  locale: string;
}

export interface BudgetSectionProps {
  budget: string;
  setBudget: (value: string) => void;
  currency: Currency;
  selectedPeriod: PeriodOption;
  customDays: string;
  setCustomDays: (value: string) => void;
  errors: Record<string, string>;
  onPressPeriod: () => void;
  numericBudget: number;
  actualDays: number;
  dailyBudget: number;
}