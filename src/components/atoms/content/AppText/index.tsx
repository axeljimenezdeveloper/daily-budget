import React from "react"; // Core React library for component logic
import { Text } from "react-native"; // Native text component from React Native
import { AppTextProps } from "./index.props"; // Component properties definition
import { TEXT_ALIGNMENT, TEXT_COLORS, TEXT_VARIANTS } from "./index.styles"; // Semantic constants for visual mapping

export default function AppText({ 
  variant = "body", // Default typographic style from your mapping
  color = "primary", // Default text color based on your palette
  align = "left", // Default text alignment for layout control
  children, // Text content or nested components to be rendered
  style, // Optional custom style overrides from the parent component
}: AppTextProps) {
  
  // Logical object to merge the selected semantic styles
  const combinedStyles = [
    TEXT_VARIANTS[variant], // Applies font size, weight and line height
    { color: TEXT_COLORS[color] }, // Applies the semantic color from your palette
    { textAlign: TEXT_ALIGNMENT[align] }, // Applies the selected horizontal alignment
    style, // Allows custom overrides to take precedence
  ];

  return (
    <Text style={combinedStyles}>
      {children}
    </Text>
  );
}