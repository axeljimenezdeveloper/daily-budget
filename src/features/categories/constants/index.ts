// ============================================================================
// CONSTANTES DEL FEATURE CATEGORÍAS
//
// Define las categorías predefinidas para los gastos, utilizadas en el selector
// del formulario de registro y en la visualización de gastos.
//
// Este archivo es la fuente única de verdad para:
//   - Lista de categorías disponibles (CATEGORIES)
//   - Mapeo de ID → icono (CATEGORY_ICON_MAP)
//   - Tipos asociados (CategoryId)
// ============================================================================

// ----------------------------------------------------------------------------
// CATEGORÍAS DISPONIBLES
// ----------------------------------------------------------------------------

/**
 * Lista de categorías de gastos disponibles para el usuario.
 * Cada categoría incluye:
 *   - id: identificador único (coincide con la clave en i18n)
 *   - labelKey: clave de traducción (apunta a categories.* en en/es.json)
 *   - icon: nombre del icono de Ionicons para representación visual
 *
 * El orden es el que se mostrará en los selectores (ej. formulario de gasto).
 */
export const CATEGORIES = [
  {
    id: 'food',
    labelKey: 'categories.food',
    icon: 'fast-food-outline',
  },
  {
    id: 'transport',
    labelKey: 'categories.transport',
    icon: 'car-outline',
  },
  {
    id: 'leisure',
    labelKey: 'categories.leisure',
    icon: 'game-controller-outline',
  },
  {
    id: 'health',
    labelKey: 'categories.health',
    icon: 'medical-outline',
  },
  {
    id: 'other',
    labelKey: 'categories.other',
    icon: 'ellipsis-horizontal-outline',
  },
] as const;

// ----------------------------------------------------------------------------
// TIPO AUXILIAR
// ----------------------------------------------------------------------------

/**
 * Tipo que representa el identificador de una categoría.
 * Se infiere automáticamente de las claves 'id' del array CATEGORIES.
 *
 * @example
 * type MyCategory = CategoryId; // 'food' | 'transport' | 'leisure' | 'health' | 'other'
 */
export type CategoryId = typeof CATEGORIES[number]['id'];

// ----------------------------------------------------------------------------
// MAPEO DE ICONOS POR ID (para uso en ExpenseRow, ExpenseDetailModal, etc.)
// ----------------------------------------------------------------------------

/**
 * Objeto que asocia cada categoryId con su icono de Ionicons.
 * Se construye a partir de CATEGORIES para garantizar consistencia.
 *
 * @example
 * const icon = CATEGORY_ICON_MAP['food']; // 'fast-food-outline'
 */
export const CATEGORY_ICON_MAP: Record<string, string> = CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat.id] = cat.icon;
    return acc;
  },
  {} as Record<string, string>
);

/**
 * Icono por defecto cuando el categoryId no está en el mapa
 * (ej. datos legacy, categoría desconocida o migración incompleta).
 * Coincide con el icono de la categoría 'other'.
 */
export const DEFAULT_CATEGORY_ICON = 'ellipsis-horizontal-outline';