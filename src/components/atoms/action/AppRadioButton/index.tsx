import React from "react"; // React core for component logic
import { View } from "react-native"; // Standard layout components
import { PALETTE } from "@/constants/colors"; // Color constants
import { STATE_COLORS } from "./index.utils"; // Semantic color mapping
import AppPressable from "../AppPressable"; // Interaction atom with scale effect
import AppText from "../../content/AppText"; // Typography atom
import { AppRadioButtonProps } from "./index.props"; // Component properties
import { styles } from "./index.styles"; // Static style definitions

export default function AppRadioButton({
  selected,
  onSelect,
  label,
  status = "info", // Defaults to infoBlue for standard selection
  disabled = false,
  style,
}: AppRadioButtonProps) {
  // Logic to handle selection if not disabled
  const handlePress = () => !disabled && onSelect();

  // Dynamic colors based on selection and status
  const activeColor = STATE_COLORS[status]; // Semantic color from palette
  const borderColor = selected ? activeColor : PALETTE.darkBorder; // Border color logic

  return (
    <AppPressable 
      onPress={handlePress} 
      disabled={disabled} 
      style={[styles.container, style, { opacity: disabled ? 0.5 : 1 }]}
    >
      <View style={[styles.outerCircle, { borderColor }]}>
        {selected && (
          <View style={[styles.innerDot, { backgroundColor: activeColor }]} />
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