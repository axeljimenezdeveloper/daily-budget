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
  gap?: keyof typeof SPACING | number;
  
  // Spacing Props - ahora aceptan números además de claves
  padding?: keyof typeof SPACING | number;
  paddingTop?: keyof typeof SPACING | number;
  paddingBottom?: keyof typeof SPACING | number;
  paddingLeft?: keyof typeof SPACING | number;
  paddingRight?: keyof typeof SPACING | number;
  paddingVertical?: keyof typeof SPACING | number;
  paddingHorizontal?: keyof typeof SPACING | number;
  margin?: keyof typeof SPACING | number;
  marginTop?: keyof typeof SPACING | number;
  marginBottom?: keyof typeof SPACING | number;
  marginLeft?: keyof typeof SPACING | number;
  marginRight?: keyof typeof SPACING | number;
  marginVertical?: keyof typeof SPACING | number;
  marginHorizontal?: keyof typeof SPACING | number;
  
  // Surface Props - ahora más flexibles
  background?: keyof typeof PALETTE | string;
  radius?: keyof typeof BORDER_RADIUS | number;
  
  // Custom
  fullWidth?: boolean;
  absoluteFill?: boolean;
  position?: ViewStyle["position"];
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  alignSelf?: ViewStyle["alignSelf"];
}