export interface Currency {
  symbol: string;
  name: string;
  code: string;
  flag: string;
  locale: string;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  numericBudget: number;
  actualDays: number;
  dailyBudget: number;
  currency: Currency;
  executeSetup: () => Promise<void>;
}