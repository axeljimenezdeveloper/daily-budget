import React from "react";
import * as Icons from "@expo/vector-icons";
import { SIZES } from "@/constants/metrics"; 
import { AppIconProps } from "./index.props";
import { ICON_COLORS } from "./index.styles";

export default function AppIcon({
  name,
  library = "Ionicons",
  size = "m", 
  color = "primary",
  style,
}: AppIconProps) {
  
  const IconComponent = (Icons as any)[library];

  if (!IconComponent) {
    console.warn(`Icon library ${library} is not available.`);
    return null;
  }

  return (
    <IconComponent
      name={name}
      size={SIZES[size]}
      color={ICON_COLORS[color]}
      style={style}
    />
  );
}