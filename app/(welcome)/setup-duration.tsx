// ============================================================================
// TERCER Y ÚLTIMO PASO DE CONFIGURACIÓN - "Definir Duración"
//
// Pantalla final del flujo de configuración donde el usuario establece
// la duración de su presupuesto. Ofrece opciones predefinidas (semanal,
// quincenal, mensual) y personalizada, con cálculos en tiempo real del
// presupuesto diario y conexión con el sistema de almacenamiento.
// ============================================================================

import React from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------
// COMPONENTES DE LA ARQUITECTURA DE SETUP
// ----------------------------------------------------------------------------
// SetupStepLayout: Layout base reutilizable para todos los pasos de configuración
// DurationSection: Sección de UI para selección de duración y cálculo de presupuesto
// PeriodModal: Modal para elegir entre opciones predefinidas de período
import { SetupStepLayout } from "@/components/templates/setup/components/layout/SetupStepLayout";
import { DurationSection } from "@/components/templates/setup/components/sections/DurationSection";
import { PeriodModal } from "@/components/templates/setup/components/modals/PeriodModal";

// ----------------------------------------------------------------------------
// HOOKS PERSONALIZADOS Y STORE
// ----------------------------------------------------------------------------
// useSetupNavigation: Navegación entre pasos y hacia la pantalla de éxito
// useSetupDuration: Lógica completa de gestión de duración (cálculos, validaciones)
// useVaultStore: Store global para inicializar la bóveda y marcar onboarding como completado
import { useSetupNavigation } from "@/components/templates/setup/hooks/useSetupNavigation";
import { useSetupDuration } from "@/components/templates/setup/hooks/useSetupDuration";
import { useVaultStore } from "@/store/useVaultStore";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL - SetupDurationScreen
// ----------------------------------------------------------------------------
export default function SetupDurationScreen() {
  // HOOKS PARA INTERNACIONALIZACIÓN, NAVEGACIÓN Y ESTADO GLOBAL
  // --------------------------------------------------------------------------
  const { t } = useTranslation();                           // Traducciones i18n
  const { navigateToSuccess, navigateBack } = useSetupNavigation(); // Navegación
  const { initVault, setFinishedOnboarding } = useVaultStore(); // Estado global (bóveda)

  // HOOK PERSONALIZADO PARA LÓGICA DE DURACIÓN
  // --------------------------------------------------------------------------
  // useSetupDuration encapsula toda la lógica compleja: manejo de período seleccionado,
  // días personalizados, validaciones, cálculos de presupuesto diario y estado del modal.
  const {
    currency,
    numericBudget,
    selectedPeriod,
    setSelectedPeriod,
    customDays,
    setCustomDays,
    showPeriodModal,
    setShowPeriodModal,
    error,
    actualDays,
    dailyBudget,
    isDaysValid,
    getPeriodDisplayText,
    getTranslatedOption,
    getInputStatus,
  } = useSetupDuration();

  // ESTADO LOCAL PARA CONTROL DE PROCESAMIENTO
  // --------------------------------------------------------------------------
  // isProcessing: Indica cuando la configuración está en curso (para deshabilitar UI)
  const [isProcessing, setIsProcessing] = React.useState(false);

  // MANEJADOR PARA INICIAR LA MISIÓN (BOTÓN PRINCIPAL)
  // --------------------------------------------------------------------------
  // 1. Valida que la duración sea válida
  // 2. Activa estado de procesamiento
  // 3. Inicializa la bóveda en el store global con los datos recolectados
  // 4. Marca el onboarding como completado
  // 5. Navega a la pantalla de animación de éxito
  // 6. Maneja errores con Alert nativo
  const handleStartMission = async () => {
    if (!isDaysValid) {
      return;
    }

    setIsProcessing(true);
    try {
      // Configura la bóveda con presupuesto, días y símbolo de moneda
      initVault(numericBudget, actualDays, currency.symbol);
      
      // Marca el flujo de configuración como completado
      setFinishedOnboarding();
      
      // Navega a la animación de éxito
      navigateToSuccess();
    } catch (error) {
      Alert.alert(
        t("common.error_occurred", "Algo no salió bien"),
        t("setup.errors.vault_config_error", "Ups, no pude preparar tu espacio")
      );
      setIsProcessing(false);
    }
  };

  // MANEJADOR PARA SELECCIÓN DE PERÍODO EN EL MODAL
  // --------------------------------------------------------------------------
  // Actualiza el período seleccionado cuando el usuario elige una opción en el modal
  const handleSelectPeriod = (periodOption: typeof selectedPeriod) => {
    setSelectedPeriod(periodOption);
  };

  // RENDERIZADO DE LA PANTALLA FINAL DE CONFIGURACIÓN
  // --------------------------------------------------------------------------
  // Usa un fragmento para renderizar layout principal y modal de manera independiente.
  // SetupStepLayout configura el paso final (3 de 3) con botón de acción especial.
  return (
    <>
      {/* Layout principal del paso final de configuración */}
      <SetupStepLayout
        title={t("setup.duration_screen.title", "¿Para cuántos días lo planeas?")}
        description={t(
          "setup.duration_screen.description",
          "Define tu plan de tiempo para distribuir el dinero"
        )}
        totalSteps={3}
        currentStep={2}
        actionButtonText={t("setup.duration_screen.final_action", "Empezar con SURV")}
        onActionPress={handleStartMission}
        onBackPress={navigateBack}
        isActionDisabled={!isDaysValid}
        isProcessing={isProcessing}
        iconName="calendar-outline"
      >
        {/* Sección de UI para la duración */}
        <DurationSection
          currency={currency}
          numericBudget={numericBudget}
          selectedPeriod={selectedPeriod}
          customDays={customDays}
          error={error}
          actualDays={actualDays}
          dailyBudget={dailyBudget}
          isDaysValid={isDaysValid}
          getPeriodDisplayText={getPeriodDisplayText}
          getInputStatus={getInputStatus}
          onOpenModal={() => setShowPeriodModal(true)}
          onCustomDaysChange={setCustomDays}
        />
      </SetupStepLayout>

      {/* Modal de selección de período */}
      <PeriodModal
        isOpen={showPeriodModal}
        onClose={() => setShowPeriodModal(false)}
        selectedPeriod={selectedPeriod}
        onSelectPeriod={handleSelectPeriod}
      />
    </>
  );
}