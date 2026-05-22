// ============================================================================
// HOOK PERSONALIZADO: useEditExpenseForm
//
// Encapsula toda la lógica del formulario de edición de gastos:
//   - Estado de los campos (amount, categoryId, note)
//   - Precarga de datos desde una transacción existente
//   - Validaciones en tiempo real y en envío (considerando la diferencia de monto)
//   - Envío al store (updateTransaction)
//   - Feedback con toasts y ejecución de callback opcional al éxito
//
// A diferencia de useAddExpenseForm, este hook NO valida contra el presupuesto
// restante de forma directa, sino que calcula el impacto real de la edición:
//   - Si el nuevo monto es MAYOR, solo se resta la diferencia.
//   - Si el nuevo monto es MENOR, se suma la diferencia.
//   - Solo se rechaza si la diferencia positiva supera el presupuesto restante.
// ============================================================================

import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useVaultStore } from '@/store/useVaultStore';
import { useToast } from '@/hooks/useToast';
import { Transaction } from '@/store/useVaultStore/index.types';
import { MAX_NOTE_LENGTH } from '@/constants/validation';

// ----------------------------------------------------------------------------
// TIPOS LOCALES
// ----------------------------------------------------------------------------

/**
 * Datos del formulario de edición.
 */
interface FormData {
  amount: string;
  categoryId: string;
  note: string;
}

/**
 * Errores de validación por campo.
 */
interface ValidationErrors {
  amount?: string;
  category?: string;
}

// ----------------------------------------------------------------------------
// CONSTANTES LOCALES
// ----------------------------------------------------------------------------

/**
 * Estado inicial del formulario (vacío).
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
interface UseEditExpenseFormOptions {
  /**
   * Transacción a editar (opcional). Si se proporciona, el formulario
   * se inicializa con sus datos.
   */
  initialTransaction?: Transaction | null;
  /**
   * Callback que se ejecuta después de actualizar exitosamente el gasto.
   * Útil para cerrar un modal o limpiar el formulario.
   */
  onSuccess?: () => void;
}

/**
 * Hook que gestiona el formulario de edición de gastos.
 *
 * @param options - Opciones de configuración (initialTransaction, onSuccess)
 * @returns Objeto con:
 *   - formData: Estado actual de los campos.
 *   - errors: Errores de validación actuales.
 *   - isSubmitting: Flag que indica si se está enviando.
 *   - setAmount: Actualiza el campo amount y dispara validación.
 *   - setCategoryId: Actualiza categoryId y limpia error de categoría.
 *   - setNote: Actualiza nota aplicando límite de caracteres.
 *   - handleSubmit: Función asíncrona para actualizar el gasto.
 *   - resetForm: Reinicia el formulario al estado inicial (o a la transacción si existe).
 */
export const useEditExpenseForm = (options?: UseEditExpenseFormOptions) => {
  const { initialTransaction, onSuccess } = options || {};

  // --------------------------------------------------------------------------
  // DEPENDENCIAS EXTERNAS
  // --------------------------------------------------------------------------
  const { t } = useTranslation();
  const toast = useToast();

  // Selectores finos del store
  const updateTransaction = useVaultStore((state) => state.updateTransaction);
  const remainingBudget = useVaultStore((state) => state.remainingBudget);
  const transactions = useVaultStore((state) => state.transactions);

  // --------------------------------------------------------------------------
  // ESTADOS LOCALES
  // --------------------------------------------------------------------------
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --------------------------------------------------------------------------
  // INICIALIZACIÓN (precarga de datos cuando cambia la transacción)
  // --------------------------------------------------------------------------
  const initializeForm = useCallback(() => {
    if (initialTransaction) {
      setFormData({
        amount: initialTransaction.amount.toString(),
        categoryId: initialTransaction.category,
        note: initialTransaction.note || '',
      });
      setErrors({});
    } else {
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
    }
  }, [initialTransaction]);

  // Efecto para precargar cuando se proporciona una transacción
  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

  // --------------------------------------------------------------------------
  // FUNCIONES DE ACTUALIZACIÓN DE CAMPOS
  // --------------------------------------------------------------------------

  /**
   * Obtiene la transacción original (para calcular la diferencia de monto).
   * @returns Transacción original o null si no existe.
   */
  const getOriginalTransaction = useCallback((): Transaction | null => {
    if (!initialTransaction) return null;
    // Buscar en el store por si acaso ha cambiado (pero normalmente será la misma)
    return transactions.find((t) => t.id === initialTransaction.id) || initialTransaction;
  }, [initialTransaction, transactions]);

  /**
   * Valida el monto considerando la diferencia con el original.
   * @param amountStr - String del monto ingresado.
   * @returns true si es válido, false en caso contrario.
   */
  const validateAmount = useCallback(
    (amountStr: string): boolean => {
      if (amountStr.trim() === '') {
        setErrors((prev) => ({ ...prev, amount: undefined }));
        return false;
      }

      const numericAmount = parseFloat(amountStr);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        setErrors((prev) => ({
          ...prev,
          amount: t('addExpense.validation_amount_positive'),
        }));
        return false;
      }

      // Obtener monto original para calcular la diferencia
      const originalTx = getOriginalTransaction();
      if (!originalTx) {
        // Si no hay original (caso raro), validamos contra remainingBudget directamente
        if (numericAmount > remainingBudget) {
          setErrors((prev) => ({
            ...prev,
            amount: t('addExpense.validation_amount_exceeds_budget'),
          }));
          return false;
        }
      } else {
        // Calcular la diferencia: nuevo - antiguo
        const amountDiff = numericAmount - originalTx.amount;
        // Solo validamos si la diferencia es positiva (aumento)
        if (amountDiff > 0 && amountDiff > remainingBudget) {
          setErrors((prev) => ({
            ...prev,
            amount: t('addExpense.validation_amount_exceeds_budget'),
          }));
          return false;
        }
      }

      // Limpiar error si es válido
      setErrors((prev) => ({ ...prev, amount: undefined }));
      return true;
    },
    [t, getOriginalTransaction, remainingBudget]
  );

  /**
   * Actualiza el monto y ejecuta validación en tiempo real.
   * @param value - String ingresado en el campo.
   */
  const setAmount = useCallback(
    (value: string) => {
      setFormData((prev) => ({ ...prev, amount: value }));
      validateAmount(value);
    },
    [validateAmount]
  );

  /**
   * Actualiza la categoría seleccionada y limpia el error asociado.
   * @param value - ID de la categoría.
   */
  const setCategoryId = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, categoryId: value }));
    setErrors((prev) => ({ ...prev, category: undefined }));
  }, []);

  /**
   * Actualiza la nota opcional aplicando límite de caracteres.
   * @param value - Texto de la nota.
   */
  const setNote = useCallback((value: string) => {
    const truncated = value.slice(0, MAX_NOTE_LENGTH);
    setFormData((prev) => ({ ...prev, note: truncated }));
  }, []);

  /**
   * Reinicia el formulario a su estado inicial (o a la transacción si existe).
   */
  const resetForm = useCallback(() => {
    initializeForm();
  }, [initializeForm]);

  // --------------------------------------------------------------------------
  // VALIDACIÓN COMPLETA ANTES DE ENVIAR
  // --------------------------------------------------------------------------

  /**
   * Valida todos los campos del formulario.
   * @returns true si es válido, false en caso contrario.
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // 1. Validar amount
    const amountStr = formData.amount.trim();
    if (amountStr === '') {
      newErrors.amount = t('addExpense.validation_amount_positive');
      isValid = false;
    } else {
      const numericAmount = parseFloat(amountStr);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        newErrors.amount = t('addExpense.validation_amount_positive');
        isValid = false;
      } else {
        const originalTx = getOriginalTransaction();
        if (originalTx) {
          const amountDiff = numericAmount - originalTx.amount;
          if (amountDiff > 0 && amountDiff > remainingBudget) {
            newErrors.amount = t('addExpense.validation_amount_exceeds_budget');
            isValid = false;
          }
        } else if (numericAmount > remainingBudget) {
          newErrors.amount = t('addExpense.validation_amount_exceeds_budget');
          isValid = false;
        }
      }
    }

    // 2. Validar categoría
    if (!formData.categoryId) {
      newErrors.category = t('addExpense.validation_category_required');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData, t, getOriginalTransaction, remainingBudget]);

  // --------------------------------------------------------------------------
  // ENVÍO DEL FORMULARIO (ACTUALIZACIÓN)
  // --------------------------------------------------------------------------

  /**
   * Envía la actualización al store después de validar.
   * Muestra toast de éxito/error y ejecuta onSuccess.
   */
  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    if (!validateForm()) return;

    // Asegurar que tenemos la transacción original
    const originalTx = getOriginalTransaction();
    if (!originalTx) {
      toast.error(t('addExpense.error_message'));
      return;
    }

    setIsSubmitting(true);

    try {
      const amountNumber = parseFloat(formData.amount);
      const updates: Partial<Transaction> = {
        amount: amountNumber,
        category: formData.categoryId,
        note: formData.note.trim() || undefined,
      };

      updateTransaction(originalTx.id, updates);

      toast.success(t('editExpense.success', t('addExpense.success_message')));
      onSuccess?.();
      resetForm();
    } catch (error) {
      console.error('[useEditExpenseForm] Error al actualizar gasto:', error);
      toast.error(t('addExpense.error_message'));
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData,
    validateForm,
    isSubmitting,
    getOriginalTransaction,
    updateTransaction,
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