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
import AppStack from '@/components/atoms/structure/AppStack';
import AppSpacer from '@/components/atoms/structure/AppSpacer';
import AppText from '@/components/atoms/content/AppText';
import AppIcon from '@/components/atoms/content/AppIcon';
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
import { SPACING, BORDER_RADIUS } from '@/constants/metrics';

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
  // Al guardar exitosamente, cerramos el modal y ejecutamos el callback externo.
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
  // Cada vez que se abre el modal, limpiamos campos y errores.
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  // --------------------------------------------------------------------------
  // FUNCIÓN AUXILIAR: OBTENER ETIQUETA TRADUCIDA DE UNA CATEGORÍA
  // --------------------------------------------------------------------------
  /**
   * Retorna el nombre traducido de una categoría a partir de su ID.
   * @param categoryId - Identificador de la categoría (ej. 'food').
   * @returns Nombre traducido (ej. 'Comida' o 'Food').
   */
  const getCategoryLabel = (categoryId: string): string => {
    const category = CATEGORIES.find((cat) => cat.id === categoryId);
    return category ? t(category.labelKey) : '';
  };

  // --------------------------------------------------------------------------
  // RENDERIZADO DEL SELECTOR DE CATEGORÍAS (BOTONES VISUALES)
  // --------------------------------------------------------------------------
  /**
   * Renderiza una lista horizontal de botones para seleccionar categorías.
   * Cada botón muestra un ícono y el nombre traducido de la categoría.
   * La categoría activa tiene estilo resaltado.
   */
  const renderCategorySelector = () => (
    <AppStack direction="horizontal" gap="s" style={styles.categoryContainer}>
      {CATEGORIES.map((category) => {
        const isSelected = formData.categoryId === category.id;
        return (
          <AppPressable
            key={category.id}
            style={[
              styles.categoryButton,
              {
                backgroundColor: isSelected
                  ? `${PALETTE.sunsetOrange}20`
                  : PALETTE.nightBlue,
                borderColor: isSelected
                  ? PALETTE.sunsetOrange
                  : PALETTE.darkBorder,
              },
            ]}
            onPress={() => setCategoryId(category.id)}
            hapticFeedback="light"
          >
            <AppIcon
              name={category.icon}
              size="s"
              color={isSelected ? 'accent' : 'secondary'}
            />
            <AppSpacer size="xs" horizontal />
            <AppText
              variant="body"
              color={isSelected ? 'accent' : 'primary'}
            >
              {t(category.labelKey)}
            </AppText>
          </AppPressable>
        );
      })}
    </AppStack>
  );

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
      <AppStack gap="l">
        {/* ----------------------------------------------------------------
          CAMPO: MONTO
        ---------------------------------------------------------------- */}
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

        {/* ----------------------------------------------------------------
          CAMPO: CATEGORÍA (selector visual)
        ---------------------------------------------------------------- */}
        <AppFormField
          label={t('addExpense.category_label')}
          error={errors.category}
        >
          {renderCategorySelector()}
        </AppFormField>

        {/* ----------------------------------------------------------------
          CAMPO: NOTA (opcional, multilínea)
        ---------------------------------------------------------------- */}
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

        {/* ----------------------------------------------------------------
          BOTONES DE ACCIÓN
        ---------------------------------------------------------------- */}
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
              <AppStack direction="horizontal" gap="s" align="center">
                <AppSpinner size="s" color="primary" />
                <AppText variant="body" color="primary">
                  {t('common.processing')}
                </AppText>
              </AppStack>
            ) : (
              t('addExpense.submit_button')
            )}
          </AppButton>
        </AppBox>
      </AppStack>
    </AppModal>
  );
};

// ----------------------------------------------------------------------------
// ESTILOS LOCALES
// ----------------------------------------------------------------------------
const styles = StyleSheet.create({
  categoryContainer: {
    flexWrap: 'wrap',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    marginBottom: SPACING.xs,
  },
  halfButton: {
    flex: 1,
  },
});

// ----------------------------------------------------------------------------
// DISPLAY NAME PARA DEBUG
// ----------------------------------------------------------------------------
AddExpenseModal.displayName = 'AddExpenseModal';