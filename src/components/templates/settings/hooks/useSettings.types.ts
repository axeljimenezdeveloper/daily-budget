// ============================================================================
// TIPOS DEL HOOK useSettings
// ============================================================================

export interface UseSettingsReturn {
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  totalBudget: number;
  daysDuration: number;
  startDate: string | null;
  isExtremeMode: boolean;
  currency: string;
  isBiometricEnabled: boolean;
  dailyReminder: boolean;
  extremeModeAlert: boolean;
  budgetExceededAlert: boolean;
  reminderTime: string;
  hapticFeedback: boolean;
  isSaving: boolean;
  isExporting: boolean;
  exportError: string | null;
  isBackupExporting: boolean;
  backupExportError: string | null;
  isImporting: boolean;
  importError: string | null;
  hasHardware: boolean | null;
  isEnrolled: boolean | null;
  biometricAvailabilityLoading: boolean;
  authLoading: boolean;
  biometricToggleLoading: boolean;
  remainingDays: number;
  daysPassed: number;
  showLanguageModal: boolean;
  showResetModal: boolean;
  setShowLanguageModal: (show: boolean) => void;
  setShowResetModal: (show: boolean) => void;
  handleBiometricToggle: (newValue: boolean) => Promise<void>;
  handleEditPlan: () => void;
  handleExportCSV: () => Promise<void>;
  handleResetConfirm: () => void;
  handleDailyReminderChange: (value: boolean) => void;
  handleExtremeAlertChange: (value: boolean) => void;
  handleBudgetExceededChange: (value: boolean) => void;
  handleReminderTimeChange: (time: string) => void;
  handleHapticToggle: (value: boolean) => void;
  handleTestNotification: () => Promise<void>;
  handleLanguageSelect: (lang: 'es' | 'en') => void;
  handleBackupExport: () => Promise<void>;
  handleBackupImport: () => Promise<void>;
}