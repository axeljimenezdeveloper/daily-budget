// ============================================================================
// ESTILOS DEL MODAL PARA iOS (AppTimePicker)
// ============================================================================

import { StyleSheet } from 'react-native';
import { PALETTE } from '@/constants/colors';
import { SPACING, BORDER_RADIUS } from '@/constants/metrics';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: PALETTE.nightBlue,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    borderWidth: 1,
    borderColor: PALETTE.darkBorder,
  },
  modalInner: {
    width: '100%',
  },
});