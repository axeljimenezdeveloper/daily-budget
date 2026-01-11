import React from "react";
import { View } from "react-native";
// Atomic components and design tokens
import AppText from "../AppText";
import { AppTooltipProps } from "./index.props";
import { styles } from "./index.styles";
import { PALETTE } from "@/constants/colors";

export default function AppTooltip({
  text,
  visible,
  position = "top", // Defaulting to top placement
  style,
}: AppTooltipProps) {
  // Early return if component is hidden
  if (!visible) return null;

  // Logic to adjust arrow orientation based on placement
  const arrowStyle = position === "top" 
    ? { bottom: -6, borderTopWidth: 6, borderTopColor: PALETTE.darkBorder, alignSelf: 'center' as const } 
    : { top: -6, borderBottomWidth: 6, borderBottomColor: PALETTE.darkBorder, alignSelf: 'center' as const };

  return (
    // Dynamic position calculation relative to target
    <View style={[styles.container, position === "top" ? { bottom: "110%" } : { top: "110%" }, style]}>
      {/* Informative text using caption variant */}
      <AppText variant="caption" color="primary">
        {text}
      </AppText>
      {/* Visual arrow indicator pointing to the trigger */}
      <View style={[styles.arrow, arrowStyle]} />
    </View>
  );
}