// ============================================================================
// RADIO BUTTON REUTILIZABLE - AppRadioButton
//
// Componente de radio button con etiqueta opcional. Utiliza AppPressable como base
// para garantizar feedback táctil consistente. Soporta modo fullWidth para
// que el área presionable ocupe todo el ancho del contenedor.
// ============================================================================

import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { PALETTE } from "@/constants/colors";
import { STATE_COLORS } from "./index.utils";
import AppPressable from "../AppPressable";
import AppText from "../../content/AppText";
import { AppRadioButtonProps } from "./index.props";
import { styles } from "./index.styles";

export default function AppRadioButton({
  selected,
  onSelect,
  label,
  status = "info",
  disabled = false,
  style,
  fullWidth = false,
}: AppRadioButtonProps) {
  const handlePress = () => !disabled && onSelect();

  const activeColor = STATE_COLORS[status];
  const borderColor = selected ? activeColor : PALETTE.darkBorder;

  // Construcción de estilos con tipado explícito
  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    ...(fullWidth ? [{ width: "100%" as const }] : []),
    style,
    { opacity: disabled ? 0.5 : 1 },
  ];

  return (
    <AppPressable onPress={handlePress} disabled={disabled} style={containerStyle}>
      <View style={[styles.outerCircle, { borderColor }]}>
        {selected && (
          <View style={[styles.innerDot, { backgroundColor: activeColor }]} />
        )}
      </View>

      {label && (
        <AppText
          variant="body"
          color={disabled ? "secondary" : "primary"}
          style={styles.label}
        >
          {label}
        </AppText>
      )}
    </AppPressable>
  );
}