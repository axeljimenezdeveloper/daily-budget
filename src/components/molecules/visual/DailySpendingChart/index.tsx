// ============================================================================
// COMPONENTE MOLECULAR: DailySpendingChart
//
// Gráfico de líneas minimalista para visualizar los gastos de los últimos N días.
// - Barras verticales, puntos y tooltips interactivos.
// - Resalta el día actual con punto naranja.
// - Footer informativo: presupuesto diario ideal, gasto de hoy, presupuesto restante, días restantes.
// - Contenedor unificado: presupuesto diario ajustado + mensaje de desviación en esquina absoluta.
// ============================================================================

import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import AppPressable from '@/components/atoms/action/AppPressable';
import AppText from '@/components/atoms/content/AppText';
import { useHaptic } from '@/hooks/useHaptic';
import { formatMoney } from '@/store/useVaultStore/index.utils';
import { SPACING } from '@/constants/metrics';
import { DailySpendingChartProps } from './index.props';
import { getLastDaysSpending, scaleAmountToHeight } from './index.utils';
import { styles } from './index.styles';
import { PALETTE } from '@/constants/colors';

export const DailySpendingChart: React.FC<DailySpendingChartProps> = ({
  transactions,
  currency,
  daysCount = 7,
  maxBarHeight = 80,
  originalIdeal,
  todaySpent,
  spentDeviation,
  remainingBudget,
  remainingDays,
}) => {
  const { t } = useTranslation();
  const haptic = useHaptic();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Datos de los últimos N días
  const spendingData = useMemo(
    () => getLastDaysSpending(transactions, daysCount),
    [transactions, daysCount]
  );

  // Monto máximo para escalar las líneas
  const maxAmount = useMemo(
    () => Math.max(...spendingData.map(d => d.amount), 0.01),
    [spendingData]
  );

  // Calcular presupuesto diario ajustado (para los días restantes)
  const adjustedDaily = useMemo(() => {
    if (remainingBudget !== undefined && remainingDays !== undefined && remainingDays > 0) {
      return remainingBudget / remainingDays;
    }
    return originalIdeal ?? 0;
  }, [remainingBudget, remainingDays, originalIdeal]);

  const handlePress = (index: number) => {
    haptic.light();
    setSelectedIndex(index);
    setTimeout(() => setSelectedIndex(null), 2000);
  };

  // Determinar color del valor "Gastado hoy"
  const getSpentColor = (): 'primary' | 'success' | 'warning' | 'error' => {
    if (!originalIdeal || todaySpent === undefined) return 'primary';
    if (todaySpent === 0) return 'primary';
    if (todaySpent <= originalIdeal) return 'success';
    if (todaySpent <= originalIdeal * 2) return 'warning';
    return 'error';
  };

  // Mostrar footer solo si tenemos presupuesto diario ideal
  const showFooter = originalIdeal !== undefined;
  const hasTransactions = transactions.length > 0;
  const showSpendingMetrics = hasTransactions && todaySpent !== undefined;
  const showDeviation = showSpendingMetrics && spentDeviation !== undefined && Math.abs(spentDeviation) > 0.01;

  return (
    <View style={styles.container}>
      {/* Gráfico */}
      <View style={styles.chartWrapper}>
        {spendingData.map((data, index) => {
          const isActive = selectedIndex === index;
          const isDotActive = data.isToday || isActive;
          const lineHeight = scaleAmountToHeight(data.amount, maxAmount, maxBarHeight);
          const isPressable = !data.isFuture;

          return (
            <AppPressable
              key={index}
              onPress={() => isPressable && handlePress(index)}
              disabled={!isPressable}
              style={styles.column}
            >
              <View style={styles.drawingArea}>
                {lineHeight > 0 && (
                  <View
                    style={[
                      styles.line,
                      {
                        height: lineHeight,
                        backgroundColor: isActive
                          ? PALETTE.sunsetOrange
                          : PALETTE.darkBorder,
                      },
                    ]}
                  />
                )}
                <View
                  style={[
                    styles.dot,
                    isDotActive && styles.dotActive,
                    lineHeight === 0 && { opacity: 0.3 },
                  ]}
                />
              </View>

              <View
                style={[
                  styles.dayLabelContainer,
                  isActive && styles.dayLabelActive,
                ]}
              >
                <AppText
                  variant="caption"
                  style={[
                    styles.dayLabelText,
                    isActive && styles.dayLabelTextActive,
                  ]}
                >
                  {data.dayLabel}
                </AppText>
              </View>

              {isActive && (
                <View style={styles.tooltip}>
                  <AppText style={styles.tooltipText}>
                    {formatMoney(data.amount, currency)}
                  </AppText>
                </View>
              )}
            </AppPressable>
          );
        })}
      </View>

      {/* Footer informativo */}
      {showFooter && (
        <View style={styles.footer}>
          {/* Fila 1: Presupuesto diario ideal (siempre visible) */}
          <View style={styles.metricsRow}>
            <View style={styles.metricBlock}>
              <AppText variant="label" color="secondary" style={{ marginBottom: SPACING.xs }}>
                {t('dashboard.summary.ideal_daily')}
              </AppText>
              <AppText variant="body" color="primary" style={styles.metricValue}>
                {formatMoney(originalIdeal, currency)}
              </AppText>
            </View>

            {/* Si hay gastos, mostramos también el gasto de hoy */}
            {showSpendingMetrics && (
              <View style={[styles.metricBlock, { alignItems: 'flex-end' }]}>
                <AppText variant="label" color="secondary" style={{ marginBottom: SPACING.xs }}>
                  {t('dashboard.pill.spent_today')}
                </AppText>
                <AppText variant="body" color={getSpentColor()} style={styles.metricValue}>
                  {formatMoney(todaySpent, currency)}
                </AppText>
              </View>
            )}
          </View>

          {/* Fila 2: Presupuesto restante y días restantes (solo si hay gastos) */}
          {showSpendingMetrics && (
            <View style={[styles.metricsRow, { marginTop: SPACING.s }]}>
              <View style={styles.metricBlock}>
                <AppText variant="label" color="secondary" style={{ marginBottom: SPACING.xs }}>
                  {t('dashboard.summary.remaining_budget')}
                </AppText>
                <AppText variant="body" color="primary" style={styles.metricValue}>
                  {formatMoney(remainingBudget ?? 0, currency)}
                </AppText>
              </View>
              <View style={[styles.metricBlock, { alignItems: 'flex-end' }]}>
                <AppText variant="label" color="secondary" style={{ marginBottom: SPACING.xs }}>
                  {t('dashboard.summary.days_left', { count: remainingDays ?? 0 })}
                </AppText>
                <AppText variant="body" color="primary" style={styles.metricValue}>
                  {remainingDays ?? 0}
                </AppText>
              </View>
            </View>
          )}

          {/* Contenedor unificado con posición relativa para la etiqueta absoluta */}
          {showSpendingMetrics && remainingDays !== undefined && remainingDays > 0 && (
            <View style={styles.adjustedContainer}>
              <View style={styles.adjustedLeft}>
                <AppText variant="label" color="accent" style={{ marginBottom: SPACING.xs }}>
                  {t('dashboard.pill.adjusted_daily')}
                </AppText>
                <AppText variant="h3" color="accent" style={{ fontWeight: '700' }}>
                  {formatMoney(adjustedDaily, currency)}
                </AppText>
              </View>

              {/* Etiqueta de desviación en posición absoluta (sin icono) */}
              {showDeviation && (
                <View style={styles.deviationAbsolute}>
                  <AppText
                    variant="caption"
                    color={spentDeviation > 0 ? 'error' : 'success'}
                    style={styles.deviationAbsoluteText}
                  >
                    {spentDeviation > 0
                      ? t('dashboard.overspent_message_short', {
                          amount: formatMoney(Math.abs(spentDeviation), currency),
                        })
                      : t('dashboard.underspent_message_short', {
                          amount: formatMoney(Math.abs(spentDeviation), currency),
                        })}
                  </AppText>
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default DailySpendingChart;