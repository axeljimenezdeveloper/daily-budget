export interface Transaction {
  id: string;
  amount: number;
  date: string;
  category: string;
  note?: string;
}

export interface VaultSummary {
  totalSpent: number;
  daysPassed: number;
  isOverBudget: boolean;
  dailyAverage: number;
}

export interface VaultState {
  // --- Estado ---
  isConfigured: boolean;
  hasFinishedOnboarding: boolean;
  isExtremeMode: boolean;
  totalBudget: number;
  remainingBudget: number;
  transactions: Transaction[];
  daysDuration: number;
  startDate: string | null;
  currency: string;
  language: string;

  // --- Acciones ---
  setFinishedOnboarding: () => void;
  initVault: (amount: number, days: number, currency: string) => void;
  addTransaction: (amount: number, category: string, note?: string) => void;
  resetVault: () => void;
  getSummary: () => VaultSummary;
  setLanguage: (lang: string) => void;
}