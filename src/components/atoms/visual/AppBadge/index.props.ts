import { ViewStyle, StyleProp } from "react-native"; // Native styling types
import { STATE_COLORS } from "./index.utils"; // Semantic state colors

export interface AppBadgeProps {
  label: string; // The short text to display inside the badge
  status?: keyof typeof STATE_COLORS; // Semantic status (success, error, warning, info, neutral)
  variant?: "filled" | "subtle"; // Visual style: solid background or translucent
  style?: StyleProp<ViewStyle>; // Optional style overrides for the container
}