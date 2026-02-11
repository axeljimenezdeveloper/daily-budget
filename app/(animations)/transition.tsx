// ============================================================================
// PANTALLA DE TRANSICIÓN - "Preparando tu espacio"
//
// Esta pantalla actúa como puente entre el flujo de onboarding y el flujo
// de configuración inicial. Se muestra cuando el usuario termina el onboarding
// (o lo salta) y antes de entrar a la selección de moneda. Incluye una
// redirección automática a /(welcome)/setup-currency tras 1500ms.
// ============================================================================

import React from 'react';
import AnimationStep from '@/components/templates/animations/components/steps/AnimationStep';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL - TransitionAnimation
// ----------------------------------------------------------------------------
export default function TransitionAnimation() {
  // RENDERIZADO DEL PASO DE ANIMACIÓN
  // --------------------------------------------------------------------------
  // Usamos AnimationStep con la variante "transition".
  // Todas las propiedades (color azul, spinner, duración, ruta destino)
  // están definidas en ANIMATION_VARIANT_CONFIG.transition y los textos
  // se cargan desde i18n mediante la clave animations.transition.*
  return <AnimationStep variant="transition" />;
}