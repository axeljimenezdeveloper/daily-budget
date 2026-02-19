// ============================================================================
// ETIQUETA INTERACTIVA - AppTag
//
// Componente visual tipo tag o badge con soporte para interacción:
// - Presión principal (onPress) para seleccionar/filtrar.
// - Botón de eliminación (onRemove) para quitar la etiqueta.
// Utiliza AppPressable en ambas zonas para feedback táctil unificado.
// Ahora incluye throttling para evitar pulsaciones duplicadas.
// ============================================================================

import React from "react";
import { PALETTE } from "@/constants/colors";
import { ANIMATION } from "@/constants/animations"; // ← Importamos constante global
import AppText from "../../content/AppText";
import AppIcon from "../../content/AppIcon";
import AppPressable from "../../action/AppPressable";
import { AppTagProps } from "./index.props";
import { styles } from "./index.styles";
import { STATE_COLORS, getLightColor } from "./index.utils";

export default function AppTag({
  label,
  variant = "neutral",
  active = false,
  onPress,
  onRemove,
  style,
  throttleMs = ANIMATION.DEFAULT_PRESS_THROTTLE_MS, // ← Valor por defecto
}: AppTagProps) {
  const baseColor = STATE_COLORS[variant];
  const backgroundColor = active ? baseColor : getLightColor(baseColor);
  const textColor = active ? PALETTE.creamWhite : baseColor;

  return (
    <AppPressable
      onPress={onPress || (() => {})}
      disabled={!onPress}
      style={[
        styles.container,
        { backgroundColor, borderColor: baseColor },
        style,
      ]}
      throttleMs={throttleMs} // ← Aplicamos throttle al área principal
    >
      <AppText
        variant="caption"
        style={{ color: textColor, fontWeight: active ? "700" : "500" }}
      >
        {label}
      </AppText>

      {onRemove && (
        <AppPressable
          onPress={onRemove}
          style={{ marginLeft: 6 }}
          throttleMs={throttleMs} // ← Mismo throttle para el botón de eliminar
        >
          <AppIcon
            name="close"
            size="xs"
            color={active ? "primary" : "secondary"}
          />
        </AppPressable>
      )}
    </AppPressable>
  );
}