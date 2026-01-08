import { StyleSheet } from "react-native"; // Native styling engine for optimized performance
import { PALETTE } from "@/constants/colors"; // Global color palette for consistent branding
import { TYPOGRAPHY, SPACING } from "@/constants/metrics"; // Design system constants for typography and spacing

export const styles = StyleSheet.create({
  container: {
    width: "100%", // Ensures the input component occupies the full width of its parent container
  },
  inputWrapper: {
    backgroundColor: PALETTE.nightBlue, // Secondary background color to create depth against the main background
    borderWidth: 1, // Standard border width for the input field
    borderColor: PALETTE.darkBorder, // Default border color for inactive states
    borderRadius: 8, // Standardized corner radius for a modern UI look
    paddingHorizontal: SPACING.m, // 16px internal horizontal spacing
    height: 56, // Fixed height to ensure an accessible and consistent touch target area
    justifyContent: "center", // Vertically centers the text input within the wrapper
  },
  input: {
    ...TYPOGRAPHY.bodyMd, // Applies font size, weight, and line height from the global scale
    color: PALETTE.creamWhite, // Primary text color for high contrast in dark mode
    padding: 0, // Removes default Android/iOS padding for cross-platform layout consistency
  },
});