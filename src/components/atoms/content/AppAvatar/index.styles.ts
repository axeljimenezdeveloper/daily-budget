import { StyleSheet } from "react-native"; // Native styling engine
import { PALETTE } from "@/constants/colors"; // Global color palette

export const styles = StyleSheet.create({
  container: {
    backgroundColor: PALETTE.nightBlue, // Surface color for the background 
    borderWidth: 1, // Subtle border to define the shape 
    borderColor: PALETTE.darkBorder, // Border color from the palette 
    justifyContent: "center", // Centers initials vertically
    alignItems: "center", // Centers initials horizontally
    overflow: "hidden", // Ensures the image respects the rounded corners
  },
  image: {
    width: "100%", // Image fills the width of the container
    height: "100%", // Image fills the height of the container
  },
});