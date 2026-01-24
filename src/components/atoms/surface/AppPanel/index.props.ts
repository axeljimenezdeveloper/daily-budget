import { ViewProps, ViewStyle } from "react-native";
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

export interface AppPanelProps extends ViewProps {
  children?: React.ReactNode;
  background?: keyof typeof PALETTE;
  radius?: keyof typeof BORDER_RADIUS;
  borderWidth?: number;
  borderColor?: keyof typeof PALETTE;
  padding?: keyof typeof SPACING;
  elevation?: boolean; 
  flex?: number;
  style?: ViewStyle | ViewStyle[];
}