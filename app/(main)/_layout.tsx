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
            style={{ marginRight: SPACING.m }}
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
      <Stack.Screen 
        name="index" 
        options={{ title: "Inicio" }} 
      />
    </Stack>
  );
}