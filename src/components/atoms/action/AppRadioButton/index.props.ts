import { ViewStyle, StyleProp } from "react-native"; // Native styling types
import { STATE_COLORS } from "./index.utils"; // State color mapping

export interface AppRadioButtonProps {
  selected: boolean; // Current selection state
  onSelect: () => void; // Callback function when pressed
  label?: string; // Optional text next to the radio button
  status?: keyof typeof STATE_COLORS; // Color theme (defaults to info/blue or sunsetOrange)
  disabled?: boolean; // Disables interaction and fades UI
  style?: StyleProp<ViewStyle>; // Optional container overrides
}