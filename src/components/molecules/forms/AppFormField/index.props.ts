import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface AppFormFieldProps {
  children: ReactNode;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<ViewStyle>;
  helperStyle?: StyleProp<ViewStyle>;
}