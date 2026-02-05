// app/welcome/setup-budget.tsx
import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

// Componentes atómicos
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppButton from "@/components/atoms/action/AppButton";
import AppProgressDots from "@/components/atoms/visual/AppProgressDots";
import AppNumberInput from "@/components/atoms/action/AppNumberInput";
import AppBadge from "@/components/atoms/visual/AppBadge";

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

export default function SetupBudgetScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  // Obtener la moneda de los parámetros de navegación
  const currencyFromParams: Currency = React.useMemo(() => {
    if (params.currencyJSON) {
      try {
        return JSON.parse(params.currencyJSON as string);
      } catch (e) {
        console.error("Error parsing currency JSON:", e);
      }
    }
    
    return {
      symbol: (params.currencySymbol as string) || "$",
      code: (params.currencyCode as string) || "USD",
      name: (params.currencyName as string) || "Dólar Estadounidense",
      flag: (params.currencyFlag as string) || "🇺🇸",
      locale: "en-US"
    };
  }, [params]);

  // Estado local para el presupuesto
  const [budget, setBudget] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  // Constantes de validación
  const MIN_BUDGET = 1;
  const MAX_BUDGET = 1000000;

  const handleBudgetChange = (value: string) => {
    setBudget(value);
    validateBudget(value);
  };

  // Validar el presupuesto
  const validateBudget = (value: string): boolean => {
    if (!value.trim()) {
      setError(null);
      return false;
    }
    
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      setError(t("validation.valid_number", "Ingresa un número válido"));
      return false;
    }
    
    if (numValue < MIN_BUDGET) {
      setError(t("validation.min_budget", "Mínimo {{amount}}", {
        amount: `${MIN_BUDGET} ${currencyFromParams.symbol}`
      }));
      return false;
    }
    
    if (numValue > MAX_BUDGET) {
      setError(t("validation.max_budget", "Máximo {{amount}}", {
        amount: `${MAX_BUDGET.toLocaleString()} ${currencyFromParams.symbol}`
      }));
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleNext = () => {
    const isValid = validateBudget(budget);
    if (isValid) {
      router.push({
        pathname: "/(welcome)/setup-duration",
        params: {
          currencyJSON: JSON.stringify(currencyFromParams),
          budget: budget,
        }
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  // Determinar si el presupuesto es válido
  const isBudgetValid = () => {
    if (!budget.trim()) return false;
    const numValue = parseFloat(budget);
    return !isNaN(numValue) && numValue >= MIN_BUDGET && numValue <= MAX_BUDGET;
  };

  // Determinar el estado del input
  const getInputStatus = () => {
    if (error) return "error";
    if (isBudgetValid() && budget) return "success";
    return "neutral";
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
                name="wallet-outline"
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
                {t("setup.budget_label", "¿Cuánto oxígeno tienes?")}
              </AppText>

              <AppText
                variant="body"
                align="center"
                color="secondary"
                style={{ lineHeight: 22, paddingHorizontal: SPACING.s }}
              >
                {t(
                  "setup.resources_description",
                  "Define cuánto oxígeno tienes para esta misión.",
                )}
              </AppText>
            </AppStack>

            {/* Sección de RECURSOS - espaciado consistente */}
            <AppStack style={{ width: "100%", marginBottom: SPACING.xl }} gap="m">
              {/* Encabezado de sección con badge */}
              <AppStack direction="horizontal" align="center" gap="xs">
                <AppText variant="h3" color="accent" style={{ fontSize: 16 }}>
                  {t("setup.resources_title", "RECURSOS")}
                </AppText>
                <AppBadge
                  label={currencyFromParams.code}
                  status="info"
                  variant="subtle"
                  style={{ paddingHorizontal: SPACING.xs, paddingVertical: 2 }}
                />
              </AppStack>
              
              {/* Descripción de la sección */}
              <AppText variant="caption" color="secondary" style={{ marginBottom: SPACING.xs }}>
                {t("setup.resources_description", "Define cuánto oxígeno tienes y para cuánto tiempo debe durar.")}
              </AppText>

              {/* Campo de entrada para el presupuesto */}
              <AppNumberInput
                value={budget}
                onChange={handleBudgetChange}
                placeholder={t("setup.budget_placeholder", "Presupuesto total")}
                currencySymbol={currencyFromParams.symbol}
                status={getInputStatus()}
                label={t("setup.budget_label", "¿Cuánto oxígeno tienes?")}
                showStepper={true}
                min={MIN_BUDGET}
                max={MAX_BUDGET}
              />
              
              {/* Mensaje de error */}
              {error && (
                <AppText 
                  variant="caption" 
                  color="error"
                  style={{ marginLeft: SPACING.xs }}
                >
                  {error}
                </AppText>
              )}
            </AppStack>

            {/* Indicador de progreso - espacio fijo */}
            <View style={{ marginBottom: SPACING.xl }}>
              <AppProgressDots
                total={3}
                current={1}
                size="m"
                spacing="m"
                activeColor={PALETTE.sunsetOrange}
                inactiveColor={PALETTE.slateGray}
                inactiveOpacity={0.5}
              />
            </View>

            {/* Botón de siguiente - posición fija relativa */}
            <AppStack style={{ width: "100%" }}>
              <AppButton
                onPress={handleNext}
                status="accent"
                style={{ width: "100%" }}
                disabled={!isBudgetValid()}
              >
                <AppText style={{ fontWeight: "700" }}>
                  {t("onboarding.next", "Siguiente")}
                </AppText>
              </AppButton>
            </AppStack>
          </AppStack>
        </View>
      </ScrollView>
    </AppContainer>
  );
}