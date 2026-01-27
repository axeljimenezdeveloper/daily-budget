import React from "react";
import { View } from "react-native";
import { SIZES, SPACING } from "@/constants/metrics";
import { PALETTE } from "@/constants/colors";
import { AppProgressDotsProps } from "./index.props";
import { styles } from "./index.styles";
import { validateCurrentIndex, getSafeColor } from "./index.utils";

export default function AppProgressDots({
  total,
  current,
  size = "m", 
  spacing = "m", 
  activeColor = PALETTE.sunsetOrange,
  inactiveColor = PALETTE.slateGray,
  style,
  inactiveOpacity = 0.5,
}: AppProgressDotsProps) {
  
  // Validaciones
  const safeTotal = Math.max(0, total);
  const safeCurrent = validateCurrentIndex(current, safeTotal);
  const safeActiveColor = getSafeColor(activeColor, PALETTE.sunsetOrange);
  const safeInactiveColor = getSafeColor(inactiveColor, PALETTE.slateGray);
  
  // Obtener dimensiones de SIZES para tamaño y SPACING para espaciado
  const dotSize = SIZES[size];
  const dotSpacing = SPACING[spacing];
  
  // Si no hay puntos o total es 0, no renderizar
  if (safeTotal === 0) return null;
  
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: safeTotal }).map((_, index) => {
        const isActive = index === safeCurrent;
        
        return (
          <View
            key={`dot-${index}`}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                backgroundColor: isActive ? safeActiveColor : safeInactiveColor,
                opacity: isActive ? 1 : inactiveOpacity,
                marginHorizontal: index < safeTotal - 1 ? dotSpacing / 2 : 0,
                marginLeft: index === 0 ? 0 : dotSpacing / 2,
                marginRight: index === safeTotal - 1 ? 0 : dotSpacing / 2,
              },
            ]}
          />
        );
      })}
    </View>
  );
}