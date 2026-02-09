import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSetupValidation } from './useSetupValidation';
import { useCurrencyParams } from './useCurrencyParams';
import { PERIOD_OPTIONS, PeriodOption } from '../types';

export const useSetupDuration = () => {
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const { validateDays, getInputStatus } = useSetupValidation();
  const currency = useCurrencyParams();

  const [selectedPeriod, setSelectedPeriod] = React.useState<PeriodOption>(PERIOD_OPTIONS[0]);
  const [customDays, setCustomDays] = React.useState('');
  const [showPeriodModal, setShowPeriodModal] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isValid, setIsValid] = React.useState(false);

  const budgetFromParams = React.useMemo(() => {
    return params.budget as string || '';
  }, [params]);

  const numericBudget = React.useMemo(() => {
    return budgetFromParams ? parseFloat(budgetFromParams) : 0;
  }, [budgetFromParams]);

  // Cálculos
  const actualDays = React.useMemo(() => {
    if (selectedPeriod.value === 0 && customDays) {
      return parseInt(customDays) || 0;
    }
    return selectedPeriod.value;
  }, [selectedPeriod, customDays]);

  const dailyBudget = React.useMemo(() => {
    if (numericBudget > 0 && actualDays > 0) {
      return numericBudget / actualDays;
    }
    return 0;
  }, [numericBudget, actualDays]);

  const handleCustomDaysChange = (value: string) => {
    setCustomDays(value);
    if (selectedPeriod.value === 0) {
      const validation = validateDays(value);
      setError(validation.error);
      setIsValid(validation.isValid);
    }
  };

  const isDaysValid = () => {
    if (selectedPeriod.value !== 0) return true;
    if (!customDays.trim()) return false;
    return isValid;
  };

  const getPeriodDisplayText = () => {
    if (selectedPeriod.value === 0) {
      return t("setup.period_custom", "Personalizado");
    }
    
    const translations: Record<number, string> = {
      7: t("setup.period_options.weekly.label", "Semanal"),
      15: t("setup.period_options.biweekly.label", "Quincenal"),
      30: t("setup.period_options.monthly.label", "Mensual"),
      0: t("setup.period_options.custom.label", "Personalizado"),
    };
    
    return translations[selectedPeriod.value] || selectedPeriod.label;
  };

  const getTranslatedOption = (option: PeriodOption) => {
    const translations: Record<number, { label: string; description: string }> = {
      7: {
        label: t("setup.period_options.weekly.label", "Semanal"),
        description: t("setup.period_options.weekly.description", "7 días"),
      },
      15: {
        label: t("setup.period_options.biweekly.label", "Quincenal"),
        description: t("setup.period_options.biweekly.description", "15 días"),
      },
      30: {
        label: t("setup.period_options.monthly.label", "Mensual"),
        description: t("setup.period_options.monthly.description", "30 días"),
      },
      0: {
        label: t("setup.period_options.custom.label", "Personalizado"),
        description: t("setup.period_options.custom.description", "Elige tus días"),
      },
    };

    return translations[option.value] || { 
      label: t("setup.period_custom", "Personalizado"), 
      description: "" 
    };
  };

  return {
    currency,
    numericBudget,
    selectedPeriod,
    setSelectedPeriod,
    customDays,
    setCustomDays: handleCustomDaysChange,
    showPeriodModal,
    setShowPeriodModal,
    error,
    actualDays,
    dailyBudget,
    isDaysValid: isDaysValid(),
    getPeriodDisplayText,
    getTranslatedOption,
    getInputStatus: () => getInputStatus(error, isValid, !!customDays.trim()),
  };
};