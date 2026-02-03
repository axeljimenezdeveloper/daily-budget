import React from "react";
import { useTranslation } from "react-i18next"; 
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import AppProgressBar from "@/components/atoms/visual/AppProgressBar";
import { SPACING } from "@/constants/metrics";
import { SetupProgressProps } from "./index.props";

export default function SetupProgress({ formCompletion }: SetupProgressProps) {
  const { t } = useTranslation(); 

  return (
    <AppStack gap="s" style={{ marginBottom: SPACING.l }}>
      <AppStack direction="horizontal" justify="space-between">
        <AppText variant="caption" color="secondary">
          {t("setup.completion", "Completado")} 
        </AppText>
        <AppText variant="caption" color="accent">
          {Math.round(formCompletion * 100)}%
        </AppText>
      </AppStack>
      <AppProgressBar
        progress={formCompletion}
        status={formCompletion === 1 ? "success" : "info"}
        height={6}
      />
    </AppStack>
  );
}