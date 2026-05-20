// ============================================================================
// ESTILOS DEL COMPONENTE ACCORDION ITEM - SIN BORDES LATERALES
// ============================================================================

import { StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS } from '@/constants/metrics';
import { PALETTE } from '@/constants/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: PALETTE.nightBlue,
    borderRadius: BORDER_RADIUS.xl, // 20px
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  pressableContent: {
    padding: SPACING.m,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${PALETTE.sunsetOrange}15`, // 15% opacidad
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.m,
  },
  questionText: {
    flex: 1,
    paddingRight: SPACING.m,
    fontWeight: '500',
  },
  chevronContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerWrapper: {
    backgroundColor: `${PALETTE.deepNight}80`, // Fondo semitransparente
    borderTopWidth: 1,
    borderTopColor: `${PALETTE.sunsetOrange}20`,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.l,
  },
  answerText: {
    lineHeight: 20,
  },
});