// ============================================================================
// BOTÓN REUTILIZABLE - AppButton
//
// Componente de botón con dos variantes (filled, outline) y múltiples estados
// semánticos. Utiliza AppPressable como base para feedback táctil y AppText
// para la tipografía, manteniendo la consistencia del sistema de diseño.
// ============================================================================

import React from "react";
import { ViewStyle } from "react-native";
import { ANIMATION } from "@/constants/animations"; // ← Importamos constante global
import AppPressable from "../AppPressable";
import AppText from "../../content/AppText";
import { AppButtonProps } from "./index.props";
import { styles } from "./index.styles";
import { STATE_COLORS, getLightColor } from "./index.utils";

export default function AppButton({
  children,
  onPress,
  variant = "filled",
  status = "neutral",
  disabled = false,
  style,
  fullWidth = false,
  throttleMs = ANIMATION.DEFAULT_PRESS_THROTTLE_MS, // ← Valor por defecto
}: AppButtonProps) {
  const mainColor = STATE_COLORS[status];

  // Estilos del contenedor
  const containerStyle: ViewStyle[] = [styles.base];

  if (variant === "filled") {
    containerStyle.push({
      backgroundColor: mainColor,
      borderWidth: 0,
    });
  } else {
    containerStyle.push({
      backgroundColor: getLightColor(mainColor),
      borderWidth: 2,
      borderColor: mainColor,
    });
  }

  if (fullWidth) {
    containerStyle.push({ width: "100%" } as ViewStyle);
  }

  if (style) {
    containerStyle.push(style);
  }

  // Color del texto: blanco para filled, color principal para outline
  const textColor = variant === "filled" ? "#FFFFFF" : mainColor;

  return (
    <AppPressable
      onPress={onPress}
      disabled={disabled}
      style={containerStyle}
      throttleMs={throttleMs}
      hapticFeedback="light"
    >
      <AppText variant="body" style={[styles.text, { color: textColor }]}>
        {children}
      </AppText>
    </AppPressable>
  );
}