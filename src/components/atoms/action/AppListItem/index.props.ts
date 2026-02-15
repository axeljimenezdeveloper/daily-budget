import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";

export interface AppListItemProps {
  label: string;
  onPress?: () => void; // 👈 opcional
  subLabel?: string;
  icon?: string; 
  rightContent?: ReactNode; 
  isActive?: boolean;
  disabled?: boolean;
  
  // Estilo
  background?: keyof typeof PALETTE;
  activeBackground?: keyof typeof PALETTE;
  padding?: keyof typeof SPACING;
  style?: ViewStyle;
}