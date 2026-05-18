// ============================================================================
// FEATURE CATEGORÍAS – PUNTO DE ENTRADA PRINCIPAL
//
// Exporta todo lo necesario para usar categorías en otros módulos de la app.
// Los componentes y hooks deben importar desde aquí en lugar de acceder
// directamente a las subcarpetas.
// ============================================================================

// ----------------------------------------------------------------------------
// CONSTANTES Y TIPOS
// ----------------------------------------------------------------------------
export {
  CATEGORIES,
  CATEGORY_ICON_MAP,
  DEFAULT_CATEGORY_ICON,
  type CategoryId,
} from './constants';

// ----------------------------------------------------------------------------
// HOOKS
// ----------------------------------------------------------------------------
export { useCategoryIcon } from './hooks/useCategoryIcon';