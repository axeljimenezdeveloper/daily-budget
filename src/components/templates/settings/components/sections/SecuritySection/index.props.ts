// ============================================================================
// PROPS DE LA SECCIÓN DE SEGURIDAD (SecuritySection)
//
// Define las propiedades que recibe el componente SecuritySection para
// gestionar la opción de bloqueo biométrico.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - SecuritySectionProps
// ----------------------------------------------------------------------------

/**
 * Props del componente SecuritySection.
 *
 * @property isBiometricEnabled        - Indica si el bloqueo biométrico está activado.
 * @property onToggle                  - Callback al cambiar el switch (recibe el nuevo valor).
 * @property isLoading                  - Indica si hay una operación de autenticación en curso.
 * @property isAvailabilityLoading      - Indica si se está verificando la disponibilidad del hardware.
 * @property isDisabled                 - Indica si el switch debe estar deshabilitado (ej. hardware no disponible).
 */
export interface SecuritySectionProps {
  isBiometricEnabled: boolean;
  onToggle: (value: boolean) => void;
  isLoading: boolean;
  isAvailabilityLoading: boolean;
  isDisabled?: boolean;
}