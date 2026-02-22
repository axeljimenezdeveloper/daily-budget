// ============================================================================
// LAYOUT RAÍZ DE LA APLICACIÓN (RootLayout)
//
// Responsabilidades principales:
// - Cargar fuentes y assets iniciales.
// - Gestionar el splash screen nativo.
// - Proveer el tema oscuro personalizado.
// - Configurar notificaciones y deep linking.
// - Definir el Stack Navigator raíz.
// - Renderizar el contenedor global de toasts (AppToastContainer).
// ============================================================================

import "@/locales/i18n";
import { useEffect, useState, useRef, useCallback } from "react";
import { View, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { PALETTE } from "@/constants/colors";
import { NOTIFICATION_CHANNELS } from "@/features/notifications/constants";
import { ROUTES } from "@/constants/navigation";
import { useVaultStore } from "@/store/useVaultStore";
import { AppToastContainer } from "@/components/molecules/feedback/AppToastContainer";
import { SPACING } from "@/constants/metrics";

// ⚠️ Bloquear la ocultación automática del splash lo antes posible
SplashScreen.preventAutoHideAsync();

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
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);
  const { _hasHydrated } = useVaultStore();

  // Referencias para los listeners de notificaciones
  const notificationListener = useRef<Notifications.EventSubscription>(null);
  const responseListener = useRef<Notifications.EventSubscription>(null);

  // --------------------------------------------------------------------------
  // CARGA DE RECURSOS INICIALES
  // --------------------------------------------------------------------------
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Ionicons.font);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn("Error loading assets:", e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  // --------------------------------------------------------------------------
  // CONFIGURACIÓN GLOBAL DE NOTIFICACIONES
  // --------------------------------------------------------------------------
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        // Eliminado: shouldShowAlert (obsoleto)
        shouldShowBanner: true,  // Para iOS (banner)
        shouldShowList: true,    // Para Android (lista en centro de notificaciones)
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, []);

  // --------------------------------------------------------------------------
  // CREACIÓN DE CANALES DE NOTIFICACIÓN (Android)
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (Platform.OS === "android") {
      Object.values(NOTIFICATION_CHANNELS).forEach((channel) => {
        Notifications.setNotificationChannelAsync(channel.id, {
          name: channel.name,
          description: channel.description,
          importance: channel.importance,
          sound: "default",
        });
      });
    }
  }, []);

  // --------------------------------------------------------------------------
  // MANEJO DE NAVEGACIÓN DESDE NOTIFICACIONES
  // --------------------------------------------------------------------------
  useEffect(() => {
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { data } = response.notification.request.content;
        if (data?.screen) {
          router.push(data.screen as string);
        } else {
          router.push(ROUTES.MAIN.INDEX);
        }
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // Podríamos actualizar algún estado global si es necesario
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [router]);

  // --------------------------------------------------------------------------
  // MANEJO DE APERTURA DESDE NOTIFICACIÓN (APP CERRADA)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const response = Notifications.getLastNotificationResponse();
    const data = response?.notification?.request?.content?.data;
    if (data?.screen) {
      setTimeout(() => {
        router.push(data.screen as string);
      }, 500);
    }
  }, [router]);

  // --------------------------------------------------------------------------
  // OCULTAR EL SPLASH CUANDO TODO ESTÉ LISTO
  // --------------------------------------------------------------------------
  useEffect(() => {
    const hideSplash = async () => {
      if (appIsReady && _hasHydrated) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [appIsReady, _hasHydrated]);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady && _hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, _hasHydrated]);

  return (
    <ThemeProvider value={CustomDarkTheme}>
      <View
        style={{ flex: 1, backgroundColor: PALETTE.deepNight }}
        onLayout={onLayoutRootView}
      >
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

        {/* --------------------------------------------------------------------
          CONTENEDOR GLOBAL DE TOASTS
          Se posiciona de forma absoluta sobre todas las pantallas.
          -------------------------------------------------------------------- */}
        <AppToastContainer position="top" offset={SPACING.xxxxl} />
      </View>
    </ThemeProvider>
  );
}