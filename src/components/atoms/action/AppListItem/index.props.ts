// ============================================================================
// PROPS DEL COMPONENTE AppListItem
// ============================================================================

import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";

export interface AppListItemProps {
  /** Texto principal del ítem */
  label: string;
  /** Función a ejecutar al presionar (si no se provee, el ítem no es interactivo) */
  onPress?: () => void;
  /** Texto secundario (opcional) */
  subLabel?: string;
  /** Número máximo de líneas para el subLabel (opcional, por defecto sin límite) */
  subLabelNumberOfLines?: number;
  /** Modo de truncado para el subLabel (opcional, por defecto 'tail') */
  subLabelEllipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  /** Nombre del ícono (desde Ionicons) */
  icon?: string;
  /** Color del ícono */
  iconColor?: "primary" | "secondary" | "accent" | "success" | "error" | "info";
  /** Contenido personalizado en la parte derecha (ej. switch, badge) */
  rightContent?: ReactNode;
  /** Marca el ítem como activo (cambia fondo y color de ícono) */
  isActive?: boolean;
  /** Deshabilita la interacción */
  disabled?: boolean;
  
  // Estilo
  /** Color de fondo por defecto */
  background?: keyof typeof PALETTE;
  /** Color de fondo cuando isActive = true */
  activeBackground?: keyof typeof PALETTE;
  /** Espaciado interno */
  padding?: keyof typeof SPACING;
  /** Estilos adicionales para el contenedor */
  style?: ViewStyle;
  /**
   * Tiempo mínimo (en ms) entre ejecuciones de onPress.
   * Solo aplica si onPress está definido.
   * @default ANIMATION.DEFAULT_PRESS_THROTTLE_MS
   */
  throttleMs?: number;
}