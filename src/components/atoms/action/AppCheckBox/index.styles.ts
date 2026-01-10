import { StyleSheet } from "react-native"; // Native styling engine
import { BORDER_RADIUS, SPACING } from "@/constants/metrics"; // Global design metrics

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Horizontal layout for box and label
    alignItems: "center", // Centers checkbox vertically with text
  },
  box: {
    width: 24, // Fixed accessible width
    height: 24, // Fixed accessible height
    borderRadius: BORDER_RADIUS.s, // Subtle rounded corners (4px)
    borderWidth: 2, // Border thickness for the checkbox frame
    justifyContent: "center", // Centers the check icon
    alignItems: "center", // Centers the check icon
  },
  label: {
    marginLeft: SPACING.s, // 8px standard gap from metrics
  },
});