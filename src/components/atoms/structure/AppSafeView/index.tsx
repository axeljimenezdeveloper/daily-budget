import React from "react";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import { AppSafeViewProps } from "./index.props";
import { styles } from "./index.styles";
import { resolveBackgroundColor } from "./index.utils";

export default function AppSafeView({
  children,
  edges = ["top", "bottom", "left", "right"],
  background = "deepNight",
  flex = 1,
  style,
  ...rest
}: AppSafeViewProps) {
  
  const dynamicStyle = {
    flex,
    backgroundColor: resolveBackgroundColor(background),
  };

  return (
    <SafeAreaView 
      edges={edges as Edge[]} 
      style={[styles.container, dynamicStyle, style as any]} 
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
}