import { useState, useMemo, useCallback } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next"; 
import { useVaultStore } from "@/store/useVaultStore";
import { formatMoney } from "@/store/useVaultStore/index.utils";
import {
  CURRENCY_LIST,
  PERIOD_OPTIONS,
  MIN_BUDGET,
  MAX_BUDGET,
  MIN_DAYS,
  MAX_DAYS,
} from "../constants/setup";

// Interfaz para Currency (local)
interface Currency {
  symbol: string;
  name: string;
  code: string;
  flag: string;
  locale: string;
}

export const useSetupForm = () => {
  const router = useRouter();
  const { t } = useTranslation(); // <-- Inicializar hook de traducción
  const { initVault, setFinishedOnboarding } = useVaultStore();

  const [currency, setCurrency] = useState<Currency>(CURRENCY_LIST[0]);
  const [budget, setBudget] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState(PERIOD_OPTIONS[0]);
  const [customDays, setCustomDays] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const numericBudget = useMemo(() => budget ? parseFloat(budget) : 0, [budget]);
  const actualDays = useMemo(() => 
    selectedPeriod.value === 0 && customDays ? parseInt(customDays) : selectedPeriod.value, 
    [selectedPeriod, customDays]
  );
  const dailyBudget = useMemo(() => 
    numericBudget > 0 && actualDays > 0 ? numericBudget / actualDays : 0, 
    [numericBudget, actualDays]
  );

  const isBudgetValid = budget && numericBudget >= MIN_BUDGET && numericBudget <= MAX_BUDGET;
  const isDaysValid = selectedPeriod.value !== 0 || 
    (customDays && parseInt(customDays) >= MIN_DAYS && parseInt(customDays) <= MAX_DAYS);
  const formCompletion = (isBudgetValid ? 0.5 : 0) + (isDaysValid ? 0.5 : 0);

  // Función de validación de presupuesto con traducción
  const validateBudget = useCallback((value: string, curr: Currency): string | null => {
    if (!value) {
      return t("validation.budget_required", "Ingresa un presupuesto");
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return t("validation.valid_number", "Ingresa un número válido");
    }
    
    if (numValue < MIN_BUDGET) {
      return t("validation.min_budget", "Mínimo {{amount}}", {
        amount: formatMoney(MIN_BUDGET, curr.symbol)
      });
    }
    
    if (numValue > MAX_BUDGET) {
      return t("validation.max_budget", "Máximo {{amount}}", {
        amount: formatMoney(MAX_BUDGET, curr.symbol)
      });
    }
    
    return null;
  }, [t]);

  // Función de validación de días con traducción y pluralización
  const validateDays = useCallback((value: string): string | null => {
    if (!value) {
      return t("validation.days_required", "Ingresa la cantidad de días");
    }
    
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      return t("validation.valid_number", "Ingresa un número válido");
    }
    
    if (numValue < MIN_DAYS) {
      return t("validation.min_days", "Mínimo {{count}} día", {
        count: MIN_DAYS
      });
    }
    
    if (numValue > MAX_DAYS) {
      return t("validation.max_days", "Máximo {{count}} días (1 año)", {
        count: MAX_DAYS
      });
    }
    
    return null;
  }, [t]);

  // Validación en tiempo real del presupuesto
  const handleBudgetChange = useCallback((value: string) => {
    setBudget(value);
    
    const newErrors = { ...errors };
    const error = validateBudget(value, currency);
    
    if (error) {
      newErrors.budget = error;
    } else {
      delete newErrors.budget;
    }
    
    setErrors(newErrors);
  }, [errors, currency, validateBudget]);

  // Validación en tiempo real de los días personalizados
  const handleCustomDaysChange = useCallback((value: string) => {
    setCustomDays(value);
    
    const newErrors = { ...errors };
    const error = validateDays(value);
    
    if (error) {
      newErrors.days = error;
    } else {
      delete newErrors.days;
    }
    
    setErrors(newErrors);
  }, [errors, validateDays]);

  // Validación completa del formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validación de presupuesto
    const budgetError = validateBudget(budget, currency);
    if (budgetError) {
      newErrors.budget = budgetError;
    }
    
    // Validación de días personalizados
    if (selectedPeriod.value === 0) {
      const daysError = validateDays(customDays);
      if (daysError) {
        newErrors.days = daysError;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del cambio de moneda
  const handleCurrencyChange = useCallback((newCurrency: Currency) => {
    setCurrency(newCurrency);
    
    // Revalidar el presupuesto si hay un error existente
    const newErrors = { ...errors };
    
    if (errors.budget) {
      const budgetError = validateBudget(budget, newCurrency);
      if (budgetError) {
        newErrors.budget = budgetError;
      } else {
        delete newErrors.budget;
      }
    }
    
    setErrors(newErrors);
  }, [budget, errors, validateBudget]);

  // Manejo del cambio de período
  const handlePeriodChange = useCallback((newPeriod: typeof PERIOD_OPTIONS[0]) => {
    setSelectedPeriod(newPeriod);
    
    // Limpiar error de días si ya no es período personalizado
    if (newPeriod.value !== 0) {
      const newErrors = { ...errors };
      delete newErrors.days;
      setErrors(newErrors);
    }
  }, [errors]);

  const executeSetup = async () => {
    setIsProcessing(true);
    setShowConfirmation(false);
    try {
      initVault(numericBudget, actualDays, currency.symbol);
      setFinishedOnboarding();
      setTimeout(() => router.replace("/(main)"), 1500);
    } catch (error) {
      Alert.alert(
        t("common.error", "Error"),
        t("setup.vault_config_error", "No pudimos configurar tu bóveda.")
      );
      setIsProcessing(false);
    }
  };

  return {
    // Estado
    currency,
    budget,
    selectedPeriod,
    customDays,
    isProcessing,
    showConfirmation,
    showPeriodModal,
    showCurrencyModal,
    errors,
    // Cálculos
    numericBudget,
    actualDays,
    dailyBudget,
    formCompletion,
    // Setters mejorados con validación en tiempo real
    setCurrency: handleCurrencyChange,
    setBudget: handleBudgetChange,
    setSelectedPeriod: handlePeriodChange,
    setCustomDays: handleCustomDaysChange,
    setShowConfirmation,
    setShowPeriodModal,
    setShowCurrencyModal,
    // Funciones
    validateForm,
    executeSetup,
    // Constantes
    CURRENCY_LIST,
    PERIOD_OPTIONS,
    MIN_BUDGET,
    MAX_BUDGET,
    MIN_DAYS,
    MAX_DAYS,
  };
};