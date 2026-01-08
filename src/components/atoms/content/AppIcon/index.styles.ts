import { PALETTE } from "@/constants/colors"; // Global color palette

// Semantic mapping for icons to ensure visual hierarchy and theme compliance
export const ICON_COLORS = {
  primary: PALETTE.creamWhite,   // Main color for icons on dark backgrounds
  secondary: PALETTE.lightGray,  // For decorative or disabled-state icons
  accent: PALETTE.sunsetOrange,  // Highlight color for interactive icons
  success: PALETTE.successGreen, // Positive state icons (income, checkmarks)
  error: PALETTE.errorRed,       // Critical state icons (expenses over limit, alerts)
  info: PALETTE.infoBlue,        // Neutral category icons (transport, housing)
};