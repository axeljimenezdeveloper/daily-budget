// ============================================================================
// PROPS DEL LAYOUT DE LA GUÍA (GuideLayout)
//
// Define las propiedades que recibe el componente GuideLayout.
// Este layout proporciona la estructura visual común a la pantalla de guía:
// fondo, padding, ScrollView y área para el contenido de las preguntas frecuentes.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - GuideLayoutProps
// ----------------------------------------------------------------------------

/**
 * Propiedades del componente GuideLayout.
 *
 * Este componente actúa como envoltorio visual para la pantalla de guía,
 * asegurando consistencia en el fondo, espaciado y comportamiento de scroll.
 * El contenido variable se inyecta mediante la prop `children`.
 */
export interface GuideLayoutProps {
  /**
   * Contenido principal de la pantalla.
   * Normalmente será la lista de AccordionItems (FAQ).
   * Se renderiza dentro de un ScrollView con padding inferior para respiro.
   */
  children: React.ReactNode;

  /**
   * Elemento opcional que se renderiza al final del ScrollView.
   * Puede usarse para mostrar un mensaje de agradecimiento o versión.
   */
  footer?: React.ReactNode;
}