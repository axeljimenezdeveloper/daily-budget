import { ViewStyle, StyleProp, DimensionValue } from "react-native"; // Native types for layout and styling

export interface AppSkeletonProps {
  width?: DimensionValue; // Support for fixed numbers or percentage strings
  height?: DimensionValue; // Support for fixed numbers or percentage strings
  variant?: "rectangle" | "circle"; // Predefined shapes for placeholders
  style?: StyleProp<ViewStyle>; // Optional container style overrides
}