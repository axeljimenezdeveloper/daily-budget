// ============================================================================
// PRIMER PASO DE CONFIGURACIÓN - "Elige tu moneda"
//
// Pantalla inicial del flujo de configuración donde el usuario selecciona
// la moneda con la que gestionará su presupuesto. Incluye un modal para
// elegir entre una lista predefinida de monedas internacionales.
// ============================================================================

import React from "react";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------
// COMPONENTES DE LA ARQUITECTURA DE SETUP
// ----------------------------------------------------------------------------
import { SetupStepLayout } from "@/components/templates/setup/components/layout/SetupStepLayout";
import { CurrencySection } from "@/components/templates/setup/components/sections/CurrencySection";
import { CurrencyModal } from "@/components/templates/setup/components/modals/CurrencyModal";

// ----------------------------------------------------------------------------
// TIPOS Y CONSTANTES DE SETUP
// ----------------------------------------------------------------------------
import { Currency } from "@/components/templates/setup/types";
import { CURRENCY_LIST } from "@/components/templates/setup/constants/currencies";

// ----------------------------------------------------------------------------
// HOOKS PERSONALIZADOS DE SETUP
// ----------------------------------------------------------------------------
import { useSetupNavigation } from "@/components/templates/setup/hooks/useSetupNavigation";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL - SetupCurrencyScreen
// ----------------------------------------------------------------------------
export default function SetupCurrencyScreen() {
  // HOOKS PARA INTERNACIONALIZACIÓN Y NAVEGACIÓN
  // --------------------------------------------------------------------------
  const { t } = useTranslation();
  const { navigateToBudget, navigateToOnboarding } = useSetupNavigation();

  // ESTADO LOCAL PARA LA SELECCIÓN DE MONEDA
  // --------------------------------------------------------------------------
  const [currency, setCurrency] = React.useState<Currency>(CURRENCY_LIST[0]);
  const [showCurrencyModal, setShowCurrencyModal] = React.useState(false);

  // MANEJADOR PARA EL BOTÓN "CONTINUAR"
  // --------------------------------------------------------------------------
  const handleNext = () => {
    if (currency && currency.code) {
      navigateToBudget(currency);
    }
  };

  // MANEJADOR PARA EL BOTÓN "VOLVER"
  // --------------------------------------------------------------------------
  const handleBack = () => {
    navigateToOnboarding();
  };

  // MANEJADOR PARA SELECCIÓN DE MONEDA EN EL MODAL
  // --------------------------------------------------------------------------
  const handleSelectCurrency = (selectedCurrency: Currency) => {
    setCurrency(selectedCurrency);
  };

  // RENDERIZADO DE LA PANTALLA DE SELECCIÓN DE MONEDA
  // --------------------------------------------------------------------------
  return (
    <>
      <SetupStepLayout
        title={t("setup.titles.main", "Vamos a prepararlo todo")}
        description={t("setup.titles.subtitle", "Cuéntame cómo quieres que te acompañe")}
        totalSteps={3}
        currentStep={0}
        actionButtonText={t("common.continue", "Continuar")}
        onActionPress={handleNext}
        onBackPress={handleBack}
        isActionDisabled={!currency?.code}
        iconName="wallet-outline"
      >
        <CurrencySection
          currency={currency}
          onOpenModal={() => setShowCurrencyModal(true)}
        />
      </SetupStepLayout>

      <CurrencyModal
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        selectedCurrency={currency}
        onSelectCurrency={handleSelectCurrency}
      />
    </>
  );
}