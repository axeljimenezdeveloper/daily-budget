import { ViewStyle, StyleProp } from "react-native"; // Native styling types

export interface AppCheckBoxProps {
  /** Current checked state of the component */
  value: boolean;
  /** Callback function for state toggle */
  onValueChange: (newValue: boolean) => void;
  /** Optional text description next to the box */
  label?: string;
  /** Prevents interaction and dims opacity when true */
  disabled?: boolean;
  /** Optional container style overrides */
  style?: StyleProp<ViewStyle>;
  /**
   * Si es true, el contenedor ocupará el 100% del ancho disponible.
   * Útil cuando el checkbox está dentro de una fila que debe ser completamente presionable.
   * @default false
   */
  fullWidth?: boolean;
}