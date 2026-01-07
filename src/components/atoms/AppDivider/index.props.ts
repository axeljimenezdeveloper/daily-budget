import { SPACING } from "@/constants/metrics"; // Standardized spacing system

// Restricted selection of colors that make sense for a divider
export type DividerColor = "darkBorder" | "slateGray" | "nightBlue";

// Predefined thickness levels to avoid arbitrary pixel values
export type DividerThickness = 0.5 | 1 | 2;

export interface AppDividerProps {
  color?: DividerColor; // Controlled color selection
  thickness?: DividerThickness; // Restricted line weight
  marginVertical?: keyof typeof SPACING; // Vertical margin from the metrics scale
}