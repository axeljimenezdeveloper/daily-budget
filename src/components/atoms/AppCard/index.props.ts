import { ReactNode } from "react"; // Type for children components
import { ViewStyle } from "react-native"; // Native view styles
import { SPACING } from "@/constants/metrics"; // Design system spacing

export interface AppCardProps {
  children: ReactNode; // Content to be rendered inside the card
  padding?: keyof typeof SPACING; // Customizable internal spacing
  style?: ViewStyle; // Optional external style overrides
}