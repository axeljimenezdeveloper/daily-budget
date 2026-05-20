// ============================================================================
// PROPS DEL COMPONENTE ACCORDION ITEM
//
// Define las propiedades que recibe el componente AccordionItem para renderizar
// una pregunta, su respuesta y controlar el estado de apertura.
// ============================================================================

export interface AccordionItemProps {
  /** Ícono de Ionicons que representa la categoría de la pregunta */
  iconName: string;

  /** Texto de la pregunta (ya traducido desde i18n) */
  question: string;

  /** Texto de la respuesta (ya traducido desde i18n) */
  answer: string;

  /** Indica si el contenido debe mostrarse expandido */
  isOpen: boolean;

  /** Callback que se ejecuta al presionar el ítem (para alternar el estado) */
  onPress: () => void;

  /** Indica si es el último elemento (para no añadir margen inferior extra) */
  isLast?: boolean;
}