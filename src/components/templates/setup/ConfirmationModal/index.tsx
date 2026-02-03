import React from "react";
import { useTranslation } from "react-i18next"; 
import AppModal from "@/components/atoms/structure/AppModal";
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import AppButton from "@/components/atoms/action/AppButton";
import { formatMoney } from "@/store/useVaultStore/index.utils";
import { ConfirmationModalProps } from "./index.props";

export default function ConfirmationModal({
  isOpen,
  onClose,
  numericBudget,
  actualDays,
  dailyBudget,
  currency,
  executeSetup,
}: ConfirmationModalProps) {
  const { t } = useTranslation(); 

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("setup.confirmation_title", "¿Todo listo?")}
    >
      <AppStack gap="m">
        <AppText align="center">
          {t("setup.confirmation_message", "Iniciarás con {{amount}} para {{days}} días.", { 
            amount: formatMoney(numericBudget, currency.symbol),
            days: actualDays
          })}
        </AppText>
        <AppText variant="h3" color="accent" align="center">
          {t("setup.confirmation_daily", "Diario: {{amount}}", {
            amount: formatMoney(dailyBudget, currency.symbol)
          })}
        </AppText>
        <AppButton onPress={executeSetup} status="accent">
          <AppText>
            {t("setup.confirm", "CONFIRMAR")}
          </AppText>
        </AppButton>
      </AppStack>
    </AppModal>
  );
}