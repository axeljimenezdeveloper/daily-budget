import { ViewStyle } from "react-native";

export interface AppSwitchProps {
  /** Estado actual del switch (true = ON, false = OFF) */
  value: boolean;
  /** Función a ejecutar cuando cambia el estado */
  onValueChange: (value: boolean) => void;
  /** Deshabilita la interacción cuando es true */
  disabled?: boolean;
  /** Estilos personalizados para el contenedor */
  style?: ViewStyle;
  /**
   * Tiempo mínimo (en ms) entre ejecuciones de onPress.
   * Por defecto se usa DEFAULT_PRESS_THROTTLE_MS (300ms) para evitar
   * pulsaciones dobles accidentales.
   * @default ANIMATION.DEFAULT_PRESS_THROTTLE_MS
   */
  throttleMs?: number;
}