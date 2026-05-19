// ============================================================================
// CONSTANTES DE NAVEGACIÓN
//
// Define todas las rutas utilizadas en la aplicación para evitar strings mágicos
// y facilitar el mantenimiento. Debe coincidir con la estructura de carpetas
// de Expo Router.
// ============================================================================

export const ROUTES = {
  // Pantallas sueltas en la raíz
  INDEX: '/',

  // Onboarding
  WELCOME: {
    ONBOARDING1: '/(welcome)/onboarding1',
    ONBOARDING2: '/(welcome)/onboarding2',
    ONBOARDING3: '/(welcome)/onboarding3',
    SETUP_CURRENCY: '/(welcome)/setup-currency',
    SETUP_BUDGET: '/(welcome)/setup-budget',
    SETUP_DURATION: '/(welcome)/setup-duration',
  },

  // Animaciones
  ANIMATIONS: {
    LOADING: '/(animations)/loading',
    TRANSITION: '/(animations)/transition',
    SUCCESS: '/(animations)/success',
  },

  // Autenticación biométrica
  AUTH: {
    BIOMETRIC: '/(auth)/biometric',
  },

  // Sección principal (después del onboarding)
  MAIN: {
    INDEX: '/(main)',
    HISTORY: '/(main)/history',
    SETTINGS: '/(main)/settings',
    DEBUG_RESET: '/(main)/debug-reset',
  },
} as const;