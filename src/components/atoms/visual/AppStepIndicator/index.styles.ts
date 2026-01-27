import { StyleSheet } from "react-native";
import { SPACING } from "@/constants/metrics";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  dotsOnly: {
    flexDirection: "row",
    alignItems: "center",
  },
  textOnly: {
    alignItems: "center",
    justifyContent: "center",
  },
  combinedHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.m,
  },
  combinedVertical: {
    flexDirection: "column",
    alignItems: "center",
    gap: SPACING.s,
  },
  minimalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
});