import React from "react";
import { View } from "react-native";
// Brand constants and atomic UI components
import { PALETTE } from "@/constants/colors";
import AppPressable from "../AppPressable"; 
import AppText from "../../content/AppText";
import AppIcon from "../../content/AppIcon"; 
// Component local assets
import { AppSelectProps } from "./index.props";
import { styles } from "./index.styles";

export default function AppSelect({
  value,
  label,
  placeholder = "Select...", // Localized default placeholder
  onPress,
  error,
  disabled = false,
  width = "100%",
  style,
}: AppSelectProps) {
  return (
    <View style={[styles.container, { width }, style]}>
      {/* Field Label - Rendered only if provided */}
      {label && (
        <AppText variant="label" color="secondary">
          {label}
        </AppText>
      )}
      
      {/* Selection Trigger Area */}
      <AppPressable 
        onPress={onPress} 
        disabled={disabled}
        style={[
          styles.field, 
          { 
            // Visual state feedback: error > normal
            borderColor: error ? PALETTE.errorRed : PALETTE.darkBorder,
            opacity: disabled ? 0.5 : 1 
          }
        ]}
      >
        {/* Dynamic text color based on selection status */}
        <AppText variant="body" color={value ? "primary" : "secondary"}>
          {value || placeholder}
        </AppText>
        
        {/* Visual indicator for dropdown/selection */}
        <AppIcon 
          name="chevron-down" 
          size="s" 
          color="secondary" 
        />
      </AppPressable>

      {/* Validation message display */}
      {error && (
        <AppText variant="caption" style={{ color: PALETTE.errorRed }}>
          {error}
        </AppText>
      )}
    </View>
  );
}