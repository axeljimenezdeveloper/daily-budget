import { useTranslation } from 'react-i18next';
import { MIN_BUDGET, MAX_BUDGET } from '../constants/validation';
import { MIN_DAYS, MAX_DAYS } from '../constants/periods';

export const useSetupValidation = () => {
  const { t } = useTranslation();

  const validateBudget = (value: string, currencySymbol: string = "$") => {
    if (!value.trim()) {
      return { 
        isValid: false, 
        error: t("validation.budget.required", "Necesito saber tu presupuesto") 
      };
    }

    const numValue = parseFloat(value);

    if (isNaN(numValue)) {
      return { 
        isValid: false, 
        error: t("validation.budget.valid_number", "Por favor, escribe un número válido") 
      };
    }

    if (numValue < MIN_BUDGET) {
      return { 
        isValid: false, 
        error: t("validation.budget.minimum", "Necesitas al menos {{amount}}", {
          amount: `${MIN_BUDGET} ${currencySymbol}`
        }) 
      };
    }

    if (numValue > MAX_BUDGET) {
      return { 
        isValid: false, 
        error: t("validation.budget.maximum", "El máximo es {{amount}}", {
          amount: `${MAX_BUDGET.toLocaleString()} ${currencySymbol}`
        }) 
      };
    }

    return { isValid: true, error: null };
  };

  const validateDays = (value: string) => {
    if (!value.trim()) {
      return { 
        isValid: false, 
        error: t("validation.days.required", "Necesito saber para cuántos días") 
      };
    }

    const numValue = parseInt(value);

    if (isNaN(numValue)) {
      return { 
        isValid: false, 
        error: t("validation.budget.valid_number", "Por favor, escribe un número válido") 
      };
    }

    if (numValue < MIN_DAYS) {
      return { 
        isValid: false, 
        error: t("validation.days.minimum", "Al menos {{count}} día", {
          count: MIN_DAYS
        }) 
      };
    }

    if (numValue > MAX_DAYS) {
      return { 
        isValid: false, 
        error: t("validation.days.maximum", "Máximo {{count}} días (un año)", {
          count: MAX_DAYS
        }) 
      };
    }

    return { isValid: true, error: null };
  };

  const getInputStatus = (error: string | null, isValid: boolean, hasValue: boolean) => {
    if (error) return "error";
    if (isValid && hasValue) return "success";
    return "neutral";
  };

  return {
    validateBudget,
    validateDays,
    getInputStatus,
    MIN_BUDGET,
    MAX_BUDGET,
    MIN_DAYS,
    MAX_DAYS
  };
};