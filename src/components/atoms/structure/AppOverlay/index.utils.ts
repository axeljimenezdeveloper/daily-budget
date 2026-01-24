import { PALETTE } from "@/constants/colors";

export const getBackgroundColor = (color?: string): string => {
  const defaultColor = "rgba(0,0,0,0.7)";
  if (!color) return defaultColor;

  return color.startsWith("#") || color.startsWith("rgba")
    ? color
    : (PALETTE[color as keyof typeof PALETTE] || defaultColor);
};