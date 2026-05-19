import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;

export const styles = StyleSheet.create({
  animatedContainer: {
    width: DRAWER_WIDTH,
    height: "100%",
  },
  scrollContent: {
    padding: 16,
  },
  menuLabel: {
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ffffff10",
  },
  budgetInfo: {
    marginBottom: 8,
  },
});