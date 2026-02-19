// ============================================================================
// PROPS DEL MODAL DE SELECCIÓN DE IDIOMA (LanguageModal)
//
// Define las propiedades que recibe el componente LanguageModal para controlar
// su visibilidad, el idioma seleccionado y las acciones de selección/cierre.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - LanguageModalProps
// ----------------------------------------------------------------------------

/**
 * Props del componente LanguageModal.
 *
 * @property isOpen           - Controla si el modal está visible.
 * @property onClose          - Callback para cerrar el modal.
 * @property selectedLanguage - Idioma actualmente seleccionado ('es' | 'en').
 * @property onSelectLanguage - Callback que se ejecuta al elegir un idioma.
 * @property title            - Título del modal (opcional, por defecto traducido).
 */
export interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: 'es' | 'en';
  onSelectLanguage: (lang: 'es' | 'en') => void;
  title?: string;
}