import { ViewStyle, StyleProp } from "react-native"; // Native styling types

export interface AppAvatarProps {
  uri?: string; // Image URL for the avatar profile picture
  name?: string; // User name to generate initials as a fallback
  size?: number; // Diameter of the circle (defaults to 48px)
  style?: StyleProp<ViewStyle>; // Optional custom styling for the container
}