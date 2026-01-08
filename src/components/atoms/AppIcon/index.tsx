import React from "react"; // Core library for component logic
import * as Icons from "@expo/vector-icons"; // Multi-library vector icon provider
import { SPACING } from "@/constants/metrics"; // Access to standardized dimensions
import { AppIconProps } from "./index.props"; // Property definitions
import { ICON_COLORS } from "./index.styles"; // Semantic color mapping

export default function AppIcon({
  name,
  library = "Ionicons", // Defaults to Ionicons for a consistent look
  size = "m", // Standard medium size (16px)
  color = "primary", // Default high-contrast color
  style,
}: AppIconProps) {
  
  // Dynamic selection of the icon set component
  const IconComponent = (Icons as any)[library];

  // Error handling for development if an invalid library name is passed
  if (!IconComponent) {
    console.warn(`Icon library ${library} is not available.`);
    return null;
  }

  return (
    <IconComponent
      name={name}
      size={SPACING[size]} // Converts semantic size key to numeric value
      color={ICON_COLORS[color]} // Converts semantic color key to hex value
      style={style}
    />
  );
}