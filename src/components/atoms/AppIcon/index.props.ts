import { ViewStyle } from "react-native"; // Native types for container styling
import { SPACING } from "@/constants/metrics"; // Design system spacing scale
import { ICON_COLORS } from "./index.styles"; // Semantic icon color definitions

export interface AppIconProps {
  name: string; // Specific icon identifier from the chosen library
  library?: "Ionicons" | "MaterialCommunityIcons" | "FontAwesome" | "MaterialIcons"; // Supported icon sets
  size?: keyof typeof SPACING; // Mapped to the global 4px-base spacing system
  color?: keyof typeof ICON_COLORS; // Restricted to the semantic icon palette
  style?: ViewStyle; // Optional style overrides for the icon component
}