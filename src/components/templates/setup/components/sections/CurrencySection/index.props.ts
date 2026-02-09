import { Currency } from "../../../types"; 

export interface CurrencySectionProps {
  currency: Currency;
  onOpenModal: () => void;
}