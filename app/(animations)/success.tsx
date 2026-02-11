// ============================================================================
// PANTALLA DE ÉXITO - "Configuración completada"
//
// Esta pantalla se muestra inmediatamente después de que el usuario finaliza
// el flujo de configuración (paso de duración). Confirma visualmente que todo
// está listo y redirige automáticamente a la sección principal de la app
// después de 1800ms. Utiliza un icono de checkmark y colores de éxito.
// ============================================================================

import React from 'react';
import AnimationStep from '@/components/templates/animations/components/steps/AnimationStep';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL - SuccessAnimation
// ----------------------------------------------------------------------------
export default function SuccessAnimation() {
  // RENDERIZADO DEL PASO DE ANIMACIÓN
  // --------------------------------------------------------------------------
  // Usamos AnimationStep con la variante "success".
  // No es necesario pasar props adicionales; los textos, colores, duración
  // y ruta de redirección se obtienen automáticamente de la configuración
  // de variantes y de los archivos de internacionalización.
  return <AnimationStep variant="success" />;
}