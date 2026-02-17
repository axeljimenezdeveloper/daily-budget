// ============================================================================
// SEGUNDA PANTALLA DEL ONBOARDING
//
// Esta pantalla introduce el concepto de gestión temporal, representado por
// un icono de calendario. Explica cómo la app ayuda a distribuir recursos
// a lo largo del tiempo de manera eficiente.
// ============================================================================

import React from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// COMPONENTES REUTILIZABLES
// ----------------------------------------------------------------------------
// Reutilizamos el mismo patrón: OnboardingStep para estructura y AppText
// para el formateo específico de texto
import { OnboardingStep } from '@/components/templates/onboarding/components/steps/OnboardingStep';
import AppText from '@/components/atoms/content/AppText';
import { ROUTES } from '@/constants/navigation'; // ✅ Importación correcta

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL - Onboarding2
// ----------------------------------------------------------------------------
export default function Onboarding2() {
  // HOOKS PARA NAVEGACIÓN E INTERNACIONALIZACIÓN
  // --------------------------------------------------------------------------
  const router = useRouter();          // Navegación entre pantallas
  const { t } = useTranslation();      // Traducciones i18n

  // MANEJADORES DE NAVEGACIÓN
  // --------------------------------------------------------------------------
  // handleNext: Avanza al tercer y último paso del onboarding
  // handleSkip: Salta al final del flujo (animación de transición)
  const handleNext = () => router.push(ROUTES.WELCOME.ONBOARDING3); 
  const handleSkip = () => router.replace(ROUTES.ANIMATIONS.TRANSITION); 

  // CONSTRUCCIÓN DE DESCRIPCIÓN CON FORMATO
  // --------------------------------------------------------------------------
  // Similar al paso 1, usamos JSX para destacar palabras clave en color acento
  // que enfatizan el concepto de gestión temporal y planificación
  const description = (
    <>
      {t('onboarding.screen_2.description_part_1')}{' '}
      <AppText variant="body" color="accent" style={{ fontWeight: '600' }}>
        {t('onboarding.screen_2.description_highlight')}
      </AppText>
      {t('onboarding.screen_2.description_part_2')}
    </>
  );

  // RENDERIZADO DEL PASO DE ONBOARDING
  // --------------------------------------------------------------------------
  // OnboardingStep recibe la configuración específica del segundo paso:
  // - stepNumber: Posición 2 de 3 en el flujo de onboarding
  // - iconName: 'eye-outline' representa la claridad visual
  // - iconLibrary: 'Ionicons' (consistente con el sistema de iconos)
  // - buttonStatus: 'primary' mantiene consistencia visual con el paso 1
  // Nota: No necesita iconRotation (valor por defecto 0)
  return (
    <OnboardingStep
      stepNumber={2}
      totalSteps={3}
      title={t('onboarding.screen_2.title')}
      description={description}
      iconName="eye-outline"
      iconLibrary="Ionicons"
      buttonText={t('onboarding.navigation.next')}
      onNext={handleNext}
      onSkip={handleSkip}
      skipButtonText={t('onboarding.navigation.skip_onboarding')}
      buttonStatus="primary"
    />
  );
}