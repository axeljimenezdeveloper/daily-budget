import React from "react"; // React core logic
import { View } from "react-native"; // Native layout component
import { AppBadgeProps } from "./index.props"; // Component properties
import { styles } from "./index.styles"; // Static styles
import { getLightColor, STATE_COLORS } from "./index.utils"; // Utility constants and functions
import AppText from "@/components/atoms/content/AppText"; // Typography atom 


export default function AppBadge({
  label,
  status = "neutral", // Defaults to neutral gray 
  variant = "subtle", // Defaults to translucent for a more elegant look
  style,
}: AppBadgeProps) {
  // Selects the main color based on the semantic status
  const mainColor = STATE_COLORS[status]; 
  
  // Logic for dynamic background color based on variant 
  const backgroundColor = variant === "filled" ? mainColor : getLightColor(mainColor);
  
  // Logic for text color: white for solid backgrounds, status color for subtle backgrounds 
  const textColor = variant === "filled" ? "primary" : (status as any);

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <AppText variant="label" color={textColor}>
        {label.toUpperCase()} {/* Consistent uppercase for badges */}
      </AppText>
    </View>
  );
}