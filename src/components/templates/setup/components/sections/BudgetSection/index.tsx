import React from "react";
import { useTranslation } from "react-i18next";

import AppText from "@/components/atoms/content/AppText";
import AppNumberInput from "@/components/atoms/action/AppNumberInput";
import AppBadge from "@/components/atoms/visual/AppBadge";
import AppStack from "@/components/atoms/structure/AppStack";

import { BudgetSectionProps } from "./index.props";
import { MIN_BUDGET, MAX_BUDGET } from "../../../constants/validation";

import { SPACING } from "@/constants/metrics";

export const BudgetSection: React.FC<BudgetSectionProps> = ({
  currency,
  budget,
  error,
  isValid,
  onBudgetChange,
}) => {
  const { t } = useTranslation();

  const getInputStatus = () => {
    if (error) return "error";
    if (isValid && budget) return "success";
    return "neutral";
  };

  return (
    <AppStack style={{ width: "100%", marginBottom: SPACING.xl }} gap="m">
      {/* Encabezado de sección con badge */}
      <AppStack direction="horizontal" align="center" gap="xs">
        <AppText variant="h3" color="accent" style={{ fontSize: 16 }}>
          {t("setup.budget_section.title", "Tus recursos")}
        </AppText>
        <AppBadge
          label={currency.code}
          status="info"
          variant="subtle"
          style={{ paddingHorizontal: SPACING.xs, paddingVertical: 2 }}
        />
      </AppStack>
      
      <AppText variant="caption" color="secondary" style={{ marginBottom: SPACING.xs }}>
        {t("setup.budget_section.description", "¿De cuánto dispones y para cuánto tiempo quieres que te alcance?")}
      </AppText>

      <AppNumberInput
        value={budget}
        onChange={onBudgetChange}
        placeholder={t("setup.budget_section.budget_placeholder", "Escribe el monto total")}
        currencySymbol={currency.symbol}
        status={getInputStatus()}
        label={t("setup.budget_section.budget_label", "¿Cuál es tu presupuesto?")}
        showStepper={true}
        min={MIN_BUDGET}
        max={MAX_BUDGET}
      />
      
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
  );
};