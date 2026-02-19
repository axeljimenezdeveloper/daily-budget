// ============================================================================
// PROPS DE LA SECCIÓN DE PLAN ACTUAL (PlanSection)
//
// Define las propiedades que recibe el componente PlanSection para mostrar
// el resumen del plan del usuario: presupuesto total, días restantes,
// modo cuidado y opción de editar plan.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - PlanSectionProps
// ----------------------------------------------------------------------------

/**
 * Props del componente PlanSection.
 *
 * @property totalBudget     - Presupuesto total inicial (número).
 * @property remainingDays   - Días restantes del período (número, calculado).
 * @property daysDuration    - Duración total del período en días.
 * @property isExtremeMode   - Indica si el modo cuidado está activado.
 * @property currency        - Símbolo de la moneda (ej. "$", "€").
 * @property onEditPress     - Callback al presionar "Editar plan".
 */
export interface PlanSectionProps {
  totalBudget: number;
  remainingDays: number;
  daysDuration: number;
  isExtremeMode: boolean;
  currency: string;
  onEditPress: () => void;
}