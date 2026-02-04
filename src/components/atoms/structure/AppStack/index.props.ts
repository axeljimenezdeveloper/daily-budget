import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native"; // Importa StyleProp
import { SPACING } from "@/constants/metrics";

export interface AppStackProps {
  children: ReactNode;
  direction?: "vertical" | "horizontal";
  gap?: keyof typeof SPACING;
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  fullWidth?: boolean;
  flex?: number;
  style?: StyleProp<ViewStyle>;
}
