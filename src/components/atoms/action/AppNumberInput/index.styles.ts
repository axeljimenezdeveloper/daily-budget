import { StyleSheet } from "react-native";
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PALETTE.nightBlue,
    borderWidth: 1,
    borderColor: PALETTE.darkBorder,
    borderRadius: BORDER_RADIUS.m,
    overflow: "hidden",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 56,
    paddingHorizontal: SPACING.m,
  },
  currencySymbol: {
    color: PALETTE.lightGray,
    fontSize: 16,
    fontWeight: "500",
    marginRight: SPACING.xs,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: PALETTE.creamWhite,
    paddingVertical: SPACING.m,
    paddingHorizontal: 0,
    minHeight: 56,
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: PALETTE.darkBorder,
  },
  stepperButton: {
    width: 48,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  stepperDivider: {
    width: 1,
    height: 24,
    backgroundColor: PALETTE.darkBorder,
  },
});