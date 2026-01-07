import React from "react"; // Core React library for component logic
import { View } from "react-native"; // Fundamental UI component
import { PALETTE } from "@/constants/colors"; // Application color constants
import { SPACING } from "@/constants/metrics"; // Design system spacing metrics
import { AppDividerProps } from "./index.props"; // Component properties interface
import { styles } from "./index.styles"; // Static styles

export default function AppDivider({
  color = "darkBorder", // Default subtle divider color
  thickness = 1, // Standard thin weight
  marginVertical = "m", // Default 16px spacing
}: AppDividerProps) {
  
  // Dynamic styles constrained by the defined types
  const dynamicStyle = {
    backgroundColor: PALETTE[color], // Sets color from the restricted palette
    height: thickness, // Sets the restricted thickness
    marginVertical: SPACING[marginVertical], // Applies the standardized vertical gap
  };

  return <View style={[styles.base, dynamicStyle]} />;
}