import { ViewProps, ViewStyle } from "react-native";
import { PALETTE } from "@/constants/colors";

export interface AppSafeViewProps extends ViewProps {
  children: React.ReactNode;
  edges?: Array<"top" | "bottom" | "left" | "right">;
  background?: keyof typeof PALETTE | "transparent"; 
  flex?: number;
  style?: ViewStyle | ViewStyle[];
}