import { ViewStyle } from "react-native";
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";
import { AppBoxProps } from "./index.props";

export type StyleProps = Pick<
  AppBoxProps,
  | "flex"
  | "direction"
  | "align"
  | "justify"
  | "gap"
  | "padding"
  | "paddingVertical"
  | "paddingHorizontal"
  | "margin"
  | "background"
  | "radius"
  | "fullWidth"
>;

export interface DynamicStyleResult {
  viewStyle: ViewStyle;
  nativeProps: Omit<AppBoxProps, keyof StyleProps | "children" | "style">;
}

export function generateBoxStyles(props: StyleProps): ViewStyle {
  const {
    flex,
    direction,
    align,
    justify,
    gap,
    padding,
    paddingVertical,
    paddingHorizontal,
    margin,
    background,
    radius,
    fullWidth,
  } = props;

  const viewStyle: ViewStyle = {
    flex,
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    width: fullWidth ? "100%" : undefined,
  };

  // Spacing mappings
  if (gap) viewStyle.gap = SPACING[gap];
  if (padding) viewStyle.padding = SPACING[padding];
  if (paddingVertical) viewStyle.paddingVertical = SPACING[paddingVertical];
  if (paddingHorizontal) viewStyle.paddingHorizontal = SPACING[paddingHorizontal];
  if (margin) viewStyle.margin = SPACING[margin];

  // Surface mappings
  if (background) viewStyle.backgroundColor = PALETTE[background];
  if (radius) viewStyle.borderRadius = BORDER_RADIUS[radius];

  return viewStyle;
}

export function separateStyleProps(props: AppBoxProps): DynamicStyleResult {
  const {
    children,
    flex,
    direction,
    align,
    justify,
    gap,
    padding,
    paddingVertical,
    paddingHorizontal,
    margin,
    background,
    radius,
    fullWidth,
    style,
    ...nativeProps
  } = props;

  const styleProps: StyleProps = {
    flex,
    direction,
    align,
    justify,
    gap,
    padding,
    paddingVertical,
    paddingHorizontal,
    margin,
    background,
    radius,
    fullWidth,
  };

  const viewStyle = generateBoxStyles(styleProps);

  return {
    viewStyle,
    nativeProps,
  };
}