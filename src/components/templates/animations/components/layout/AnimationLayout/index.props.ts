// ============================================================================
// PROPS DEL COMPONENTE AnimationLayout
//
// Define la interfaz de propiedades para el layout base de todas las pantallas
// de animación. Este componente es utilizado internamente por AnimationStep
// y también puede ser usado directamente si se requiere máxima personalización.
// ============================================================================

import { ReactNode } from 'react';
import { AnimationVariant } from '../../../types';

export interface AnimationLayoutProps {
  // --------------------------------------------------------------------------
  // CONTENIDO PRINCIPAL (OBLIGATORIO)
  // --------------------------------------------------------------------------
  /** 
   * Título principal de la pantalla.
   * Puede ser un string (se renderiza con AppText variant="h1") o un nodo React
   * personalizado (ej. APP_NAME con estilos específicos).
   */
  title: ReactNode;

  /**
   * Contenido del círculo decorativo.
   * Generalmente un AppSpinner o un AppIcon, pero puede ser cualquier ReactNode.
   */
  circleContent: ReactNode;

  // --------------------------------------------------------------------------
  // CONTENIDO OPCIONAL
  // --------------------------------------------------------------------------
  /**
   * Subtítulo descriptivo.
   * Si es string se renderiza con AppText variant="body" color="secondary";
   * si es ReactNode se renderiza directamente.
   */
  subtitle?: ReactNode;

  /**
   * Contenido extra que se renderiza debajo del subtítulo.
   * Útil para elementos como el slogan en la pantalla de éxito.
   */
  extraContent?: ReactNode;

  // --------------------------------------------------------------------------
  // PERSONALIZACIÓN VISUAL
  // --------------------------------------------------------------------------
  /**
   * Color de acento para el divisor y para generar el fondo del círculo.
   * Si no se provee y tampoco hay variant, se usa PALETTE.sunsetOrange.
   */
  accentColor?: string;

  /**
   * Color de fondo específico para el círculo.
   * Si no se provee, se genera automáticamente a partir de accentColor con 5% de opacidad.
   */
  circleBackgroundColor?: string;

  /**
   * Controla la visibilidad del divisor decorativo entre título y subtítulo.
   * @default true
   */
  showDivider?: boolean;

  /**
   * Ancho del divisor en píxeles.
   * @default DIVIDER_WIDTH.DEFAULT (40)
   */
  dividerWidth?: number;

  /**
   * Padding interior del círculo.
   * Puede ser una key de SPACING (ej. 'l', 'xl') o un valor numérico directo.
   * @default SPACING[CIRCLE_PADDING.DEFAULT] (SPACING.l)
   */
  circlePadding?: keyof typeof import('@/constants/metrics').SPACING | number;

  /**
   * Texto personalizado para el footer de versión.
   * Si no se provee, se usa getAppInfoForFooter(true, 'Alpha').
   */
  footerText?: string;

  // --------------------------------------------------------------------------
  // MODO DECLARATIVO (OPCIONAL)
  // --------------------------------------------------------------------------
  /**
   * Variante de animación.
   * Si se provee, establece automáticamente accentColor, dividerWidth y circlePadding
   * a partir de ANIMATION_VARIANT_CONFIG, a menos que se sobrescriban explícitamente.
   */
  variant?: AnimationVariant;
}