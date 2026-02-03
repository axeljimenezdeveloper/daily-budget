import React from "react";
import { useTranslation } from "react-i18next";
import AppStack from "@/components/atoms/structure/AppStack";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppText from "@/components/atoms/content/AppText";
import AppBadge from "@/components/atoms/visual/AppBadge";
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

export default function SetupHeader() {
  const { t } = useTranslation();

  return (
    <AppStack align="center" gap="m" style={{ marginTop: SPACING.xl }}>
      <AppStack
        style={{
          backgroundColor: `${PALETTE.sunsetOrange}10`,
          padding: SPACING.m,
          borderRadius: BORDER_RADIUS.round,
          width: 80,
          height: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppIcon
          name="rocket-outline"
          library="Ionicons"
          size="xxl"
          color="accent"
        />
      </AppStack>
      <AppText variant="h1">
        {t("setup.title", "Configuración")}
      </AppText>
      <AppText variant="body" color="secondary">
        {t("setup.subtitle", "Define tus suministros básicos.")}
      </AppText>

      <AppBadge
        label={t("setup.initial_configuration", "CONFIGURACIÓN INICIAL")}
        status="accent"
        variant="subtle"
        style={{ marginTop: SPACING.xs }}
      />
    </AppStack>
  );
}