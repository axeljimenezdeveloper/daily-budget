import React from "react";
import { useTranslation } from "react-i18next"; 
import AppButton from "@/components/atoms/action/AppButton";
import AppSpinner from "@/components/atoms/visual/AppSpinner";
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import { SPACING } from "@/constants/metrics";
import { ActionSectionProps } from "./index.props";

export default function ActionSection({
  formCompletion,
  isProcessing,
  validateForm,
  setShowConfirmation,
}: ActionSectionProps) {
  const { t } = useTranslation(); 

  return (
    <AppButton
      onPress={() => (validateForm() ? setShowConfirmation(true) : null)}
      status={formCompletion === 1 ? "success" : "accent"}
      disabled={isProcessing || formCompletion !== 1}
      style={{ marginBottom: SPACING.xxl }}
    >
      {isProcessing ? (
        <AppSpinner size="s" />
      ) : (
        <AppStack
          direction="horizontal"
          align="center"
          gap="s"
          justify="center"
        >
          <AppText style={{ fontWeight: "800" }}>
            {formCompletion === 1
              ? t("setup.start_mission", "INICIAR MISIÓN") 
              : t("setup.complete_configuration", "COMPLETA LA CONFIGURACIÓN")} 
          </AppText>
        </AppStack>
      )}
    </AppButton>
  );
}