import { ViewStyle, StyleProp } from "react-native";
import { STATE_COLORS } from "./index.utils";

export type TagVariant = keyof typeof STATE_COLORS;

export interface AppTagProps {
  /** Texto de la etiqueta */
  label: string;
  /** Tema semántico de color (success, error, etc.) */
  variant?: TagVariant;
  /** Si es true, fondo sólido; si false, fondo semitransparente */
  active?: boolean;
  /** Función opcional al presionar la etiqueta principal */
  onPress?: () => void;
  /** Función opcional al presionar el icono de eliminación */
  onRemove?: () => void;
  /** Estilos adicionales para el contenedor */
  style?: StyleProp<ViewStyle>;
  /**
   * Tiempo mínimo (en ms) entre ejecuciones de onPress y onRemove.
   * Se aplica tanto al área principal como al botón de eliminar.
   * @default ANIMATION.DEFAULT_PRESS_THROTTLE_MS
   */
  throttleMs?: number;
}