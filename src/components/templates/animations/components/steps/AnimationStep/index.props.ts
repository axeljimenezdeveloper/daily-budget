// ============================================================================
// PROPS DEL COMPONENTE AnimationStep
//
// Define la interfaz de propiedades para el componente reutilizable que
// encapsula cada pantalla de animación. Este componente consume la configuración
// predefinida según la variante y se encarga de orquestar la UI, las
// traducciones y el temporizador de redirección automática.
// ============================================================================

import { AnimationVariant } from '../../../types';

export interface AnimationStepProps {
  // --------------------------------------------------------------------------
  // OBLIGATORIAS
  // --------------------------------------------------------------------------
  /**
   * Variante de animación.
   * Determina automáticamente: color, duración, ruta destino, tipo de contenido
   * del círculo (spinner/icono), padding del círculo y ancho del divisor.
   * Valores posibles: 'loading', 'transition', 'success'.
   */
  variant: AnimationVariant;

  // --------------------------------------------------------------------------
  // PERSONALIZACIÓN OPCIONAL (SOBRESCRIBEN LA CONFIGURACIÓN POR DEFECTO)
  // --------------------------------------------------------------------------
  /**
   * Título personalizado.
   * Si se omite, se usa la clave i18n `animations.[variant].title`.
   */
  title?: string;

  /**
   * Subtítulo personalizado.
   * Si se omite, se usa la clave i18n `animations.[variant].subtitle`.
   */
  subtitle?: string;

  /**
   * Color de acento personalizado.
   * Sobrescribe el color definido en la configuración de la variante.
   * Útil para casos excepcionales donde se requiere un color diferente.
   */
  accentColor?: string;

  /**
   * Deshabilita la redirección automática.
   * Por defecto, las variantes 'transition' y 'success' redirigen automáticamente
   * después de su duración. Activar esta flag evita dicha redirección.
   * @default false
   */
  disableAutoRedirect?: boolean;
}