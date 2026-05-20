// ============================================================================
// PROPS DEL LAYOUT DE PROTOCOLOS (ProtocolsLayout)
//
// Define las propiedades que recibe el componente ProtocolsLayout.
// Este layout proporciona la estructura visual común a la pantalla de protocolos:
// fondo, padding, ScrollView y área para el contenido de texto.
// ============================================================================

export interface ProtocolsLayoutProps {
  /**
   * Contenido principal de la pantalla.
   * Normalmente serán las secciones de texto (títulos y párrafos).
   * Se renderiza dentro de un ScrollView con padding inferior para respiro.
   */
  children: React.ReactNode;

  /**
   * Elemento opcional que se renderiza al final del ScrollView.
   * Puede usarse para mostrar la versión de la app o un mensaje de agradecimiento.
   */
  footer?: React.ReactNode;
}