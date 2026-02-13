// ============================================================================
// LAYOUT RAÍZ DE LA APLICACIÓN (RootLayout)
//
// Responsabilidades principales:
// - Cargar fuentes tipográficas y assets iniciales.
// - Mostrar pantalla de carga (LoadingAnimation) mientras la app no está lista.
// - Proveer el tema oscuro personalizado a través de ThemeProvider.
// - Configurar el manejador global de notificaciones en primer plano.
// - Definir el Stack Navigator raíz con las rutas principales.
// ============================================================================

import "@/locales/i18n";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as Notifications from "expo-notifications"; // ✅ Manejador global
import { PALETTE } from "@/constants/colors";
import LoadingAnimation from "./(animations)/loading";

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: PALETTE.deepNight,
    card: PALETTE.deepNight,
    text: PALETTE.creamWhite,
  },
};

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  // --------------------------------------------------------------------------
  // CARGA DE RECURSOS INICIALES
  // --------------------------------------------------------------------------
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Ionicons.font);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula carga mínima
      } catch (e) {
        console.warn("Error loading assets:", e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  // --------------------------------------------------------------------------
  // CONFIGURACIÓN GLOBAL DE NOTIFICACIONES (Primer plano)
  // --------------------------------------------------------------------------
  // Establece cómo se comportan las notificaciones cuando la app está abierta.
  // Sin este handler, las notificaciones entrantes no se muestran visualmente.
  // Se ejecuta una única vez al montar el layout raíz.
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,      // Banner en la parte superior
        shouldPlaySound: true,      // Sonido asociado
        shouldSetBadge: false,     // Sin badge en el ícono
        shouldShowBanner: true,    // Aparece en el Centro de Notificaciones
        shouldShowList: true,      // Aparece en la lista del sistema (Android)
      }),
    });
  }, []);

  if (!appIsReady) {
    return (
      <ThemeProvider value={CustomDarkTheme}>
        <StatusBar style="light" />
        <LoadingAnimation />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={CustomDarkTheme}>
      <View style={{ flex: 1, backgroundColor: PALETTE.deepNight }}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: PALETTE.deepNight },
            animation: "fade",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="test-store" />
          <Stack.Screen name="(animations)" options={{ animation: "fade" }} />
        </Stack>
      </View>
    </ThemeProvider>
  );
}