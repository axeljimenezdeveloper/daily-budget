// ============================================================================
// CHECKBOX REUTILIZABLE - AppCheckBox
//
// Componente de checkbox con etiqueta opcional. Utiliza AppPressable como base
// para garantizar feedback táctil consistente. Soporta modo fullWidth para
// que el área presionable ocupe todo el ancho del contenedor.
// ============================================================================

import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { PALETTE } from "@/constants/colors";
import AppPressable from "../AppPressable";
import AppIcon from "../../content/AppIcon";
import AppText from "../../content/AppText";
import { AppCheckBoxProps } from "./index.props";
import { styles } from "./index.styles";

export default function AppCheckBox({
  value,
  onValueChange,
  label,
  disabled = false,
  style,
  fullWidth = false,
}: AppCheckBoxProps) {
  const handlePress = () => !disabled && onValueChange(!value);

  const activeColor = PALETTE.sunsetOrange;
  const borderColor = value ? activeColor : PALETTE.darkBorder;
  const backgroundColor = value ? activeColor : "transparent";

  // Construcción de estilos con tipado explícito
  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    ...(fullWidth ? [{ width: "100%" as const }] : []),
    style,
  ];

  return (
    <AppPressable
      onPress={handlePress}
      disabled={disabled}
      style={containerStyle}
    >
      <View
        style={[
          styles.box,
          { borderColor, backgroundColor, opacity: disabled ? 0.5 : 1 },
        ]}
      >
        {value && <AppIcon name="checkmark" size="s" color="primary" />}
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