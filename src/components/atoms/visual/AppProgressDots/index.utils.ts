import { PALETTE } from "@/constants/colors";

export const validateCurrentIndex = (
  current: number, 
  total: number
): number => {
  if (total <= 0) return 0;
  if (current < 0) return 0;
  if (current >= total) return total - 1;
  return current;
};

export const getSafeColor = (
  color: string | undefined, 
  defaultColor: string
): string => {
  if (!color) return defaultColor;
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/;
  if (hexRegex.test(color) || Object.values(PALETTE).includes(color)) {
    return color;
  }
  return defaultColor;
};