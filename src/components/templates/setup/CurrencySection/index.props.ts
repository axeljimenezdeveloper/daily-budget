export interface Currency {
  symbol: string;
  name: string;
  code: string;
  flag: string;
  locale: string;
}

export interface CurrencySectionProps {
  currency: Currency;
  onPressCurrency: () => void;
}