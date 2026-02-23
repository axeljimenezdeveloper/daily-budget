// ============================================================================
// PANTALLA PRINCIPAL - DASHBOARD (CON LAYOUT + FAB)
//
// Centro neurálgico de Vulpis Days. Muestra el estado actual de la bóveda.
// Utiliza DashboardLayout para la estructura base, incluyendo el FAB.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

// ----------------------------------------------------------------------------
// DEPENDENCIAS INTERNAS (HOOKS Y UTILIDADES)
// ----------------------------------------------------------------------------
import { DashboardLayout } from '@/components/templates/dashboard/components/layout/DashboardLayout';
import { useDashboardData } from '@/components/templates/dashboard/hooks/useDashboardData';
import { useGreeting } from '@/components/templates/dashboard/hooks/useGreeting';
import { useStoreHydration } from '@/components/templates/dashboard/hooks/useStoreHydration';
import { usePullToRefresh } from '@/components/templates/dashboard/hooks/usePullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
import { formatMoney } from '@/store/useVaultStore/index.utils';
import { formatDate } from '@/utils/date';
import { PALETTE } from '@/constants/colors';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '@/constants/metrics';
import { ROUTES } from '@/constants/navigation';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
export default function DashboardScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const haptic = useHaptic();

  // --------------------------------------------------------------------------
  // HOOKS PERSONALIZADOS
  // --------------------------------------------------------------------------
  const {
    daysDuration,
    isExtremeMode,
    currency,
    summary,
    remainingDays,
    progressPercent,
    recentTransactions,
    remainingBudget,
  } = useDashboardData();

  const greeting = useGreeting(isExtremeMode);
  const hydrated = useStoreHydration();
  const { refreshing, onRefresh } = usePullToRefresh();

  // --------------------------------------------------------------------------
  // COLOR DE LA BARRA DE PROGRESO
  // --------------------------------------------------------------------------
  const getProgressBarColor = (): string => {
    if (remainingDays <= 0) return PALETTE.errorRed;
    if (isExtremeMode || remainingDays < 3) return PALETTE.warningOrange;
    return PALETTE.successGreen;
  };

  // --------------------------------------------------------------------------
  // MANEJADORES CON HAPTIC
  // --------------------------------------------------------------------------
  const handleAddExpense = (): void => {
    haptic.light();
    router.push(ROUTES.MAIN.ADD_EXPENSE);
  };

  const handleTransactionPress = (): void => {
    haptic.selection();
    router.push(ROUTES.MAIN.HISTORY);
  };

  // --------------------------------------------------------------------------
  // RENDERIZADO CONDICIONAL (MIENTRAS HIDRATA)
  // --------------------------------------------------------------------------
  if (!hydrated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PALETTE.sunsetOrange} />
        <Text style={styles.loadingText}>{t('dashboard.loading')}</Text>
      </View>
    );
  }

  // --------------------------------------------------------------------------
  // RENDERIZADO PRINCIPAL
  // --------------------------------------------------------------------------
  return (
    <DashboardLayout
      onRefresh={onRefresh}
      refreshing={refreshing}
      refreshControlColor={PALETTE.sunsetOrange}
      fab={
        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddExpense}
          activeOpacity={0.8}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      }
    >
      {/* --------------------------------------------------------------------
        CABECERA: Saludo dinámico
      -------------------------------------------------------------------- */}
      <View style={styles.header}>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>

      {/* --------------------------------------------------------------------
        MÉTRICA PRINCIPAL
      -------------------------------------------------------------------- */}
      <View style={styles.mainCounter}>
        <Text style={styles.bigNumber}>{remainingDays}</Text>
        <Text style={styles.counterLabel}>
          {t('dashboard.days_of_tranquility', { count: remainingDays })}
        </Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${progressPercent}%`,
                  backgroundColor: getProgressBarColor(),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {t('dashboard.progress', {
              passed: summary.daysPassed,
              total: daysDuration,
            })}
          </Text>
        </View>
      </View>

      {/* --------------------------------------------------------------------
        TARJETAS DE MÉTRICAS SECUNDARIAS (4 en 2 filas)
      -------------------------------------------------------------------- */}
      <View style={styles.statsGrid}>
        {/* Primera fila */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={styles.statLabel}>{t('dashboard.per_day')}</Text>
            <Text style={styles.statValue}>
              {formatMoney(summary.dailyAverage, currency)}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📋</Text>
            <Text style={styles.statLabel}>{t('dashboard.spent')}</Text>
            <Text style={styles.statValue}>
              {formatMoney(summary.totalSpent, currency)}
            </Text>
          </View>
        </View>

        {/* Segunda fila */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📅</Text>
            <Text style={styles.statLabel}>{t('dashboard.days_since_start')}</Text>
            <Text style={styles.statValue}>{summary.daysPassed}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statLabel}>
              {/* TODO: Agregar clave 'dashboard.remaining' a los archivos de idioma */}
              {t('dashboard.remaining', { defaultValue: 'restante' })}
            </Text>
            <Text style={styles.statValue}>
              {formatMoney(remainingBudget, currency)}
            </Text>
          </View>
        </View>
      </View>

      {/* --------------------------------------------------------------------
        SECCIÓN DE ÚLTIMOS RASTROS
      -------------------------------------------------------------------- */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>{t('dashboard.recent_trails')}</Text>

        {recentTransactions.length > 0 ? (
          recentTransactions.map((tx) => (
            <TouchableOpacity
              key={tx.id}
              style={styles.historyItem}
              onPress={handleTransactionPress}
              activeOpacity={0.7}
            >
              <View style={styles.itemIcon}>
                <Text style={styles.itemIconText}>🍴</Text>
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>
                  {tx.category}
                  {tx.note ? ` (${tx.note})` : ''}
                </Text>
                <Text style={styles.itemDate}>{formatDate(tx.date)}</Text>
              </View>
              <Text style={styles.itemAmount}>
                -{formatMoney(tx.amount, currency)}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t('dashboard.empty.title')}</Text>
            <Text style={styles.emptyMessage}>{t('dashboard.empty.message')}</Text>
          </View>
        )}
      </View>
    </DashboardLayout>
  );
}

// ----------------------------------------------------------------------------
// ESTILOS
// ----------------------------------------------------------------------------
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: PALETTE.deepNight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.lightGray,
    marginTop: SPACING.m,
  },
  // Header
  header: {
    marginBottom: SPACING.xl,
  },
  greeting: {
    ...TYPOGRAPHY.title,
    color: PALETTE.creamWhite,
    maxWidth: '90%',
  },
  // Main counter
  mainCounter: {
    marginBottom: SPACING.xl,
  },
  bigNumber: {
    ...TYPOGRAPHY.hero,
    color: PALETTE.creamWhite,
    lineHeight: TYPOGRAPHY.hero.fontSize * 1.1,
  },
  counterLabel: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.lightGray,
    marginBottom: SPACING.m,
  },
  progressContainer: {
    width: '100%',
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: PALETTE.nightBlue,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.round,
  },
  progressText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.lightGray,
    textAlign: 'right',
    marginTop: SPACING.xs,
  },
  // Stats grid (contenedor principal vertical)
  statsGrid: {
    flexDirection: 'column',
    gap: SPACING.s,
    marginBottom: SPACING.xl,
  },
  // Fila del grid
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.s,
  },
  statCard: {
    flex: 1,
    backgroundColor: PALETTE.nightBlue,
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.l,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.label,
    color: PALETTE.lightGray,
    marginBottom: 2,
  },
  statValue: {
    ...TYPOGRAPHY.bodyMd,
    fontWeight: '700',
    color: PALETTE.creamWhite,
  },
  // History section
  historySection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.header,
    color: PALETTE.sunsetOrange,
    marginBottom: SPACING.l,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  itemIcon: {
    width: 45,
    height: 45,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: PALETTE.nightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.m,
  },
  itemIconText: {
    fontSize: 24,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.creamWhite,
  },
  itemDate: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.lightGray,
  },
  itemAmount: {
    ...TYPOGRAPHY.bodyMd,
    fontWeight: '500',
    color: PALETTE.creamWhite,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyTitle: {
    ...TYPOGRAPHY.bodyLg,
    color: PALETTE.creamWhite,
    marginBottom: SPACING.xs,
  },
  emptyMessage: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.lightGray,
    textAlign: 'center',
  },
  // FAB (solo estilo visual; posición la maneja el layout)
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: PALETTE.sunsetOrange,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
    lineHeight: 32,
  },
});