import { ViewStyle } from "react-native";
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";
import { AppPanelProps } from "./index.props";

export const getDynamicPanelStyles = (props: AppPanelProps): ViewStyle => {
  const { background, radius, borderWidth, borderColor, padding, flex } = props;

  return {
    flex,
    backgroundColor: background ? PALETTE[background] : "transparent",
    borderRadius: radius ? BORDER_RADIUS[radius] : undefined,
    borderWidth,
    borderColor: borderColor ? PALETTE[borderColor] : undefined,
    padding: padding ? SPACING[padding] : undefined,
  };
};