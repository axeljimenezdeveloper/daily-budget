import { ViewProps } from "react-native";
import { PALETTE } from "@/constants/colors";

export interface AppOverlayProps extends ViewProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  backgroundColor?: keyof typeof PALETTE | string;
  opacity?: number;
  useNativeDriver?: boolean;
  blur?: boolean; 
}