import { ViewProps, ViewStyle } from "react-native";
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

export interface AppBoxProps extends ViewProps {
  children?: React.ReactNode;
  
  // Layout Props
  flex?: number;
  direction?: ViewStyle["flexDirection"];
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  gap?: keyof typeof SPACING;
  
  // Spacing Props
  padding?: keyof typeof SPACING;
  paddingVertical?: keyof typeof SPACING;
  paddingHorizontal?: keyof typeof SPACING;
  margin?: keyof typeof SPACING;
  
  // Surface Props
  background?: keyof typeof PALETTE;
  radius?: keyof typeof BORDER_RADIUS;
  
  // Custom
  fullWidth?: boolean;
}