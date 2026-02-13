// ============================================================================
// LAYOUT DE NAVEGACIÓN PARA LA SECCIÓN PRINCIPAL (MAIN)
//
// Este layout gestiona la interfaz principal de la aplicación una vez que el
// usuario ha completado el onboarding y la configuración inicial.
// Responsabilidades:
// - Proveer el Stack Navigator para las pantallas: inicio, historial, ajustes y debug.
// - Controlar el estado del drawer lateral (menú hamburguesa).
// - Montar el hook de notificaciones automáticas (modo cuidado, presupuesto excedido)
//   para que se activen cuando las condiciones del store lo requieran.
// ============================================================================

import React, { useState } from "react";
import { Stack } from "expo-router";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";

import AppPressable from "@/components/atoms/action/AppPressable";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppDrawer from "@/components/molecules/navigation/AppDrawer";

// ----------------------------------------------------------------------------
// HOOKS DE NOTIFICACIONES (alertas automáticas)
// ----------------------------------------------------------------------------
import { useNotificationTriggers } from "@/features/notifications/hooks/useNotificationTriggers";

export default function MainLayout() {
  // --------------------------------------------------------------------------
  // ESTADO LOCAL
  // --------------------------------------------------------------------------
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // --------------------------------------------------------------------------
  // EFECTOS Y HOOKS DE DOM
  // --------------------------------------------------------------------------
  // useNotificationTriggers: Se monta una sola vez al cargar el layout.
  // Este hook se suscribe a los cambios del store (remainingBudget, isExtremeMode)
  // y dispara notificaciones locales automáticamente cuando se activan las alertas
  // de "modo cuidado" o "presupuesto excedido", siempre que el usuario tenga
  // habilitadas esas preferencias.
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
          headerLeft: () => (
            <AppPressable
              onPress={() => setIsDrawerOpen(true)}
              style={{ marginLeft: SPACING.m }}
            >
              <AppIcon name="menu" size="xl" />
            </AppPressable>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: "INICIO" }} />
        <Stack.Screen name="history" options={{ title: "HISTORIAL" }} />
        <Stack.Screen name="settings" options={{ title: "AJUSTES" }} />
        <Stack.Screen name="debug-reset" options={{ title: "DEBUG PANEL" }} />
      </Stack>

      <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}