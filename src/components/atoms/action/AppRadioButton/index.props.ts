import { ViewStyle, StyleProp } from "react-native";
import { STATE_COLORS } from "./index.utils";

export interface AppRadioButtonProps {
  /** Estado de selección actual (true = seleccionado) */
  selected: boolean;
  /** Función a ejecutar cuando se presiona */
  onSelect: () => void;
  /** Texto opcional que se muestra junto al botón */
  label?: string;
  /** Tema de color (define el color cuando está seleccionado) */
  status?: keyof typeof STATE_COLORS;
  /** Deshabilita la interacción cuando es true */
  disabled?: boolean;
  /** Estilos personalizados para el contenedor */
  style?: StyleProp<ViewStyle>;
  /**
   * Si es true, el contenedor ocupará el 100% del ancho disponible.
   * Útil cuando el radio button está dentro de una fila que debe ser completamente presionable.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Tiempo mínimo (en ms) entre ejecuciones de onPress.
   * Por defecto se usa DEFAULT_PRESS_THROTTLE_MS (300ms) para evitar
   * pulsaciones dobles accidentales.
   * @default ANIMATION.DEFAULT_PRESS_THROTTLE_MS
   */
  throttleMs?: number;
}