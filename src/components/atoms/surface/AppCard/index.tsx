import React from "react";
import { View } from "react-native";
import { SPACING } from "@/constants/metrics";
import { AppCardProps } from "./index.props";
import { styles } from "./index.styles";

export default function AppCard({
  children,
  padding = "m",
  style,
}: AppCardProps) {
  const paddingValue = padding === "none" ? 0 : SPACING[padding];
  return (
    <View
      style={[
        styles.container,
        { padding: paddingValue },
        style,
      ]}
    >
      {children}
    </View>
  );
}