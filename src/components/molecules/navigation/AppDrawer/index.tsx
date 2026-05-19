// ============================================================================
// DRAWER LATERAL – MENÚ DE NAVEGACIÓN PRINCIPAL
//
// Componente que representa el menú deslizable desde la izquierda.
// Muestra el perfil del usuario (Daily Budget, ID fijo), las rutas principales
// (Dashboard, History, Settings) y las rutas informativas (Guide, Protocols).
// El pie de página muestra el progreso del presupuesto restante.
// ============================================================================

import React, { useRef, useEffect } from "react";
import { ScrollView, Animated } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS
// ----------------------------------------------------------------------------
import AppOverlay from "@/components/atoms/structure/AppOverlay";
import AppSafeView from "@/components/atoms/structure/AppSafeView";
import AppBox from "@/components/atoms/structure/AppBox";
import AppPanel from "@/components/atoms/surface/AppPanel";
import AppText from "@/components/atoms/content/AppText";
import AppAvatar from "@/components/atoms/content/AppAvatar";
import AppDivider from "@/components/atoms/structure/AppDivider";
import AppProgressBar from "@/components/atoms/visual/AppProgressBar";
import AppListItem from "@/components/atoms/action/AppListItem";

// ----------------------------------------------------------------------------
// CONSTANTES Y UTILIDADES
// ----------------------------------------------------------------------------
import { APP_NAME } from "@/constants/app";
import { ROUTES } from "@/constants/navigation";
import { AppDrawerProps } from "./index.props";
import { styles, DRAWER_WIDTH } from "./index.styles";
import { MAIN_ROUTES, INFO_ROUTES, getBudgetProgress, getBudgetStatus } from "./index.utils";
import { useVaultStore } from "@/store/useVaultStore";
import { formatMoney } from "@/store/useVaultStore/index.utils";

// ----------------------------------------------------------------------------
// MAPEO DE RUTAS A CLAVES I18N
// ----------------------------------------------------------------------------
const mainRouteKeyMap: Record<string, string> = {
  [ROUTES.MAIN.INDEX]: "drawer.dashboard",
  [ROUTES.MAIN.HISTORY]: "drawer.history",
  [ROUTES.MAIN.SETTINGS]: "drawer.settings",
};

const infoRouteKeyMap: Record<string, string> = {
  [ROUTES.INFO.GUIDE]: "drawer.guide",
  [ROUTES.INFO.PROTOCOLS]: "drawer.protocols",
};

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
export default function AppDrawer({ isOpen, onClose }: AppDrawerProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  // --------------------------------------------------------------------------
  // DATOS DEL STORE (PRESUPUESTO Y GASTOS)
  // --------------------------------------------------------------------------
  const { totalBudget, remainingBudget, currency } = useVaultStore();

  // --------------------------------------------------------------------------
  // CÁLCULOS PARA EL PROGRESO DEL PRESUPUESTO
  // --------------------------------------------------------------------------
  const { spent, remaining, percentage } = getBudgetProgress(totalBudget, remainingBudget);
  const status = getBudgetStatus(percentage);

  // --------------------------------------------------------------------------
  // ANIMACIÓN DE APERTURA/CIERRE
  // --------------------------------------------------------------------------
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  // --------------------------------------------------------------------------
  // MANEJADOR DE NAVEGACIÓN
  // --------------------------------------------------------------------------
  const handleNavigate = (path: string) => {
    onClose();
    router.push(path as any);
  };

  // --------------------------------------------------------------------------
  // RENDERIZADO
  // --------------------------------------------------------------------------
  return (
    <AppOverlay isOpen={isOpen} onClose={onClose}>
      <Animated.View
        style={[styles.animatedContainer, { transform: [{ translateX: slideAnim }] }]}
      >
        <AppPanel background="deepNight" flex={1}>
          <AppSafeView edges={["top", "bottom"]} background="transparent">
            {/* ------------------------------------------------------------------
              PERFIL DEL USUARIO (DAILY BUDGET)
            ------------------------------------------------------------------ */}
            <AppBox direction="row" align="center" gap="m" padding="m">
              <AppAvatar name={APP_NAME} size="xxl" />
              <AppBox gap="xs">
                <AppText variant="h3">{APP_NAME}</AppText>
                <AppText variant="caption" color="secondary">
                  {t("drawer.user_id", { id: "DB-2026" })}
                </AppText>
              </AppBox>
            </AppBox>

            <AppDivider />

            {/* ------------------------------------------------------------------
              MENÚ PRINCIPAL (SCROLLABLE)
            ------------------------------------------------------------------ */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {/* Sección principal */}
              <AppText variant="label" color="secondary" style={styles.menuLabel}>
                {t("drawer.main_menu")}
              </AppText>

              <AppBox gap="s">
                {MAIN_ROUTES.map((route) => (
                  <AppListItem
                    key={route.path}
                    label={t(mainRouteKeyMap[route.path])}
                    icon={route.icon}
                    isActive={pathname === route.path}
                    onPress={() => handleNavigate(route.path)}
                  />
                ))}
              </AppBox>

              <AppDivider marginVertical="l" />

              {/* Sección informativa */}
              <AppText variant="label" color="secondary" style={styles.menuLabel}>
                {t("drawer.information")}
              </AppText>

              <AppBox gap="s">
                {INFO_ROUTES.map((route) => (
                  <AppListItem
                    key={route.path}
                    label={t(infoRouteKeyMap[route.path])}
                    icon={route.icon}
                    onPress={() => handleNavigate(route.path)}
                  />
                ))}
              </AppBox>
            </ScrollView>

            {/* ------------------------------------------------------------------
              FOOTER – PROGRESO DEL PRESUPUESTO
            ------------------------------------------------------------------ */}
            <AppBox padding="m" style={styles.footer}>
              <AppBox
                direction="row"
                justify="space-between"
                align="center"
                style={styles.budgetInfo}
              >
                <AppText variant="label" color="secondary">
                  {t("drawer.budget_progress")}
                </AppText>
                <AppText variant="caption" color={status}>
                  {Math.round(percentage * 100)}%
                </AppText>
              </AppBox>

              <AppProgressBar progress={percentage} status={status} height={8} />

              <AppBox direction="row" justify="space-between" marginTop="s">
                <AppText variant="caption" color="secondary">
                  {t("drawer.remaining")}: {formatMoney(remaining, currency)}
                </AppText>
                <AppText variant="caption" color="secondary">
                  {t("drawer.spent")}: {formatMoney(spent, currency)}
                </AppText>
              </AppBox>
            </AppBox>
          </AppSafeView>
        </AppPanel>
      </Animated.View>
    </AppOverlay>
  );
}