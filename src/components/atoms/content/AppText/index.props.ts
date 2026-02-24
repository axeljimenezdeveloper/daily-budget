import React from "react"; // Core React library for component logic
import { TEXT_ALIGNMENT, TEXT_COLORS, TEXT_VARIANTS } from "./index.styles"; // Import of semantic constants for styles

export interface AppTextProps {
  variant?: keyof typeof TEXT_VARIANTS; // Selection of typographic variants from the semantic system
  color?: keyof typeof TEXT_COLORS; // Selection of semantic text colors from the restricted palette
  align?: keyof typeof TEXT_ALIGNMENT; // Selection of text alignment options for layout control
  children: React.ReactNode; // Content to be rendered inside the text component
  style?: any; // Optional prop to allow custom style overrides from parent components
  /** Si el texto debe ajustar su tamaño para caber en el contenedor (solo iOS) */
  adjustsFontSizeToFit?: boolean;
  /** Número máximo de líneas */
  numberOfLines?: number;
}