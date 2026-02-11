// ============================================================================
// LAYOUT DE NAVEGACIÓN PARA LA SECCIÓN DE ANIMACIONES
//
// Este layout define la estructura de navegación para todas las pantallas
// de animación: loading (splash inicial), transition (puente entre onboarding
// y configuración) y success (finalización de configuración).
// Utiliza Stack Navigator de Expo Router con animación cruzada "fade" para
// crear transiciones suaves y coherentes con la identidad visual de SURV.
// ============================================================================

import { Stack } from "expo-router";
import { PALETTE } from "@/constants/colors";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL - AnimationsLayout
// ----------------------------------------------------------------------------
export default function AnimationsLayout() {
  // CONFIGURACIÓN GLOBAL DEL STACK NAVIGATOR
  // --------------------------------------------------------------------------
  // Opciones comunes para todas las pantallas del stack:
  // - headerShown: false → Ocultamos la cabecera nativa, la UI es completamente personalizada.
  // - animation: "fade" → Animación de fundido, ideal para pantallas estáticas o de carga.
  // - contentStyle: Fondo negro profundo (deepNight) que mantiene la consistencia
  //   con la paleta oscura de todas las pantallas de animación.
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: {
          backgroundColor: PALETTE.deepNight,
        },
      }}
    >
      {/* ======================================================================
         PANTALLA DE CARGA INICIAL
         ====================================================================== */}
      {/* 
         Loading: Aparece al arrancar la app mientras se determina el estado
         del onboarding. No tiene redirección automática interna; la navegación
         se controla mediante lógica de store.
      */}
      <Stack.Screen name="loading" />

      {/* ======================================================================
         PANTALLA DE TRANSICIÓN ONBOARDING → CONFIGURACIÓN
         ====================================================================== */}
      {/* 
         Transition: Se muestra tras finalizar el onboarding. Redirige automáticamente
         a la primera pantalla de configuración (setup-currency) después de 1.5s.
         La animación "fade" refuerza el cambio de contexto entre flujos.
      */}
      <Stack.Screen name="transition" />

      {/* ======================================================================
         PANTALLA DE ÉXITO (CONFIGURACIÓN COMPLETADA)
         ====================================================================== */}
      {/* 
         Success: Aparece al finalizar los 3 pasos de configuración. Redirige
         automáticamente a la sección principal (main) tras 1.8s, marcando
         visualmente el logro y el inicio de la experiencia SURV.
      */}
      <Stack.Screen name="success" />
    </Stack>
  );
}