// ============================================================================
// PANTALLA DE AJUSTES - settings.tsx
// ============================================================================

import React from "react";
import { useTranslation } from "react-i18next";

// Layout base
import { SettingsLayout } from "@/components/templates/settings/components/layout/SettingsLayout";

// Secciones de UI
import { NotificationsSection } from "@/components/templates/settings/components/sections/NotificationsSection";
import { HapticsSection } from "@/components/templates/settings/components/sections/HapticsSection"; // <-- NUEVO
import { LanguageSection } from "@/components/templates/settings/components/sections/LanguageSection";
import { SecuritySection } from "@/components/templates/settings/components/sections/SecuritySection";
import { PlanSection } from "@/components/templates/settings/components/sections/PlanSection";
import { CurrencySection } from "@/components/templates/settings/components/sections/CurrencySection";
import { ExportSection } from "@/components/templates/settings/components/sections/ExportSection";
import { DangerSection } from "@/components/templates/settings/components/sections/DangerSection";

// Modales
import { LanguageModal } from "@/components/templates/settings/components/modals/LanguageModal";
import { ResetModal } from "@/components/templates/settings/components/modals/ResetModal";

// Hook
import { useSettings } from "@/components/templates/settings/hooks/useSettings";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const settings = useSettings();

  return (
    <>
      <SettingsLayout>
        {/* ----------------------------------------------------------------
          SECCIÓN NOTIFICACIONES
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
          SECCIÓN HÁPTICOS (NUEVA)
        ---------------------------------------------------------------- */}
        <HapticsSection
          hapticFeedback={settings.hapticFeedback}
          onToggle={settings.handleHapticToggle}
        />

        {/* ----------------------------------------------------------------
          SECCIÓN IDIOMA
        ---------------------------------------------------------------- */}
        <LanguageSection
          language={settings.language}
          onPress={() => settings.setShowLanguageModal(true)}
        />

        {/* ----------------------------------------------------------------
          SECCIÓN SEGURIDAD
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
        ---------------------------------------------------------------- */}
        {/* <PlanSection
          totalBudget={settings.totalBudget}
          remainingDays={settings.remainingDays}
          daysDuration={settings.daysDuration}
          isExtremeMode={settings.isExtremeMode}
          currency={settings.currency}
          onEditPress={settings.handleEditPlan}
        /> */}

        {/* ----------------------------------------------------------------
          SECCIÓN MONEDA
        ---------------------------------------------------------------- */}
        {/* <CurrencySection currency={settings.currency} /> */}

        {/* ----------------------------------------------------------------
          SECCIÓN EXPORTAR DATOS
        ---------------------------------------------------------------- */}
        <ExportSection
          isExporting={settings.isExporting}
          onExport={settings.handleExportCSV}
          isBackupExporting={settings.isBackupExporting}
          onBackupExport={settings.handleBackupExport}
          isImporting={settings.isImporting}
          onImport={settings.handleBackupImport}
        />

        {/* ----------------------------------------------------------------
          SECCIÓN ZONA DE PELIGRO
        ---------------------------------------------------------------- */}
        <DangerSection onResetPress={() => settings.setShowResetModal(true)} />
      </SettingsLayout>

      {/* ----------------------------------------------------------------
        MODALES
      ---------------------------------------------------------------- */}
      <LanguageModal
        isOpen={settings.showLanguageModal}
        onClose={() => settings.setShowLanguageModal(false)}
        selectedLanguage={settings.language}
        onSelectLanguage={settings.handleLanguageSelect}
        title={t("settings.language_modal_title", "Idioma")}
      />

      <ResetModal
        isOpen={settings.showResetModal}
        onClose={() => settings.setShowResetModal(false)}
        onConfirm={settings.handleResetConfirm}
        title={t("settings.reset_modal_title", "Reiniciar bóveda")}
        message={t(
          "settings.reset_confirmation",
          "¿Estás seguro? Se perderán todos tus datos de presupuesto y gastos."
        )}
        cancelText={t("common.cancel", "Cancelar")}
        confirmText={t("settings.reset_confirm", "Reiniciar")}
      />
    </>
  );
}