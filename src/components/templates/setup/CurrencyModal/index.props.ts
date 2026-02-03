export interface Currency {
  symbol: string;
  name: string;
  code: string;
  flag: string;
  locale: string;
}

export interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}