import React from "react";
import { useTranslation } from "react-i18next"; 
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import AppDivider from "@/components/atoms/structure/AppDivider";
import AppNumberInput from "@/components/atoms/action/AppNumberInput";
import AppSelect from "@/components/atoms/action/AppSelect";
import AppInput from "@/components/atoms/action/AppInput";
import AppCard from "@/components/atoms/surface/AppCard";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";
import { PALETTE } from "@/constants/colors";
import { formatMoney } from "@/store/useVaultStore/index.utils";
import { BudgetSectionProps } from "./index.props";
import {
  MIN_BUDGET,
  MAX_BUDGET,
  MIN_DAYS,
  MAX_DAYS,
} from "../constants/setup";

export default function BudgetSection({
  budget,
  setBudget,
  currency,
  selectedPeriod,
  customDays,
  setCustomDays,
  errors,
  onPressPeriod,
  numericBudget,
  actualDays,
  dailyBudget,
}: BudgetSectionProps) {
  const { t } = useTranslation(); 
  
  const isBudgetValid = budget && numericBudget >= MIN_BUDGET && numericBudget <= MAX_BUDGET;
  const isDaysValid = selectedPeriod.value !== 0 || 
    (customDays && parseInt(customDays) >= MIN_DAYS && parseInt(customDays) <= MAX_DAYS);

  const getPeriodDisplayText = () => {
    if (selectedPeriod.value === 0) {
      return t("setup.period_custom", "Personalizado");
    }
    return selectedPeriod.label; 
  };

  return (
    <>
      <AppDivider marginVertical="s" />

      <AppStack gap="s">
        <AppStack direction="horizontal" align="center" gap="xs">
          <AppText variant="h3" color="accent" style={{ fontSize: 16 }}>
            {t("setup.resources_title", "RECURSOS")} 
          </AppText>
        </AppStack>

        <AppText variant="caption" color="secondary" style={{ marginBottom: SPACING.xs }}>
          {t("setup.resources_description", "Define cuánto oxígeno tienes y para cuánto tiempo debe durar.")} 
        </AppText>

        <AppStack gap="m">
          <AppStack gap="xs">
            <AppNumberInput
              value={budget}
              onChange={setBudget}
              placeholder={t("setup.budget_placeholder", "Presupuesto total")}
              currencySymbol={currency.symbol}
              status={errors.budget ? "error" : isBudgetValid ? "success" : "neutral"}
              label={t("setup.budget_label", "¿Cuánto oxígeno tienes?")} 
              showStepper={true}
              min={MIN_BUDGET}
              max={MAX_BUDGET}
            />
            {errors.budget && (
              <AppText variant="caption" color="error" style={{ marginLeft: SPACING.xs }}>
                {errors.budget} 
              </AppText>
            )}
          </AppStack>

          <AppSelect
            value={getPeriodDisplayText()}
            onPress={onPressPeriod}
            label={t("setup.period_label", "Duración del período")}
          />

          {selectedPeriod.value === 0 && (
            <AppStack gap="xs">
              <AppInput
                placeholder={t("setup.custom_days_placeholder", "Cantidad de días")} 
                value={customDays}
                onChangeText={setCustomDays}
                keyboardType="numeric"
                status={errors.days ? "error" : isDaysValid ? "success" : "neutral"}
                label={t("setup.custom_days_label", "Días personalizados")} 
                maxLength={3}
              />
              {errors.days && (
                <AppText variant="caption" color="error" style={{ marginLeft: SPACING.xs }}>
                  {errors.days}
                </AppText>
              )}
            </AppStack>
          )}
        </AppStack>

        {(numericBudget > 0 || actualDays > 0) && (
          <AppCard
            style={{
              backgroundColor: `${PALETTE.nightBlue}80`,
              borderColor: PALETTE.darkBorder,
              marginTop: SPACING.s,
            }}
            padding="m"
          >
            <AppStack direction="horizontal" justify="space-between" align="center">
              <AppText variant="caption" color="secondary">
                {t("setup.daily_budget", "Presupuesto diario:")} {/* <-- Texto internacionalizado */}
              </AppText>
              <AppText
                variant="body"
                color="accent"
                style={{ fontWeight: "600", fontSize: 14 }}
              >
                {formatMoney(dailyBudget, currency.symbol)}
              </AppText>
            </AppStack>
          </AppCard>
        )}
      </AppStack>
    </>
  );
}