export type IconLibrary = 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome' | 'MaterialIcons';

export interface OnboardingStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description: string | React.ReactNode;
  iconName: string;
  iconLibrary?: IconLibrary; 
  buttonText: string;
  onNext: () => void;
  onSkip: () => void;
  skipButtonText?: string;
  buttonStatus?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral';
  iconRotation?: number;
}