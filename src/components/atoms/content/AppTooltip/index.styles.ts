import { StyleSheet } from "react-native";
// Design system tokens for colors and spacing metrics
import { PALETTE } from "@/constants/colors";
import { BORDER_RADIUS, SPACING } from "@/constants/metrics";

export const styles = StyleSheet.create({
  container: {
    position: "absolute", // Positioning context relative to parent container
    backgroundColor: PALETTE.nightBlue, // Surface color from brand palette
    paddingVertical: SPACING.xs, // Internal vertical spacing
    paddingHorizontal: SPACING.s, // Internal horizontal spacing
    borderRadius: BORDER_RADIUS.s, // Small radius for discrete info boxes
    borderWidth: 1, // Subtle border for definition
    borderColor: PALETTE.darkBorder, // Border color consistent with inputs
    zIndex: 1000, // Elevation over other content
    shadowColor: "#000", // Shadow color for depth
    shadowOffset: { width: 0, height: 2 }, // Vertical shadow displacement
    shadowOpacity: 0.25, // Shadow intensity
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5, // Elevation for Android compatibility
  },
  arrow: {
    position: "absolute", // Fixed positioning relative to tooltip body
    width: 0, // Zero width for CSS triangle trick
    height: 0, // Zero height for CSS triangle trick
    borderLeftWidth: 6, // Left triangle boundary
    borderRightWidth: 6, // Right triangle boundary
    borderStyle: "solid", // Solid border style
    borderLeftColor: "transparent", // Transparent left for triangle shape
    borderRightColor: "transparent", // Transparent right for triangle shape
  }
});