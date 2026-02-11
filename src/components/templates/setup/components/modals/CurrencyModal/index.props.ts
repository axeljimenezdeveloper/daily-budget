// ============================================================================
// PROPS DEL MODAL DE SELECCIÓN DE MONEDA (CurrencyModal)
//
// Define los parámetros que recibe el componente CurrencyModal para controlar
// su visibilidad, la moneda seleccionada y las acciones de selección/cierre.
// ============================================================================

// ----------------------------------------------------------------------------
// IMPORTACIÓN DE TIPOS COMPARTIDOS
// ----------------------------------------------------------------------------
import { Currency } from "../../../types";

// ----------------------------------------------------------------------------
// INTERFAZ: CurrencyModalProps
// ----------------------------------------------------------------------------

/**
 * Props del componente CurrencyModal.
 *
 * @property isOpen           - Controla si el modal está visible.
 * @property onClose          - Callback para cerrar el modal.
 * @property selectedCurrency - Moneda actualmente seleccionada (resaltada en la lista).
 * @property onSelectCurrency - Callback que se ejecuta al elegir una moneda.
 *                              Recibe el objeto Currency completo.
 */
export interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
}