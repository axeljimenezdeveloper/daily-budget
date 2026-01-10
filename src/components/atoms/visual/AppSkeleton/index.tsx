import React, { useEffect, useRef } from "react"; // React hooks for logic and refs
import { Animated, ViewStyle } from "react-native"; // Native animation and style types
import { styles } from "./index.styles"; // Static style definitions
import { AppSkeletonProps } from "./index.props"; // Component properties interface

export default function AppSkeleton({
  width = "100%", // Default to full width for lists or banners
  height = 20, // Standard bar height for text lines
  variant = "rectangle", // Default rectangular shape
  style,
}: AppSkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current; // Initial opacity for the pulse effect

  useEffect(() => {
    // Continuous pulse animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7, // Target opacity for "lit" state
          duration: 800, // Speed of the pulse in ms
          useNativeDriver: true, // Hardware acceleration
        }),
        Animated.timing(opacity, {
          toValue: 0.3, // Return to base opacity
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  // Logic to handle circular shape safely
  const borderRadius = variant === "circle" 
    ? (typeof height === "number" ? height / 2 : 999) 
    : undefined;

  const dynamicStyle: ViewStyle = {
    width,
    height,
    borderRadius,
  };

  return (
    <Animated.View
      style={[
        styles.container,
        variant === "rectangle" && styles.rectangle,
        dynamicStyle,
        { opacity }, // Animated pulse binding
        style,
      ]}
    />
  );
}