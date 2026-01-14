import React from "react";
import { View, Image } from "react-native";
import { SPACING } from "@/constants/metrics"; 
import { AppAvatarProps } from "./index.props";
import { styles } from "./index.styles";
import AppText from "../AppText"; 

export default function AppAvatar({
  uri,
  name,
  size = "xxl", 
  style,
}: AppAvatarProps) {
  
  const pixelSize = SPACING[size];

  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : "";

  const dynamicFontSize = pixelSize * 0.4;

  const containerSizeStyle = {
    width: pixelSize,
    height: pixelSize,
    borderRadius: pixelSize / 2, 
  };

  return (
    <View style={[styles.container, containerSizeStyle, style]}>
      {uri ? (
        <Image 
          source={{ uri }} 
          style={styles.image} 
          resizeMode="cover" 
        />
      ) : (
        <AppText 
          color="primary"
          style={{ 
            fontSize: dynamicFontSize, 
            lineHeight: dynamicFontSize * 1.2, 
            fontWeight: '700' 
          }}
        >
          {initials || "?"}
        </AppText>
      )}
    </View>
  );
}