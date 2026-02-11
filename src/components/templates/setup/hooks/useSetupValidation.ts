// ============================================================================
// HOOK PERSONALIZADO DE VALIDACIÓN PARA EL FLUJO DE CONFIGURACIÓN
//
// Contiene todas las reglas de validación utilizadas en las pantallas
// de configuración (presupuesto y duración). Centraliza los mensajes de error
// traducidos y los límites numéricos definidos en las constantes del template.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// CONSTANTES DE VALIDACIÓN
// ----------------------------------------------------------------------------
import { MIN_BUDGET, MAX_BUDGET } from '../constants/validation';
import { MIN_DAYS, MAX_DAYS } from '../constants/periods';

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * useSetupValidation – Hook que provee funciones de validación para setup.
 *
 * @returns Objeto con:
 *  - validateBudget: Valida el monto del presupuesto.
 *  - validateDays: Valida la cantidad de días personalizados.
 *  - getInputStatus: Determina el estado visual del input (error/success/neutral).
 *  - MIN_BUDGET, MAX_BUDGET, MIN_DAYS, MAX_DAYS: Constantes re-exportadas.
 */
export const useSetupValidation = () => {
  const { t } = useTranslation();

  // --------------------------------------------------------------------------
  // VALIDACIÓN DE PRESUPUESTO
  // --------------------------------------------------------------------------

  /**
   * Valida el valor ingresado en el campo de presupuesto.
   *
   * @param value - String ingresado por el usuario.
   * @param currencySymbol - Símbolo monetario para mostrar en mensajes de error.
   * @returns Objeto con `isValid` (boolean) y `error` (string | null).
   *
   * @remarks
   * - No puede estar vacío.
   * - Debe ser un número válido.
   * - No puede ser menor a MIN_BUDGET.
   * - No puede ser mayor a MAX_BUDGET.
   */
  const validateBudget = (value: string, currencySymbol: string = "$") => {
    if (!value.trim()) {
      return {
        isValid: false,
        error: t("validation.budget.required", "Necesito saber tu presupuesto"),
      };
    }

    const numValue = parseFloat(value);

    if (isNaN(numValue)) {
      return {
        isValid: false,
        error: t("validation.budget.valid_number", "Por favor, escribe un número válido"),
      };
    }

    if (numValue < MIN_BUDGET) {
      return {
        isValid: false,
        error: t("validation.budget.minimum", "Necesitas al menos {{amount}}", {
          amount: `${MIN_BUDGET} ${currencySymbol}`,
        }),
      };
    }

    if (numValue > MAX_BUDGET) {
      return {
        isValid: false,
        error: t("validation.budget.maximum", "El máximo es {{amount}}", {
          amount: `${MAX_BUDGET.toLocaleString()} ${currencySymbol}`,
        }),
      };
    }

    return { isValid: true, error: null };
  };

  // --------------------------------------------------------------------------
  // VALIDACIÓN DE DÍAS PERSONALIZADOS
  // --------------------------------------------------------------------------

  /**
   * Valida el valor ingresado en el campo de días personalizados.
   *
   * @param value - String ingresado por el usuario.
   * @returns Objeto con `isValid` (boolean) y `error` (string | null).
   *
   * @remarks
   * - No puede estar vacío.
   * - Debe ser un número entero válido.
   * - No puede ser menor a MIN_DAYS.
   * - No puede ser mayor a MAX_DAYS.
   */
  const validateDays = (value: string) => {
    if (!value.trim()) {
      return {
        isValid: false,
        error: t("validation.days.required", "Necesito saber para cuántos días"),
      };
    }

    const numValue = parseInt(value);

    if (isNaN(numValue)) {
      return {
        isValid: false,
        error: t("validation.budget.valid_number", "Por favor, escribe un número válido"),
      };
    }

    if (numValue < MIN_DAYS) {
      return {
        isValid: false,
        error: t("validation.days.minimum", "Al menos {{count}} día", {
          count: MIN_DAYS,
        }),
      };
    }

    if (numValue > MAX_DAYS) {
      return {
        isValid: false,
        error: t("validation.days.maximum", "Máximo {{count}} días (un año)", {
          count: MAX_DAYS,
        }),
      };
    }

    return { isValid: true, error: null };
  };

  // --------------------------------------------------------------------------
  // ESTADO VISUAL DEL INPUT
  // --------------------------------------------------------------------------

  /**
   * Determina el estado visual de un input basado en la validación.
   *
   * @param error - Mensaje de error actual (null si no hay error).
   * @param isValid - Si el valor es válido.
   * @param hasValue - Si el input tiene contenido (no vacío).
   * @returns "error" | "success" | "neutral"
   */
  const getInputStatus = (error: string | null, isValid: boolean, hasValue: boolean) => {
    if (error) return "error";
    if (isValid && hasValue) return "success";
    return "neutral";
  };

  // --------------------------------------------------------------------------
  // API PÚBLICA DEL HOOK
  // --------------------------------------------------------------------------
  return {
    validateBudget,
    validateDays,
    getInputStatus,
    MIN_BUDGET,
    MAX_BUDGET,
    MIN_DAYS,
    MAX_DAYS,
  };
};