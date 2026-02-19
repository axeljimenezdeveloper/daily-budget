// ============================================================================
// PROPS DE LA SECCIÓN DE ZONA DE PELIGRO (DangerSection)
//
// Define las propiedades que recibe el componente DangerSection para mostrar
// el botón de reinicio de bóveda y abrir el modal de confirmación.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - DangerSectionProps
// ----------------------------------------------------------------------------

/**
 * Props del componente DangerSection.
 *
 * @property onResetPress - Callback que se ejecuta al presionar el botón de reinicio.
 *                          Normalmente abre el modal de confirmación.
 */
export interface DangerSectionProps {
  onResetPress: () => void;
}