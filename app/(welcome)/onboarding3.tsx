// ============================================================================
// TERCERA Y ÚLTIMA PANTALLA DEL ONBOARDING - "Comienza tu misión"
//
// Pantalla final del flujo que motiva al usuario a comenzar a usar la aplicación.
// Utiliza un icono de checkmark para simbolizar finalización y preparación,
// y un botón de color "accent" como llamado a la acción principal.
// ============================================================================

import React from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// COMPONENTES REUTILIZABLES
// ----------------------------------------------------------------------------
// El patrón se mantiene consistente: OnboardingStep para estructura base
// y AppText para el formateo especial de partes del texto
import { OnboardingStep } from '@/components/templates/onboarding/components/steps/OnboardingStep';
import AppText from '@/components/atoms/content/AppText';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL - Onboarding3
// ----------------------------------------------------------------------------
export default function Onboarding3() {
  // HOOKS PARA NAVEGACIÓN E INTERNACIONALIZACIÓN
  // --------------------------------------------------------------------------
  const router = useRouter();          // Navegación entre pantallas
  const { t } = useTranslation();      // Traducciones i18n

  // MANEJADORES DE NAVEGACIÓN (PASO FINAL)
  // --------------------------------------------------------------------------
  // handleFinish: Finaliza el onboarding y navega a la animación de transición
  // handleSkip: En este paso final, "saltar" también lleva a la transición
  // Nota: Ambos handlers hacen lo mismo porque es el último paso
  const handleFinish = () => router.replace('/(animations)/transition');
  const handleSkip = () => router.replace('/(animations)/transition');

  // DESCRIPCIÓN CON MÚLTIPLES PARTES DESTACADAS
  // --------------------------------------------------------------------------
  // Único paso que usa DOS colores diferentes en el texto:
  // - Color "success" para enfatizar beneficios positivos
  // - Color "warning" para destacar precauciones o advertencias
  // Esto crea un mensaje más rico visualmente y transmite tanto la promesa
  // como la responsabilidad asociada con el uso de la aplicación
  const description = (
    <>
      {t('onboarding.screen3.description_part1')}{' '}
      <AppText variant="body" color="success" style={{ fontWeight: '600' }}>
        {t('onboarding.screen3.description_accent_success')}
      </AppText>
      {' '}{t('onboarding.screen3.description_part2')}{' '}
      <AppText variant="body" color="warning" style={{ fontWeight: '600' }}>
        {t('onboarding.screen3.description_accent_warning')}
      </AppText>
      {t('onboarding.screen3.description_part3')}
    </>
  );

  // RENDERIZADO DEL PASO FINAL DE ONBOARDING
  // --------------------------------------------------------------------------
  // Configuración específica del tercer y último paso:
  // - stepNumber: 3 (último de 3 pasos)
  // - iconName: 'checkmark-done-outline' (símbolo de finalización)
  // - buttonText: Texto de acción final ("Comenzar Ahora")
  // - buttonStatus: 'accent' (cambio visual para indicar acción principal)
  // - description: Texto con dos partes destacadas en colores diferentes
  return (
    <OnboardingStep
      stepNumber={3}
      totalSteps={3}
      title={t('onboarding.screen3.title')}
      description={description}
      iconName="checkmark-done-outline"
      iconLibrary="Ionicons"
      buttonText={t('onboarding.get_started', 'Comenzar Ahora')}
      onNext={handleFinish}
      onSkip={handleSkip}
      skipButtonText={t('onboarding.skip')}
      buttonStatus="accent" 
    />
  );
}
