import React from "react";
import { View } from "react-native";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";
import { AppDividerProps } from "./index.props";
import { styles } from "./index.styles";

export default function AppDivider({
  color = "darkBorder",
  thickness = 1,
  marginVertical = "m",
  width = "100%",
  borderRadius = 0,
  alignSelf = "center",
  marginHorizontal,
}: AppDividerProps) {
  
  const getColor = () => {
    // Si es una clave predefinida de DividerColor original
    if (color === "darkBorder" || color === "slateGray" || color === "nightBlue") {
      return PALETTE[color];
    }
    // Si es una clave de PALETTE
    if (color in PALETTE) {
      return PALETTE[color as keyof typeof PALETTE];
    }
    // Si es un string de color directo (hex, rgb, etc.)
    return color;
  };

  const dynamicStyle = {
    backgroundColor: getColor(),
    height: thickness,
    marginVertical: SPACING[marginVertical],
    width: typeof width === "number" ? width : width,
    borderRadius,
    alignSelf,
    ...(marginHorizontal && { marginHorizontal: SPACING[marginHorizontal] }),
  };

  return <View style={[styles.base, dynamicStyle]} />;
}