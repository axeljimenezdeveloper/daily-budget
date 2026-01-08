import React from "react"; // Core React library
import { View, ViewStyle } from "react-native"; // Native layout component
import { SPACING } from "@/constants/metrics"; // Spacing constants
import { AppStackProps } from "./index.props"; // Component properties

export default function AppStack({
  children,
  direction = "vertical", // Defaults to vertical column
  gap, // Optional gap between elements
  align, // Flex alignment
  justify, // Flex justification
  fullWidth = true, // Common default for mobile layouts
  style, // External style overrides
}: AppStackProps) {
  
  // Logical mapping of props to Flexbox styles
  const stackStyle: ViewStyle = {
    flexDirection: direction === "vertical" ? "column" : "row", // Sets the axis
    gap: gap ? SPACING[gap] : undefined, // Applies gap from metrics system
    alignItems: align, // Align items along the cross axis
    justifyContent: justify, // Distribute items along the main axis
    width: fullWidth ? "100%" : undefined, // Responsive width control
  };

  return <View style={[stackStyle, style]}>{children}</View>;
}