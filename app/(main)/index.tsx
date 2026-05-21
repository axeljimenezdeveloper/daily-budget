// ============================================================================
// PANTALLA PRINCIPAL - DASHBOARD (CON GRÁFICO DE GASTOS DIARIOS)
// ============================================================================
//
// Esta pantalla es el núcleo de la aplicación. Muestra:
//   - Anillo circular con el progreso del presupuesto.
//   - Gráfico de gastos de los últimos 7 días (DailySpendingChart).
//   - Lista de los últimos 3 gastos.
//   - Botón flotante (FAB) para registrar un nuevo gasto.
//   - Cabecera con saludo dinámico, badges y número de día del ciclo.
//
// La pantalla se actualiza automáticamente al cambiar de día o al volver
// a primer plano (AppState). Los datos provienen del hook useDashboardData.
// ============================================================================

import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  AppState,
  AppStateStatus,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS Y MOLECULARES
// ----------------------------------------------------------------------------
import AppBox from "@/components/atoms/structure/AppBox";
import AppText from "@/components/atoms/content/AppText";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppStack from "@/components/atoms/structure/AppStack";
import AppListItem from "@/components/atoms/action/AppListItem";
import AppDivider from "@/components/atoms/structure/AppDivider";
import AppBadge from "@/components/atoms/visual/AppBadge";
import { DashboardLayout } from "@/components/templates/dashboard/components/layout/DashboardLayout";
import AppCircularProgress from "@/components/molecules/visual/AppCircularProgress";
import DailySpendingChart from "@/components/molecules/visual/DailySpendingChart";

// ----------------------------------------------------------------------------
// HOOKS PERSONALIZADOS
// ----------------------------------------------------------------------------
import { useDashboardData } from "@/components/templates/dashboard/hooks/useDashboardData";
import { useGreeting } from "@/components/templates/dashboard/hooks/useGreeting";
import { usePullToRefresh } from "@/components/templates/dashboard/hooks/usePullToRefresh";
import { useStoreHydration } from "@/components/templates/dashboard/hooks/useStoreHydration";
import { useHaptic } from "@/hooks/useHaptic";

// ----------------------------------------------------------------------------
// FEATURES
// ----------------------------------------------------------------------------
import { useCategoryIcon } from "@/features/categories";

// ----------------------------------------------------------------------------
// CONSTANTES Y UTILIDADES
// ----------------------------------------------------------------------------
import { PALETTE } from "@/constants/colors";
import { SPACING, SIZES } from "@/constants/metrics";
import { ROUTES } from "@/constants/navigation";
import { formatMoney } from "@/store/useVaultStore/index.utils";
import { formatRelativeTime } from "@/utils/date";

// ----------------------------------------------------------------------------
// MODAL PARA AGREGAR GASTO
// ----------------------------------------------------------------------------
import { AddExpenseModal } from "@/components/templates/add-expense/components/modals/AddExpenseModal";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * Pantalla principal del dashboard.
 * Muestra el resumen financiero: anillo de progreso, gráfico de gastos diarios,
 * métricas ajustadas y lista de gastos recientes.
 * Se actualiza automáticamente al cambiar de día o al volver a primer plano.
 */
export default function DashboardScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const haptic = useHaptic();

  // Estado para forzar un re-render cuando cambia el día o la app vuelve a primer plano
  const [tick, setTick] = useState(0);
  // Controla la visibilidad del modal para agregar gasto
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  // --------------------------------------------------------------------------
  // EFECTO PARA FORZAR ACTUALIZACIÓN EN CAMBIO DE DÍA Y APPSTATE
  // --------------------------------------------------------------------------
  // Se programa un timeout hasta la próxima medianoche y se añade un listener
  // de AppState para actualizar la UI cuando la app vuelve a primer plano.
  // --------------------------------------------------------------------------
  useEffect(() => {
    const forceUpdate = () => setTick((t) => t + 1);

    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - now.getTime();
    const timeout = setTimeout(forceUpdate, timeUntilMidnight);

    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (nextAppState === "active") forceUpdate();
      }
    );

    return () => {
      clearTimeout(timeout);
      subscription.remove();
    };
  }, []);

  // --------------------------------------------------------------------------
  // OBTENCIÓN DE DATOS DEL STORE (useDashboardData)
  // --------------------------------------------------------------------------
  const {
    remainingDays,
    daysDuration,
    currency,
    progressPercent,
    recentTransactions,
    isExtremeMode,
    hasHydrated,
    summary,
    remainingBudget,
    totalBudget,
    idealToday,
    todaySpent,
    originalIdeal,
    spentDeviation,
    transactions,
  } = useDashboardData();

  const greeting = useGreeting(isExtremeMode);
  const { refreshing, onRefresh } = usePullToRefresh();
  const hydrated = useStoreHydration();

  // Mientras el store no esté hidratado (datos cargados desde AsyncStorage),
  // mostramos un spinner de carga.
  if (!hydrated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PALETTE.sunsetOrange} />
        <AppText variant="body" color="secondary" style={styles.loadingText}>
          {t("dashboard.loading", "Cargando...")}
        </AppText>
      </View>
    );
  }

  const daysPassed = summary.daysPassed;

  // --------------------------------------------------------------------------
  // LOG DE DEBUG (solo en desarrollo)
  // --------------------------------------------------------------------------
  // NOTE: Este console.log se ejecuta solo en modo desarrollo (__DEV__) y
  // muestra los valores actuales del dashboard para facilitar la depuración.
  // Se actualiza cada vez que cambia alguna de las dependencias.
  // --------------------------------------------------------------------------
  if (__DEV__) {
    useEffect(() => {
      console.log("📊 Dashboard data:", {
        progressPercent,
        totalBudget,
        remainingBudget,
        remainingDays,
        daysDuration,
        daysPassed,
        idealToday,
        todaySpent,
        originalIdeal,
        spentDeviation,
        recentTransactions: recentTransactions.length,
        isExtremeMode,
        tick,
      });
    }, [
      progressPercent,
      totalBudget,
      remainingBudget,
      remainingDays,
      daysDuration,
      daysPassed,
      idealToday,
      todaySpent,
      originalIdeal,
      spentDeviation,
      recentTransactions,
      isExtremeMode,
      tick,
    ]);
  }

  // --------------------------------------------------------------------------
  // MANEJADORES DE EVENTOS
  // --------------------------------------------------------------------------
  const handleAddExpense = () => {
    haptic.light();
    setIsAddExpenseModalOpen(true);
  };

  const handleTransactionPress = () => {
    haptic.selection();
    router.push(ROUTES.MAIN.HISTORY);
  };

  // Retorna la etiqueta del ciclo (Semanal, Quincenal, Mensual, Personalizado)
  const getCycleLabel = (): string => {
    if (daysDuration === 7) return t("dashboard.cycle.weekly", "Semanal");
    if (daysDuration === 15) return t("dashboard.cycle.biweekly", "Quincenal");
    if (daysDuration === 30) return t("dashboard.cycle.monthly", "Mensual");
    return t("dashboard.cycle.custom", "Personalizado");
  };

  // Determina el estado semántico de la badge que resume el gasto de hoy
  // (info, success, warning, error). Soporta 'info' para cuando no hay gastos.
  const getDailyStatus = (): 'info' | 'success' | 'warning' | 'error' => {
    if (todaySpent === 0) return "info";
    if (todaySpent <= idealToday) return "success";
    if (todaySpent <= idealToday * 2) return "warning";
    return "error";
  };

  // Retorna el texto traducido para la badge de gasto diario
  const getDailyLabel = (): string => {
    if (todaySpent === 0)
      return t("dashboard.badge.no_spending", "Sin gastos hoy");
    if (todaySpent <= idealToday)
      return t("dashboard.badge.on_track", "Al día");
    if (todaySpent <= idealToday * 2)
      return t("dashboard.badge.caution", "Cuidado");
    return t("dashboard.badge.over", "Excedido");
  };

  return (
    <>
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
            <AppText style={styles.fabIcon}>+</AppText>
          </TouchableOpacity>
        }
      >
        {/* --------------------------------------------------------------------
          CABECERA
          Saludo dinámico, subtítulo, badges de ciclo y estado diario,
          y texto del ciclo (día X de N).
        -------------------------------------------------------------------- */}
        <AppBox marginBottom="xl">
          <View style={styles.greetingHeader}>
            <AppText variant="h2" color="primary">
              {greeting}
            </AppText>
            <AppText
              variant="body"
              color="secondary"
              style={{ marginTop: SPACING.xs }}
            >
              {t("dashboard.subtitle", "Estado financiero")}
            </AppText>
            <AppStack
              direction="horizontal"
              gap="s"
              style={{ marginTop: SPACING.s, flexWrap: "wrap" }}
            >
              <AppBadge label={getCycleLabel()} status="info" variant="subtle" />
              <AppBadge
                label={getDailyLabel()}
                status={getDailyStatus()}
                variant="subtle"
              />
              {isExtremeMode && (
                <AppBadge
                  label={t("dashboard.badge.extreme_mode", "Modo cuidado")}
                  status="error"
                  variant="subtle"
                />
              )}
            </AppStack>
            <AppText variant="caption" color="secondary" style={{ marginTop: SPACING.s }}>
              {t("dashboard.cycle_info", { passed: daysPassed, total: daysDuration })}
            </AppText>
          </View>
        </AppBox>

        {/* --------------------------------------------------------------------
          ANILLO INTERACTIVO DE PROGRESO
          Muestra el porcentaje de presupuesto restante. Al presionar alterna
          entre mostrar porcentaje y monto disponible.
        -------------------------------------------------------------------- */}
        <AppBox marginBottom="xl" align="center">
          <AppCircularProgress
            progress={progressPercent}
            remaining={remainingBudget}
            total={totalBudget}
            currency={currency}
            isExtremeMode={isExtremeMode}
            spentLabel={t("dashboard.circular.spent_label", "Gastado")}
            availableLabel={t("dashboard.circular.available_label", "Disponible")}
            spentFooter={
              <AppText
                variant="caption"
                color="secondary"
                style={styles.footerText}
              >
                {t("dashboard.circular.remaining_with_days", {
                  amount: formatMoney(remainingBudget, currency),
                  days: remainingDays,
                })}
              </AppText>
            }
            availableFooter={
              <AppText
                variant="caption"
                color="secondary"
                style={styles.footerText}
              >
                {t("dashboard.circular.initial_budget", {
                  amount: formatMoney(totalBudget, currency),
                })}
              </AppText>
            }
          />
        </AppBox>

        {/* --------------------------------------------------------------------
          GRÁFICO DE GASTOS DIARIOS
          Muestra los últimos 7 días con barras, puntos tooltip y footer
          con métricas ajustadas (presupuesto diario ideal, gastado hoy,
          presupuesto restante, días restantes, presupuesto ajustado y
          mensaje de desviación).
        -------------------------------------------------------------------- */}
        <DailySpendingChart
          transactions={transactions}
          currency={currency}
          daysCount={7}
          maxBarHeight={80}
          originalIdeal={originalIdeal}
          todaySpent={todaySpent}
          spentDeviation={spentDeviation}
          remainingBudget={remainingBudget}
          remainingDays={remainingDays}
        />

        {/* --------------------------------------------------------------------
          LISTA DE GASTOS RECIENTES
          Muestra los últimos 3 gastos. Al presionar una fila navega al
          historial completo. El icono de cada categoría se obtiene
          dinámicamente desde el feature categories.
        -------------------------------------------------------------------- */}
        <AppBox marginBottom="xl">
          <AppText
            variant="h3"
            color="accent"
            style={{ marginBottom: SPACING.s }}
          >
            {t("dashboard.recent_trails", "Últimos rastros")}
          </AppText>

          {recentTransactions.length > 0 ? (
            <AppBox>
              {recentTransactions.map((tx, index) => {
                const iconName = useCategoryIcon(tx.category);
                return (
                  <React.Fragment key={tx.id}>
                    <AppListItem
                      icon={iconName}
                      label={t(`categories.${tx.category}`)}
                      subLabel={formatRelativeTime(new Date(tx.date))}
                      rightContent={
                        <AppBadge
                          label={`-${formatMoney(tx.amount, currency)}`}
                          status="warning"
                          variant="subtle"
                        />
                      }
                      onPress={handleTransactionPress}
                      iconColor="secondary"
                    />
                    {index < recentTransactions.length - 1 && (
                      <AppDivider
                        color="darkBorder"
                        thickness={1}
                        marginVertical="s"
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </AppBox>
          ) : (
            <AppBox align="center" padding="xl">
              <AppText
                variant="body"
                color="primary"
                style={{ marginBottom: SPACING.xs }}
              >
                {t("dashboard.empty.title", "Sin movimientos")}
              </AppText>
              <AppText variant="caption" color="secondary" align="center">
                {t("dashboard.empty.message", "Tus gastos aparecerán aquí")}
              </AppText>
            </AppBox>
          )}
        </AppBox>
      </DashboardLayout>

      {/* Modal para registrar un nuevo gasto */}
      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
      />
    </>
  );
}

// ----------------------------------------------------------------------------
// ESTILOS (SOLO LOS NECESARIOS, EL RESTO SE MANEJA CON COMPONENTES ATÓMICOS)
// ----------------------------------------------------------------------------
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: PALETTE.deepNight,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: SPACING.m,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: PALETTE.sunsetOrange,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabIcon: {
    fontSize: SIZES.xxl,
    color: PALETTE.creamWhite,
    fontWeight: "300",
    lineHeight: SIZES.xxl,
  },
  greetingHeader: {
    borderLeftWidth: 4,
    borderLeftColor: PALETTE.sunsetOrange,
    paddingLeft: SPACING.l,
  },
  footerText: {
    fontSize: 11,
    textAlign: "center",
    paddingHorizontal: 4,
  },
});