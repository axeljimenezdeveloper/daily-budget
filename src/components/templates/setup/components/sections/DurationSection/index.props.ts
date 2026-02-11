// ============================================================================
// PROPS DE LA SECCIÓN DE DURACIÓN (DurationSection)
//
// Define los parámetros que recibe el componente DurationSection para
// gestionar la selección de duración, entrada personalizada y cálculos
// de presupuesto diario.
// ============================================================================

// ----------------------------------------------------------------------------
// IMPORTACIÓN DE TIPOS COMPARTIDOS
// ----------------------------------------------------------------------------
import { Currency, PeriodOption } from "../../../types";

// ----------------------------------------------------------------------------
// INTERFAZ: DurationSectionProps
// ----------------------------------------------------------------------------

/**
 * Props del componente DurationSection.
 *
 * @property currency          - Moneda seleccionada (incluye símbolo y código).
 * @property numericBudget     - Valor numérico del presupuesto (ya parseado).
 * @property selectedPeriod    - Opción de período actualmente seleccionada.
 * @property customDays        - Valor del campo de días personalizados (string).
 * @property error             - Mensaje de error de validación (null si no hay error).
 * @property actualDays        - Número real de días (calculado: período fijo o custom).
 * @property dailyBudget       - Presupuesto diario calculado (presupuesto / días).
 * @property isDaysValid       - Indica si la duración es válida (true para períodos fijos, validado en custom).
 * @property getPeriodDisplayText - Función que retorna el texto a mostrar en el selector.
 * @property getInputStatus    - Función que retorna el estado visual del input personalizado.
 * @property onOpenModal       - Callback para abrir el modal de selección de período.
 * @property onCustomDaysChange - Callback para cambios en el campo de días personalizados.
 */
export interface DurationSectionProps {
  currency: Currency;
  numericBudget: number;
  selectedPeriod: PeriodOption;
  customDays: string;
  error: string | null;
  actualDays: number;
  dailyBudget: number;
  isDaysValid: boolean;
  getPeriodDisplayText: () => string;
  getInputStatus: () => "error" | "success" | "neutral";
  onOpenModal: () => void;
  onCustomDaysChange: (value: string) => void;
}