import React from "react";
// Brand palette and atomic components
import { PALETTE } from "@/constants/colors";
import AppText from "../../content/AppText";
import AppIcon from "../../content/AppIcon";
import AppPressable from "../../action/AppPressable";
import { AppTagProps } from "./index.props";
import { styles } from "./index.styles";
import { STATE_COLORS, getLightColor } from "./index.utils";

export default function AppTag({
  label,
  variant = "neutral", // Default semantic theme
  active = false, // Background intensity toggle
  onPress,
  onRemove,
  style,
}: AppTagProps) {
  // Determine core semantic color based on variant
  const baseColor = STATE_COLORS[variant];
  
  // Apply 15% transparency if not active, solid color if active
  const backgroundColor = active ? baseColor : getLightColor(baseColor);
  
  // Text color: pure white for solid backgrounds, base color for light backgrounds
  const textColor = active ? PALETTE.creamWhite : baseColor;

  return (
    <AppPressable
      // Ensures a valid function is always passed to the underlying pressable
      onPress={onPress || (() => {})} 
      // Functional and visual disabled state if no interaction is provided
      disabled={!onPress} 
      style={[
        styles.container,
        { backgroundColor, borderColor: baseColor },
        style
      ]}
    >
      {/* Label text with dynamic semantic coloring */}
      <AppText 
        variant="caption" 
        style={{ color: textColor, fontWeight: active ? "700" : "500" }}
      >
        {label}
      </AppText>

      {/* Render removal trigger only if callback is defined */}
      {onRemove && (
        <AppPressable 
          onPress={onRemove} 
          style={{ marginLeft: 6 }}
        >
          {/* Fix: Pass the color directly as a prop to AppIcon, not inside style */}
          <AppIcon 
            name="close" 
            size="xs" 
            color={active ? "primary" : "secondary"} // Standard mapping
          />
        </AppPressable>
      )}
    </AppPressable>
  );
}