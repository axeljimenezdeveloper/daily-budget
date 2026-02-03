import React from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { useTranslation } from "react-i18next"; 
import AppModal from "@/components/atoms/structure/AppModal";
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";
import { PALETTE } from "@/constants/colors";
import { CurrencyModalProps } from "./index.props";
import { CURRENCY_LIST } from "../constants/setup";

export default function CurrencyModal({
  isOpen,
  onClose,
  currency,
  setCurrency,
}: CurrencyModalProps) {
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
                setCurrency(item);
                onClose();
              }}
              style={{
                padding: SPACING.m,
                backgroundColor:
                  currency.code === item.code
                    ? `${PALETTE.sunsetOrange}15`
                    : "transparent",
                borderRadius: BORDER_RADIUS.m,
                borderWidth: 1,
                borderColor:
                  currency.code === item.code
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
}