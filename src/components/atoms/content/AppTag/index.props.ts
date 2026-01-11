import { ViewStyle, StyleProp } from "react-native";
import { STATE_COLORS } from "./index.utils";

// Definition of allowed semantic variants for the tag
export type TagVariant = keyof typeof STATE_COLORS;

export interface AppTagProps {
  label: string; // Text to display
  variant?: TagVariant; // Semantic color theme (success, error, etc.)
  active?: boolean; // If true, uses solid background; if false, uses light/transparent background
  onPress?: () => void; // Optional click handler
  onRemove?: () => void; // Optional remove handler
  style?: StyleProp<ViewStyle>; // Style overrides
}