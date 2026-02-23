// ============================================================================
// CONSTANTES DE LA APLICACIÓN - "Metadatos centralizados de Vulpis Days"
//
// Este archivo define las constantes fundamentales de la aplicación que son
// utilizadas en múltiples componentes y módulos. Centraliza información como
// el nombre, versión y configuraciones futuras, asegurando consistencia
// en toda la aplicación y facilitando el mantenimiento.
// ============================================================================

// ----------------------------------------------------------------------------
// OBJETO DE INFORMACIÓN DE LA APLICACIÓN - APP_INFO
// ----------------------------------------------------------------------------
// Contiene todos los metadatos de la aplicación en un solo objeto inmutable.
// Esta información debería sincronizarse automáticamente con package.json
// durante el proceso de build, aunque actualmente se mantiene manualmente.
// Se define como 'as const' para garantizar inferencia de tipos literales.
export const APP_INFO = {
  // --------------------------------------------------------------------------
  // INFORMACIÓN BÁSICA (EN USO ACTUAL)
  // --------------------------------------------------------------------------
  // NAME: Nombre oficial de la aplicación, utilizado en branding y UI
  // VERSION: Versión actual de la aplicación en formato semántico (MAJOR.MINOR.PATCH)
  NAME: 'Vulpis Days' as const,
  VERSION: '1.40.0' as const,
  
  // --------------------------------------------------------------------------
  // PARA USO FUTURO - DESCOMENTAR SEGÚN NECESIDAD
  // --------------------------------------------------------------------------
  // DISPLAY_NAME: Nombre completo para mostrar en tiendas o pantallas de inicio
  // DISPLAY_NAME: 'Vulpis Days - Tu compañero de bolsillo' as const,
  
  // --------------------------------------------------------------------------
  // CONFIGURACIÓN DE ENTORNO
  // --------------------------------------------------------------------------
  // ENVIRONMENT: Determina si la aplicación está en desarrollo o producción
  // BUILD_TYPE: Indica la fase de desarrollo (alpha, beta, estable)
  // ENVIRONMENT: __DEV__ ? 'development' : 'production' as const,
  // BUILD_TYPE: 'alpha' as const, // alpha, beta, stable
  
  // --------------------------------------------------------------------------
  // INFORMACIÓN DE CONTACTO Y SOPORTE
  // --------------------------------------------------------------------------
  // SUPPORT_EMAIL: Correo para soporte técnico y retroalimentación de usuarios
  // WEBSITE: URL oficial de la aplicación para más información
  // SUPPORT_EMAIL: 'soporte@vulpisdaysapp.com' as const,
  // WEBSITE: 'https://vulpisdaysapp.com' as const,
  
  // --------------------------------------------------------------------------
  // CONFIGURACIÓN ESPECÍFICA POR ENTORNO
  // --------------------------------------------------------------------------
  // CONFIG: Objeto con configuraciones que varían según el entorno de ejecución
  // LOG_LEVEL: Nivel de detalle de logs (debug en desarrollo, error en producción)
  // ENABLE_ANALYTICS: Controla si se recopilan datos analíticos
  // CONFIG: {
  //   LOG_LEVEL: __DEV__ ? 'debug' : 'error' as const,
  //   ENABLE_ANALYTICS: !__DEV__,
  // }
} as const;

// ----------------------------------------------------------------------------
// ALIAS DE EXPORTACIÓN - Para uso común y legibilidad
// ----------------------------------------------------------------------------
// Se exportan alias de las propiedades más utilizadas para facilitar su
// importación y mejorar la semántica del código en otros módulos.
export const APP_NAME = APP_INFO.NAME;
export const APP_VERSION = APP_INFO.VERSION;

// ----------------------------------------------------------------------------
// VERSIÓN DEL STORE PERSISTENTE
// ----------------------------------------------------------------------------
/**
 * Versión actual de la estructura del store (useVaultStore).
 * Se incrementa cada vez que se modifica el schema de forma no compatible.
 */
export const CURRENT_STORE_VERSION = 1;