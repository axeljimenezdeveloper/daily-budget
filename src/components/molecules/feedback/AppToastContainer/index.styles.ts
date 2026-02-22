// ============================================================================
// ESTILOS PARA AppToastContainer
// ============================================================================

import { StyleSheet } from 'react-native';
import { SPACING } from '@/constants/metrics';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
    paddingHorizontal: SPACING.m,
  },
});