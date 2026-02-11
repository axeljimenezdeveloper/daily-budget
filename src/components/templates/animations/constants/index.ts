// ============================================================================
// CONSTANTES GLOBALES PARA EL TEMPLATE DE ANIMACIONES
//
// Este archivo centraliza todos los valores fijos y configuraciones
// utilizadas por las pantallas de animación (loading, transition, success).
// Sigue el mismo patrón que los archivos de constantes en onboarding y setup,
// permitiendo un mantenimiento centralizado y tipado fuerte.
// ============================================================================

import { PALETTE } from '@/constants/colors';

// ----------------------------------------------------------------------------
// DURACIONES (en milisegundos)
// ----------------------------------------------------------------------------
/**
 * Tiempos de espera antes de la redirección automática.
 * - LOADING: 0ms → No redirige, permanece hasta decisión del layout raíz.
 * - TRANSITION: 1500ms → Tiempo suficiente para leer el mensaje de transición.
 * - SUCCESS: 1800ms → Un poco más largo para celebrar visualmente el logro.
 */
export const ANIMATION_DURATIONS = {
  TRANSITION: 1500,
  SUCCESS: 1800,
  LOADING: 0,
} as const;

// ----------------------------------------------------------------------------
// COLORES ASOCIADOS POR VARIANTE
// ----------------------------------------------------------------------------
/**
 * Colores de acento para cada variante.
 * Se extraen directamente de la paleta global para mantener consistencia.
 * - LOADING: naranja (sunsetOrange) → Energía, atención.
 * - TRANSITION: azul (infoBlue) → Neutral, informativo.
 * - SUCCESS: verde (successGreen) → Logro, completado.
 */
export const ANIMATION_COLORS = {
  LOADING: PALETTE.sunsetOrange,
  TRANSITION: PALETTE.infoBlue,
  SUCCESS: PALETTE.successGreen,
} as const;

// ----------------------------------------------------------------------------
// RUTAS DE DESTINO (para redirección automática)
// ----------------------------------------------------------------------------
/**
 * Rutas de Expo Router a las que se redirige automáticamente.
 * - TRANSITION: Primera pantalla de configuración (setup-currency).
 * - SUCCESS: Sección principal de la aplicación (main).
 * - LOADING: No tiene ruta (se maneja externamente).
 */
export const ANIMATION_ROUTES = {
  TRANSITION: '/(welcome)/setup-currency',
  SUCCESS: '/(main)',
} as const;

// ----------------------------------------------------------------------------
// ANCHO DEL DIVISOR DECORATIVO
// ----------------------------------------------------------------------------
/**
 * Ancho en píxeles del divisor (línea) entre título y subtítulo.
 * - DEFAULT: 40px → Usado en loading y transition.
 * - SUCCESS: 60px → Más ancho para enfatizar el logro.
 */
export const DIVIDER_WIDTH = {
  DEFAULT: 40,
  SUCCESS: 60,
} as const;

// ----------------------------------------------------------------------------
// TAMAÑOS DE CÍRCULO (padding interior)
// ----------------------------------------------------------------------------
/**
 * Claves de SPACING para el padding interior del círculo decorativo.
 * - DEFAULT: 'l' → Padding estándar (16px aproximadamente).
 * - LARGE: 'xl' → Padding más grande (24px) para acomodar el icono de éxito.
 */
export const CIRCLE_PADDING = {
  DEFAULT: 'l',
  LARGE: 'xl',
} as const;

// ----------------------------------------------------------------------------
// CONFIGURACIÓN COMPLETA POR VARIANTE
// ----------------------------------------------------------------------------
/**
 * Objeto maestro que define todas las propiedades específicas de cada variante.
 * Este objeto es la única fuente de verdad para las pantallas de animación.
 * Cada entrada contiene:
 * - color:        Color de acento (desde ANIMATION_COLORS).
 * - duration:     Duración antes de redirigir (desde ANIMATION_DURATIONS).
 * - destination:  Ruta destino (null o desde ANIMATION_ROUTES).
 * - dividerWidth: Ancho del divisor (desde DIVIDER_WIDTH).
 * - circlePadding: Clave de padding (desde CIRCLE_PADDING).
 * - isSpinner:    true → usa AppSpinner; false → usa AppIcon.
 */
export const ANIMATION_VARIANT_CONFIG = {
  loading: {
    color: ANIMATION_COLORS.LOADING,
    duration: ANIMATION_DURATIONS.LOADING,
    destination: null,
    dividerWidth: DIVIDER_WIDTH.DEFAULT,
    circlePadding: CIRCLE_PADDING.DEFAULT,
    isSpinner: true,
  },
  transition: {
    color: ANIMATION_COLORS.TRANSITION,
    duration: ANIMATION_DURATIONS.TRANSITION,
    destination: ANIMATION_ROUTES.TRANSITION,
    dividerWidth: DIVIDER_WIDTH.DEFAULT,
    circlePadding: CIRCLE_PADDING.DEFAULT,
    isSpinner: true,
  },
  success: {
    color: ANIMATION_COLORS.SUCCESS,
    duration: ANIMATION_DURATIONS.SUCCESS,
    destination: ANIMATION_ROUTES.SUCCESS,
    dividerWidth: DIVIDER_WIDTH.SUCCESS,
    circlePadding: CIRCLE_PADDING.LARGE,
    isSpinner: false,
  },
} as const;

// ----------------------------------------------------------------------------
// TIPO AUXILIAR PARA LAS VARIANTES
// ----------------------------------------------------------------------------
/**
 * Tipo literal que representa las variantes disponibles.
 * Se infiere automáticamente de las claves de ANIMATION_VARIANT_CONFIG.
 * Útil para props y tipado estricto en componentes y hooks.
 */
export type AnimationVariant = keyof typeof ANIMATION_VARIANT_CONFIG;