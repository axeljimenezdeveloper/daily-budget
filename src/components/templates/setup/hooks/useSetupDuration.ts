// ============================================================================
// HOOK PERSONALIZADO: useSetupDuration
//
// Encapsula toda la lógica de negocio relacionada con la selección de duración
// en el flujo de configuración. Gestiona el período seleccionado, los días
// personalizados, validaciones, cálculos derivados (días reales, presupuesto diario)
// y el estado del modal. Centraliza esta lógica para mantener las pantallas limpias.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// HOOKS Y TIPOS LOCALES
// ----------------------------------------------------------------------------
import { useSetupValidation } from './useSetupValidation';
import { useCurrencyParams } from './useCurrencyParams';
import { PERIOD_OPTIONS, PeriodOption } from '../types';

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * useSetupDuration – Hook que centraliza la lógica de la pantalla de duración.
 *
 * @returns Objeto con:
 *  - currency: Moneda obtenida de los parámetros.
 *  - numericBudget: Presupuesto numérico desde parámetros.
 *  - selectedPeriod: Período actualmente seleccionado.
 *  - setSelectedPeriod: Actualiza el período seleccionado.
 *  - customDays: Valor del input de días personalizados (string).
 *  - setCustomDays: Handler para cambios en días personalizados.
 *  - showPeriodModal: Estado de visibilidad del modal.
 *  - setShowPeriodModal: Controla la visibilidad del modal.
 *  - error: Mensaje de error de validación (null si no hay).
 *  - actualDays: Número real de días (período fijo o custom).
 *  - dailyBudget: Presupuesto diario calculado.
 *  - isDaysValid: Booleano que indica si la duración es válida.
 *  - getPeriodDisplayText: Función que genera el texto a mostrar en el selector.
 *  - getTranslatedOption: Función que traduce una opción de período.
 *  - getInputStatus: Función que retorna el estado visual del input custom.
 */
export const useSetupDuration = () => {
  // --------------------------------------------------------------------------
  // PARÁMETROS DE RUTA Y HOOKS GLOBALES
  // --------------------------------------------------------------------------
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const { validateDays, getInputStatus } = useSetupValidation();
  const currency = useCurrencyParams();

  // --------------------------------------------------------------------------
  // ESTADO LOCAL
  // --------------------------------------------------------------------------
  const [selectedPeriod, setSelectedPeriod] = React.useState<PeriodOption>(PERIOD_OPTIONS[0]); // Semanal por defecto
  const [customDays, setCustomDays] = React.useState('');                 // Días personalizados (vacío inicial)
  const [showPeriodModal, setShowPeriodModal] = React.useState(false);   // Modal cerrado inicialmente
  const [error, setError] = React.useState<string | null>(null);         // Sin error al inicio
  const [isValid, setIsValid] = React.useState(false);                  // Solo se valida en modo custom

  // --------------------------------------------------------------------------
  // VALORES DERIVADOS (MEMOIZADOS)
  // --------------------------------------------------------------------------
  /**
   * Presupuesto en string desde parámetros de ruta.
   */
  const budgetFromParams = React.useMemo(() => {
    return params.budget as string || '';
  }, [params]);

  /**
   * Presupuesto convertido a número (0 si no existe o es inválido).
   */
  const numericBudget = React.useMemo(() => {
    return budgetFromParams ? parseFloat(budgetFromParams) : 0;
  }, [budgetFromParams]);

  /**
   * Días reales: si es período fijo (7,15,30) usa ese valor;
   * si es personalizado, parsea el string a entero (o 0 si falla).
   */
  const actualDays = React.useMemo(() => {
    if (selectedPeriod.value === 0 && customDays) {
      return parseInt(customDays) || 0;
    }
    return selectedPeriod.value;
  }, [selectedPeriod, customDays]);

  /**
   * Presupuesto diario: total / días (solo si ambos son > 0).
   */
  const dailyBudget = React.useMemo(() => {
    if (numericBudget > 0 && actualDays > 0) {
      return numericBudget / actualDays;
    }
    return 0;
  }, [numericBudget, actualDays]);

  // --------------------------------------------------------------------------
  // HANDLERS Y FUNCIONES AUXILIARES
  // --------------------------------------------------------------------------

  /**
   * Maneja los cambios en el campo de días personalizados.
   * - Actualiza el estado local.
   * - Solo valida si el período es personalizado (value === 0).
   */
  const handleCustomDaysChange = (value: string) => {
    setCustomDays(value);
    if (selectedPeriod.value === 0) {
      const validation = validateDays(value);
      setError(validation.error);
      setIsValid(validation.isValid);
    }
  };

  /**
   * Determina si la duración es válida para habilitar el botón de acción.
   * - Períodos fijos siempre son válidos.
   * - Período personalizado requiere que customDays no esté vacío y sea válido.
   */
  const isDaysValid = () => {
    if (selectedPeriod.value !== 0) return true;
    if (!customDays.trim()) return false;
    return isValid;
  };

  /**
   * Genera el texto que se muestra en el componente AppSelect.
   * Para período personalizado: muestra "Personalizado" o "X días".
   * Para períodos fijos: construye etiqueta y descripción traducidas.
   */
  const getPeriodDisplayText = () => {
    if (selectedPeriod.value === 0) {
      return customDays
        ? `${customDays} ${t('common.days', 'días')}`
        : t("setup.period_section.options.custom.label", "Personalizado");
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

    const label = t(
      `setup.period_section.options.${key}.label`,
      selectedPeriod.value === 7 ? "Semanal" :
      selectedPeriod.value === 15 ? "Quincenal" :
      selectedPeriod.value === 30 ? "Mensual" : "Personalizado"
    );

    const description = t(
      `setup.period_section.options.${key}.description`,
      selectedPeriod.value === 7 ? "7 días" :
      selectedPeriod.value === 15 ? "15 días" :
      selectedPeriod.value === 30 ? "30 días" : "Elige tus días"
    );

    return `${label} - ${description}`;
  };

  /**
   * Traduce dinámicamente una opción de período según el idioma activo.
   * Utilizada dentro del PeriodModal para mostrar etiquetas localizadas.
   */
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

  // --------------------------------------------------------------------------
  // EXPOSICIÓN DEL API DEL HOOK
  // --------------------------------------------------------------------------
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