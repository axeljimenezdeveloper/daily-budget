// ============================================================================
// PRIMER PASO DE CONFIGURACIÓN - "Selección de Moneda"
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
// SetupStepLayout: Layout base reutilizable para todos los pasos de configuración
// CurrencySection: Sección de UI para mostrar y seleccionar la moneda actual
// CurrencyModal: Modal con lista completa de monedas disponibles
import { SetupStepLayout } from "@/components/templates/setup/components/layout/SetupStepLayout";
import { CurrencySection } from "@/components/templates/setup/components/sections/CurrencySection";
import { CurrencyModal } from "@/components/templates/setup/components/modals/CurrencyModal";

// ----------------------------------------------------------------------------
// TIPOS Y CONSTANTES DE SETUP
// ----------------------------------------------------------------------------
// Currency: Tipo TypeScript que define la estructura de una moneda
// CURRENCY_LIST: Lista predefinida de monedas internacionales con sus símbolos, banderas, etc.
import { Currency } from "@/components/templates/setup/types";
import { CURRENCY_LIST } from "@/components/templates/setup/constants/currencies";

// ----------------------------------------------------------------------------
// HOOKS PERSONALIZADOS DE SETUP
// ----------------------------------------------------------------------------
// useSetupNavigation: Gestión de navegación entre pasos de configuración
import { useSetupNavigation } from "@/components/templates/setup/hooks/useSetupNavigation";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL - SetupCurrencyScreen
// ----------------------------------------------------------------------------
export default function SetupCurrencyScreen() {
  // HOOKS PARA INTERNACIONALIZACIÓN Y NAVEGACIÓN
  // --------------------------------------------------------------------------
  const { t } = useTranslation();                           // Traducciones i18n
  const { navigateToBudget, navigateToOnboarding } = useSetupNavigation(); // Navegación

  // ESTADO LOCAL PARA LA SELECCIÓN DE MONEDA
  // --------------------------------------------------------------------------
  // currency: Moneda actualmente seleccionada (inicial: primera de la lista)
  // showCurrencyModal: Controla la visibilidad del modal de selección
  const [currency, setCurrency] = React.useState<Currency>(CURRENCY_LIST[0]);
  const [showCurrencyModal, setShowCurrencyModal] = React.useState(false);

  // MANEJADOR PARA EL BOTÓN "SIGUIENTE"
  // --------------------------------------------------------------------------
  // Valida que haya una moneda seleccionada y navega al paso de presupuesto,
  // pasando la moneda como parámetro para su uso en la siguiente pantalla.
  const handleNext = () => {
    if (currency && currency.code) {
      navigateToBudget(currency);
    }
  };

  // MANEJADOR PARA EL BOTÓN "ATRÁS"
  // --------------------------------------------------------------------------
  // Navega de regreso a la pantalla de onboarding, reiniciando el flujo.
  const handleBack = () => {
    navigateToOnboarding();
  };

  // MANEJADOR PARA SELECCIÓN DE MONEDA EN EL MODAL
  // --------------------------------------------------------------------------
  // Actualiza el estado con la moneda seleccionada y cierra el modal.
  const handleSelectCurrency = (selectedCurrency: Currency) => {
    setCurrency(selectedCurrency);
  };

  // RENDERIZADO DE LA PANTALLA DE SELECCIÓN DE MONEDA
  // --------------------------------------------------------------------------
  // Usa un fragmento para renderizar tanto el layout principal como el modal.
  // El modal está fuera del SetupStepLayout para mantener su posición correcta
  // en el árbol de componentes y evitar problemas de z-index o anidamiento.
  return (
    <>
      {/* Layout principal del paso de configuración */}
      <SetupStepLayout
        title={t("setup.currency_label", "Moneda de la misión")}
        description={t(
          "setup.divisa_description",
          "Selecciona la moneda con la que gestionarás tu oxígeno."
        )}
        totalSteps={3}
        currentStep={0}
        actionButtonText={t("onboarding.next", "Siguiente")}
        onActionPress={handleNext}
        onBackPress={handleBack}
        isActionDisabled={!currency?.code}
        iconName="cash-outline"
      >
        {/* Sección de UI para la moneda */}
        <CurrencySection
          currency={currency}
          onOpenModal={() => setShowCurrencyModal(true)}
        />
      </SetupStepLayout>

      {/* Modal de selección de moneda */}
      <CurrencyModal
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        selectedCurrency={currency}
        onSelectCurrency={handleSelectCurrency}
      />
    </>
  );
}