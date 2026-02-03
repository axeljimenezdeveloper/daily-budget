import React from "react";
import { useTranslation } from "react-i18next"; 
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import AppSelect from "@/components/atoms/action/AppSelect";
import AppBadge from "@/components/atoms/visual/AppBadge";
import { SPACING } from "@/constants/metrics";
import { CurrencySectionProps } from "./index.props";

export default function CurrencySection({ currency, onPressCurrency }: CurrencySectionProps) {
  const { t } = useTranslation(); 

  return (
    <AppStack gap="s">
      <AppStack direction="horizontal" align="center" gap="xs">
        <AppText variant="h3" color="accent" style={{ fontSize: 16 }}>
          {t("setup.divisa_title", "DIVISA")} 
        </AppText>
      </AppStack>

      <AppText variant="caption" color="secondary" style={{ marginBottom: SPACING.xs }}>
        {t("setup.divisa_description", "Selecciona la moneda con la que gestionarás tu oxígeno.")} 
      </AppText>

      <AppSelect
        value={`${currency.flag} ${currency.code} (${currency.symbol})`}
        onPress={onPressCurrency}
        label={t("setup.mission_currency", "Moneda de la misión")} 
      />

      {currency && (
        <AppStack direction="horizontal" gap="xs" style={{ marginTop: SPACING.xs }}>
          <AppBadge
            label={currency.code}
            status="info"
            variant="subtle"
            style={{ paddingHorizontal: SPACING.xs, paddingVertical: 2 }}
          />
          <AppBadge
            label={currency.symbol}
            status="neutral"
            variant="subtle"
            style={{ paddingHorizontal: SPACING.xs, paddingVertical: 2 }}
          />
        </AppStack>
      )}
    </AppStack>
  );
}