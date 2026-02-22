// ============================================================================
// COMPONENTE TOAST - Versión modularizada
// ============================================================================

import React from "react";
import AppPressable from "@/components/atoms/action/AppPressable";
import { SPACING, SIZES } from "@/constants/metrics";
import AppBox from "@/components/atoms/structure/AppBox";
import AppText from "@/components/atoms/content/AppText";
import AppIcon from "@/components/atoms/content/AppIcon";
import { AppToastProps } from "./index.props";
import { VARIANT_COLORS, VARIANT_ICONS } from "./index.utils";
import { styles } from "./index.styles";

export const AppToast: React.FC<AppToastProps> = ({
  variant,
  title,
  description,
  onClose,
}) => {
  const accentColor = VARIANT_COLORS[variant];
  const iconName = VARIANT_ICONS[variant];

  return (
    <AppBox
      direction="row"
      align="center"
      paddingVertical="m"
      paddingHorizontal="l"
      background="nightBlue"
      radius="xl"
    >
      {/* Ícono circular */}
      <AppBox
        style={{ width: SIZES.xl, height: SIZES.xl }}
        radius="round"
        background={accentColor}
        align="center"
        justify="center"
        marginRight="m"
      >
        <AppIcon name={iconName} size="l" color="primary" />
      </AppBox>

      {/* Contenido de texto */}
      <AppBox flex={1}>
        <AppText variant="body" color="primary">
          {title || " "}
        </AppText>
        {description ? (
          <AppText variant="caption" color="secondary">
            {description}
          </AppText>
        ) : null}
      </AppBox>

      {/* Botón de cierre */}
      {onClose && (
        <AppPressable
          onPress={onClose}
          throttleMs={300}
          style={{ padding: SPACING.xs, marginLeft: SPACING.s }}
        >
          <AppIcon name="close" size="m" color="secondary" />
        </AppPressable>
      )}
    </AppBox>
  );
};