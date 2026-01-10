import { StyleSheet } from "react-native"; // Native styling engine
import { PALETTE } from "@/constants/colors"; // Brand color palette [cite: 7]
import { SPACING } from "@/constants/metrics"; // Global spacing system [cite: 82]

export const styles = StyleSheet.create({
  base: {
    flex: 1, // Ensures the container fills the entire screen
    backgroundColor: PALETTE.deepNight, // Sets the global dark theme background [cite: 7]
  },
  padding: {
    paddingHorizontal: SPACING.l, // Applies standard 24px margins for the app [cite: 82]
  },
});
