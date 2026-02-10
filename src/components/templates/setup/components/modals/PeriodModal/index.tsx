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
    let key: string;
    switch (option.value) {
      case 7:
        key = "weekly";
        break;
      case 15:
        key = "biweekly";
        break;
      case 30:
        key = "monthly";
        break;
      case 0:
        key = "custom";
        break;
      default:
        key = "custom";
    }

    return {
      label: t(`setup.period_section.options.${key}.label`, option.label),
      description: t(`setup.period_section.options.${key}.description`, option.description),
    };
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("setup.modals.period.title", "Choose the Duration")}
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