// ============================================================================
// PROPS DEL LAYOUT BASE DE AJUSTES (SettingsLayout)
//
// Define las propiedades del componente que envuelve la pantalla de ajustes.
// Proporciona únicamente la estructura visual: contenedor con fondo, padding
// y ScrollView. No incluye título porque la pantalla ya tiene uno en el header.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - SettingsLayoutProps
// ----------------------------------------------------------------------------

/**
 * Propiedades del componente SettingsLayout.
 *
 * Este componente actúa como envoltorio visual para la pantalla de ajustes,
 * asegurando consistencia en el fondo, espaciado y comportamiento de scroll.
 * El contenido variable se inyecta mediante la prop `children`.
 */
export interface SettingsLayoutProps {
  /**
   * Contenido principal de la pantalla.
   * Normalmente son las secciones de ajustes (notificaciones, seguridad, etc.)
   * Se renderiza dentro de un ScrollView con padding inferior para respiro.
   */
  children: React.ReactNode;

  /**
   * Elemento opcional que se renderiza al final del ScrollView.
   * Puede usarse para mostrar la versión de la app o un pie de página.
   */
  footer?: React.ReactNode;
}