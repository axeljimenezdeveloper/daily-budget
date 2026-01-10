import { ViewStyle, StyleProp } from "react-native"; // Native styling types
import { STATE_COLORS } from "./index.utils"; // Semantic state colors

export interface AppProgressBarProps {
  progress: number; // Numeric value from 0 to 1 representing the percentage
  status?: keyof typeof STATE_COLORS; // Semantic color theme (success, error, etc.)
  height?: number; // Custom thickness for the bar (defaults to 8)
  style?: StyleProp<ViewStyle>; // Optional style overrides for the main container
}