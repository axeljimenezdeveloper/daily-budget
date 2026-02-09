// ============================================================================
// LAYOUT DE NAVEGACIÓN PARA LA SECCIÓN DE BIENVENIDA (WELCOME)
//
// Este layout define la estructura de navegación y las transiciones entre
// todas las pantallas del flujo de bienvenida: onboarding y configuración inicial.
// Utiliza Stack Navigator de Expo Router con animaciones personalizadas para
// crear una experiencia de usuario fluida y coherente.
// ============================================================================

import { Stack } from "expo-router";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL - WelcomeLayout
// ----------------------------------------------------------------------------
export default function WelcomeLayout() {
  // CONFIGURACIÓN GLOBAL DEL STACK NAVIGATOR
  // --------------------------------------------------------------------------
  // Define opciones predeterminadas para todas las pantallas del stack:
  // - headerShown: false → Ocultamos la cabecera nativa para tener control total del diseño
  // - animation: "slide_from_right" → Animación por defecto para transiciones entre pantallas
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {/* ======================================================================
         FLUJO DE ONBOARDING - 3 PANTALLAS INTRODUCTORIAS
         ====================================================================== */}
      
      {/* Pantalla 1: Introducción al concepto de "oxígeno financiero" */}
      <Stack.Screen name="onboarding1" />
      
      {/* Pantalla 2: Explicación de gestión temporal de recursos */}
      <Stack.Screen name="onboarding2" />
      
      {/* Pantalla 3: Llamado a la acción para comenzar la configuración */}
      <Stack.Screen name="onboarding3" />
      
      {/* ======================================================================
         PANTALLA DE REDIRECCIÓN/CARGANDO
         ====================================================================== */}
      {/* 
         Ruta 'setup': posible pantalla de transición o redirección.
         Usa animación 'fade_from_bottom' para diferenciarla del flujo principal.
      */}
      <Stack.Screen
        name="setup"
        options={{
          animation: "fade_from_bottom", 
        }}
      />
      
      {/* ======================================================================
         FLUJO DE CONFIGURACIÓN INICIAL - 3 PASOS
         ====================================================================== */}
      
      {/* Paso 1: Selección de moneda */}
      {/* 
         Animación 'fade' para suavizar la transición desde el onboarding
         hacia la configuración, creando una sensación de cambio de contexto.
      */}
      <Stack.Screen name="setup-currency" options={{ animation: "fade" }} />
      
      {/* Paso 2: Definición de presupuesto */}
      {/* 
         Vuelve a 'slide_from_right' para mantener consistencia dentro del
         flujo de configuración, indicando progreso lineal entre pasos.
      */}
      <Stack.Screen
        name="setup-budget"
        options={{ animation: "slide_from_right" }}
      />
      
      {/* Paso 3: Configuración de duración */}
      {/* 
         Misma animación que el paso anterior, reforzando que es parte del
         mismo flujo secuencial de configuración.
      */}
      <Stack.Screen
        name="setup-duration"
        options={{ animation: "slide_from_right" }}
      />
    </Stack>
  );
}
