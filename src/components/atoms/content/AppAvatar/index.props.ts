import { ViewStyle, StyleProp } from "react-native"; // Native styling types
import { SPACING } from "@/constants/metrics"; // Design system spacing scale

export interface AppAvatarProps {
  uri?: string; // Image URL for the avatar profile picture
  name?: string; // User name to generate initials as a fallback
  size?: keyof typeof SPACING; // Diameter of the circle 
  style?: StyleProp<ViewStyle>; // Optional custom styling for the container
}