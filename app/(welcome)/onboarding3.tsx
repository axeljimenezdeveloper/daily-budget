// ============================================================================
// TERCERA Y ÚLTIMA PANTALLA DEL ONBOARDING - "Comienza tu gestión"
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
import { ROUTES } from '@/constants/navigation'; 

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
  const handleFinish = () => router.replace(ROUTES.ANIMATIONS.TRANSITION); // ✅ Corregido
  const handleSkip = () => router.replace(ROUTES.ANIMATIONS.TRANSITION);   // ✅ Corregido

  // DESCRIPCIÓN CON MÚLTIPLES PARTES DESTACADAS
  // --------------------------------------------------------------------------
  // Único paso que usa DOS colores diferentes en el texto:
  // - Color "success" para enfatizar beneficios positivos
  // - Color "warning" para destacar precauciones o advertencias
  // Esto crea un mensaje más rico visualmente y transmite tanto la promesa
  // como la responsabilidad asociada con el uso de la aplicación
  const description = (
    <>
      {t('onboarding.screen_3.description_part_1')}{' '}
      <AppText variant="body" color="success" style={{ fontWeight: '600' }}>
        {t('onboarding.screen_3.description_essential')}
      </AppText>
      {' '}{t('onboarding.screen_3.description_part_2')}{' '}
      <AppText variant="body" color="warning" style={{ fontWeight: '600' }}>
        {t('onboarding.screen_3.description_discretionary')}
      </AppText>
      {t('onboarding.screen_3.description_part_3')}
    </>
  );

  // RENDERIZADO DEL PASO FINAL DE ONBOARDING
  // --------------------------------------------------------------------------
  // Configuración específica del tercer y último paso:
  // - stepNumber: 3 (último de 3 pasos)
  // - iconName: 'layers-outline' (símbolo de finalización)
  // - buttonText: Texto de acción final ("Comenzar Ahora")
  // - buttonStatus: 'accent' (cambio visual para indicar acción principal)
  // - description: Texto con dos partes destacadas en colores diferentes
  return (
    <OnboardingStep
      stepNumber={3}
      totalSteps={3}
      title={t('onboarding.screen_3.title')}
      description={description}
      iconName="layers-outline"
      iconLibrary="Ionicons"
      buttonText={t('onboarding.navigation.get_started')}
      onNext={handleFinish}
      onSkip={handleSkip}
      skipButtonText={t('onboarding.navigation.skip_onboarding')}
      buttonStatus="accent" 
    />
  );
}