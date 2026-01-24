import React from "react";
import { View } from "react-native";
import { AppBoxProps } from "./index.props";
import { separateStyleProps } from "./index.utils";

export default function AppBox(props: AppBoxProps) {
  const { children, style: customStyle } = props;
  const { viewStyle, nativeProps } = separateStyleProps(props);

  return (
    <View style={[viewStyle, customStyle]} {...nativeProps}>
      {children}
    </View>
  );
}