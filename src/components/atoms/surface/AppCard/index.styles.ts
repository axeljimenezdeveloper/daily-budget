import { StyleSheet } from "react-native"; // Native styling engine
import { PALETTE } from "@/constants/colors"; // Global color palette

export const styles = StyleSheet.create({
  container: {
    backgroundColor: PALETTE.nightBlue, // Darker surface for contrast
    borderWidth: 1, // Subtle border weight
    borderColor: PALETTE.darkBorder, // Border color from palette
    borderRadius: 12, // Standard rounded corners seen in design
    width: "100%", // Takes full width of parent by default
    overflow: "hidden", // Ensures children don't bleed out of corners
  },
});