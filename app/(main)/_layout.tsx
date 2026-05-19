// ============================================================================
// LAYOUT DE NAVEGACIÓN PARA LA SECCIÓN PRINCIPAL (MAIN)
//
// Este layout gestiona la interfaz principal de la aplicación una vez que el
// usuario ha completado el onboarding y la configuración inicial.
// Responsabilidades:
// - Proveer el Stack Navigator para las pantallas: inicio, historial, ajustes y debug.
// - Controlar el estado del drawer lateral (menú hamburguesa).
// - Montar el hook de notificaciones automáticas.
// ============================================================================

import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";

import AppPressable from "@/components/atoms/action/AppPressable";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppDrawer from "@/components/molecules/navigation/AppDrawer";
import HeaderTitle from "@/components/molecules/navigation/HeaderTitle";
import { useNotificationTriggers } from "@/features/notifications/hooks/useNotificationTriggers";

export default function MainLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  useNotificationTriggers();

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: PALETTE.deepNight },
          headerTitleStyle: {
            color: PALETTE.creamWhite,
            fontWeight: "700",
            fontSize: 18,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      >
        {/* INICIO – menú hamburguesa (blanco) */}
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => <HeaderTitle i18nKey="screens.dashboard" />,
            headerLeft: () => (
              <AppPressable
                onPress={() => setIsDrawerOpen(true)}
                style={{ marginLeft: SPACING.m }}
              >
                <AppIcon name="menu" size="xl" />
              </AppPressable>
            ),
          }}
        />

        {/* HISTORIAL – flecha naranja */}
        <Stack.Screen
          name="history"
          options={{
            headerTitle: () => <HeaderTitle i18nKey="screens.history" />,
            headerLeft: () => (
              <AppPressable
                onPress={() => router.back()}
                style={{ marginLeft: SPACING.m }}
              >
                <AppIcon name="arrow-back-outline" size="xl" color="accent" />
              </AppPressable>
            ),
          }}
        />

        {/* AJUSTES – flecha naranja */}
        <Stack.Screen
          name="settings"
          options={{
            headerTitle: () => <HeaderTitle i18nKey="screens.settings" />,
            headerLeft: () => (
              <AppPressable
                onPress={() => router.back()}
                style={{ marginLeft: SPACING.m }}
              >
                <AppIcon name="arrow-back-outline" size="xl" color="accent" />
              </AppPressable>
            ),
          }}
        />

        {/* DEBUG – flecha naranja */}
        <Stack.Screen
          name="debug-reset"
          options={{
            headerTitle: () => <HeaderTitle i18nKey="screens.settings" fallback="DEBUG" />,
            headerLeft: () => (
              <AppPressable
                onPress={() => router.back()}
                style={{ marginLeft: SPACING.m }}
              >
                <AppIcon name="arrow-back-outline" size="xl" color="accent" />
              </AppPressable>
            ),
          }}
        />
      </Stack>

      <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}