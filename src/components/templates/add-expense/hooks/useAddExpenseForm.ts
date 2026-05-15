// ============================================================================
// HOOK PERSONALIZADO: useAddExpenseForm
//
// Encapsula toda la lógica del formulario de registro de gastos:
//   - Estado de los campos (amount, categoryId, note)
//   - Validaciones en tiempo real y en envío
//   - Envío al store (addTransaction)
//   - Feedback con toasts y ejecución de callback opcional al éxito
//
// Este hook NO maneja navegación; el componente que lo consume decide qué hacer
// tras un envío exitoso (ej. cerrar modal, limpiar formulario, etc.).
// ============================================================================

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useVaultStore } from '@/store/useVaultStore';
import { useToast } from '@/hooks/useToast';
import { FormData, ValidationErrors } from '../types';

// ----------------------------------------------------------------------------
// CONSTANTES LOCALES
// ----------------------------------------------------------------------------

/**
 * Estado inicial del formulario.
 * - amount: vacío (string vacío)
 * - categoryId: vacío (obligatorio seleccionar)
 * - note: vacío (opcional)
 */
const INITIAL_FORM_DATA: FormData = {
  amount: '',
  categoryId: '',
  note: '',
};

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * Opciones de configuración del hook.
 */
interface UseAddExpenseFormOptions {
  /**
   * Si es true, valida que el monto no supere el presupuesto restante.
   * @default true
   */
  validateBudget?: boolean;
  /**
   * Callback que se ejecuta después de guardar exitosamente el gasto.
   * Útil para cerrar un modal o limpiar el formulario.
   */
  onSuccess?: () => void;
}

/**
 * Hook que gestiona el formulario de nuevo gasto.
 *
 * @param options - Opciones de configuración (validateBudget, onSuccess)
 * @returns Objeto con:
 *   - formData: Estado actual de los campos.
 *   - errors: Errores de validación actuales.
 *   - isSubmitting: Flag que indica si se está enviando (útil para deshabilitar botones).
 *   - setAmount: Actualiza el campo amount y dispara validación.
 *   - setCategoryId: Actualiza categoryId y limpia error de categoría.
 *   - setNote: Actualiza nota (sin validación).
 *   - handleSubmit: Función asíncrona para enviar el gasto.
 *   - resetForm: Reinicia el formulario al estado inicial.
 */
export const useAddExpenseForm = (options?: UseAddExpenseFormOptions) => {
  const { validateBudget = true, onSuccess } = options || {};

  // --------------------------------------------------------------------------
  // DEPENDENCIAS EXTERNAS
  // --------------------------------------------------------------------------
  const { t } = useTranslation();
  const toast = useToast();

  // Selectores finos del store (solo lo necesario)
  const addTransaction = useVaultStore((state) => state.addTransaction);
  const remainingBudget = useVaultStore((state) => state.remainingBudget);

  // --------------------------------------------------------------------------
  // ESTADOS LOCALES
  // --------------------------------------------------------------------------
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --------------------------------------------------------------------------
  // FUNCIONES DE ACTUALIZACIÓN DE CAMPOS
  // --------------------------------------------------------------------------

  /**
   * Actualiza el monto y ejecuta validación en tiempo real.
   * @param value - String ingresado en el campo (puede contener punto decimal).
   */
  const setAmount = useCallback(
    (value: string) => {
      setFormData((prev) => ({ ...prev, amount: value }));

      // Validación en tiempo real (solo si hay valor)
      if (value.trim() === '') {
        setErrors((prev) => ({ ...prev, amount: undefined }));
        return;
      }

      const numericAmount = parseFloat(value);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        setErrors((prev) => ({
          ...prev,
          amount: t('addExpense.validation_amount_positive'),
        }));
        return;
      }

      if (validateBudget && numericAmount > remainingBudget) {
        setErrors((prev) => ({
          ...prev,
          amount: t('addExpense.validation_amount_exceeds_budget'),
        }));
        return;
      }

      // Si pasa todas las validaciones, limpiamos el error de amount
      setErrors((prev) => ({ ...prev, amount: undefined }));
    },
    [t, validateBudget, remainingBudget]
  );

  /**
   * Actualiza la categoría seleccionada y limpia el error asociado.
   * @param value - ID de la categoría (ej. 'food', 'transport').
   */
  const setCategoryId = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, categoryId: value }));
    // Limpia el error de categoría al seleccionar una
    setErrors((prev) => ({ ...prev, category: undefined }));
  }, []);

  /**
   * Actualiza la nota opcional.
   * No dispara validación.
   * @param value - Texto de la nota.
   */
  const setNote = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, note: value }));
  }, []);

  /**
   * Reinicia el formulario a su estado inicial y limpia errores.
   */
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  }, []);

  // --------------------------------------------------------------------------
  // VALIDACIÓN COMPLETA ANTES DE ENVIAR
  // --------------------------------------------------------------------------

  /**
   * Valida todos los campos del formulario.
   * Retorna true si es válido, false en caso contrario y actualiza los errores.
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // 1. Validar amount (requerido, positivo, no exceder presupuesto)
    const amountStr = formData.amount.trim();
    if (amountStr === '') {
      newErrors.amount = t('addExpense.validation_amount_positive');
      isValid = false;
    } else {
      const numericAmount = parseFloat(amountStr);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        newErrors.amount = t('addExpense.validation_amount_positive');
        isValid = false;
      } else if (validateBudget && numericAmount > remainingBudget) {
        newErrors.amount = t('addExpense.validation_amount_exceeds_budget');
        isValid = false;
      }
    }

    // 2. Validar categoría (requerida)
    if (!formData.categoryId) {
      newErrors.category = t('addExpense.validation_category_required');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData, t, validateBudget, remainingBudget]);

  // --------------------------------------------------------------------------
  // ENVÍO DEL FORMULARIO
  // --------------------------------------------------------------------------

  /**
   * Envía el gasto al store después de validar.
   * - Muestra toast de éxito/error.
   * - Ejecuta onSuccess si se proporciona y el envío es exitoso.
   * - Gestiona el estado isSubmitting para evitar envíos duplicados.
   * - NO maneja navegación; el componente padre decide qué hacer al éxito.
   */
  const handleSubmit = useCallback(async () => {
    // Evitar envíos mientras ya se está procesando
    if (isSubmitting) return;

    // Validar antes de enviar
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Convertir amount a número (ya validado)
      const amountNumber = parseFloat(formData.amount);

      // Llamar al store para agregar la transacción
      // El tercer parámetro (note) es opcional; si está vacío se envía undefined
      addTransaction(
        amountNumber,
        formData.categoryId,
        formData.note.trim() || undefined
      );

      // Feedback visual
      toast.success(t('addExpense.success_message'));

      // Ejecutar callback de éxito si existe (ej. cerrar modal)
      onSuccess?.();

      // Reiniciar formulario para futuros usos (opcional)
      resetForm();
    } catch (error) {
      console.error('[useAddExpenseForm] Error al guardar gasto:', error);
      toast.error(t('addExpense.error_message'));
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData,
    validateForm,
    isSubmitting,
    addTransaction,
    toast,
    t,
    onSuccess,
    resetForm,
  ]);

  // --------------------------------------------------------------------------
  // RETORNO DE LA API PÚBLICA
  // --------------------------------------------------------------------------
  return {
    formData,
    errors,
    isSubmitting,
    setAmount,
    setCategoryId,
    setNote,
    handleSubmit,
    resetForm,
  };
};