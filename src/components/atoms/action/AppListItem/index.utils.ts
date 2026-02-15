import { PALETTE } from "@/constants/colors";
import { AppListItemProps } from "./index.props";

export interface StyleHelpers {
  currentBackground?: keyof typeof PALETTE;
  iconColor: "accent" | "secondary";
}

export function getStyleHelpers({
  isActive = false,
  background,
  activeBackground = "nightBlue",
}: Pick<
  AppListItemProps,
  "isActive" | "background" | "activeBackground"
>): StyleHelpers {
  return {
    currentBackground: isActive ? activeBackground : background,
    iconColor: isActive ? "accent" : "secondary",
  };
}
