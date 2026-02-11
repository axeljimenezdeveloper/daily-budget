// ============================================================================
// TIPOS COMPARTIDOS PARA EL TEMPLATE DE ANIMACIONES
//
// Este archivo define los tipos TypeScript utilizados en el template
// de animaciones. Centraliza las definiciones de tipos para mantener
// consistencia y facilitar el mantenimiento. Los tipos se infieren
// directamente desde las constantes para evitar duplicación y garantizar
// que estén siempre sincronizados con la configuración real.
// ============================================================================

import { ANIMATION_VARIANT_CONFIG } from '../constants';

// ----------------------------------------------------------------------------
// VARIANTES DE ANIMACIÓN
// ----------------------------------------------------------------------------
/**
 * Representa las variantes disponibles para las pantallas de animación.
 * Se infiere automáticamente de las claves del objeto ANIMATION_VARIANT_CONFIG.
 * 
 * Valores posibles:
 * - 'loading'    → Pantalla de carga inicial (splash personalizado)
 * - 'transition' → Transición entre onboarding y configuración
 * - 'success'    → Éxito al completar la configuración
 * 
 * Este tipo se utiliza en las props de AnimationStep y AnimationLayout,
 * así como en el hook useAnimationTimer para asociar configuraciones.
 */
export type AnimationVariant = keyof typeof ANIMATION_VARIANT_CONFIG;

// ----------------------------------------------------------------------------
// CONFIGURACIÓN ESPECÍFICA DE UNA VARIANTE
// ----------------------------------------------------------------------------
/**
 * Tipo que representa el objeto de configuración completo para una variante.
 * Se infiere dinámicamente tomando el tipo del valor asociado a una clave
 * de ANIMATION_VARIANT_CONFIG.
 * 
 * Contiene las siguientes propiedades:
 * - color:         string                 → Color de acento (ej. PALETTE.sunsetOrange)
 * - duration:      number                → Milisegundos antes de redirigir
 * - destination:   string | null         → Ruta de destino o null si no redirige
 * - dividerWidth:  number               → Ancho del divisor decorativo
 * - circlePadding: 'l' | 'xl'           → Clave de padding para el círculo
 * - isSpinner:     boolean              → true = AppSpinner, false = AppIcon
 * 
 * Este tipo es útil para funciones utilitarias o hooks que necesiten
 * acceder a la configuración completa de una variante.
 */
export type AnimationVariantConfig = typeof ANIMATION_VARIANT_CONFIG[AnimationVariant];

// ----------------------------------------------------------------------------
// PARÁMETROS DE RUTA (PREVISIÓN FUTURA)
// ----------------------------------------------------------------------------
/**
 * Define los parámetros de navegación que pueden pasarse a las pantallas
 * de animación. Actualmente ninguna pantalla de animación recibe parámetros,
 * pero se define explícitamente como `Record<string, never>` para:
 * 
 * 1. Mantener consistencia con otros templates (onboarding, setup).
 * 2. Facilitar futuras extensiones sin romper la interfaz.
 * 3. Proporcionar tipado explícito en el enrutador.
 * 
 * Si en el futuro alguna animación necesitara parámetros (ej. mensaje dinámico),
 * este tipo se puede extender sin afectar el uso existente.
 */
export type AnimationRouteParams = Record<string, never>;

// ----------------------------------------------------------------------------
// RE-EXPORTACIÓN DE TIPOS DESDE CONSTANTES
// ----------------------------------------------------------------------------
/**
 * Re-exporta AnimationVariant desde el archivo de constantes bajo un alias.
 * Esto es útil para:
 * - Evitar colisiones de nombres en imports.
 * - Mantener un único punto de definición (las constantes).
 * - Mejorar la legibilidad en algunos contextos.
 * 
 * Uso típico:
 *   import { AnimationVariantType } from '@/components/templates/animations/types';
 */
export type {
  AnimationVariant as AnimationVariantType,
} from '../constants';