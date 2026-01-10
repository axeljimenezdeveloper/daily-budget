import { StyleSheet } from "react-native"; // Native styling engine
import { PALETTE } from "@/constants/colors"; // Global color palette
import { BORDER_RADIUS } from "@/constants/metrics"; // Global design metrics

export const styles = StyleSheet.create({
  container: {
    width: "100%", // Takes full available width of the parent
    backgroundColor: PALETTE.darkBorder, // Background color for the progress track
    borderRadius: BORDER_RADIUS.round, // Fully rounded corners for pill shape
    overflow: "hidden", // Ensures progress fill stays within track boundaries
  },
  fill: {
    height: "100%", // Fills the total height of the container
    borderRadius: BORDER_RADIUS.round, // Matches the container rounding
  },
});