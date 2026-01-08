import React from "react"; // Core React library
import { View } from "react-native"; // Native container component
import { SPACING } from "@/constants/metrics"; // Standardized spacing
import { AppCardProps } from "./index.props"; // Interface definitions
import { styles } from "./index.styles"; // Static styles

export default function AppCard({
  children,
  padding = "m", // Defaults to 16px padding
  style,
}: AppCardProps) {
  return (
    <View 
      style={[
        styles.container, 
        { padding: SPACING[padding] }, // Dynamic padding based on props
        style
      ]}
    >
      {children}
    </View>
  );
}