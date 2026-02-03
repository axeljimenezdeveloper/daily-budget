export interface PeriodOption {
  label: string;
  value: number;
  description: string;
}

export interface PeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPeriod: PeriodOption;
  setSelectedPeriod: (period: PeriodOption) => void;
}