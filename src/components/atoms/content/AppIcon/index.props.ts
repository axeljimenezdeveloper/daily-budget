import { ViewStyle } from "react-native";
import { SIZES } from "@/constants/metrics"; // Cambiar de SPACING a SIZES
import { ICON_COLORS } from "./index.styles";

export interface AppIconProps {
  name: string;
  library?: "Ionicons" | "MaterialCommunityIcons" | "FontAwesome" | "MaterialIcons";
  size?: keyof typeof SIZES; // Cambiar de SPACING a SIZES
  color?: keyof typeof ICON_COLORS;
  style?: ViewStyle;
}