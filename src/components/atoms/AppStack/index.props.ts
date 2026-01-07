import { ReactNode } from "react"; // Component children type
import { ViewStyle } from "react-native"; // Native style types
import { SPACING } from "@/constants/metrics"; // Global spacing system

export interface AppStackProps {
  children: ReactNode; // Elements to be stacked
  direction?: "vertical" | "horizontal"; // Stack orientation
  gap?: keyof typeof SPACING; // Spacing between children using your metrics
  align?: ViewStyle["alignItems"]; // Horizontal alignment
  justify?: ViewStyle["justifyContent"]; // Vertical alignment
  fullWidth?: boolean; // If the stack should take all available width
  style?: ViewStyle; // Custom style overrides
}