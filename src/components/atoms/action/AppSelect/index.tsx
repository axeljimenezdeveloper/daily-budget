// ============================================================================
// SELECTOR PERSONALIZADO - AppSelect
//
// Componente que actúa como un campo de selección (dropdown). Al presionar,
// ejecuta onPress para abrir un modal o sheet de selección. Soporta etiqueta,
// placeholder, mensaje de error y estado deshabilitado.
// Ahora incluye throttling para evitar aperturas múltiples del modal.
// ============================================================================

import React from "react";
import { View } from "react-native";
import { PALETTE } from "@/constants/colors";
import { ANIMATION } from "@/constants/animations"; // ← Importamos constante global
import AppPressable from "../AppPressable";
import AppText from "../../content/AppText";
import AppIcon from "../../content/AppIcon";
import { AppSelectProps } from "./index.props";
import { styles } from "./index.styles";

export default function AppSelect({
  value,
  label,
  placeholder = "Select...",
  onPress,
  error,
  disabled = false,
  width = "100%",
  style,
  throttleMs = ANIMATION.DEFAULT_PRESS_THROTTLE_MS, // ← Valor por defecto
}: AppSelectProps) {
  return (
    <View style={[styles.container, { width }, style]}>
      {/* Etiqueta del campo */}
      {label && (
        <AppText variant="label" color="secondary">
          {label}
        </AppText>
      )}

      {/* Área presionable del selector */}
      <AppPressable
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.field,
          {
            borderColor: error ? PALETTE.errorRed : PALETTE.darkBorder,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
        throttleMs={throttleMs} // ← Pasamos la prop
      >
        <AppText variant="body" color={value ? "primary" : "secondary"}>
          {value || placeholder}
        </AppText>
        <AppIcon name="chevron-down" size="s" color="secondary" />
      </AppPressable>

      {/* Mensaje de error */}
      {error && (
        <AppText variant="caption" style={{ color: PALETTE.errorRed }}>
          {error}
        </AppText>
      )}
    </View>
  );
}