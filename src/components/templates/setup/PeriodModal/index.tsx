import React from "react";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import AppModal from "@/components/atoms/structure/AppModal";
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";
import { PALETTE } from "@/constants/colors";
import { PeriodModalProps } from "./index.props";
import { PERIOD_OPTIONS } from "../constants/setup";

export default function PeriodModal({
  isOpen,
  onClose,
  selectedPeriod,
  setSelectedPeriod,
}: PeriodModalProps) {
  const { t } = useTranslation();

  // Función para obtener la opción con las traducciones aplicadas
  const getTranslatedOption = (option: { value: number }) => {
    const translations: Record<number, { label: string; description: string }> = {
      7: {
        label: t("setup.period_options.weekly.label"),
        description: t("setup.period_options.weekly.description"),
      },
      15: {
        label: t("setup.period_options.biweekly.label"),
        description: t("setup.period_options.biweekly.description"),
      },
      30: {
        label: t("setup.period_options.monthly.label"),
        description: t("setup.period_options.monthly.description"),
      },
      0: {
        label: t("setup.period_options.custom.label"),
        description: t("setup.period_options.custom.description"),
      },
    };

    return translations[option.value] || { 
      label: t("setup.period_custom"), 
      description: "" 
    };
  };

  return (
    <AppModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={t("setup.period_modal_title")}
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
}