import { SPACING } from "@/constants/metrics"; // Import spacing system

export interface AppSpacerProps {
  size?: keyof typeof SPACING; // Now restricted to xs, s, m, l, xl, xxl
  horizontal?: boolean; // Determines the direction of the gap
  flex?: number; // Optional flex value for dynamic spacing
}