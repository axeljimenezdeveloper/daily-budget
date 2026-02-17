// ============================================================================
// HOOK PERSONALIZADO DE NAVEGACIÓN PARA EL FLUJO DE CONFIGURACIÓN
//
// Centraliza todas las acciones de navegación utilizadas en las pantallas
// de configuración (setup-currency, setup-budget, setup-duration).
// Encapsula la lógica de push, replace y back, así como la serialización
// de objetos complejos (Currency) mediante JSON.stringify para pasarlos
// como parámetros de ruta.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import { useRouter } from 'expo-router';

// ----------------------------------------------------------------------------
// TIPOS LOCALES
// ----------------------------------------------------------------------------
import { Currency } from '../types';
import { ROUTES } from '@/constants/navigation'; 

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * useSetupNavigation – Hook que expone funciones de navegación para el flujo setup.
 *
 * @returns Objeto con métodos:
 *  - navigateToBudget: Navega a la pantalla de presupuesto, serializando la moneda.
 *  - navigateToDuration: Navega a la pantalla de duración, serializando moneda y presupuesto.
 *  - navigateBack: Retrocede a la pantalla anterior.
 *  - navigateToOnboarding: Reemplaza la pila y vuelve al inicio del onboarding.
 *  - navigateToSuccess: Reemplaza la pila y va a la animación de éxito.
 */
export const useSetupNavigation = () => {
  const router = useRouter();

  // --------------------------------------------------------------------------
  // Navegación hacia adelante
  // --------------------------------------------------------------------------

  /**
   * Navega a la pantalla de ingreso de presupuesto (setup-budget).
   * Serializa el objeto Currency completo en un string JSON para preservar
   * todos sus campos (símbolo, código, nombre, bandera, locale).
   *
   * @param currency - Moneda seleccionada en el paso anterior.
   */
  const navigateToBudget = (currency: Currency) => {
    router.push({
      pathname: ROUTES.WELCOME.SETUP_BUDGET, 
      params: {
        currencyJSON: JSON.stringify(currency),
      },
    });
  };

  /**
   * Navega a la pantalla de selección de duración (setup-duration).
   * Transmite la moneda (serializada) y el presupuesto ingresado (string).
   *
   * @param currency - Moneda seleccionada.
   * @param budget   - Valor del presupuesto en formato string (preserva decimales).
   */
  const navigateToDuration = (currency: Currency, budget: string) => {
    router.push({
      pathname: ROUTES.WELCOME.SETUP_DURATION, 
      params: {
        currencyJSON: JSON.stringify(currency),
        budget: budget,
      },
    });
  };

  // --------------------------------------------------------------------------
  // Navegación hacia atrás y reemplazos
  // --------------------------------------------------------------------------

  /**
   * Retrocede a la pantalla anterior en la pila.
   * Se utiliza en el botón "Volver" de SetupStepLayout.
   */
  const navigateBack = () => {
    router.back();
  };

  /**
   * Reemplaza toda la pila y redirige a la primera pantalla de onboarding.
   * Se ejecuta cuando el usuario presiona "Volver" desde la selección de moneda
   * y no hay pantalla anterior en el stack (viene desde onboarding3).
   */
  const navigateToOnboarding = () => {
    router.replace(ROUTES.WELCOME.ONBOARDING1); 
  };

  /**
   * Reemplaza la pila y navega a la animación de éxito.
   * Se llama después de inicializar la bóveda (initVault) y marcar
   * el onboarding como completado.
   */
  const navigateToSuccess = () => {
    router.replace(ROUTES.ANIMATIONS.SUCCESS); 
  };

  // --------------------------------------------------------------------------
  // API pública del hook
  // --------------------------------------------------------------------------
  return {
    navigateToBudget,
    navigateToDuration,
    navigateBack,
    navigateToOnboarding,
    navigateToSuccess,
  };
};