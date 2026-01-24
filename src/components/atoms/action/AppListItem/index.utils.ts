import { PALETTE } from "@/constants/colors";
import { AppListItemProps } from "./index.props";

export interface StyleHelpers {
  currentBackground?: keyof typeof PALETTE;
  iconColor: "accent" | "secondary";
  textColor: "primary" | "secondary";
}

export function getStyleHelpers({
  isActive = false,
  background,
  activeBackground = "nightBlue",
}: Pick<AppListItemProps, 'isActive' | 'background' | 'activeBackground'>): StyleHelpers {
  return {
    currentBackground: isActive ? activeBackground : background,
    iconColor: isActive ? "accent" : "secondary",
    textColor: isActive ? "primary" : "secondary",
  };
}