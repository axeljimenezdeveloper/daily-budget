import React from "react";
import { Pressable, ViewStyle, StyleProp } from "react-native";
import { AppPressableProps } from "./index.props";

export default function AppPressable({
  children,
  onPress,
  style,
  disabled = false,
}: AppPressableProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }): StyleProp<ViewStyle> =>
        [
          style,
          { opacity: pressed ? 0.8 : 1 },
          pressed && { transform: [{ scale: 0.98 }] },
          disabled && { opacity: 0.5 },
        ].filter(Boolean) as StyleProp<ViewStyle>
      }
    >
      {children}
    </Pressable>
  );
}