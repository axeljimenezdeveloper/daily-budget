// ============================================================================
// PROPS DE LA SECCIÓN DE MONEDA (CurrencySection)
//
// Define los parámetros que recibe el componente CurrencySection para
// mostrar la moneda seleccionada y abrir el modal de selección.
// ============================================================================

// ----------------------------------------------------------------------------
// IMPORTACIÓN DE TIPOS COMPARTIDOS
// ----------------------------------------------------------------------------
import { Currency } from "../../../types";

// ----------------------------------------------------------------------------
// INTERFAZ: CurrencySectionProps
// ----------------------------------------------------------------------------

/**
 * Props del componente CurrencySection.
 *
 * @property currency    - Moneda actualmente seleccionada (incluye símbolo, código, bandera, etc.).
 * @property onOpenModal - Callback que abre el modal de selección de moneda.
 *                         Se ejecuta al presionar el componente AppSelect.
 */
export interface CurrencySectionProps {
  currency: Currency;
  onOpenModal: () => void;
}