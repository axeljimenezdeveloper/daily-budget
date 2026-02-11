// ============================================================================
// HOOK PERSONALIZADO: useOnboardingNavigation
//
// Encapsula la lógica de navegación específica del flujo de onboarding.
// Centraliza las transiciones entre pasos y la acción de salto, evitando
// duplicar el uso de router.push/replace en cada pantalla.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS
// ----------------------------------------------------------------------------
import { useRouter } from 'expo-router';

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------
/**
 * Proporciona funciones de navegación para el flujo de onboarding.
 *
 * @returns Objeto con los métodos:
 * - goToNextStep: Avanza al siguiente paso o finaliza el onboarding.
 * - skipOnboarding: Salta todo el flujo y redirige a la animación de transición.
 */
export const useOnboardingNavigation = () => {
  const router = useRouter();

  // --------------------------------------------------------------------------
  // goToNextStep
  // --------------------------------------------------------------------------
  /**
   * Navega al siguiente paso del onboarding.
   *
   * @param currentStep - Número del paso actual (1-indexado).
   *
   * Comportamiento:
   * - Si currentStep < 3: hace push a la siguiente pantalla (onboardingX+1).
   * - Si currentStep === 3: hace replace a la animación de transición,
   *   eliminando las pantallas de onboarding del historial.
   */
  const goToNextStep = (currentStep: number) => {
    if (currentStep < 3) {
      router.push(`/(welcome)/onboarding${currentStep + 1}`);
    } else {
      router.replace('/(animations)/transition');
    }
  };

  // --------------------------------------------------------------------------
  // skipOnboarding
  // --------------------------------------------------------------------------
  /**
   * Salta el flujo de onboarding completo.
   *
   * Redirige directamente a la animación de transición usando `replace`
   * para que el usuario no pueda regresar al onboarding con el botón nativo
   * de retroceso.
   */
  const skipOnboarding = () => {
    router.replace('/(animations)/transition');
  };

  // --------------------------------------------------------------------------
  // RETORNO DEL HOOK
  // --------------------------------------------------------------------------
  return {
    goToNextStep,
    skipOnboarding,
  };
};