import React from "react";
import { ViewStyle } from "react-native"; // Importar ViewStyle
import { STATE_COLORS } from "./index.utils";

export interface AppButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: "filled" | "outline";
  status?: keyof typeof STATE_COLORS;
  disabled?: boolean;
  style?: ViewStyle; // Nueva prop para estilos personalizados
}