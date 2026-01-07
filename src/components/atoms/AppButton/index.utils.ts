import { PALETTE } from "@/constants/colors"; // Global color palette

// Mapping of semantic statuses to the application's global palette
export const STATE_COLORS = {
  success: PALETTE.successGreen, // Green color for positive actions
  error: PALETTE.errorRed, // Red color for destructive or error actions
  warning: PALETTE.warningOrange, // Orange color for cautionary states
  info: PALETTE.infoBlue, // Blue color for informative actions
  neutral: PALETTE.slateGray, // Gray color for secondary or neutral states
};

// Generates a light version of a hex color by adding 15% transparency (hex 26)
export const getLightColor = (hex: string): string => `${hex}26`;