// ============================================================================
// PROPS DEL LAYOUT BASE DE ONBOARDING
//
// Define las propiedades que recibe el componente OnboardingLayout.
// Este layout proporciona la estructura común a todas las pantallas del flujo
// de onboarding: contenedor principal, botón de saltar y área para el contenido
// específico de cada paso.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - OnboardingLayoutProps
// ----------------------------------------------------------------------------

/**
 * Propiedades del componente OnboardingLayout.
 *
 * Este componente actúa como envoltorio visual para todas las pantallas de
 * onboarding, asegurando consistencia en el fondo, el espaciado y la posición
 * del botón de salto. El contenido variable se inyecta mediante la prop
 * `children`.
 */
export interface OnboardingLayoutProps {
  /**
   * Contenido específico del paso de onboarding.
   * Normalmente es el componente OnboardingStep o JSX personalizado.
   * Se renderiza centrado vertical y horizontalmente dentro del contenedor.
   */
  children: React.ReactNode;

  /**
   * Función callback que se ejecuta al presionar el botón "Saltar".
   * Generalmente redirige al usuario fuera del flujo de onboarding,
   * típicamente a la animación de transición.
   */
  onSkip: () => void;

  /**
   * Texto personalizado para el botón de saltar.
   * Si no se proporciona, se utiliza el valor por defecto traducido
   * ('onboarding.skip').
   */
  skipButtonText?: string;

  /**
   * Índice del paso actual (0‑indexado).
   * Se utiliza internamente para controlar el indicador de progreso.
   * Ejemplo: 0 para el primer paso, 1 para el segundo, etc.
   */
  currentStep: number;

  /**
   * Número total de pasos del flujo de onboarding.
   * Necesario para dimensionar correctamente el indicador de progreso.
   * Normalmente 3, pero se mantiene configurable.
   */
  totalSteps: number;

  /**
   * Controla si se debe mostrar el indicador de progreso (puntos).
   * Actualmente el layout no implementa este indicador; la responsabilidad
   * se ha delegado al componente OnboardingStep. Se mantiene la prop para
   * posibles cambios futuros y para mantener consistencia con la interfaz.
   * @default false
   */
  showProgress?: boolean;
}