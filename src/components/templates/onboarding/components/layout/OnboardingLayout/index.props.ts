export interface OnboardingLayoutProps {
  children: React.ReactNode;
  onSkip: () => void;
  skipButtonText?: string;
  currentStep: number;
  totalSteps: number;
  showProgress?: boolean;
}