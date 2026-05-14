// ============================================================================
// MODAL DE CONFIRMACIÓN DE ELIMINACIÓN - DeleteModal
//
// Modal que solicita confirmación al usuario antes de eliminar un gasto.
// Muestra un mensaje de advertencia y dos botones: Cancelar y Eliminar.
// Sigue el mismo patrón visual que ResetModal (color error para el botón confirmar).
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS REUTILIZABLES
// ----------------------------------------------------------------------------
import AppModal from '@/components/atoms/structure/AppModal';
import AppBox from '@/components/atoms/structure/AppBox';
import AppPressable from '@/components/atoms/action/AppPressable';
import AppText from '@/components/atoms/content/AppText';

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES DE DISEÑO
// ----------------------------------------------------------------------------
import { PALETTE } from '@/constants/colors';
import { SPACING, BORDER_RADIUS } from '@/constants/metrics';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------
import { DeleteModalProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  cancelText,
  confirmText,
}) => {
  const { t } = useTranslation();

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={title || t('history.delete.confirm_title')}
      showCloseButton
      closeOnBackdropPress
      height="auto"
    >
      <AppBox gap="l">
        {/* Mensaje de confirmación */}
        <AppText variant="body" color="secondary" align="center">
          {message || t('history.delete.confirm_message')}
        </AppText>

        {/* Botones de acción */}
        <AppBox direction="row" justify="space-around" gap="m">
          {/* Botón Cancelar */}
          <AppPressable
            style={[styles.modalButton, styles.modalButtonCancel]}
            onPress={onClose}
            hapticFeedback="light"
          >
            <AppText variant="body" color="primary" style={{ fontWeight: '600' }}>
              {cancelText || t('history.delete.cancel')}
            </AppText>
          </AppPressable>

          {/* Botón Eliminar (color error) */}
          <AppPressable
            style={[styles.modalButton, styles.modalButtonDanger]}
            onPress={onConfirm}
            hapticFeedback="light"
          >
            <AppText variant="body" color="primary" style={{ fontWeight: '600' }}>
              {confirmText || t('history.delete.confirm')}
            </AppText>
          </AppPressable>
        </AppBox>
      </AppBox>
    </AppModal>
  );
};

// ----------------------------------------------------------------------------
// ESTILOS
// ----------------------------------------------------------------------------
const styles = StyleSheet.create({
  modalButton: {
    flex: 1,
    paddingVertical: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  modalButtonCancel: {
    backgroundColor: PALETTE.slateGray,
  },
  modalButtonDanger: {
    backgroundColor: PALETTE.errorRed,
  },
});