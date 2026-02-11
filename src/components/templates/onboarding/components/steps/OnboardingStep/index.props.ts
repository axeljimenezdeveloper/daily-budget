// ============================================================================
// PROPS DEL COMPONENTE ONBOARDINGSTEP (REEXPORTACIÓN)
//
// Este archivo actúa como puente entre la definición centralizada de tipos
// (ubicada en `types/index.ts`) y el componente OnboardingStep.
//
// Reexportar la interfaz base bajo el mismo nombre local permite:
//   - Mantener imports limpios dentro del componente (`./index.props`).
//   - Centralizar la documentación JSDoc en un único lugar (el archivo base).
//   - Facilitar futuras extensiones específicas del componente sin modificar
//     el contrato público del template.
// ============================================================================

// ----------------------------------------------------------------------------
// IMPORTACIÓN DEL TIPO BASE
// ----------------------------------------------------------------------------
// La interfaz original está completamente documentada con JSDoc en el archivo
// de tipos compartidos. Este alias no añade ni modifica propiedades.
import { OnboardingStepProps as BaseProps } from '../../../types';

// ----------------------------------------------------------------------------
// EXPORTACIÓN LOCAL
// ----------------------------------------------------------------------------
/**
 * Propiedades del componente OnboardingStep.
 *
 * @see {@link BaseProps} Documentación completa en `@/templates/onboarding/types`
 */
export type OnboardingStepProps = BaseProps;