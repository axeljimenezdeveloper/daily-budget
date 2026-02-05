// /src/components/templates/setup/hooks/useSetupForm.ts
import { useState, useMemo, useCallback, useEffect } from "react";
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

// Interfaz para PeriodOption
interface PeriodOption {
  label: string;
  value: number;
  description: string;
}

export const useSetupForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { initVault, setFinishedOnboarding } = useVaultStore();

  // Estado para el setup dividido en tres pantallas
  const [currency, setCurrency] = useState<Currency>(CURRENCY_LIST[0]);
  const [budget, setBudget] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>(PERIOD_OPTIONS[0]);
  const [customDays, setCustomDays] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Función para traducir una opción de período
  const translatePeriodOption = useCallback((option: PeriodOption): PeriodOption => {
    const translations: Record<number, { label: string; description: string }> = {
      7: {
        label: t("setup.period_options.weekly.label"),
        description: t("setup.period_options.weekly.description"),
      },
      15: {
        label: t("setup.period_options.biweekly.label"),
        description: t("setup.period_options.biweekly.description"),
      },
      30: {
        label: t("setup.period_options.monthly.label"),
        description: t("setup.period_options.monthly.description"),
      },
      0: {
        label: t("setup.period_options.custom.label"),
        description: t("setup.period_options.custom.description"),
      },
    };

    const translation = translations[option.value] || {
      label: t("setup.period_custom"),
      description: ""
    };

    return {
      ...option,
      label: translation.label,
      description: translation.description
    };
  }, [t]);

  // Efecto para actualizar el selectedPeriod cuando cambia el idioma
  useEffect(() => {
    setSelectedPeriod(prev => translatePeriodOption(prev));
  }, [t, translatePeriodOption]);

  // Cálculos derivados
  const numericBudget = useMemo(() => budget ? parseFloat(budget) : 0, [budget]);
  const actualDays = useMemo(() => 
    selectedPeriod.value === 0 && customDays ? parseInt(customDays) : selectedPeriod.value, 
    [selectedPeriod, customDays]
  );
  const dailyBudget = useMemo(() => 
    numericBudget > 0 && actualDays > 0 ? numericBudget / actualDays : 0, 
    [numericBudget, actualDays]
  );

  // Validaciones para el setup dividido - CORREGIDO: asegurar tipo booleano
  const isCurrencySelected = useMemo(() => Boolean(currency && currency.code !== undefined), [currency]);
  
  const isBudgetValid = useMemo(() => {
    if (!budget.trim()) return false;
    const num = numericBudget;
    return !isNaN(num) && num >= MIN_BUDGET && num <= MAX_BUDGET;
  }, [budget, numericBudget]);
  
  const isDaysValid = useMemo(() => {
    if (selectedPeriod.value !== 0) return true;
    if (!customDays.trim()) return false;
    const days = parseInt(customDays);
    return !isNaN(days) && days >= MIN_DAYS && days <= MAX_DAYS;
  }, [selectedPeriod, customDays]);

  // Porcentaje de completitud para el setup dividido
  const currencyCompletion = isCurrencySelected ? 0.33 : 0;
  const budgetCompletion = isBudgetValid ? 0.33 : 0;
  const durationCompletion = isDaysValid ? 0.34 : 0;
  const formCompletion = currencyCompletion + budgetCompletion + durationCompletion;

  // Función de validación de presupuesto con traducción
  const validateBudget = useCallback((value: string, curr: Currency): string | null => {
    if (!value.trim()) {
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

  // Función de validación de días con traducción
  const validateDays = useCallback((value: string): string | null => {
    if (!value.trim()) {
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

  // Validación completa del formulario para la pantalla final
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
  const handlePeriodChange = useCallback((newPeriod: PeriodOption) => {
    const translatedPeriod = translatePeriodOption(newPeriod);
    setSelectedPeriod(translatedPeriod);
    
    // Limpiar error de días si ya no es período personalizado
    if (newPeriod.value !== 0) {
      const newErrors = { ...errors };
      delete newErrors.days;
      setErrors(newErrors);
    }
  }, [errors, translatePeriodOption]);

  // Función para ejecutar el setup completo
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

  // Función para validar solo la moneda (para setup-currency)
  const validateCurrency = (): boolean => {
    return isCurrencySelected;
  };

  // Función para validar solo el presupuesto (para setup-budget)
  const validateBudgetStep = (): boolean => {
    const error = validateBudget(budget, currency);
    if (error) {
      setErrors({...errors, budget: error});
      return false;
    }
    return true; // Si no hay error, el presupuesto es válido
  };

  // Función para validar solo la duración (para setup-duration)
  const validateDurationStep = (): boolean => {
    if (selectedPeriod.value === 0) {
      const error = validateDays(customDays);
      if (error) {
        setErrors({...errors, days: error});
        return false;
      }
    }
    return true; // Si no hay error, la duración es válida
  };

  // Función para obtener PERIOD_OPTIONS traducidas
  const getTranslatedPeriodOptions = useCallback((): PeriodOption[] => {
    return PERIOD_OPTIONS.map(option => translatePeriodOption(option));
  }, [translatePeriodOption]);

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
    
    // Validaciones por paso (booleanas)
    isCurrencySelected,
    isBudgetValid,
    isDaysValid,
    
    // Setters mejorados con validación en tiempo real
    setCurrency: handleCurrencyChange,
    setBudget: handleBudgetChange,
    setSelectedPeriod: handlePeriodChange,
    setCustomDays: handleCustomDaysChange,
    setShowConfirmation,
    setShowPeriodModal,
    setShowCurrencyModal,
    
    // Funciones de validación por paso (retornan boolean)
    validateCurrency,
    validateBudgetStep,
    validateDurationStep,
    validateForm,
    
    // Función principal
    executeSetup,
    
    // Constantes
    CURRENCY_LIST,
    PERIOD_OPTIONS,
    MIN_BUDGET,
    MAX_BUDGET,
    MIN_DAYS,
    MAX_DAYS,
    
    // Función de traducción de períodos
    translatePeriodOption,
    getTranslatedPeriodOptions,
  };
};