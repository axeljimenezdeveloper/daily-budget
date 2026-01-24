import { PALETTE } from "@/constants/colors";

export const resolveBackgroundColor = (
  background?: keyof typeof PALETTE | "transparent"
): string => {
  if (background === "transparent") return "transparent";
  if (background && PALETTE[background]) return PALETTE[background];
  return "transparent";
};