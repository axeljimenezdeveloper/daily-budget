// ============================================================================
// SEGUNDO PASO DE CONFIGURACIÓN - "Tu presupuesto"
//
// Pantalla donde el usuario establece el monto total de su presupuesto
// para comenzar con SURV. Incluye validación en tiempo real y navegación
// al siguiente paso (duración) una vez que el presupuesto es válido.
// ============================================================================

import React from "react";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------
// COMPONENTES DE LA ARQUITECTURA DE SETUP
// ----------------------------------------------------------------------------
// SetupStepLayout: Layout base reutilizable para todos los pasos de configuración
// BudgetSection: Sección específica de UI para entrada y validación de presupuesto
import { SetupStepLayout } from "@/components/templates/setup/components/layout/SetupStepLayout";
import { BudgetSection } from "@/components/templates/setup/components/sections/BudgetSection";

// ----------------------------------------------------------------------------
// HOOKS PERSONALIZADOS DE SETUP
// ----------------------------------------------------------------------------
// useSetupNavigation: Gestión de navegación entre pasos de configuración
// useSetupValidation: Lógica de validación de presupuesto y otros campos
// useCurrencyParams: Obtención y parseo de la moneda seleccionada en el paso anterior
import { useSetupNavigation } from "@/components/templates/setup/hooks/useSetupNavigation";
import { useSetupValidation } from "@/components/templates/setup/hooks/useSetupValidation";
import { useCurrencyParams } from "@/components/templates/setup/hooks/useCurrencyParams";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL - SetupBudgetScreen
// ----------------------------------------------------------------------------
export default function SetupBudgetScreen() {
  // HOOKS PARA INTERNACIONALIZACIÓN Y LÓGICA DE NEGOCIO
  // --------------------------------------------------------------------------
  const { t } = useTranslation();                           // Traducciones i18n
  const { navigateToDuration, navigateBack } = useSetupNavigation(); // Navegación
  const { validateBudget } = useSetupValidation();          // Validación de presupuesto
  const currency = useCurrencyParams();                     // Moneda del paso anterior

  // ESTADO LOCAL PARA EL CONTROL DEL PRESUPUESTO
  // --------------------------------------------------------------------------
  // budget: Valor actual del input (string para preservar formato)
  // error: Mensaje de error de validación (null si no hay error)
  // isValid: Bandera que indica si el presupuesto cumple todas las validaciones
  const [budget, setBudget] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isValid, setIsValid] = React.useState(false);

  // MANEJADOR DE CAMBIO EN EL INPUT DE PRESUPUESTO
  // --------------------------------------------------------------------------
  // Se ejecuta en cada cambio del input, realizando validación en tiempo real
  // para proveer feedback inmediato al usuario.
  const handleBudgetChange = (value: string) => {
    setBudget(value); // Actualiza el estado local
    const validation = validateBudget(value, currency.symbol); // Valida con moneda
    setError(validation.error);    // Muestra/oculta mensaje de error
    setIsValid(validation.isValid); // Habilita/deshabilita botón siguiente
  };

  // MANEJADOR PARA EL BOTÓN "CONTINUAR"
  // --------------------------------------------------------------------------
  // Realiza una validación final antes de navegar al paso de duración.
  // Si es válido, navega pasando la moneda y el presupuesto como parámetros.
  // Si no es válido, muestra el mensaje de error correspondiente.
  const handleNext = () => {
    const validation = validateBudget(budget, currency.symbol);
    if (validation.isValid) {
      navigateToDuration(currency, budget);
    } else {
      setError(validation.error);
    }
  };

  // RENDERIZADO DE LA PANTALLA DE PRESUPUESTO
  // --------------------------------------------------------------------------
  // Utiliza SetupStepLayout para la estructura base y BudgetSection para el
  // contenido específico de presupuesto. La navegación y validación están
  // completamente desacopladas de la UI.
  return (
    <SetupStepLayout
      title={t("setup.budget_screen.title", "¿Cuánto dinero tienes disponible?")}
      description={t(
        "setup.budget_screen.description",
        "Comencemos definiendo tu presupuesto inicial"
      )}
      totalSteps={3}
      currentStep={1}
      actionButtonText={t("common.continue", "Continuar")}
      onActionPress={handleNext}
      onBackPress={navigateBack}
      isActionDisabled={!isValid || !budget.trim()}
      iconName="calculator-outline" 
    >
      <BudgetSection
        currency={currency}
        budget={budget}
        error={error}
        isValid={isValid}
        onBudgetChange={handleBudgetChange}
      />
    </SetupStepLayout>
  );
}