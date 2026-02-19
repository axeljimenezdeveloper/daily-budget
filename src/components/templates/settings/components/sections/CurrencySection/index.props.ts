// ============================================================================
// PROPS DE LA SECCIÓN DE MONEDA (CurrencySection)
//
// Define las propiedades que recibe el componente CurrencySection para mostrar
// la moneda actual seleccionada por el usuario (solo lectura).
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - CurrencySectionProps
// ----------------------------------------------------------------------------

/**
 * Props del componente CurrencySection.
 *
 * @property currency - Símbolo de la moneda actual (ej. "$", "€", "Bs").
 */
export interface CurrencySectionProps {
  currency: string;
}