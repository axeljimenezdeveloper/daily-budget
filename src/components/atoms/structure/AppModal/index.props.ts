import { ReactNode } from "react";
import { ViewStyle, StyleProp, DimensionValue } from "react-native";

export interface AppModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showHeader?: boolean;
  height?: DimensionValue; 
  animationType?: "slide" | "fade";
  swipeToClose?: boolean;
  backdropOpacity?: number;
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}