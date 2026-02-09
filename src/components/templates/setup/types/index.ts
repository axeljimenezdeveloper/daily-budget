export interface Currency {
  symbol: string;
  name: string;
  code: string;
  flag: string;
  locale: string;
}

export interface PeriodOption {
  label: string;
  value: number;
  description: string;
}

export interface SetupStepLayoutProps {
  title: string;
  description?: string;
  totalSteps: number;
  currentStep: number;
  children: React.ReactNode;
  actionButtonText: string;
  onActionPress: () => void;
  isActionDisabled?: boolean;
  isProcessing?: boolean;
  onBackPress: () => void;
  iconName?: string;
  backgroundColor?: string;
  accentColor?: string;
  showBackButton?: boolean;
}

import { PERIOD_OPTIONS as PERIODS } from '../constants/periods';
export const PERIOD_OPTIONS = PERIODS;