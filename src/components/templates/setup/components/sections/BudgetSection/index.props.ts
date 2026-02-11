// ============================================================================
// PROPS DE LA SECCIÓN DE PRESUPUESTO (BudgetSection)
//
// Define los parámetros que recibe el componente BudgetSection para
// gestionar la entrada y validación del presupuesto inicial.
// ============================================================================

// ----------------------------------------------------------------------------
// IMPORTACIÓN DE TIPOS COMPARTIDOS
// ----------------------------------------------------------------------------
import { Currency } from "../../../types";

// ----------------------------------------------------------------------------
// INTERFAZ: BudgetSectionProps
// ----------------------------------------------------------------------------

/**
 * Props del componente BudgetSection.
 *
 * @property currency       - Moneda seleccionada (incluye símbolo y código).
 * @property budget         - Valor actual del input de presupuesto (string para preservar formato).
 * @property error          - Mensaje de error de validación (null si no hay error).
 * @property isValid        - Indica si el presupuesto cumple las validaciones.
 * @property onBudgetChange - Callback ejecutado en cada cambio del input.
 */
export interface BudgetSectionProps {
  currency: Currency;
  budget: string;
  error: string | null;
  isValid: boolean;
  onBudgetChange: (value: string) => void;
}