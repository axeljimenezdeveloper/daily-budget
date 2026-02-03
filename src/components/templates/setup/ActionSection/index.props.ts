export interface ActionSectionProps {
  formCompletion: number;
  isProcessing: boolean;
  validateForm: () => boolean;
  setShowConfirmation: (show: boolean) => void;
}