import { Stack } from "expo-router";

export default function WelcomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="onboarding1" />
      <Stack.Screen name="onboarding2" />
      <Stack.Screen name="onboarding3" />
      {/* Nueva pantalla de configuración inicial */}
      <Stack.Screen
        name="setup"
        options={{
          animation: "fade_from_bottom", // Un cambio sutil de animación para indicar que es el paso final
        }}
      />
      {/* Nuevo flujo de setup dividido */}
      <Stack.Screen name="setup-currency" options={{ animation: "fade" }} />
      <Stack.Screen
        name="setup-budget"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="setup-duration"
        options={{ animation: "slide_from_right" }}
      />
    </Stack>
  );
}
