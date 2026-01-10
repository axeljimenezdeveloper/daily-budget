import { StyleSheet } from "react-native"; // Native styling engine
import { SPACING, BORDER_RADIUS } from "@/constants/metrics"; // Design system constants

export const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start", // Ensures the badge only takes the width of its content
    paddingVertical: SPACING.xs, // 4px vertical padding 
    paddingHorizontal: SPACING.s, // 8px horizontal padding
    borderRadius: BORDER_RADIUS.s, // 4px rounded corners for a clean tag look 
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
});