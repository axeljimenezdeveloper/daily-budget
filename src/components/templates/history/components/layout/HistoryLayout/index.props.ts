// ============================================================================
// PROPS DEL LAYOUT BASE DEL HISTORIAL (HistoryLayout)
//
// Define las propiedades del componente que envuelve la pantalla de historial.
// Proporciona únicamente la estructura visual: contenedor con safe area, fondo
// y ScrollView. No incluye título porque la pantalla ya tiene uno en el header
// (definido en main/_layout.tsx).
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - HistoryLayoutProps
// ----------------------------------------------------------------------------

/**
 * Propiedades del componente HistoryLayout.
 *
 * Este componente actúa como envoltorio visual para la pantalla de historial,
 * asegurando consistencia en el fondo, espaciado y comportamiento de scroll.
 * El contenido variable se inyecta mediante la prop `children`.
 */
export interface HistoryLayoutProps {
  /**
   * Contenido principal de la pantalla.
   * Normalmente será ExpensesList (cuando hay gastos) o EmptyState.
   * Se renderiza dentro de un ScrollView con padding inferior para respiro.
   */
  children: React.ReactNode;

  /**
   * Elemento opcional que se renderiza al final del ScrollView.
   * Puede usarse para mostrar la versión de la app o un pie de página.
   */
  footer?: React.ReactNode;
}