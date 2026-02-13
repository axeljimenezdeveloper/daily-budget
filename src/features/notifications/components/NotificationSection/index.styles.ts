import { StyleSheet } from 'react-native';
import { PALETTE } from '@/constants/colors';
import { SPACING, BORDER_RADIUS } from '@/constants/metrics';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: PALETTE.nightBlue,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    borderWidth: 1,
    borderColor: PALETTE.darkBorder,
  },
});