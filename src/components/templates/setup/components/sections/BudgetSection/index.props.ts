import { Currency } from "../../../types"; 

export interface BudgetSectionProps {
  currency: Currency;
  budget: string;
  error: string | null;
  isValid: boolean;
  onBudgetChange: (value: string) => void;
}