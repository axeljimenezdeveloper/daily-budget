// ============================================================================
// MODAL DE REGISTRO DE GASTOS - AddExpenseModal
//
// Modal que permite al usuario agregar un nuevo gasto de forma rápida.
// Contiene campos para monto, categoría y nota opcional.
// Utiliza el hook useAddExpenseForm para la lógica de validación y envío.
// Al guardar exitosamente, cierra el modal y ejecuta un callback opcional.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS
// ----------------------------------------------------------------------------
import AppModal from '@/components/atoms/structure/AppModal';
import AppBox from '@/components/atoms/structure/AppBox';
import AppText from '@/components/atoms/content/AppText';
import AppInput from '@/components/atoms/action/AppInput';
import AppButton from '@/components/atoms/action/AppButton';
import AppPressable from '@/components/atoms/action/AppPressable';
import AppSpinner from '@/components/atoms/visual/AppSpinner';

// ----------------------------------------------------------------------------
// COMPONENTES MOLECULARES
// ----------------------------------------------------------------------------
import AppFormField from '@/components/molecules/forms/AppFormField';

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES DE DISEÑO
// ----------------------------------------------------------------------------
import { PALETTE } from '@/constants/colors';
import { SPACING } from '@/constants/metrics';

// ----------------------------------------------------------------------------
// TIPOS, CONSTANTES Y HOOKS LOCALES
// ----------------------------------------------------------------------------
import { useAddExpenseForm } from '../../../hooks/useAddExpenseForm';
import { CATEGORIES } from '../../../constants';
import { AddExpenseModalProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * Modal para registrar un nuevo gasto.
 *
 * @param isOpen    - Controla la visibilidad del modal.
 * @param onClose   - Callback para cerrar el modal.
 * @param onSuccess - Callback opcional ejecutado tras guardar exitosamente.
 */
export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();

  // --------------------------------------------------------------------------
  // HOOK DEL FORMULARIO
  // --------------------------------------------------------------------------
  const {
    formData,
    errors,
    isSubmitting,
    setAmount,
    setCategoryId,
    setNote,
    handleSubmit,
    resetForm,
  } = useAddExpenseForm({
    onSuccess: () => {
      onClose();
      onSuccess?.();
    },
  });

  // --------------------------------------------------------------------------
  // EFECTO PARA RESETEAR EL FORMULARIO AL ABRIR EL MODAL
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  // --------------------------------------------------------------------------
  // RENDERIZADO DEL SELECTOR DE CATEGORÍAS (GRID 3+2, SIN ICONOS)
  // --------------------------------------------------------------------------
  /**
   * Renderiza un botón individual para una categoría (solo texto).
   * @param category - Objeto de la categoría (id, labelKey)
   * @param isSelected - Indica si esta categoría está activa
   */
  const renderCategoryButton = (
    category: typeof CATEGORIES[number],
    isSelected: boolean
  ) => (
    <AppPressable
      key={category.id}
      style={[
        styles.categoryButton,
        {
          backgroundColor: isSelected
            ? `${PALETTE.sunsetOrange}20`
            : PALETTE.nightBlue,
          borderColor: isSelected ? PALETTE.sunsetOrange : PALETTE.darkBorder,
        },
      ]}
      onPress={() => setCategoryId(category.id)}
      hapticFeedback="light"
    >
      <AppText variant="body" color={isSelected ? 'accent' : 'primary'}>
        {t(category.labelKey)}
      </AppText>
    </AppPressable>
  );

  /**
   * Renderiza el selector de categorías como un grid de dos filas:
   * - Primera fila: 3 categorías (food, transport, leisure)
   * - Segunda fila: 2 categorías (health, other)
   * Cada botón ocupa el mismo ancho dentro de su fila gracias a flex:1.
   */
  const renderCategorySelector = () => {
    // Dividir las categorías en dos grupos
    const firstRowCategories = CATEGORIES.slice(0, 3); // Comida, Transporte, Ocio
    const secondRowCategories = CATEGORIES.slice(3, 5); // Salud, Otro

    return (
      <AppBox gap="s">
        {/* Primera fila: 3 categorías */}
        <AppBox direction="row" gap="s">
          {firstRowCategories.map((category) =>
            renderCategoryButton(category, formData.categoryId === category.id)
          )}
        </AppBox>

        {/* Segunda fila: 2 categorías */}
        <AppBox direction="row" gap="s">
          {secondRowCategories.map((category) =>
            renderCategoryButton(category, formData.categoryId === category.id)
          )}
        </AppBox>
      </AppBox>
    );
  };

  // --------------------------------------------------------------------------
  // RENDERIZADO PRINCIPAL
  // --------------------------------------------------------------------------
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('addExpense.title')}
      showCloseButton
      closeOnBackdropPress
      height="auto"
    >
      <AppBox gap="l">
        {/* --------------------------------------------------------------------
          CAMPO: MONTO
        -------------------------------------------------------------------- */}
        <AppFormField
          label={t('addExpense.amount_label')}
          error={errors.amount}
        >
          <AppInput
            value={formData.amount}
            onChangeText={setAmount}
            placeholder={t('addExpense.amount_placeholder')}
            keyboardType="numeric"
            autoFocus
          />
        </AppFormField>

        {/* --------------------------------------------------------------------
          CAMPO: CATEGORÍA (selector visual en grid, solo texto)
        -------------------------------------------------------------------- */}
        <AppFormField
          label={t('addExpense.category_label')}
          error={errors.category}
        >
          {renderCategorySelector()}
        </AppFormField>

        {/* --------------------------------------------------------------------
          CAMPO: NOTA (opcional, multilínea)
        -------------------------------------------------------------------- */}
        <AppFormField label={t('addExpense.note_label')}>
          <AppInput
            value={formData.note}
            onChangeText={setNote}
            placeholder={t('addExpense.note_placeholder')}
            multiline
            numberOfLines={2}
            textAlignVertical="top"
          />
        </AppFormField>

        {/* --------------------------------------------------------------------
          BOTONES DE ACCIÓN
        -------------------------------------------------------------------- */}
        <AppBox direction="row" justify="space-between" gap="m">
          {/* Botón Cancelar */}
          <AppButton
            variant="outline"
            status="neutral"
            onPress={onClose}
            disabled={isSubmitting}
            style={styles.halfButton}
          >
            {t('addExpense.cancel_button')}
          </AppButton>

          {/* Botón Guardar */}
          <AppButton
            variant="filled"
            status="accent"
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={styles.halfButton}
          >
            {isSubmitting ? (
              <AppBox direction="row" gap="s" align="center">
                <AppSpinner size="s" color="primary" />
                <AppText variant="body" color="primary">
                  {t('common.processing')}
                </AppText>
              </AppBox>
            ) : (
              t('addExpense.submit_button')
            )}
          </AppButton>
        </AppBox>
      </AppBox>
    </AppModal>
  );
};

// ----------------------------------------------------------------------------
// ESTILOS LOCALES
// ----------------------------------------------------------------------------
const styles = StyleSheet.create({
  categoryButton: {
    flex: 1, // Hace que todos los botones en la misma fila tengan el mismo ancho
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: 0,
    borderWidth: 1,
  },
  halfButton: {
    flex: 1,
  },
});