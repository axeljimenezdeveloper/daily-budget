import { ViewStyle } from "react-native";
import { SizeKey, SpacingKey } from "@/constants/metrics";
import { TEXT_VARIANTS, TEXT_COLORS } from "@/components/atoms/content/AppText/index.styles";

export type StepIndicatorVariant = "dots" | "text" | "combined" | "minimal";
export type LabelPosition = "above" | "below" | "left" | "right";

export interface AppStepIndicatorProps {
  current: number;
  total: number;
  variant?: StepIndicatorVariant;
  showLabel?: boolean;
  labelPosition?: LabelPosition;
  dotSize?: SizeKey;
  dotSpacing?: SpacingKey;
  activeColor?: string;
  inactiveColor?: string;
  inactiveOpacity?: number;
  labelVariant?: keyof typeof TEXT_VARIANTS;
  labelColor?: keyof typeof TEXT_COLORS;
  labelFormat?: string;
  style?: ViewStyle;
}