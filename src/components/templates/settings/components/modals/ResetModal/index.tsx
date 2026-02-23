// ============================================================================
// MODAL DE REINICIO DE BÓVEDA - ResetModal
//
// Modal que solicita confirmación al usuario antes de reiniciar la bóveda.
// Muestra un mensaje de advertencia y dos botones: Cancelar y Reiniciar.
// Se utiliza en la pantalla de ajustes, sección Zona de Peligro.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from 'react';
import { StyleSheet } from 'react-native';

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
import { ResetModalProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Reiniciar bóveda',
  message = '¿Estás seguro? Se perderán todos tus datos de presupuesto y gastos.',
  cancelText = 'Cancelar',
  confirmText = 'Reiniciar',
}) => {
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showCloseButton
      closeOnBackdropPress
      height="auto"
    >
      <AppBox gap="l">
        <AppText variant="body" color="secondary" align="center">
          {message}
        </AppText>
        <AppBox direction="row" justify="space-around" gap="m">
          <AppPressable
            style={[styles.modalButton, styles.modalButtonCancel]}
            onPress={onClose}
            hapticFeedback="light"
          >
            <AppText
              variant="body"
              color="primary"
              style={{ fontWeight: '600' }}
            >
              {cancelText}
            </AppText>
          </AppPressable>
          <AppPressable
            style={[styles.modalButton, styles.modalButtonDanger]}
            onPress={onConfirm}
            hapticFeedback="light"
          >
            <AppText
              variant="body"
              color="primary"
              style={{ fontWeight: '600' }}
            >
              {confirmText}
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