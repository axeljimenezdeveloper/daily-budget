import React from "react"; // React core for component definition
import { ActivityIndicator, View } from "react-native"; // Standard loading and view components
import { PALETTE } from "@/constants/colors"; // Global color constants
import { AppSpinnerProps } from "./index.props"; // Interface for component props

export default function AppSpinner({
  size = "m", // Sets medium as the default size
  color = PALETTE.sunsetOrange, // Uses brand orange for active state feedback
  style,
}: AppSpinnerProps) {
  
  // Maps our semantic sizes to ActivityIndicator's internal string values
  const nativeSize = size === "s" ? "small" : size === "l" ? "large" : "small";

  return (
    <View style={style}>
      <ActivityIndicator 
        size={nativeSize} // Renders the appropriate native scale
        color={color} // Renders the brand or custom hex color
      />
    </View>
  );
}