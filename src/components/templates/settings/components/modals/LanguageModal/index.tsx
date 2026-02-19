// ============================================================================
// MODAL DE SELECCIÓN DE IDIOMA - LanguageModal
//
// Modal que muestra las opciones de idioma disponibles (Español, Inglés).
// Permite al usuario seleccionar un idioma, resalta la opción activa y
// cierra automáticamente al seleccionar. Se utiliza en la pantalla de ajustes.
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
import { LanguageModalProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  selectedLanguage,
  onSelectLanguage,
  title = 'Idioma', // Valor por defecto, aunque se espera que se pase traducido
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
      <AppBox gap="xs">
        {/* Opción Español */}
        <AppPressable
          style={[
            styles.modalOption,
            selectedLanguage === 'es' && styles.modalOptionActive,
          ]}
          onPress={() => {
            onSelectLanguage('es');
            onClose();
          }}
        >
          <AppText variant="body" color="primary">
            🇪🇸 Español
          </AppText>
        </AppPressable>

        {/* Opción Inglés */}
        <AppPressable
          style={[
            styles.modalOption,
            selectedLanguage === 'en' && styles.modalOptionActive,
          ]}
          onPress={() => {
            onSelectLanguage('en');
            onClose();
          }}
        >
          <AppText variant="body" color="primary">
            🇺🇸 English
          </AppText>
        </AppPressable>
      </AppBox>
    </AppModal>
  );
};

// ----------------------------------------------------------------------------
// ESTILOS
// ----------------------------------------------------------------------------
const styles = StyleSheet.create({
  modalOption: {
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.xs,
  },
  modalOptionActive: {
    backgroundColor: `${PALETTE.sunsetOrange}20`,
    borderColor: PALETTE.sunsetOrange,
    borderWidth: 1,
  },
});