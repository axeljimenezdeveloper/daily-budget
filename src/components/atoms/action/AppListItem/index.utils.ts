import { PALETTE } from "@/constants/colors";
import { AppListItemProps } from "./index.props";

export interface StyleHelpers {
  currentBackground?: keyof typeof PALETTE;
  iconColor: "primary" | "secondary" | "accent" | "success" | "error" | "info";
}

export function getStyleHelpers({
  isActive = false,
  background,
  activeBackground = "nightBlue",
  iconColor: customIconColor,
}: Pick<
  AppListItemProps,
  "isActive" | "background" | "activeBackground" | "iconColor"
>): StyleHelpers {
  return {
    currentBackground: isActive ? activeBackground : background,
    iconColor: customIconColor ?? (isActive ? "accent" : "secondary"),
  };
}