// ============================================================================
// CONSTANTES DEL TEMPLATE ADD-EXPENSE
//
// Define las categorías predefinidas para los gastos, utilizadas en el selector
// del formulario de registro. Cada categoría incluye:
//   - id: identificador único (coincide con la clave en i18n)
//   - labelKey: clave de traducción (apunta a categories.* en en/es.json)
//   - icon: nombre del icono de Ionicons para representación visual
// ============================================================================

// ----------------------------------------------------------------------------
// CATEGORÍAS DISPONIBLES
// ----------------------------------------------------------------------------

/**
 * Lista de categorías de gastos disponibles para el usuario.
 * Se utiliza en el componente AppSelect del formulario.
 * El orden es el que se mostrará en el dropdown.
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
// TIPO AUXILIAR (INFERIDO)
// ----------------------------------------------------------------------------

/**
 * Tipo que representa el identificador de una categoría.
 * Se infiere automáticamente de las claves 'id' del array CATEGORIES.
 * Ejemplo: 'food' | 'transport' | 'leisure' | 'health' | 'other'
 */
export type CategoryId = typeof CATEGORIES[number]['id'];