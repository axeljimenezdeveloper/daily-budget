// ============================================================================
// ESTILOS DEL COMPONENTE AppCircularProgress
// ============================================================================

import { StyleSheet } from 'react-native';
import { PALETTE } from '@/constants/colors';
import { SPACING } from '@/constants/metrics';

export const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  container: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(10,15,28,0.75)',
    borderWidth: 1,
    borderColor: PALETTE.darkBorder,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
  },
  inner: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperLabel: {
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
    textAlign: 'center',
  },
  mainValue: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    marginVertical: 4,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 11,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  feedbackOverlay: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0,
  },
});