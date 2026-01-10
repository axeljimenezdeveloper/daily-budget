import { ViewStyle, StyleProp } from "react-native"; // Native styling types

export interface AppCheckBoxProps {
  value: boolean; // Current checked state of the component
  onValueChange: (newValue: boolean) => void; // Callback function for state toggle
  label?: string; // Optional text description next to the box
  disabled?: boolean; // Prevents interaction and dims opacity when true
  style?: StyleProp<ViewStyle>; // Optional container style overrides
}