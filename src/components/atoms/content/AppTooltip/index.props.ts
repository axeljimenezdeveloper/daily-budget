import { ViewStyle, StyleProp } from "react-native";

// Component properties following our documentation standards
export interface AppTooltipProps {
  text: string; // Tooltip message
  visible: boolean; // Control visibility
  position?: "top" | "bottom"; // Layout direction
  style?: StyleProp<ViewStyle>; // Custom overrides
}