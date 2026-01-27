import { PALETTE } from "@/constants/colors";
import { AppStepIndicatorProps } from "./index.props";

export const validateStepValues = (
  current: number,
  total: number
): { current: number; total: number } => {
  const safeTotal = Math.max(1, total); // Mínimo 1 paso
  const safeCurrent = Math.max(0, Math.min(current, safeTotal - 1)); // 0 ≤ current < total
  return { current: safeCurrent, total: safeTotal };
};

export const generateLabelText = (
  current: number,
  total: number,
  format?: string
): string => {
  const { current: safeCurrent, total: safeTotal } = validateStepValues(current, total);
  
  if (format) {
    return format
      .replace("{current}", (safeCurrent + 1).toString())
      .replace("{total}", safeTotal.toString());
  }
  
  return `Paso ${safeCurrent + 1} de ${safeTotal}`;
};


export const getLayoutDirection = (
  variant: AppStepIndicatorProps["variant"],
  labelPosition: AppStepIndicatorProps["labelPosition"]
): "row" | "column" => {
  if (variant === "combined") {
    if (labelPosition === "left" || labelPosition === "right") return "row";
    if (labelPosition === "above" || labelPosition === "below") return "column";
  }
  return "column";
};