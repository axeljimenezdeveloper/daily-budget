import { ViewStyle } from "react-native";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";

export type DividerColor = "darkBorder" | "slateGray" | "nightBlue" | keyof typeof PALETTE | string;

export type DividerThickness = 0.5 | 1 | 2 | number;

export interface AppDividerProps {
  color?: DividerColor;
  thickness?: DividerThickness;
  marginVertical?: keyof typeof SPACING;
  width?: number | string;
  borderRadius?: number;
  alignSelf?: ViewStyle["alignSelf"];
  marginHorizontal?: keyof typeof SPACING;
}