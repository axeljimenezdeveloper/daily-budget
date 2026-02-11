// ============================================================================
// PROPS DEL LAYOUT BASE DE CONFIGURACIÓN (SetupStepLayout)
//
// Este archivo re-exporta la interfaz SetupStepLayoutProps desde types/index.ts
// para mantener la coherencia y permitir que el componente importe sus props
// desde un archivo adjunto.
// ============================================================================

// ----------------------------------------------------------------------------
// RE-EXPORTACIÓN DE TIPOS BASE
// ----------------------------------------------------------------------------

/**
 * Props del componente SetupStepLayout.
 * 
 * Ver documentación completa en @/components/templates/setup/types.
 * 
 * @see {@link SetupStepLayoutProps} en '../../../types'
 */
import { SetupStepLayoutProps as BaseProps } from '../../../types';

export type SetupStepLayoutProps = BaseProps;