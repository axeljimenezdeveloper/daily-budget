// ============================================================================
// ESTILOS DEL GRÁFICO DE GASTOS DIARIOS
// ============================================================================

import { StyleSheet } from 'react-native';
import { PALETTE } from '@/constants/colors';
import { SPACING, BORDER_RADIUS } from '@/constants/metrics';

export const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
    backgroundColor: PALETTE.deepNight,
  },
  chartWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 160,
    position: 'relative',
  },
  column: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  drawingArea: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 100,
    width: '100%',
  },
  line: {
    width: 2,
    backgroundColor: PALETTE.darkBorder,
    borderRadius: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: PALETTE.lightGray,
    marginBottom: 8,
  },
  dotActive: {
    backgroundColor: PALETTE.sunsetOrange,
  },
  dayLabelContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PALETTE.darkBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.s,
  },
  dayLabelActive: {
    backgroundColor: PALETTE.sunsetOrange,
  },
  dayLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: PALETTE.lightGray,
  },
  dayLabelTextActive: {
    color: PALETTE.deepNight,
  },
  // Tooltip corregido para evitar truncamiento
  tooltip: {
    position: 'absolute',
    top: -40,
    backgroundColor: PALETTE.nightBlue,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.s,
    borderWidth: 1,
    borderColor: PALETTE.darkBorder,
    zIndex: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: '600',
    color: PALETTE.creamWhite,
    textAlign: 'center',
  },
  // ----- Footer -----
  footer: {
    marginTop: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: PALETTE.darkBorder,
    paddingTop: SPACING.m,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricBlock: {
    flex: 1,
  },
  metricIconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  deviationContainer: {
    marginTop: SPACING.s,
    alignItems: 'center',
  },
  deviationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
  },
  deviationText: {
    fontSize: 12,
    marginLeft: SPACING.xs,
  },
  // Contenedor para presupuesto ajustado (relativo para etiqueta absoluta)
  adjustedContainer: {
    marginTop: SPACING.m,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    position: 'relative',
  },
  adjustedLeft: {
    // El contenido de la izquierda (presupuesto ajustado) ocupa el espacio
  },
  deviationAbsolute: {
    position: 'absolute',
    top: SPACING.xs,
    right: SPACING.s,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 2,
    paddingHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.s,
  },
  deviationAbsoluteText: {
    fontSize: 10,
    fontWeight: '500',
  },
});