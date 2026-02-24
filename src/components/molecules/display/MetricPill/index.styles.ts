// ============================================================================
// ESTILOS DEL COMPONENTE MetricPill
// ============================================================================

import { StyleSheet } from 'react-native';
import { PALETTE } from '@/constants/colors';
import { SPACING, TYPOGRAPHY } from '@/constants/metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: PALETTE.deepNight,
    borderColor: PALETTE.darkBorder,
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.s,
  },
  label: {
    fontSize: TYPOGRAPHY.label.fontSize,
    lineHeight: TYPOGRAPHY.label.lineHeight,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: PALETTE.lightGray,
    marginBottom: SPACING.xs,
  },
  value: {
    fontSize: TYPOGRAPHY.bodyMd.fontSize,
    lineHeight: TYPOGRAPHY.bodyMd.lineHeight,
    fontWeight: '600',
  },
  valueDefault: {
    color: PALETTE.creamWhite,
  },
  valueSuccess: {
    color: PALETTE.successGreen,
  },
  valueWarning: {
    color: PALETTE.warningOrange,
  },
  valueError: {
    color: PALETTE.errorRed,
  },
});