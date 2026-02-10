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
      return customDays ? `${customDays} ${t('common.days', 'días')}` : t("setup.period_section.options.custom.label", "Personalizado");
    }
    
    let key: string;
    switch (selectedPeriod.value) {
      case 7:
        key = "weekly";
        break;
      case 15:
        key = "biweekly";
        break;
      case 30:
        key = "monthly";
        break;
      default:
        key = "custom";
    }
    
    const label = t(`setup.period_section.options.${key}.label`, 
      selectedPeriod.value === 7 ? "Semanal" :
      selectedPeriod.value === 15 ? "Quincenal" :
      selectedPeriod.value === 30 ? "Mensual" : "Personalizado"
    );
    
    const description = t(`setup.period_section.options.${key}.description`, 
      selectedPeriod.value === 7 ? "7 días" :
      selectedPeriod.value === 15 ? "15 días" :
      selectedPeriod.value === 30 ? "30 días" : "Elige tus días"
    );
    
    return `${label} - ${description}`;
  };

  const getTranslatedOption = (option: PeriodOption) => {
    let key: string;
    switch (option.value) {
      case 7:
        key = "weekly";
        break;
      case 15:
        key = "biweekly";
        break;
      case 30:
        key = "monthly";
        break;
      case 0:
        key = "custom";
        break;
      default:
        key = "custom";
    }

    return {
      label: t(`setup.period_section.options.${key}.label`, option.label),
      description: t(`setup.period_section.options.${key}.description`, option.description),
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