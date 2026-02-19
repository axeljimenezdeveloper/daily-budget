// ============================================================================
// COMPONENTE DE LISTA REUTILIZABLE - AppListItem
//
// Representa un elemento de lista con ícono, etiqueta, subetiqueta y contenido
// derecho opcional. Puede ser presionable o no. Si se proporciona onPress,
// se envuelve en AppPressable para manejar la interacción.
// Ahora soporta throttling opcional para prevenir pulsaciones rápidas.
// ============================================================================

import React from "react";
import { ANIMATION } from "@/constants/animations"; // ← Importamos constante global

import AppBox from "../../structure/AppBox";
import AppText from "../../content/AppText";
import AppIcon from "../../content/AppIcon";
import AppPressable from "../AppPressable";

import { AppListItemProps } from "./index.props";
import { getStyleHelpers } from "./index.utils";

export default function AppListItem({
  label,
  onPress,
  subLabel,
  icon,
  iconColor: customIconColor,
  rightContent,
  isActive = false,
  disabled = false,
  background,
  activeBackground = "nightBlue",
  padding = "m",
  style,
  throttleMs = ANIMATION.DEFAULT_PRESS_THROTTLE_MS, // ← Valor por defecto
}: AppListItemProps) {
  
  const { currentBackground, iconColor } = getStyleHelpers({
    isActive,
    background,
    activeBackground,
    iconColor: customIconColor,
  });

  const content = (
    <AppBox
      direction="row"
      align="center"
      padding={padding}
      background={currentBackground}
      radius="m"
      gap="m"
      style={style}
    >
      {icon && <AppIcon name={icon} color={iconColor} />}
      <AppBox flex={1} gap="xs">
        <AppText variant="body" color="primary">
          {label}
        </AppText>
        {subLabel && (
          <AppText variant="caption" color="secondary">
            {subLabel}
          </AppText>
        )}
      </AppBox>
      {rightContent && <AppBox>{rightContent}</AppBox>}
    </AppBox>
  );

  if (!onPress) {
    return content;
  }

  // --------------------------------------------------------------------------
  // Importante: Se fuerza el ancho al 100% para que el área táctil ocupe
  // todo el contenedor padre. Esto evita zonas muertas en los laterales
  // cuando el ítem está dentro de un ScrollView con padding.
  // --------------------------------------------------------------------------
  return (
    <AppPressable
      onPress={onPress}
      disabled={disabled}
      style={{ width: '100%' }}
      throttleMs={throttleMs} // ← Pasamos la prop
    >
      {content}
    </AppPressable>
  );
}