import { ViewStyle, StyleProp, DimensionValue } from "react-native"; // React Native types for component styling and dimensions

// Component properties definition
export interface AppSelectProps {
  value?: string; // Currently selected option label
  label?: string; // Optional field label shown above the input
  placeholder?: string; // Text shown when no value is selected
  onPress: () => void; // Callback function to trigger selection logic (Modal/Sheet)
  error?: string; // Optional validation error message
  disabled?: boolean; // Toggle component interaction state
  width?: DimensionValue; // Custom width for flexible layouts
  style?: StyleProp<ViewStyle>; // Additional container overrides
}