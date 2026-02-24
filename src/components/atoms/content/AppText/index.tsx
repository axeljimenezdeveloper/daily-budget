import React from "react";
import { Text } from "react-native";
import { AppTextProps } from "./index.props";
import { TEXT_ALIGNMENT, TEXT_COLORS, TEXT_VARIANTS } from "./index.styles";

export default function AppText({
  variant = "body",
  color = "primary",
  align = "left",
  children,
  style,
  adjustsFontSizeToFit,
  numberOfLines,
}: AppTextProps) {
  const combinedStyles = [
    TEXT_VARIANTS[variant],
    { color: TEXT_COLORS[color] },
    { textAlign: TEXT_ALIGNMENT[align] },
    style,
  ];

  return (
    <Text
      style={combinedStyles}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}