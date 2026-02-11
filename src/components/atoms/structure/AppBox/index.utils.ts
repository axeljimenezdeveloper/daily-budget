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
  | "paddingTop"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "paddingVertical"
  | "paddingHorizontal"
  | "margin"
  | "marginTop"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginVertical"
  | "marginHorizontal"
  | "background"
  | "radius"
  | "fullWidth"
  | "absoluteFill"
  | "position"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "alignSelf"
>;

export interface DynamicStyleResult {
  viewStyle: ViewStyle;
  nativeProps: Omit<AppBoxProps, keyof StyleProps | "children" | "style">;
}

function getSpacingValue(value: keyof typeof SPACING | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "number") return value;
  return SPACING[value];
}

function getRadiusValue(value: keyof typeof BORDER_RADIUS | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "number") return value;
  return BORDER_RADIUS[value];
}

function getBackgroundColor(value: keyof typeof PALETTE | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  if (value in PALETTE) {
    return PALETTE[value as keyof typeof PALETTE];
  }
  return value;
}

export function generateBoxStyles(props: StyleProps): ViewStyle {
  const {
    flex,
    direction,
    align,
    justify,
    gap,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingVertical,
    paddingHorizontal,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginVertical,
    marginHorizontal,
    background,
    radius,
    fullWidth,
    absoluteFill,
    position,
    top,
    bottom,
    left,
    right,
    alignSelf,
  } = props;

  const viewStyle: ViewStyle = {
    flex,
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    width: fullWidth ? "100%" : undefined,
    alignSelf,
  };

  // Gap
  if (gap !== undefined) {
    if (typeof gap === "number") {
      viewStyle.gap = gap;
    } else {
      viewStyle.gap = SPACING[gap];
    }
  }

  // Padding mappings
  const paddingValue = getSpacingValue(padding);
  if (paddingValue !== undefined) viewStyle.padding = paddingValue;
  
  const paddingTopValue = getSpacingValue(paddingTop);
  if (paddingTopValue !== undefined) viewStyle.paddingTop = paddingTopValue;
  
  const paddingBottomValue = getSpacingValue(paddingBottom);
  if (paddingBottomValue !== undefined) viewStyle.paddingBottom = paddingBottomValue;
  
  const paddingLeftValue = getSpacingValue(paddingLeft);
  if (paddingLeftValue !== undefined) viewStyle.paddingLeft = paddingLeftValue;
  
  const paddingRightValue = getSpacingValue(paddingRight);
  if (paddingRightValue !== undefined) viewStyle.paddingRight = paddingRightValue;
  
  const paddingVerticalValue = getSpacingValue(paddingVertical);
  if (paddingVerticalValue !== undefined) viewStyle.paddingVertical = paddingVerticalValue;
  
  const paddingHorizontalValue = getSpacingValue(paddingHorizontal);
  if (paddingHorizontalValue !== undefined) viewStyle.paddingHorizontal = paddingHorizontalValue;

  // Margin mappings
  const marginValue = getSpacingValue(margin);
  if (marginValue !== undefined) viewStyle.margin = marginValue;
  
  const marginTopValue = getSpacingValue(marginTop);
  if (marginTopValue !== undefined) viewStyle.marginTop = marginTopValue;
  
  const marginBottomValue = getSpacingValue(marginBottom);
  if (marginBottomValue !== undefined) viewStyle.marginBottom = marginBottomValue;
  
  const marginLeftValue = getSpacingValue(marginLeft);
  if (marginLeftValue !== undefined) viewStyle.marginLeft = marginLeftValue;
  
  const marginRightValue = getSpacingValue(marginRight);
  if (marginRightValue !== undefined) viewStyle.marginRight = marginRightValue;
  
  const marginVerticalValue = getSpacingValue(marginVertical);
  if (marginVerticalValue !== undefined) viewStyle.marginVertical = marginVerticalValue;
  
  const marginHorizontalValue = getSpacingValue(marginHorizontal);
  if (marginHorizontalValue !== undefined) viewStyle.marginHorizontal = marginHorizontalValue;

  // Surface mappings
  const backgroundColor = getBackgroundColor(background);
  if (backgroundColor !== undefined) viewStyle.backgroundColor = backgroundColor;
  
  const radiusValue = getRadiusValue(radius);
  if (radiusValue !== undefined) viewStyle.borderRadius = radiusValue;

  // Position
  if (position) viewStyle.position = position;
  if (top !== undefined) viewStyle.top = top;
  if (bottom !== undefined) viewStyle.bottom = bottom;
  if (left !== undefined) viewStyle.left = left;
  if (right !== undefined) viewStyle.right = right;
  
  if (absoluteFill) {
    viewStyle.position = "absolute";
    viewStyle.top = 0;
    viewStyle.bottom = 0;
    viewStyle.left = 0;
    viewStyle.right = 0;
  }

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
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingVertical,
    paddingHorizontal,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginVertical,
    marginHorizontal,
    background,
    radius,
    fullWidth,
    absoluteFill,
    position,
    top,
    bottom,
    left,
    right,
    
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
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingVertical,
    paddingHorizontal,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginVertical,
    marginHorizontal,
    background,
    radius,
    fullWidth,
    absoluteFill,
    position,
    top,
    bottom,
    left,
    right,
  };

  const viewStyle = generateBoxStyles(styleProps);

  return {
    viewStyle,
    nativeProps,
  };
}