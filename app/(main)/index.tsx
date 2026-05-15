// ============================================================================
// PANTALLA PRINCIPAL - DASHBOARD (CON IDEAL DINÁMICO Y MODO CUIDADO)
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
import MetricPill from "@/components/molecules/display/MetricPill";

// ----------------------------------------------------------------------------
// HOOKS PERSONALIZADOS
// ----------------------------------------------------------------------------
import { useDashboardData } from "@/components/templates/dashboard/hooks/useDashboardData";
import { useGreeting } from "@/components/templates/dashboard/hooks/useGreeting";
import { usePullToRefresh } from "@/components/templates/dashboard/hooks/usePullToRefresh";
import { useStoreHydration } from "@/components/templates/dashboard/hooks/useStoreHydration";
import { useHaptic } from "@/hooks/useHaptic";

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
 * Muestra el resumen financiero: anillo de progreso, píldoras, transacciones recientes,
 * y permite añadir gasto mediante un modal o navegar al historial.
 * Se actualiza automáticamente al cambiar de día o al volver a primer plano.
 */
export default function DashboardScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const haptic = useHaptic();

  // Estado para forzar re-render en cambios de día o cuando la app vuelve a primer plano
  const [tick, setTick] = useState(0);

  // Estado para controlar la visibilidad del modal de agregar gasto
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  useEffect(() => {
    const forceUpdate = () => setTick((t) => t + 1);

    // 1. Timeout hasta la próxima medianoche
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // próxima medianoche
    const timeUntilMidnight = midnight.getTime() - now.getTime();

    const timeout = setTimeout(forceUpdate, timeUntilMidnight);

    // 2. Listener de AppState para actualizar cuando la app vuelve a primer plano
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (nextAppState === "active") {
          forceUpdate();
        }
      }
    );

    return () => {
      clearTimeout(timeout);
      subscription.remove();
    };
  }, []);

  // Datos reales del store
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
  } = useDashboardData();

  const greeting = useGreeting(isExtremeMode);
  const { refreshing, onRefresh } = usePullToRefresh();
  const hydrated = useStoreHydration();

  // Mientras el store no esté hidratado, mostramos un spinner
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

  // Debug: Mostrar valores reales para verificar el porcentaje (solo en desarrollo)
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
      recentTransactions,
      isExtremeMode,
      tick,
    ]);
  }

  /**
   * Determina el icono correspondiente a una categoría de gasto.
   * @param category - Nombre de la categoría (ej. "Comida", "Uber").
   * @returns Nombre del icono (según Ionicons).
   */
  const getCategoryIcon = (category: string): string => {
    const lower = category.toLowerCase();
    if (
      lower.includes("comida") ||
      lower.includes("groceries") ||
      lower.includes("food")
    )
      return "fast-food-outline";
    if (
      lower.includes("uber") ||
      lower.includes("transporte") ||
      lower.includes("car")
    )
      return "car-outline";
    if (
      lower.includes("ocio") ||
      lower.includes("leisure") ||
      lower.includes("game")
    )
      return "game-controller-outline";
    if (lower.includes("salud") || lower.includes("health"))
      return "medical-outline";
    return "fast-food-outline";
  };

  /**
   * Abre el modal para agregar un nuevo gasto con feedback háptico.
   */
  const handleAddExpense = () => {
    haptic.light();
    setIsAddExpenseModalOpen(true);
  };

  /**
   * Navega al historial de transacciones con feedback háptico.
   */
  const handleTransactionPress = () => {
    haptic.selection();
    router.push(ROUTES.MAIN.HISTORY);
  };

  /**
   * Determina el estado semántico de la píldora "Ideal hoy".
   * @returns 'error' | 'warning' | 'success' | 'default'
   */
  const getIdealTodayStatus = (): 'error' | 'warning' | 'success' | 'default' => {
    if (idealToday < 0) return "error";
    if (isExtremeMode) return "warning";
    if (idealToday > 0) return "success";
    return "default";
  };

  /**
   * Retorna la etiqueta traducida del ciclo según la duración configurada.
   */
  const getCycleLabel = (): string => {
    if (daysDuration === 7) return t("dashboard.cycle.weekly", "Semanal");
    if (daysDuration === 15) return t("dashboard.cycle.biweekly", "Quincenal");
    if (daysDuration === 30) return t("dashboard.cycle.monthly", "Mensual");
    return t("dashboard.cycle.custom", "Personalizado");
  };

  /**
   * Determina el estado semántico de la badge de gasto diario.
   * @returns 'info' | 'success' | 'warning' | 'error'
   */
  const getDailyStatus = (): 'info' | 'success' | 'warning' | 'error' => {
    if (todaySpent === 0) return "info";
    if (todaySpent <= idealToday) return "success";
    if (todaySpent <= idealToday * 2) return "warning";
    return "error";
  };

  /**
   * Retorna la etiqueta traducida de la badge de gasto diario.
   */
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
        {/* CABECERA */}
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
              {/* Badge del ciclo */}
              <AppBadge label={getCycleLabel()} status="info" variant="subtle" />
              {/* Badge del estado diario */}
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
          </View>
        </AppBox>

        {/* ANILLO INTERACTIVO */}
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

        {/* PÍLDORAS DE MICRO-RESUMEN */}
        <AppBox marginBottom="xl">
          <AppStack direction="horizontal" gap="m" fullWidth>
            <MetricPill
              label={t("dashboard.pill.ideal_today", "Ideal hoy")}
              value={formatMoney(idealToday, currency)}
              status={getIdealTodayStatus()}
            />
            <MetricPill
              label={t("dashboard.pill.cycle", "Ciclo")}
              value={t("dashboard.pill.cycle_format", {
                passed: daysPassed,
                total: daysDuration,
              })}
            />
          </AppStack>
        </AppBox>

        {/* LISTA DE ACTIVIDADES RECIENTES */}
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
              {recentTransactions.map((tx, index) => (
                <React.Fragment key={tx.id}>
                  <AppListItem
                    icon={getCategoryIcon(tx.category)}
                    label={tx.category + (tx.note ? ` (${tx.note})` : "")}
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
              ))}
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

      {/* MODAL PARA AGREGAR GASTO */}
      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
      />
    </>
  );
}

// ----------------------------------------------------------------------------
// ESTILOS (SOLO LOS NECESARIOS)
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
    fontSize: SIZES.xxl, // 32 según SIZES
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