// ============================================================================
// PROPS DEL COMPONENTE DE TEXTO - AppText
//
// Define las propiedades tipográficas, de color, alineación y opciones
// de truncado (numberOfLines, ellipsizeMode) para el componente AppText.
// ============================================================================

import React from "react";
import { TEXT_ALIGNMENT, TEXT_COLORS, TEXT_VARIANTS } from "./index.styles";

export interface AppTextProps {
  /** Variante tipográfica del texto (h1, h2, h3, body, caption, label) */
  variant?: keyof typeof TEXT_VARIANTS;
  /** Color semántico del texto (primary, secondary, accent, success, error, warning, info) */
  color?: keyof typeof TEXT_COLORS;
  /** Alineación del texto (left, center, right, justify) */
  align?: keyof typeof TEXT_ALIGNMENT;
  /** Contenido del texto */
  children: React.ReactNode;
  /** Estilos adicionales para sobrescribir */
  style?: any;
  /** Si el texto debe ajustar su tamaño para caber en el contenedor (solo iOS) */
  adjustsFontSizeToFit?: boolean;
  /** Número máximo de líneas a mostrar (truncado) */
  numberOfLines?: number;
  /** Modo de truncado cuando se supera numberOfLines (head, middle, tail, clip) */
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}