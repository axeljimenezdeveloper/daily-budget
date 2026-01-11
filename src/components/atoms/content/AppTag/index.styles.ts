import { StyleSheet } from "react-native";
// Design system tokens for colors and consistent spacing
import { BORDER_RADIUS, SPACING } from "@/constants/metrics";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Align label and removal icon horizontally
    alignItems: "center", // Center elements vertically within the row
    paddingVertical: 4, // Compact vertical padding for tag aesthetics
    paddingHorizontal: SPACING.s, // Horizontal padding based on design system
    borderRadius: BORDER_RADIUS.s, // Small radius for a subtle rounded look
    borderWidth: 1, // Border thickness for shape definition
    alignSelf: "flex-start", // Container wraps strictly around its content
  },
});