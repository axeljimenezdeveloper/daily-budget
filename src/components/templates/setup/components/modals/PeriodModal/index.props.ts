import { PeriodOption } from "../../../types"; 

export interface PeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPeriod: PeriodOption;
  onSelectPeriod: (option: PeriodOption) => void;
}