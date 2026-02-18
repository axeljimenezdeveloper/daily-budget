import React from "react";
import { ViewStyle } from "react-native";
import { STATE_COLORS } from "./index.utils";

export interface AppButtonProps {
  /** Contenido del botón (generalmente texto o ícono+texto) */
  children: React.ReactNode;
  /** Función a ejecutar al presionar */
  onPress: () => void;
  /** Estilo visual: relleno (filled) o contorno (outline) */
  variant?: "filled" | "outline";
  /** Estado semántico que define el color principal */
  status?: keyof typeof STATE_COLORS;
  /** Deshabilita la interacción y aplica estilo reducido */
  disabled?: boolean;
  /** Estilos personalizados para el contenedor del botón */
  style?: ViewStyle;
  /** Si es true, el botón ocupará todo el ancho disponible */
  fullWidth?: boolean;
}