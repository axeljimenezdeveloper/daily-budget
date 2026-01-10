import React from "react"; // React core for component logic
import { Pressable, ViewStyle, StyleProp } from "react-native"; // Native components and types
import { AppPressableProps } from "./index.props"; // Property interfaces

export default function AppPressable({
  children,
  onPress,
  style,
  disabled = false,
}: AppPressableProps) {
  return (
    <Pressable
      onPress={onPress} // Triggers the action on press
      disabled={disabled} // Disables interaction if prop is true
      style={({ pressed }): StyleProp<ViewStyle> => [
        style, // Applies base custom styles
        { opacity: pressed ? 0.8 : 1 }, // Reduces opacity on press for visual feedback 
        pressed ? { transform: [{ scale: 0.98 }] } : {}, // Subtle shrink effect on press 
        disabled && { opacity: 0.5 }, // Faded look when disabled 
      ]}
    >
      {children}
    </Pressable>
  );
}