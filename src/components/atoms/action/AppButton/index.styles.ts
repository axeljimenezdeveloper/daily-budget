import { StyleSheet } from "react-native"; // Native styling engine

export const styles = StyleSheet.create({
  text: {
    fontSize: 16, // Standard button text size
    lineHeight: 24, // Optimized line height for readability
    fontWeight: "700", // Bold weight for better emphasis
    textAlign: "center", // Ensures text is centered within the button
  },
  base: {
    paddingVertical: 18.5, // Vertical padding based on Figma design
    paddingHorizontal: 24.5, // Horizontal padding based on Figma design
    borderRadius: 50, // Fully rounded corners for a modern UI look
    alignItems: "center", // Centers content horizontally
    justifyContent: "center", // Centers content vertically
  },
});