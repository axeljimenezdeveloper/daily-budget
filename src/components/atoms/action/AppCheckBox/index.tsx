import React from "react"; // React core library
import { View } from "react-native"; // Standard layout components
import { PALETTE } from "@/constants/colors"; // Application color tokens
import AppPressable from "../AppPressable"; // Custom interaction atom
import AppIcon from "../../content/AppIcon"; // Vector icon atom
import AppText from "../../content/AppText"; // Standard typography atom
import { AppCheckBoxProps } from "./index.props"; // Property interfaces
import { styles } from "./index.styles"; // Static style definitions

export default function AppCheckBox({
  value,
  onValueChange,
  label,
  disabled = false,
  style,
}: AppCheckBoxProps) {
  // Logic to handle the press event if not disabled
  const handlePress = () => !disabled && onValueChange(!value);

  // Dynamic colors based on checked and disabled states
  const activeColor = PALETTE.sunsetOrange; // Accent color for active state
  const borderColor = value ? activeColor : PALETTE.darkBorder; // Border color logic
  const backgroundColor = value ? activeColor : "transparent"; // Fill color logic

  return (
    <AppPressable 
      onPress={handlePress} 
      disabled={disabled} 
      style={[styles.container, style]}
    >
      <View 
        style={[
          styles.box, 
          { borderColor, backgroundColor, opacity: disabled ? 0.5 : 1 }
        ]}
      >
        {value && (
          <AppIcon 
            name="checkmark" 
            size="s" 
            color="primary" // Renders white checkmark on orange background
          />
        )}
      </View>
      
      {label && (
        <AppText 
          variant="body" 
          color={disabled ? "secondary" : "primary"}
          style={styles.label}
        >
          {label}
        </AppText>
      )}
    </AppPressable>
  );
}