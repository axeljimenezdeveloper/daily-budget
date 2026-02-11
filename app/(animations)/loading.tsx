// ============================================================================
// PANTALLA DE CARGA INICIAL - "SURV"
//
// Esta pantalla se muestra al arrancar la aplicación antes de determinar
// si el usuario ha completado o no el flujo de onboarding/configuración.
// Funciona como punto de entrada visual y también como pantalla de "splash"
// personalizada. No tiene redirección automática; la navegación se controla
// desde el layout raíz o desde lógica de estado.
// ============================================================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@/utils/version';
import AnimationStep from '@/components/templates/animations/components/steps/AnimationStep';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL - LoadingAnimation
// ----------------------------------------------------------------------------
export default function LoadingAnimation() {
  // HOOK DE INTERNACIONALIZACIÓN
  // --------------------------------------------------------------------------
  const { t } = useTranslation();

  // RENDERIZADO DEL PASO DE ANIMACIÓN
  // --------------------------------------------------------------------------
  // Usamos el componente reutilizable AnimationStep con la variante "loading".
  // Sobrescribimos el título por defecto con el nombre de la aplicación (APP_NAME)
  // y proporcionamos el subtítulo traducido. El temporizador está deshabilitado
  // porque la variante loading tiene duration = 0 y destination = null.
  return (
    <AnimationStep
      variant="loading"
      title={APP_NAME}
      subtitle={t('animations.loading.subtitle')}
    />
  );
}