// ============================================================================
// PRIMERA PANTALLA DEL ONBOARDING - "Tu dinero como medida de tiempo"
//
// Esta pantalla introduce el concepto central de la aplicación usando una
// metáfora visual (icono de agua rotado) y texto formateado para destacar
// palabras clave.
// ============================================================================

import React from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------
// COMPONENTES REUTILIZABLES
// ----------------------------------------------------------------------------
// Usamos nuestro componente OnboardingStep que encapsula toda la UI común
// y AppText para partes específicas del texto con formato especial
import { OnboardingStep } from "@/components/templates/onboarding/components/steps/OnboardingStep";
import AppText from "@/components/atoms/content/AppText";
import { ROUTES } from "@/constants/navigation"; 

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL - Onboarding1
// ----------------------------------------------------------------------------
export default function Onboarding1() {
  // HOOKS PARA NAVEGACIÓN E INTERNACIONALIZACIÓN
  // --------------------------------------------------------------------------
  const router = useRouter(); // Navegación entre pantallas
  const { t } = useTranslation(); // Traducciones i18n

  // MANEJADORES DE NAVEGACIÓN
  // --------------------------------------------------------------------------
  // handleNext: Avanza al segundo paso del onboarding
  // handleSkip: Salta todo el flujo y va directamente a la animación de transición
  const handleNext = () => router.push(ROUTES.WELCOME.ONBOARDING2);
  const handleSkip = () => router.replace(ROUTES.ANIMATIONS.TRANSITION); 

  // CONSTRUCCIÓN DE DESCRIPCIÓN CON FORMATO
  // --------------------------------------------------------------------------
  // La descripción combina texto normal con una palabra clave en color acento
  // para enfatizar el concepto principal. Se usa JSX para el formateo especial.
  const description = (
    <>
      {t("onboarding.screen_1.description_part_1")}{" "}
      <AppText variant="body" color="accent" style={{ fontWeight: "600" }}>
        {t("onboarding.screen_1.description_highlight")}
      </AppText>
      {"."}
    </>
  );

  // RENDERIZADO DEL PASO DE ONBOARDING
  // --------------------------------------------------------------------------
  // OnboardingStep es un componente reutilizable que recibe toda la configuración
  // específica de este paso como props:
  // - stepNumber: Posición en el flujo (1 de 3)
  // - iconName/iconLibrary: Ícono representativo de este paso
  // - iconRotation: Rotación personalizada de 45° para el ícono de agua
  // - description: Texto con formato JSX para partes destacadas
  // - buttonStatus: Tipo de botón (primary, accent, etc.)
  return (
    <OnboardingStep
      stepNumber={1}
      totalSteps={3}
      title={t("onboarding.screen_1.title")}
      description={description}
      iconName="hourglass-outline"
      iconLibrary="Ionicons"
      buttonText={t("onboarding.navigation.next")}
      onNext={handleNext}
      onSkip={handleSkip}
      skipButtonText={t("onboarding.navigation.skip_onboarding")}
      buttonStatus="primary"
      iconRotation={45}
    />
  );
}