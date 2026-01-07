import React from "react"; // Core React library for component logic
import { Pressable, Text, ViewStyle, TextStyle } from "react-native"; // Native components and type definitions
import { AppButtonProps } from "./index.props"; // Component properties interface
import { styles } from "./index.styles"; // Static styles for the button
import { STATE_COLORS, getLightColor } from "./index.utils"; // Utility constants and functions

export default function AppButton({
  children,
  onPress,
  variant = "filled", // Default visual appearance
  status = "neutral", // Default semantic color
  disabled,
}: AppButtonProps) {
  
  const mainColor = STATE_COLORS[status]; // Retrieves the primary color based on status
  
  // Dynamic style arrays for container and text
  const containerStyle: ViewStyle[] = [styles.base];
  const textStyle: TextStyle[] = [styles.text];

  // Logic to apply variant-specific styling
  if (variant === "filled") {
    containerStyle.push({
      backgroundColor: mainColor, // Solid background color
      borderWidth: 0, // No border for filled variant
    });
    textStyle.push({ color: "#FFFFFF" }); // White text for contrast on solid backgrounds
  } else {
    containerStyle.push({
      backgroundColor: getLightColor(mainColor), // Translucent background for outline variant
      borderWidth: 2, // Visible border width
      borderColor: mainColor, // Border matches the semantic color
    });
    textStyle.push({ color: mainColor }); // Text matches the semantic color
  }

  return (
    <Pressable 
      onPress={onPress} 
      disabled={disabled} 
      style={({ pressed }) => [
        containerStyle, // Base and variant-specific styles
        disabled && { opacity: 0.5 }, // Reduced opacity when disabled
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] } // Feedback animation on press
      ]}
    >
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
}