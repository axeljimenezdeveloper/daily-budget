import { ViewStyle } from "react-native";
import { SIZES, SPACING } from "@/constants/metrics";

export interface AppProgressDotsProps {
  total: number;
  current: number;
  size?: keyof typeof SIZES;
  spacing?: keyof typeof SPACING;
  activeColor?: string;
  inactiveColor?: string;
  style?: ViewStyle;
  inactiveOpacity?: number;
};