import { StyleSheet } from "react-native";
// Design system tokens for colors and spacing metrics
import { PALETTE } from "@/constants/colors";
import { BORDER_RADIUS, SPACING } from "@/constants/metrics";

export const styles = StyleSheet.create({
  container: {
    gap: SPACING.xs, // Vertical spacing between label and field
  },
  field: {
    height: 48,
    flexDirection: "row", // Horizontal layout for text and icon
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.m,
    backgroundColor: PALETTE.nightBlue, // Surface color from brand palette
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.m,
  },
});