import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import AppModal from "@/components/atoms/structure/AppModal";
import AppText from "@/components/atoms/content/AppText";
import AppStack from "@/components/atoms/structure/AppStack";

import { CURRENCY_LIST } from "../../../constants/currencies";

import { CurrencyModalProps } from "./index.props";

import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";


export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose,
  selectedCurrency,
  onSelectCurrency,
}) => {
  const { t } = useTranslation();

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("setup.currency_modal_title", "Divisa")}
    >
      <ScrollView style={{ maxHeight: 400 }}>
        <AppStack gap="s">
          {CURRENCY_LIST.map((item) => (
            <TouchableOpacity
              key={item.code}
              onPress={() => {
                onSelectCurrency(item);
                onClose();
              }}
              style={{
                padding: SPACING.m,
                backgroundColor:
                  selectedCurrency.code === item.code
                    ? `${PALETTE.sunsetOrange}15`
                    : "transparent",
                borderRadius: BORDER_RADIUS.m,
                borderWidth: 1,
                borderColor:
                  selectedCurrency.code === item.code
                    ? PALETTE.sunsetOrange
                    : PALETTE.darkBorder,
              }}
            >
              <AppText>
                {item.flag} {item.name} ({item.symbol})
              </AppText>
            </TouchableOpacity>
          ))}
        </AppStack>
      </ScrollView>
    </AppModal>
  );
};