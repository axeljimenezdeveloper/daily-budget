import { ViewStyle } from "react-native"; // Native types for view styling

export interface AppSwitchProps {
  value: boolean; // Current boolean state of the switch (ON/OFF)
  onValueChange: (value: boolean) => void; // Function to handle state transitions
  disabled?: boolean; // Prevents user interaction when true
  style?: ViewStyle; // Optional container style overrides
}