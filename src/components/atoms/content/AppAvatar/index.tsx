import React from "react"; // React core for logic
import { View, Image } from "react-native"; // Native layout and image components
import { AppAvatarProps } from "./index.props"; // Properties interface
import { styles } from "./index.styles"; // Static styles
import AppText from "../AppText"; // Typography atom 

export default function AppAvatar({
  uri,
  name,
  size = 48, // Default diameter size 
  style,
}: AppAvatarProps) {
  // Logic to get initials (e.g., "John Doe" -> "JD")
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : "";

  // Dynamic circle style based on the size prop
  const containerSizeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2, // Perfect circle logic 
  };

  return (
    <View style={[styles.container, containerSizeStyle, style]}>
      {uri ? (
        <Image 
          source={{ uri }} 
          style={styles.image} 
          resizeMode="cover" // Ensures the face is centered and fills the circle
        />
      ) : (
        <AppText variant="h3" color="secondary">
          {initials || "?"} {/* Displays initials or a question mark if no name */}
        </AppText>
      )}
    </View>
  );
}