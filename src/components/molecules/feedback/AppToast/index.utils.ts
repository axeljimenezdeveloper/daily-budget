// ============================================================================
// UTILIDADES PARA AppToast
// ============================================================================

import { PALETTE } from "@/constants/colors";
import { AppToastVariant } from "./index.props";

// ----------------------------------------------------------------------------
// MAPEOS SEMÁNTICOS PARA VARIANTES
// ----------------------------------------------------------------------------

/** Color de acento para cada variante */
export const VARIANT_COLORS: Record<AppToastVariant, string> = {
  success: PALETTE.successGreen,
  info: PALETTE.infoBlue,
  warning: PALETTE.warningOrange,
  error: PALETTE.errorRed,
};

/** Nombre del ícono (Ionicons) para cada variante */
export const VARIANT_ICONS: Record<AppToastVariant, string> = {
  success: "checkmark-circle",
  info: "information-circle",
  warning: "warning",
  error: "close-circle",
};