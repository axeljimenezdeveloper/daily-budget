import { ViewStyle } from "react-native"; // Type for native view styling

export interface AppSpinnerProps {
  size?: "s" | "m" | "l"; // Loading indicator size variant
  color?: string; // Hex color for the indicator (defaults to brand orange)
  style?: ViewStyle; // Optional container positioning styles
}