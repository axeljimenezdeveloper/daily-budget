// ============================================================================
// LAYOUT DE NAVEGACIÓN PARA LA SECCIÓN DE INFORMACIÓN (INFO)
//
// Define el Stack Navigator para las pantallas de guía y protocolos.
// Comparte el mismo estilo visual que la sección principal (main),
// pero con un botón de retroceso en lugar del menú hamburguesa.
// ============================================================================

import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";

import AppPressable from "@/components/atoms/action/AppPressable";
import AppIcon from "@/components/atoms/content/AppIcon";
import HeaderTitle from "@/components/molecules/navigation/HeaderTitle";

export default function InfoLayout() {
  const router = useRouter();

  return (
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
            onPress={() => router.back()}
            style={{ marginLeft: SPACING.m }}
          >
            <AppIcon name="arrow-back-outline" size="xl" color="accent" />
          </AppPressable>
        ),
      }}
    >
      <Stack.Screen
        name="guide"
        options={{
          headerTitle: () => <HeaderTitle i18nKey="screens.guide" />,
        }}
      />
      <Stack.Screen
        name="protocols"
        options={{
          headerTitle: () => <HeaderTitle i18nKey="screens.protocols" />,
        }}
      />
    </Stack>
  );
}