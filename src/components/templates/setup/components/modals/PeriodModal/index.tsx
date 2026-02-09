import React from "react";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import AppModal from "@/components/atoms/structure/AppModal";
import AppText from "@/components/atoms/content/AppText";
import AppStack from "@/components/atoms/structure/AppStack";

import { PeriodModalProps } from "./index.props";
import { PeriodOption, PERIOD_OPTIONS } from "../../../types/index"

import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

export const PeriodModal: React.FC<PeriodModalProps> = ({
  isOpen,
  onClose,
  selectedPeriod,
  onSelectPeriod,
}) => {
  const { t } = useTranslation();

  const getTranslatedOption = (option: PeriodOption) => {
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
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("setup.period_modal_title", "Duración")}
    >
      <AppStack gap="s">
        {PERIOD_OPTIONS.map((opt) => {
          const translated = getTranslatedOption(opt);
          
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() => {
                onSelectPeriod({
                  ...opt,
                  label: translated.label,
                  description: translated.description
                });
                onClose();
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
  );
};