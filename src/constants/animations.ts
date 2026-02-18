// ============================================================================
// CONSTANTES DE ANIMACIÓN GLOBALES
//
// Centraliza duraciones, easings y configuraciones por defecto para todas
// las animaciones de la aplicación, garantizando consistencia visual.
// ============================================================================

import { Easing } from 'react-native';

export const ANIMATION = {
  /**
   * Duración estándar para transiciones de componentes de selección.
   * 200ms es un equilibrio entre suavidad y respuesta inmediata.
   */
  DURATION: 200,

  /**
   * Easing estándar: aceleración y desaceleración suave.
   * Ideal para movimientos que imitan interacciones físicas naturales.
   */
  EASING: Easing.inOut(Easing.ease),

  /**
   * Si se debe usar native driver por defecto en animaciones que lo soporten.
   * Transform y opacity pueden usar native driver; color no.
   */
  USE_NATIVE_DRIVER: true,
} as const;