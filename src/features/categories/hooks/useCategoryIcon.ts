// ============================================================================
// HOOK DEL FEATURE CATEGORÍAS: useCategoryIcon
//
// Retorna el nombre del icono de Ionicons correspondiente a un categoryId.
// Centraliza la lógica de mapeo para que cualquier componente que muestre
// categorías use el mismo icono consistente.
//
// Uso:
//   const iconName = useCategoryIcon(transaction.category);
//   <AppIcon name={iconName} ... />
// ============================================================================

import { CATEGORY_ICON_MAP, DEFAULT_CATEGORY_ICON } from '../constants';

/**
 * Obtiene el nombre del icono para una categoría.
 *
 * @param categoryId - Identificador de la categoría (ej. 'food', 'transport')
 * @returns Nombre del icono de Ionicons (ej. 'fast-food-outline')
 *
 * @example
 * const icon = useCategoryIcon('food'); // 'fast-food-outline'
 * const icon = useCategoryIcon('unknown'); // 'ellipsis-horizontal-outline'
 */
export const useCategoryIcon = (categoryId: string): string => {
  return CATEGORY_ICON_MAP[categoryId] || DEFAULT_CATEGORY_ICON;
};