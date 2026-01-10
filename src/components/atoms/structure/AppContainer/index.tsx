import React from "react"; // React core for component logic
import { View } from "react-native"; // Standard View component
import { SafeAreaView } from "react-native-safe-area-context"; // Modern safe area provider
import { AppContainerProps } from "./index.props"; // Component interfaces
import { styles } from "./index.styles"; // Static styles

export default function AppContainer({
  children,
  safe = true, // Defaults to true for professional safe-area handling
  flat = false, // Defaults to false to maintain consistent app margins
  style,
}: AppContainerProps) {
  // Selects the modern SafeAreaView or a standard View based on the safe prop
  const Wrapper = safe ? SafeAreaView : View;

  return (
    <Wrapper
      style={[
        styles.base, // Applies global background and flex
        !flat && styles.padding, // Conditionally applies horizontal margins
        style, // Allows external style overrides
      ]}
    >
      {children}
    </Wrapper>
  );
}
