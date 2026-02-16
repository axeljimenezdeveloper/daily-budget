// ============================================================================
// PANTALLA DE AJUSTES - settings.tsx
//
// Contiene todas las preferencias de la aplicación: notificaciones, idioma,
// plan actual, moneda (solo lectura), exportación de datos y zona de peligro.
// Integra el hook useExportCSV para la generación y compartición de archivos CSV.
// ============================================================================

import React, { useState, useEffect } from "react";
import { ScrollView, FlatList, Alert, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppBox from "@/components/atoms/structure/AppBox";
import AppText from "@/components/atoms/content/AppText";
import AppSwitch from "@/components/atoms/action/AppSwitch";
import AppPressable from "@/components/atoms/action/AppPressable";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppListItem from "@/components/atoms/action/AppListItem";
import AppDivider from "@/components/atoms/structure/AppDivider";
import AppModal from "@/components/atoms/structure/AppModal";
import AppTimePicker from "@/components/atoms/action/AppTimePicker";
import { useNotificationPreferences } from "@/features/notifications/hooks/useNotificationPreferences";
import { useNotificationScheduler } from "@/features/notifications/hooks/useNotificationScheduler";
import {
  NOTIFICATION_IDS,
  NOTIFICATION_CHANNELS,
} from "@/features/notifications/constants";
import { useVaultStore } from "@/store/useVaultStore";
import {
  calculateDaysPassed,
  formatMoney,
} from "@/store/useVaultStore/index.utils";
// ----------------------------------------------------------------------------
// HOOK DE EXPORTACIÓN CSV
// ----------------------------------------------------------------------------
import { useExportCSV } from "@/store/hooks/useExportCSV"; 
import AppSpinner from "@/components/atoms/visual/AppSpinner";

// (El tipo Currency se mantiene por si se necesita en el futuro)
type Currency = {
  code: string;
  symbol: string;
  name: string;
  flag: string;
};

const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "Dólar estadounidense", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "Libra esterlina", flag: "🇬🇧" },
  { code: "JPY", symbol: "¥", name: "Yen japonés", flag: "🇯🇵" },
  { code: "MXN", symbol: "$", name: "Peso mexicano", flag: "🇲🇽" },
  { code: "VES", symbol: "Bs", name: "Bolívar", flag: "🇻🇪" },
];

export default function SettingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  // --- HOOKS DE NOTIFICACIONES ---
  const { preferences, updatePreferences } = useNotificationPreferences();
  const { scheduleOneTimeNotification, requestPermissions } =
    useNotificationScheduler();

  // --- ESTADO DEL STORE ---
  const {
    language,
    setLanguage,
    totalBudget,
    daysDuration,
    startDate,
    isExtremeMode,
    currency,
    resetVault,
  } = useVaultStore();

  // --- CÁLCULOS DERIVADOS DEL PLAN ---
  const daysPassed = calculateDaysPassed(startDate);
  const remainingDays = Math.max(0, daysDuration - daysPassed);
  const formattedTotalBudget = formatMoney(totalBudget, currency);

  // --- ESTADOS LOCALES (MODALES) ---
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // --------------------------------------------------------------------------
  // HOOK DE EXPORTACIÓN CSV
  // --------------------------------------------------------------------------
  const { exportCSV, isExporting, error: exportError } = useExportCSV();

  // Efecto para mostrar errores de exportación al usuario
  useEffect(() => {
    if (exportError) {
      Alert.alert(
        t("common.error"),
        exportError,
        [{ text: t("common.ok", "OK") }]
      );
    }
  }, [exportError, t]);

  // --- MANEJADOR DE EXPORTACIÓN ---
  const handleExportCSV = async () => {
    await exportCSV();
    // No mostramos mensaje de éxito porque el usuario ya ve el diálogo de compartir.
    // Si ocurre un error, se mostrará automáticamente por el useEffect(exportError).
  };

  // --- MANEJADOR PARA NOTIFICACIÓN DE PRUEBA ---
  const handleTestNotification = async () => {
    const granted = await requestPermissions();
    if (!granted) {
      Alert.alert(
        t("common.error"),
        t("notifications.permission_denied") || "Permiso denegado"
      );
      return;
    }
    await scheduleOneTimeNotification(
      "test-notification",
      1,
      t("notifications.test.title") || "Prueba",
      t("notifications.test.body") || "Esta es una notificación de prueba",
      NOTIFICATION_CHANNELS.REMINDERS.id
    );
    Alert.alert(
      t("common.success"),
      t("notifications.test.sent") || "Notificación enviada"
    );
  };

  // --- MANEJADOR DE REINICIO ---
  const handleResetConfirm = () => {
    resetVault();
    setShowResetModal(false);
    router.replace("/(welcome)/onboarding1");
  };

  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      <AppStack flex={1} style={{ paddingHorizontal: SPACING.m }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: SPACING.xl }}
        >
          {/* ===== SECCIÓN NOTIFICACIONES ===== */}
          <AppBox marginBottom="xl">
            <AppText
              variant="h3"
              color="accent"
              style={{ marginBottom: SPACING.s }}
            >
              {t("settings.notifications_section")}
            </AppText>
            <AppBox>
              <AppListItem
                label={t("settings.daily_reminder_title")}
                subLabel={t("settings.daily_reminder_description")}
                icon="notifications-outline"
                rightContent={
                  <AppSwitch
                    value={preferences.dailyReminder}
                    onValueChange={(val) =>
                      updatePreferences({ dailyReminder: val })
                    }
                  />
                }
              />
              <AppDivider color="darkBorder" thickness={1} marginVertical="s" />

              <AppListItem
                label={t("settings.extreme_alert_title")}
                subLabel={t("settings.extreme_alert_description")}
                icon="alert-circle-outline"
                rightContent={
                  <AppSwitch
                    value={preferences.extremeModeAlert}
                    onValueChange={(val) =>
                      updatePreferences({ extremeModeAlert: val })
                    }
                  />
                }
              />
              <AppDivider color="darkBorder" thickness={1} marginVertical="s" />

              <AppListItem
                label={t("settings.budget_exceeded_title")}
                subLabel={t("settings.budget_exceeded_description")}
                icon="warning-outline"
                rightContent={
                  <AppSwitch
                    value={preferences.budgetExceededAlert}
                    onValueChange={(val) =>
                      updatePreferences({ budgetExceededAlert: val })
                    }
                  />
                }
              />
              <AppDivider color="darkBorder" thickness={1} marginVertical="s" />

              <AppBox
                style={{
                  backgroundColor: PALETTE.nightBlue,
                  borderRadius: BORDER_RADIUS.m,
                  paddingHorizontal: SPACING.xs,
                  paddingVertical: SPACING.xs,
                  borderWidth: 1,
                  borderColor: PALETTE.darkBorder,
                }}
              >
                <AppTimePicker
                  value={preferences.reminderTime}
                  onChange={(newTime) =>
                    updatePreferences({ reminderTime: newTime })
                  }
                  label={t("settings.daily_reminder_title")}
                  placeholder={t("common.time_picker.placeholder")}
                  style={{ width: "100%" }}
                />
              </AppBox>
              <AppDivider color="darkBorder" thickness={1} marginVertical="s" />

              <AppListItem
                label={t("settings.test_button")}
                icon="send-outline"
                onPress={handleTestNotification}
                isActive
              />
            </AppBox>
          </AppBox>

          {/* ===== SECCIÓN IDIOMA ===== */}
          <AppBox marginBottom="xl">
            <AppText
              variant="h3"
              color="accent"
              style={{ marginBottom: SPACING.s }}
            >
              {t("settings.language_section", "Idioma")}
            </AppText>
            <AppBox>
              <AppListItem
                label={t("settings.language", "Idioma")}
                subLabel={language === "es" ? "🇪🇸 Español" : "🇺🇸 English"}
                icon="language-outline"
                onPress={() => setShowLanguageModal(true)}
                rightContent={
                  <AppIcon
                    name="chevron-forward"
                    library="Ionicons"
                    size="m"
                    color="secondary"
                  />
                }
              />
            </AppBox>
          </AppBox>

          {/* ===== SECCIÓN PLAN ACTUAL ===== */}
          <AppBox marginBottom="xl">
            <AppText
              variant="h3"
              color="accent"
              style={{ marginBottom: SPACING.s }}
            >
              {t("settings.current_plan_section", "Tu plan actual")}
            </AppText>
            <AppBox>
              <AppListItem
                label={t("settings.total_budget", "Presupuesto total")}
                subLabel={formattedTotalBudget}
                icon="wallet-outline"
              />
              <AppDivider color="darkBorder" thickness={1} marginVertical="s" />

              <AppListItem
                label={t("settings.remaining_days", "Días restantes")}
                subLabel={`${remainingDays} / ${daysDuration}`}
                icon="calendar-outline"
              />

              {isExtremeMode && (
                <>
                  <AppDivider
                    color="darkBorder"
                    thickness={1}
                    marginVertical="s"
                  />
                  <AppListItem
                    label={t("settings.extreme_mode", "Modo cuidado")}
                    subLabel={t("settings.activated", "Activado")}
                    icon="warning"
                    isActive
                  />
                </>
              )}

              <AppDivider color="darkBorder" thickness={1} marginVertical="s" />
              <AppListItem
                label={t("settings.edit_plan", "Editar plan")}
                icon="create-outline"
                onPress={() =>
                  Alert.alert(
                    t("settings.edit_plan"),
                    t("settings.coming_soon", "Funcionalidad próxima")
                  )
                }
              />
            </AppBox>
          </AppBox>

          {/* ===== SECCIÓN MONEDA (SOLO LECTURA) ===== */}
          <AppBox marginBottom="xl">
            <AppText
              variant="h3"
              color="accent"
              style={{ marginBottom: SPACING.s }}
            >
              {t("settings.currency_section", "Moneda")}
            </AppText>
            <AppBox>
              <AppListItem
                label={t("settings.currency", "Moneda")}
                subLabel={currency}
                icon="cash-outline"
              />
            </AppBox>
          </AppBox>

          {/* ===== SECCIÓN EXPORTAR DATOS ===== */}
          <AppBox marginBottom="xl">
            <AppText
              variant="h3"
              color="accent"
              style={{ marginBottom: SPACING.s }}
            >
              {t("settings.export_section", "Exportar datos")}
            </AppText>
            <AppBox>
              <AppListItem
                label={t("settings.export_csv")}
                subLabel={isExporting ? t("settings.export_loading") : undefined}
                icon="download-outline"
                onPress={handleExportCSV}
                disabled={isExporting}
                isActive={!isExporting}
                rightContent={
                  isExporting ? (
                    <AppSpinner size="s" color="accent" />
                  ) : (
                    <AppIcon
                      name="chevron-forward"
                      library="Ionicons"
                      size="m"
                      color="secondary"
                    />
                  )
                }
              />
            </AppBox>
          </AppBox>

          {/* ===== SECCIÓN ZONA DE PELIGRO ===== */}
          <AppBox marginBottom="xl">
            <AppText
              variant="h3"
              color="error"
              style={{ marginBottom: SPACING.s }}
            >
              {t("settings.danger_zone", "Zona de peligro")}
            </AppText>
            <AppBox>
              <AppPressable
                style={styles.dangerRow}
                onPress={() => setShowResetModal(true)}
              >
                <AppBox align="center" justify="center" style={{ width: 32 }}>
                  <AppIcon
                    name="trash-outline"
                    library="Ionicons"
                    size="l"
                    color="error"
                  />
                </AppBox>
                <AppBox flex={1} marginLeft="s">
                  <AppText
                    variant="body"
                    color="error"
                    style={{ fontWeight: "600" }}
                  >
                    {t("settings.reset_vault", "Reiniciar bóveda")}
                  </AppText>
                </AppBox>
                <AppIcon
                  name="chevron-forward"
                  library="Ionicons"
                  size="m"
                  color="error"
                />
              </AppPressable>
            </AppBox>
          </AppBox>
        </ScrollView>
      </AppStack>

      {/* ===== MODAL DE IDIOMA ===== */}
      <AppModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        title={t("settings.language_modal_title", "Idioma")}
        showCloseButton
        closeOnBackdropPress
        height="auto"
      >
        <AppBox gap="xs">
          <AppPressable
            style={[
              styles.modalOption,
              language === "es" && styles.modalOptionActive,
            ]}
            onPress={() => {
              setLanguage("es");
              setShowLanguageModal(false);
            }}
          >
            <AppText variant="body" color="primary">
              🇪🇸 Español
            </AppText>
          </AppPressable>
          <AppPressable
            style={[
              styles.modalOption,
              language === "en" && styles.modalOptionActive,
            ]}
            onPress={() => {
              setLanguage("en");
              setShowLanguageModal(false);
            }}
          >
            <AppText variant="body" color="primary">
              🇺🇸 English
            </AppText>
          </AppPressable>
        </AppBox>
      </AppModal>

      {/* ===== MODAL DE REINICIO ===== */}
      <AppModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title={t("settings.reset_modal_title", "Reiniciar bóveda")}
        showCloseButton
        closeOnBackdropPress
        height="auto"
      >
        <AppBox gap="l">
          <AppText variant="body" color="secondary" align="center">
            {t(
              "settings.reset_confirmation",
              "¿Estás seguro? Se perderán todos tus datos de presupuesto y gastos."
            )}
          </AppText>
          <AppBox direction="row" justify="space-around" gap="m">
            <AppPressable
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={() => setShowResetModal(false)}
            >
              <AppText
                variant="body"
                color="primary"
                style={{ fontWeight: "600" }}
              >
                {t("common.cancel", "Cancelar")}
              </AppText>
            </AppPressable>
            <AppPressable
              style={[styles.modalButton, styles.modalButtonDanger]}
              onPress={handleResetConfirm}
            >
              <AppText
                variant="body"
                color="primary"
                style={{ fontWeight: "600" }}
              >
                {t("settings.reset_confirm", "Reiniciar")}
              </AppText>
            </AppPressable>
          </AppBox>
        </AppBox>
      </AppModal>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  modalOption: {
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.xs,
  },
  modalOptionActive: {
    backgroundColor: `${PALETTE.sunsetOrange}20`,
    borderColor: PALETTE.sunsetOrange,
    borderWidth: 1,
  },
  modalButton: {
    flex: 1,
    paddingVertical: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    alignItems: "center",
    marginHorizontal: SPACING.xs,
  },
  modalButtonCancel: {
    backgroundColor: PALETTE.slateGray,
  },
  modalButtonDanger: {
    backgroundColor: PALETTE.errorRed,
  },
  dangerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.xs,
    backgroundColor: `${PALETTE.errorRed}08`,
    borderWidth: 1,
    borderColor: `${PALETTE.errorRed}40`,
    borderRadius: BORDER_RADIUS.m,
    marginTop: SPACING.xs,
  },
});