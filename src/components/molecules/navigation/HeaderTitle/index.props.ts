// ============================================================================
// PROPS DEL COMPONENTE HEADER TITLE
// ============================================================================

export interface HeaderTitleProps {
  /** Clave i18n para el título de la pantalla */
  i18nKey: string;
  /** Texto por defecto si no se encuentra la clave */
  fallback?: string;
}