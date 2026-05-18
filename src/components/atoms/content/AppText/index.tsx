// ============================================================================
// COMPONENTE DE TEXTO REUTILIZABLE - AppText
//
// Wrapper del componente Text de React Native que aplica los tokens de diseño
// de la aplicación: variantes tipográficas, colores semánticos, alineación,
// y soporta truncado con numberOfLines y ellipsizeMode.
// ============================================================================

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
  ellipsizeMode,
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
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
}