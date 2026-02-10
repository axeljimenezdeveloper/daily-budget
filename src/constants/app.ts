/**
 * Información de la aplicación - Centralizada y reutilizable
 * Esta información se sincroniza con package.json en tiempo de build
 */

export const APP_INFO = {
  // Información básica
  NAME: 'SURV' as const,
  VERSION: '1.30.0' as const,
  
  // ---------- PARA USO FUTURO ----------
  // DISPLAY_NAME: 'SURV - Tu compañero de bolsillo' as const,
  
  // Entorno
  // ENVIRONMENT: __DEV__ ? 'development' : 'production' as const,
  // BUILD_TYPE: 'alpha' as const, // alpha, beta, stable
  
  // URLs y soporte
  // SUPPORT_EMAIL: 'soporte@survapp.com' as const,
  // WEBSITE: 'https://survapp.com' as const,
  
  // Configuración específica por entorno
  // CONFIG: {
  //   LOG_LEVEL: __DEV__ ? 'debug' : 'error' as const,
  //   ENABLE_ANALYTICS: !__DEV__,
  // }
} as const;

// Exportar alias comúnmente usados (solo los necesarios ahora)
export const APP_NAME = APP_INFO.NAME;
export const APP_VERSION = APP_INFO.VERSION;