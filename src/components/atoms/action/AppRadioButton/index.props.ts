import { ViewStyle, StyleProp } from "react-native";
import { STATE_COLORS } from "./index.utils";

export interface AppRadioButtonProps {
  /** Current selection state */
  selected: boolean;
  /** Callback function when pressed */
  onSelect: () => void;
  /** Optional text next to the radio button */
  label?: string;
  /** Color theme (defaults to info/blue or sunsetOrange) */
  status?: keyof typeof STATE_COLORS;
  /** Disables interaction and fades UI */
  disabled?: boolean;
  /** Optional container overrides */
  style?: StyleProp<ViewStyle>;
  /**
   * Si es true, el contenedor ocupará el 100% del ancho disponible.
   * Útil cuando el radio button está dentro de una fila que debe ser completamente presionable.
   * @default false
   */
  fullWidth?: boolean;
}