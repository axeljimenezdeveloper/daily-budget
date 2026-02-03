import { StyleSheet } from "react-native";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";
import { PALETTE } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", 
  },
  content: {
    backgroundColor: PALETTE.deepNight,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    width: "100%",
    maxHeight: "90%",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.l,
    borderBottomWidth: 1,
    borderBottomColor: PALETTE.darkBorder,
  },
  body: {
    padding: SPACING.l,
  },
  closeButton: {
    padding: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: `${PALETTE.darkBorder}50`,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: PALETTE.slateGray,
    borderRadius: 2,
    marginTop: SPACING.m,
    alignSelf: "center",
  },
});