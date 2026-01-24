import React from "react";

import AppBox from "../../structure/AppBox"; 
import AppText from "../../content/AppText";
import AppIcon from "../../content/AppIcon";
import AppPressable from "../AppPressable";

import { AppListItemProps } from "./index.props";
import { getStyleHelpers } from "./index.utils";

export default function AppListItem({
  label,
  onPress,
  subLabel,
  icon,
  rightContent,
  isActive = false,
  disabled = false,
  background,
  activeBackground = "nightBlue",
  padding = "m",
  style,
}: AppListItemProps) {
  
  const { currentBackground, iconColor, textColor } = getStyleHelpers({
    isActive,
    background,
    activeBackground,
  });

  return (
    <AppPressable onPress={onPress} disabled={disabled}>
      <AppBox
        direction="row"
        align="center"
        padding={padding}
        background={currentBackground}
        radius="m"
        gap="m"
        style={style}
      >
        {icon && <AppIcon name={icon} color={iconColor} />}

        <AppBox flex={1} gap="xs">
          <AppText variant="body" color={textColor}>
            {label}
          </AppText>
          
          {subLabel && (
            <AppText variant="caption" color="secondary">
              {subLabel}
            </AppText>
          )}
        </AppBox>

        {rightContent && <AppBox>{rightContent}</AppBox>}
      </AppBox>
    </AppPressable>
  );
}