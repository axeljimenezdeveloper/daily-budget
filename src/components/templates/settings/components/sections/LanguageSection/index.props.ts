// ============================================================================
// PROPS DE LA SECCIÓN DE IDIOMA (LanguageSection)
//
// Define las propiedades que recibe el componente LanguageSection para mostrar
// el idioma actual y abrir el modal de selección.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - LanguageSectionProps
// ----------------------------------------------------------------------------

/**
 * Props del componente LanguageSection.
 *
 * @property language - Código de idioma actual ('es' | 'en').
 * @property onPress  - Callback que se ejecuta al presionar la fila para abrir el modal.
 */
export interface LanguageSectionProps {
  language: 'es' | 'en';
  onPress: () => void;
}