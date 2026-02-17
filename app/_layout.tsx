// ============================================================================
// LAYOUT RAÍZ DE LA APLICACIÓN (RootLayout)
//
// Responsabilidades principales:
// - Cargar fuentes tipográficas y assets iniciales.
// - Mostrar pantalla de carga (LoadingAnimation) mientras la app no está lista.
// - Proveer el tema oscuro personalizado a través de ThemeProvider.
// - Configurar el manejador global de notificaciones en primer plano.
// - Crear los canales de notificación en Android (garantiza su existencia).
// - Escuchar respuestas a notificaciones para navegación profunda (deep linking).
// - Manejar la apertura de la app desde una notificación cuando estaba cerrada.
// - Definir el Stack Navigator raíz con las rutas principales.
// ============================================================================

import "@/locales/i18n";
import { useEffect, useState, useRef } from "react";
import { View, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { PALETTE } from "@/constants/colors";
import LoadingAnimation from "./(animations)/loading";
import { NOTIFICATION_CHANNELS } from "@/features/notifications/constants";
import { ROUTES } from "@/constants/navigation"; 

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
          // ✅ Corregido: usar ROUTES.MAIN.INDEX en lugar de string literal
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