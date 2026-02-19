// ============================================================================
// PANTALLA DE AJUSTES - settings.tsx
//
// Punto de entrada para la configuración de la aplicación. Este componente
// consume el hook personalizado `useSettings`, que centraliza toda la lógica
// de negocio y el estado. La UI se compone exclusivamente de secciones
// reutilizables (NotificationsSection, SecuritySection, etc.) y modales
// (LanguageModal, ResetModal) provenientes de la carpeta templates/settings.
//
// El layout base `SettingsLayout` proporciona la estructura común: fondo,
// padding y ScrollView. El componente se mantiene intencionalmente simple
// y declarativo, delegando toda la complejidad al hook.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from "react";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------
// COMPONENTES DEL TEMPLATE SETTINGS
// ----------------------------------------------------------------------------
// Layout base
import { SettingsLayout } from "@/components/templates/settings/components/layout/SettingsLayout";

// Secciones de UI
import { NotificationsSection } from "@/components/templates/settings/components/sections/NotificationsSection";
import { LanguageSection } from "@/components/templates/settings/components/sections/LanguageSection";
import { SecuritySection } from "@/components/templates/settings/components/sections/SecuritySection";
import { PlanSection } from "@/components/templates/settings/components/sections/PlanSection";
import { CurrencySection } from "@/components/templates/settings/components/sections/CurrencySection";
import { ExportSection } from "@/components/templates/settings/components/sections/ExportSection";
import { DangerSection } from "@/components/templates/settings/components/sections/DangerSection";

// Modales
import { LanguageModal } from "@/components/templates/settings/components/modals/LanguageModal";
import { ResetModal } from "@/components/templates/settings/components/modals/ResetModal";

// ----------------------------------------------------------------------------
// HOOK PERSONALIZADO
// ----------------------------------------------------------------------------
import { useSettings } from "@/components/templates/settings/hooks/useSettings";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * Pantalla de ajustes de la aplicación.
 *
 * Este componente actúa únicamente como orquestador visual:
 * - Obtiene todos los datos y callbacks a través de `useSettings`.
 * - Renderiza las secciones de UI en el orden definido.
 * - Gestiona la apertura de modales mediante los callbacks del hook.
 *
 * @returns Elemento JSX con la estructura completa de la pantalla de ajustes.
 */
export default function SettingsScreen() {
  const { t } = useTranslation();
  const settings = useSettings();

  return (
    <>
      <SettingsLayout>
        {/* ----------------------------------------------------------------
          SECCIÓN NOTIFICACIONES
          Configuración de recordatorios y alertas.
        ---------------------------------------------------------------- */}
        <NotificationsSection
          dailyReminder={settings.dailyReminder}
          extremeModeAlert={settings.extremeModeAlert}
          budgetExceededAlert={settings.budgetExceededAlert}
          reminderTime={settings.reminderTime}
          isSaving={settings.isSaving}
          onDailyReminderChange={settings.handleDailyReminderChange}
          onExtremeAlertChange={settings.handleExtremeAlertChange}
          onBudgetExceededChange={settings.handleBudgetExceededChange}
          onReminderTimeChange={settings.handleReminderTimeChange}
          onTestNotification={settings.handleTestNotification}
        />

        {/* ----------------------------------------------------------------
          SECCIÓN IDIOMA
          Muestra el idioma actual y abre el modal de selección.
          (Pendiente de extracción a componente independiente)
        ---------------------------------------------------------------- */}
        <LanguageSection
          language={settings.language}
          onPress={() => settings.setShowLanguageModal(true)}
        />

        {/* ----------------------------------------------------------------
          SECCIÓN SEGURIDAD
          Control de bloqueo biométrico.
        ---------------------------------------------------------------- */}
        <SecuritySection
          isBiometricEnabled={settings.isBiometricEnabled}
          onToggle={settings.handleBiometricToggle}
          isLoading={settings.biometricToggleLoading || settings.authLoading}
          isAvailabilityLoading={settings.biometricAvailabilityLoading}
          isDisabled={!settings.hasHardware || !settings.isEnrolled}
        />

        {/* ----------------------------------------------------------------
          SECCIÓN PLAN ACTUAL
          Resumen del presupuesto y días restantes.
        ---------------------------------------------------------------- */}
        <PlanSection
          totalBudget={settings.totalBudget}
          remainingDays={settings.remainingDays}
          daysDuration={settings.daysDuration}
          isExtremeMode={settings.isExtremeMode}
          currency={settings.currency}
          onEditPress={settings.handleEditPlan}
        />

        {/* ----------------------------------------------------------------
          SECCIÓN MONEDA
          Solo lectura: muestra la moneda seleccionada.
        ---------------------------------------------------------------- */}
        <CurrencySection currency={settings.currency} />

        {/* ----------------------------------------------------------------
          SECCIÓN EXPORTAR DATOS
          Botón para exportar a CSV con indicador de carga.
        ---------------------------------------------------------------- */}
        <ExportSection
          isExporting={settings.isExporting}
          onExport={settings.handleExportCSV}
        />

        {/* ----------------------------------------------------------------
          SECCIÓN ZONA DE PELIGRO
          Botón para reiniciar la bóveda (abre modal de confirmación).
        ---------------------------------------------------------------- */}
        <DangerSection onResetPress={() => settings.setShowResetModal(true)} />
      </SettingsLayout>

      {/* ----------------------------------------------------------------
        MODAL DE SELECCIÓN DE IDIOMA
      ---------------------------------------------------------------- */}
      <LanguageModal
        isOpen={settings.showLanguageModal}
        onClose={() => settings.setShowLanguageModal(false)}
        selectedLanguage={settings.language}
        onSelectLanguage={settings.handleLanguageSelect}
        title={t("settings.language_modal_title", "Idioma")}
      />

      {/* ----------------------------------------------------------------
        MODAL DE CONFIRMACIÓN DE REINICIO
      ---------------------------------------------------------------- */}
      <ResetModal
        isOpen={settings.showResetModal}
        onClose={() => settings.setShowResetModal(false)}
        onConfirm={settings.handleResetConfirm}
        title={t("settings.reset_modal_title", "Reiniciar bóveda")}
        message={t(
          "settings.reset_confirmation",
          "¿Estás seguro? Se perderán todos tus datos de presupuesto y gastos.",
        )}
        cancelText={t("common.cancel", "Cancelar")}
        confirmText={t("settings.reset_confirm", "Reiniciar")}
      />
    </>
  );
}
