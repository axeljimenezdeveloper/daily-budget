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
  iconColor: customIconColor,
  rightContent,
  isActive = false,
  disabled = false,
  background,
  activeBackground = "nightBlue",
  padding = "m",
  style,
}: AppListItemProps) {
  
  const { currentBackground, iconColor } = getStyleHelpers({
    isActive,
    background,
    activeBackground,
    iconColor: customIconColor,
  });

  const content = (
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
        <AppText variant="body" color="primary">
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
  );

  if (!onPress) {
    return content;
  }

  return (
    <AppPressable onPress={onPress} disabled={disabled}>
      {content}
    </AppPressable>
  );
}