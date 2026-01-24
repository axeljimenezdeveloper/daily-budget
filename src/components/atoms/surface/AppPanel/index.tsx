import React from "react";
import { View, ViewStyle } from "react-native";
import { AppPanelProps } from "./index.props";
import { styles } from "./index.styles";
import { getDynamicPanelStyles } from "./index.utils";

export default function AppPanel(props: AppPanelProps) {
  const { children, elevation, style, ...rest } = props;

  return (
    <View 
      style={[
        styles.container,
        getDynamicPanelStyles(props),
        elevation && styles.elevation,
        style as ViewStyle
      ]} 
      {...rest}
    >
      {children}
    </View>
  );
}