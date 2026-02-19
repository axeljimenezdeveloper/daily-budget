import { ViewStyle, StyleProp } from "react-native";

export interface AppCheckBoxProps {
  /** Estado actual del checkbox (true = marcado, false = desmarcado) */
  value: boolean;
  /** Función a ejecutar cuando cambia el estado */
  onValueChange: (newValue: boolean) => void;
  /** Texto opcional que se muestra junto al cuadro */
  label?: string;
  /** Deshabilita la interacción cuando es true */
  disabled?: boolean;
  /** Estilos personalizados para el contenedor */
  style?: StyleProp<ViewStyle>;
  /**
   * Si es true, el contenedor ocupará el 100% del ancho disponible.
   * Útil cuando el checkbox está dentro de una fila que debe ser completamente presionable.
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