import React, { useState } from "react";
import { Stack } from "expo-router";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";

import AppPressable from "@/components/atoms/action/AppPressable";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppDrawer from "@/components/molecules/navigation/AppDrawer";

export default function MainLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
