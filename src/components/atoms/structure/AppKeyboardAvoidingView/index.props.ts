import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface AppKeyboardAvoidingViewProps {
  children: ReactNode;
  behavior?: "height" | "padding" | "position";
  keyboardVerticalOffset?: number;
  enabled?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: "always" | "never" | "handled";
}