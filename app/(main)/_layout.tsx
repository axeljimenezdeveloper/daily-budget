import { Stack } from "expo-router";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";
import AppPressable from "@/components/atoms/action/AppPressable";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppAvatar from "@/components/atoms/content/AppAvatar";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: PALETTE.deepNight,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: PALETTE.creamWhite,
        },
        headerShadowVisible: false,
        headerLeft: () => (
          <AppPressable 
            onPress={() => console.log("Abrir Menú")} 
            style={{ marginLeft: SPACING.xs }}
          >
            <AppIcon 
              name="menu" 
              library="Ionicons" 
              size="xl" 
              color="primary" 
            />
          </AppPressable>
        ),
        headerRight: () => (
          <AppPressable 
            onPress={() => console.log("Abrir Perfil")} 
            style={{ marginRight: SPACING.s }}
          >
            <AppAvatar 
              name="Juan Perez" 
              size="xl" 
            />
          </AppPressable>
        ),
        contentStyle: {
          backgroundColor: PALETTE.deepNight,
        },
      }}
    >
      {/* Dashboard Principal */}
      <Stack.Screen 
        name="index" 
        options={{ title: "Inicio" }} 
      />

      {/* Registro de Gasto - Configurado como Modal */}
      <Stack.Screen 
        name="add-expense" 
        options={{ 
          title: "Nuevo Gasto",
          presentation: "modal", // Aparece desde abajo
          headerLeft: () => null // Opcional: quitar menú en esta pantalla
        }} 
      />

      {/* Historial de Gastos */}
      <Stack.Screen 
        name="history" 
        options={{ title: "Historial" }} 
      />

      {/* Ajustes de la App */}
      <Stack.Screen 
        name="settings" 
        options={{ title: "Ajustes" }} 
      />
    </Stack>
  );
}