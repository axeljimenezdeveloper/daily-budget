// ============================================================================
// PROPS DE LA SECCIÓN DE HÁPTICOS (HapticsSection)
//
// Define las propiedades que recibe el componente HapticsSection para
// gestionar la opción de vibración.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - HapticsSectionProps
// ----------------------------------------------------------------------------

/**
 * Props del componente HapticsSection.
 *
 * @property hapticFeedback - Indica si la respuesta háptica está activada.
 * @property onToggle       - Callback al cambiar el switch (recibe el nuevo valor).
 */
export interface HapticsSectionProps {
  hapticFeedback: boolean;
  onToggle: (value: boolean) => void;
}