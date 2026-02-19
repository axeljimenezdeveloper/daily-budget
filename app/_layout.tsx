// ============================================================================
// LAYOUT RAÍZ DE LA APLICACIÓN (RootLayout)
//
// Responsabilidades principales:
// - Cargar fuentes tipográficas y assets iniciales.
// - Gestionar el splash screen nativo (expo-splash-screen) hasta que la app esté lista.
// - Proveer el tema oscuro personalizado a través de ThemeProvider.
// - Configurar el manejador global de notificaciones en primer plano.
// - Crear los canales de notificación en Android (garantiza su existencia).
// - Escuchar respuestas a notificaciones para navegación profunda (deep linking).
// - Manejar la apertura de la app desde una notificación cuando estaba cerrada.
// - Definir el Stack Navigator raíz con las rutas principales.
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
import * as SplashScreen from "expo-splash-screen"; // <-- IMPORTANTE: importar el splash screen
import { PALETTE } from "@/constants/colors";
import { NOTIFICATION_CHANNELS } from "@/features/notifications/constants";
import { ROUTES } from "@/constants/navigation";
import { useVaultStore } from "@/store/useVaultStore";

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

  // Referencias para los listeners de notificaciones (inicializadas con null)
  const notificationListener = useRef<Notifications.EventSubscription>(null);
  const responseListener = useRef<Notifications.EventSubscription>(null);

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
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
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
    // Listener para cuando la app está abierta y se recibe una respuesta (toque)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { data } = response.notification.request.content;
        if (data?.screen) {
          // Navegar a la pantalla indicada en los datos
          router.push(data.screen as string);
        } else {
          router.push(ROUTES.MAIN.INDEX);
        }
      });

    // Listener opcional para cuando se recibe una notificación en primer plano
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // Podríamos actualizar algún estado global si es necesario
      });

    // Limpiar listeners al desmontar usando .remove()
    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [router]);

  // --------------------------------------------------------------------------
  // MANEJO DE APERTURA DESDE NOTIFICACIÓN (APP CERRADA)
  // --------------------------------------------------------------------------
  useEffect(() => {
    // getLastNotificationResponse es síncrono, no una Promise
    const response = Notifications.getLastNotificationResponse();
    // Usar optional chaining para acceder de forma segura a los datos
    const data = response?.notification?.request?.content?.data;
    if (data?.screen) {
      // Pequeño retraso para asegurar que la navegación esté lista
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

  // (Opcional) Usar onLayout para asegurar que la vista ya está pintada antes de ocultar
  const onLayoutRootView = useCallback(() => {
    if (appIsReady && _hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, _hasHydrated]);

  // Mostramos el stack de navegación directamente (el splash nativo lo cubre hasta que lo ocultemos)
  return (
    <ThemeProvider value={CustomDarkTheme}>
      <View
        style={{ flex: 1, backgroundColor: PALETTE.deepNight }}
        onLayout={onLayoutRootView} // <-- opcional pero recomendado para evitar pantalla blanca
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
      </View>
    </ThemeProvider>
  );
}