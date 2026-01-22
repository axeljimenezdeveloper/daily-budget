import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VaultState, Transaction } from "./index.types";
import { calculateDaysPassed, checkExtremeMode } from "./index.utils";

export const useVaultStore = create<VaultState>()(
  persist(
    (set, get) => ({
      // --- Estado Inicial ---
      totalBudget: 0,
      remainingBudget: 0,
      transactions: [],
      daysDuration: 0,
      startDate: null,
      isConfigured: false,
      hasFinishedOnboarding: false,
      isExtremeMode: false,
      currency: "$",

      // --- Acciones ---
      setFinishedOnboarding: () => set({ hasFinishedOnboarding: true }),

      initVault: (
        amount,
        days,
        currency, 
      ) =>
        set({
          totalBudget: amount,
          remainingBudget: amount,
          daysDuration: days,
          currency: currency, 
          startDate: new Date().toISOString(),
          transactions: [],
          isConfigured: true,
          isExtremeMode: false,
        }),

      addTransaction: (amount, category, note) =>
        set((state) => {
          const newTransaction: Transaction = {
            id: Date.now().toString(),
            amount,
            category,
            note,
            date: new Date().toISOString(),
          };

          const newRemaining = state.remainingBudget - amount;

          const shouldBeExtreme = checkExtremeMode(
            state.totalBudget,
            newRemaining,
            state.daysDuration,
            state.startDate,
          );

          return {
            remainingBudget: newRemaining,
            transactions: [newTransaction, ...state.transactions],
            isExtremeMode: shouldBeExtreme,
          };
        }),

      resetVault: () =>
        set({
          totalBudget: 0,
          remainingBudget: 0,
          transactions: [],
          daysDuration: 0,
          startDate: null,
          isConfigured: false,
          isExtremeMode: false,
        }),

      getSummary: () => {
        const state = get();
        const totalSpent = state.totalBudget - state.remainingBudget;
        const daysPassed = calculateDaysPassed(state.startDate);

        return {
          totalSpent,
          daysPassed,
          isOverBudget: state.remainingBudget < 0,
          dailyAverage: totalSpent / daysPassed,
        };
      },
    }),
    {
      name: "vault-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
