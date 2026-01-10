import { PALETTE } from "@/constants/colors"; // Global theme palette

// Specific color mapping for the Switch component states
export const SWITCH_COLORS = {
  activeTrack: PALETTE.sunsetOrange, // Track color when active
  inactiveTrack: PALETTE.slateGray, // Track color when inactive
  thumb: PALETTE.creamWhite, // Color of the sliding circular button
  disabledThumb: PALETTE.lightGray, // Handle color for the disabled state
};