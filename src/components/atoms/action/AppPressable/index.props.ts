import { ReactNode } from "react"; // Type for nested components
import { ViewStyle, StyleProp } from "react-native"; // Native styling types

export interface AppPressableProps {
  children: ReactNode; // Content that will become interactive
  onPress: () => void; // Function to execute when pressed
  style?: StyleProp<ViewStyle>; // Optional custom styles for the container
  disabled?: boolean; // If true, the component won't respond to touches
}