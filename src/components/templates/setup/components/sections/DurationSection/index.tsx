import React from "react";
import { useTranslation } from "react-i18next";

import AppText from "@/components/atoms/content/AppText";
import AppInput from "@/components/atoms/action/AppInput";
import AppSelect from "@/components/atoms/action/AppSelect";
import AppCard from "@/components/atoms/surface/AppCard";
import AppBadge from "@/components/atoms/visual/AppBadge";
import AppStack from "@/components/atoms/structure/AppStack";

import { formatMoney } from "@/store/useVaultStore/index.utils";

import { DurationSectionProps } from "./index.props";

import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";

export const DurationSection: React.FC<DurationSectionProps> = ({
  currency,
  numericBudget,
  selectedPeriod,
  customDays,
  error,
  actualDays,
  dailyBudget,
  isDaysValid,
  getPeriodDisplayText,
  getInputStatus,
  onOpenModal,
  onCustomDaysChange,
}) => {
  const { t } = useTranslation();

  return (
    <AppStack style={{ width: "100%", marginBottom: SPACING.xl }} gap="m">
      <AppStack direction="horizontal" align="center" gap="xs">
        <AppText variant="h3" color="accent" style={{ fontSize: 16 }}>
          {t("setup.duration_section.title", "Tu plan")}
        </AppText>
        <AppBadge
          label={`${actualDays}${t("common.days_short", "d")}`}
          status="info"
          variant="subtle"
          style={{ paddingHorizontal: SPACING.xs, paddingVertical: 2 }}
        />
      </AppStack>
      
      <AppText variant="caption" color="secondary" style={{ marginBottom: SPACING.xs }}>
        {t("setup.duration_section.description", "¿En cuántos días quieres distribuir tu dinero?")}
      </AppText>

      <AppSelect
        value={getPeriodDisplayText()}
        onPress={onOpenModal}
        label={t("setup.duration_section.period_label", "Selecciona la duración")}
      />

      {selectedPeriod.value === 0 && (
        <AppStack gap="xs">
          <AppInput
            placeholder={t("setup.duration_section.custom_days_placeholder", "¿Cuántos días?")}
            value={customDays}
            onChangeText={onCustomDaysChange}
            keyboardType="numeric"
            status={getInputStatus()}
            label={t("setup.duration_section.custom_days_label", "Días a tu medida")}
            maxLength={3}
          />
          {error && (
            <AppText variant="caption" color="error" style={{ marginLeft: SPACING.xs }}>
              {error}
            </AppText>
          )}
        </AppStack>
      )}

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
                {t("setup.duration_section.daily_budget_label", "Para cada día:")}
              </AppText>
              <AppText
                variant="body"
                color="accent"
                style={{ fontWeight: "600", fontSize: 14 }}
              >
                {formatMoney(dailyBudget, currency.symbol)}
              </AppText>
            </AppStack>
            
            <AppStack direction="horizontal" justify="space-between" align="center">
              <AppText variant="caption" color="secondary">
                {t("setup.duration_section.total_for_period", { days: actualDays })}
              </AppText>
              <AppText variant="caption" color="secondary">
                {formatMoney(numericBudget, currency.symbol)}
              </AppText>
            </AppStack>
          </AppStack>
        </AppCard>
      )}
    </AppStack>
  );
};