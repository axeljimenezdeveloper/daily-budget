import { StyleSheet } from "react-native"; // Native styling engine
import { SPACING } from "@/constants/metrics"; // Design system spacing

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Horizontal alignment for button and label
    alignItems: "center", // Vertical centering
  },
  outerCircle: {
    width: 24, // Standard touch target size
    height: 24, // Standard touch target size
    borderRadius: 12, // Perfect circle logic
    borderWidth: 2, // Frame thickness
    justifyContent: "center", // Centers the inner dot
    alignItems: "center", // Centers the inner dot
  },
  innerDot: {
    width: 12, // Inner selection indicator size
    height: 12, // Inner selection indicator size
    borderRadius: 6, // Perfect circle logic for the dot
  },
  label: {
    marginLeft: SPACING.s, // Consistent 8px gap
  },
});