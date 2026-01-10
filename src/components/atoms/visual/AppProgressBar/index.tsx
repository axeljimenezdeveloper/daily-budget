import React from "react"; // React core for component logic 
import { View } from "react-native"; // Standard layout components 
import { STATE_COLORS } from "../AppBadge/index.utils"; // Semantic color mapping 
import { AppProgressBarProps } from "./index.props"; // Property interfaces
import { styles } from "./index.styles"; // Static style definitions

export default function AppProgressBar({
  progress,
  status = "info", // Defaults to info blue for neutral progress 
  height = 8, // Standard bar thickness
  style,
}: AppProgressBarProps) {
  // Clamps progress value between 0 and 1 to prevent layout breaks
  const validatedProgress = Math.min(Math.max(progress, 0), 1);
  
  // Retrieves the hex color based on the semantic status 
  const fillColor = STATE_COLORS[status];

  return (
    <View style={[styles.container, { height }, style]}>
      <View 
        style={[
          styles.fill, 
          { 
            width: `${validatedProgress * 100}%`, // Calculates fill percentage
            backgroundColor: fillColor // Dynamic color from state palette
          }
        ]} 
      />
    </View>
  );
}