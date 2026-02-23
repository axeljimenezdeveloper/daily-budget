// ============================================================================
// PROPS DEL LAYOUT BASE DEL DASHBOARD (DashboardLayout)
// ============================================================================

export interface DashboardLayoutProps {
  /**
   * Contenido principal de la pantalla.
   * Se renderiza dentro de un ScrollView.
   */
  children: React.ReactNode;

  /**
   * Función callback para el evento de refresh (pull-to-refresh).
   * Si se proporciona, se habilita el RefreshControl.
   */
  onRefresh?: () => void;

  /**
   * Estado de refresco (activo o no).
   */
  refreshing?: boolean;

  /**
   * Color del indicador de refresco.
   * @default PALETTE.sunsetOrange
   */
  refreshControlColor?: string;

  /**
   * Componente de botón flotante (FAB) que se renderiza fuera del ScrollView,
   * anclado en la parte inferior derecha con respeto al área segura.
   */
  fab?: React.ReactNode;
}