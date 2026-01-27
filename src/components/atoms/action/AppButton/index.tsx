import React from "react";
import { Pressable, Text, ViewStyle, TextStyle } from "react-native";
import { AppButtonProps } from "./index.props";
import { styles } from "./index.styles";
import { STATE_COLORS, getLightColor } from "./index.utils";

export default function AppButton({
  children,
  onPress,
  variant = "filled",
  status = "neutral",
  disabled,
  style, // Nueva prop
}: AppButtonProps) {
  
  const mainColor = STATE_COLORS[status];
  
  // Dynamic style arrays for container and text
  const containerStyle: ViewStyle[] = [styles.base];
  const textStyle: TextStyle[] = [styles.text];

  // Logic to apply variant-specific styling
  if (variant === "filled") {
    containerStyle.push({
      backgroundColor: mainColor,
      borderWidth: 0,
    });
    textStyle.push({ color: "#FFFFFF" });
  } else {
    containerStyle.push({
      backgroundColor: getLightColor(mainColor),
      borderWidth: 2,
      borderColor: mainColor,
    });
    textStyle.push({ color: mainColor });
  }

  return (
    <Pressable 
      onPress={onPress} 
      disabled={disabled} 
      style={({ pressed }) => [
        containerStyle, // Estilos base y de variante
        style, // ✅ Estilos personalizados (nueva prop)
        disabled && { opacity: 0.5 },
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
      ]}
    >
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
}