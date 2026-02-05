// app/welcome/setup-duration.tsx
import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, View, TouchableOpacity } from "react-native";

// Componentes atómicos
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppButton from "@/components/atoms/action/AppButton";
import AppProgressDots from "@/components/atoms/visual/AppProgressDots";
import AppInput from "@/components/atoms/action/AppInput";
import AppSelect from "@/components/atoms/action/AppSelect";
import AppCard from "@/components/atoms/surface/AppCard";
import AppBadge from "@/components/atoms/visual/AppBadge";
import AppModal from "@/components/atoms/structure/AppModal";

// Store y utilidades
import { useVaultStore } from "@/store/useVaultStore";
import { formatMoney } from "@/store/useVaultStore/index.utils";

// Constantes de diseño
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

// Tipo para la moneda
interface Currency {
  symbol: string;
  name: string;
  code: string;
  flag: string;
  locale: string;
}

// Interfaz para PeriodOption (integrada directamente)
interface PeriodOption {
  label: string;
  value: number;
  description: string;
}

// Constantes locales (integradas directamente)
const MIN_DAYS = 1;
const MAX_DAYS = 365;

const PERIOD_OPTIONS: PeriodOption[] = [
  { label: "Semanal", value: 7, description: "7 días" },
  { label: "Quincenal", value: 15, description: "15 días" },
  { label: "Mensual", value: 30, description: "30 días" },
  { label: "Personalizado", value: 0, description: "Elige tus días" },
];

export default function SetupDurationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const { initVault, setFinishedOnboarding } = useVaultStore();

  // Estado local para la pantalla
  const [selectedPeriod, setSelectedPeriod] = React.useState(PERIOD_OPTIONS[0]);
  const [customDays, setCustomDays] = React.useState("");
  const [showPeriodModal, setShowPeriodModal] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Obtener la moneda y presupuesto de los parámetros
  const currencyFromParams: Currency = React.useMemo(() => {
    if (params.currencyJSON) {
      try {
        return JSON.parse(params.currencyJSON as string);
      } catch (e) {
        console.error("Error parsing currency JSON:", e);
      }
    }
    return {
      symbol: "$",
      code: "USD",
      name: "Dólar Estadounidense",
      flag: "🇺🇸",
      locale: "en-US"
    };
  }, [params]);

  const budgetFromParams = React.useMemo(() => {
    return params.budget as string || "";
  }, [params]);

  const numericBudget = React.useMemo(() => {
    return budgetFromParams ? parseFloat(budgetFromParams) : 0;
  }, [budgetFromParams]);

  // Cálculos
  const actualDays = React.useMemo(() => {
    if (selectedPeriod.value === 0 && customDays) {
      return parseInt(customDays) || 0;
    }
    return selectedPeriod.value;
  }, [selectedPeriod, customDays]);

  const dailyBudget = React.useMemo(() => {
    if (numericBudget > 0 && actualDays > 0) {
      return numericBudget / actualDays;
    }
    return 0;
  }, [numericBudget, actualDays]);

  // Validación de días personalizados
  const validateDays = (value: string): boolean => {
    if (selectedPeriod.value !== 0) {
      setError(null);
      return true;
    }

    if (!value.trim()) {
      setError(t("validation.days_required", "Ingresa la cantidad de días"));
      return false;
    }

    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      setError(t("validation.valid_number", "Ingresa un número válido"));
      return false;
    }

    if (numValue < MIN_DAYS) {
      setError(t("validation.min_days", "Mínimo {{count}} día", {
        count: MIN_DAYS
      }));
      return false;
    }

    if (numValue > MAX_DAYS) {
      setError(t("validation.max_days", "Máximo {{count}} días (1 año)", {
        count: MAX_DAYS
      }));
      return false;
    }

    setError(null);
    return true;
  };

  const handleCustomDaysChange = (value: string) => {
    setCustomDays(value);
    validateDays(value);
  };

  // Función para obtener el texto de visualización del período
  const getPeriodDisplayText = () => {
    if (selectedPeriod.value === 0) {
      return t("setup.period_custom", "Personalizado");
    }
    
    // Traducción de las opciones
    const translations: Record<number, string> = {
      7: t("setup.period_options.weekly.label", "Semanal"),
      15: t("setup.period_options.biweekly.label", "Quincenal"),
      30: t("setup.period_options.monthly.label", "Mensual"),
      0: t("setup.period_options.custom.label", "Personalizado"),
    };
    
    return translations[selectedPeriod.value] || selectedPeriod.label;
  };

  // Determinar si la duración es válida
  const isDaysValid = () => {
    if (selectedPeriod.value !== 0) return true;
    if (!customDays.trim()) return false;
    
    const numValue = parseInt(customDays);
    return !isNaN(numValue) && numValue >= MIN_DAYS && numValue <= MAX_DAYS;
  };

  // Función para comenzar la misión
  const handleStartMission = async () => {
    if (!isDaysValid()) {
      validateDays(customDays);
      return;
    }

    setIsProcessing(true);
    try {
      initVault(numericBudget, actualDays, currencyFromParams.symbol);
      setFinishedOnboarding();
      
      // Navegar a la animación de éxito
      router.replace("/(animations)/success");
    } catch (error) {
      Alert.alert(
        t("common.error", "Error"),
        t("setup.vault_config_error", "No pudimos configurar tu bóveda.")
      );
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  // Determinar estado del input de días personalizados
  const getInputStatus = () => {
    if (error) return "error";
    if (isDaysValid() && customDays) return "success";
    return "neutral";
  };

  // Función para obtener la opción traducida
  const getTranslatedOption = (option: { value: number }) => {
    const translations: Record<number, { label: string; description: string }> = {
      7: {
        label: t("setup.period_options.weekly.label", "Semanal"),
        description: t("setup.period_options.weekly.description", "7 días"),
      },
      15: {
        label: t("setup.period_options.biweekly.label", "Quincenal"),
        description: t("setup.period_options.biweekly.description", "15 días"),
      },
      30: {
        label: t("setup.period_options.monthly.label", "Mensual"),
        description: t("setup.period_options.monthly.description", "30 días"),
      },
      0: {
        label: t("setup.period_options.custom.label", "Personalizado"),
        description: t("setup.period_options.custom.description", "Elige tus días"),
      },
    };

    return translations[option.value] || { 
      label: t("setup.period_custom", "Personalizado"), 
      description: "" 
    };
  };

  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      {/* Botón de atrás */}
      <AppStack direction="horizontal" justify="flex-start" style={{ paddingHorizontal: SPACING.m, paddingTop: SPACING.l }}>
        <AppButton
          onPress={handleBack}
          variant="outline"
          status="neutral"
          style={{
            paddingHorizontal: SPACING.m,
            paddingVertical: SPACING.s,
          }}
        >
          <AppText variant="caption" style={{ fontWeight: "500" }}>
            {t("common.back")}
          </AppText>
        </AppButton>
      </AppStack>

      {/* ScrollView para consistencia */}
      <ScrollView 
        contentContainerStyle={{ 
          flexGrow: 1,
          paddingHorizontal: SPACING.m,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Contenido principal centrado con altura mínima */}
        <View style={{ 
          minHeight: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: SPACING.xl,
        }}>
          <AppStack 
            align="center" 
            gap="l"
            style={{ width: "100%", maxWidth: 400 }}
          >
            {/* Icono decorativo - tamaño ajustado */}
            <View
              style={{
                padding: SPACING.l,
                borderRadius: BORDER_RADIUS.round,
                backgroundColor: `${PALETTE.sunsetOrange}15`,
                borderWidth: 1,
                borderColor: `${PALETTE.sunsetOrange}30`,
                marginBottom: SPACING.s,
              }}
            >
              <AppIcon
                name="calendar-outline"
                library="Ionicons"
                size="xxl"
                color="accent"
              />
            </View>

            {/* Título y descripción - márgenes controlados */}
            <AppStack align="center" gap="xs" style={{ width: "100%", marginBottom: SPACING.l }}>
              <AppText 
                variant="h1" 
                align="center"
                style={{ marginBottom: SPACING.xs }}
              >
                {t("setup.days_label", "¿Cuántos días debe durar?")}
              </AppText>

              <AppText
                variant="body"
                align="center"
                color="secondary"
                style={{ lineHeight: 22, paddingHorizontal: SPACING.s }}
              >
                {t(
                  "setup.resources_description",
                  "Define la duración de tu oxígeno para esta misión.",
                )}
              </AppText>
            </AppStack>

            {/* Sección de DURACIÓN - espaciado consistente */}
            <AppStack style={{ width: "100%", marginBottom: SPACING.xl }} gap="m">
              {/* Encabezado de sección con badge */}
              <AppStack direction="horizontal" align="center" gap="xs">
                <AppText variant="h3" color="accent" style={{ fontSize: 16 }}>
                  {t("setup.period_label", "DURACIÓN")}
                </AppText>
                <AppBadge
                  label={`${actualDays}d`}
                  status="info"
                  variant="subtle"
                  style={{ paddingHorizontal: SPACING.xs, paddingVertical: 2 }}
                />
              </AppStack>
              
              {/* Descripción de la sección */}
              <AppText variant="caption" color="secondary" style={{ marginBottom: SPACING.xs }}>
                {t("setup.resources_description", "Selecciona por cuánto tiempo quieres que dure tu oxígeno.")}
              </AppText>

              {/* Selector de período */}
              <AppSelect
                value={getPeriodDisplayText()}
                onPress={() => setShowPeriodModal(true)}
                label={t("setup.period_label", "Duración del período")}
              />

              {/* Campo para días personalizados */}
              {selectedPeriod.value === 0 && (
                <AppStack gap="xs">
                  <AppInput
                    placeholder={t("setup.custom_days_placeholder", "Cantidad de días")}
                    value={customDays}
                    onChangeText={handleCustomDaysChange}
                    keyboardType="numeric"
                    status={getInputStatus()}
                    label={t("setup.custom_days_label", "Días personalizados")}
                    maxLength={3}
                  />
                  {error && (
                    <AppText variant="caption" color="error" style={{ marginLeft: SPACING.xs }}>
                      {error}
                    </AppText>
                  )}
                </AppStack>
              )}

              {/* Información de resumen */}
              {(numericBudget > 0 && actualDays > 0) && (
                <AppCard
                  style={{
                    backgroundColor: `${PALETTE.nightBlue}80`,
                    borderColor: PALETTE.darkBorder,
                    marginTop: SPACING.s,
                  }}
                  padding="m"
                >
                  <AppStack gap="s">
                    <AppStack direction="horizontal" justify="space-between" align="center">
                      <AppText variant="caption" color="secondary">
                        {t("setup.daily_budget", "Presupuesto diario:")}
                      </AppText>
                      <AppText
                        variant="body"
                        color="accent"
                        style={{ fontWeight: "600", fontSize: 14 }}
                      >
                        {formatMoney(dailyBudget, currencyFromParams.symbol)}
                      </AppText>
                    </AppStack>
                    
                    <AppStack direction="horizontal" justify="space-between" align="center">
                      <AppText variant="caption" color="secondary">
                        {t("setup.total_for_days", { days: actualDays })}
                      </AppText>
                      <AppText variant="caption" color="secondary">
                        {formatMoney(numericBudget, currencyFromParams.symbol)}
                      </AppText>
                    </AppStack>
                  </AppStack>
                </AppCard>
              )}
            </AppStack>

            {/* Indicador de progreso - espacio fijo */}
            <View style={{ marginBottom: SPACING.xl }}>
              <AppProgressDots
                total={3}
                current={2}
                size="m"
                spacing="m"
                activeColor={PALETTE.sunsetOrange}
                inactiveColor={PALETTE.slateGray}
                inactiveOpacity={0.5}
              />
            </View>

            {/* Botón para comenzar misión */}
            <AppStack style={{ width: "100%" }}>
              <AppButton
                onPress={handleStartMission}
                status="accent"
                style={{ width: "100%" }}
                disabled={!isDaysValid() || isProcessing}
              >
                {isProcessing ? (
                  <AppText style={{ fontWeight: "700" }}>
                    {t("setup.configuring")}
                  </AppText>
                ) : (
                  <AppText style={{ fontWeight: "700" }}>
                    {t("setup.start_mission_confirmation")}
                  </AppText>
                )}
              </AppButton>
            </AppStack>
          </AppStack>
        </View>
      </ScrollView>

      {/* Modal de selección de período - INTEGRADO DIRECTAMENTE */}
      <AppModal
        isOpen={showPeriodModal}
        onClose={() => setShowPeriodModal(false)}
        title={t("setup.period_modal_title", "Duración")}
      >
        <AppStack gap="s">
          {PERIOD_OPTIONS.map((opt) => {
            const translated = getTranslatedOption(opt);
            
            return (
              <TouchableOpacity
                key={opt.value}
                onPress={() => {
                  setSelectedPeriod({
                    ...opt,
                    label: translated.label,
                    description: translated.description
                  });
                  setShowPeriodModal(false);
                }}
                style={{
                  padding: SPACING.m,
                  backgroundColor:
                    selectedPeriod.value === opt.value
                      ? `${PALETTE.sunsetOrange}15`
                      : "transparent",
                  borderRadius: BORDER_RADIUS.m,
                  borderWidth: 1,
                  borderColor:
                    selectedPeriod.value === opt.value
                      ? PALETTE.sunsetOrange
                      : PALETTE.darkBorder,
                }}
              >
                <AppText>
                  {translated.label} - {translated.description}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </AppStack>
      </AppModal>
    </AppContainer>
  );
}