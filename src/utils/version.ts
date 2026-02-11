// ============================================================================
// MÓDULO DE UTILIDADES DE VERSIÓN - "Centralización de metadatos de la app"
//
// Este módulo proporciona funciones y constantes para acceder y formatear
// la información de versión y nombre de la aplicación de manera consistente
// en toda la aplicación. Centraliza la lógica de formateo y evita la
// duplicación de código relacionado con la versión.
// ============================================================================

import { APP_INFO, APP_NAME, APP_VERSION } from "@/constants/app";

// ----------------------------------------------------------------------------
// RE-EXPORTACIÓN DE CONSTANTES PRINCIPALES
// ----------------------------------------------------------------------------
// Se re-exportan las constantes de la aplicación para facilitar su importación
// desde un único módulo. Esto garantiza que toda la aplicación utilice la
// misma fuente de verdad para el nombre y la versión.
export { APP_NAME, APP_VERSION };

// ----------------------------------------------------------------------------
// FUNCIÓN: getFormattedVersion
// ----------------------------------------------------------------------------
// Devuelve la versión de la aplicación con el prefijo 'v' para su visualización.
// Utiliza la constante APP_VERSION como fuente de la versión actual.
//
// Retorno:
//   - string: La versión formateada (ej: "v1.30.0")
export function getFormattedVersion(): string {
  return `v${APP_VERSION}`;
}

// ----------------------------------------------------------------------------
// FUNCIÓN: getAppNameWithVersion
// ----------------------------------------------------------------------------
// Combina el nombre de la aplicación con la versión formateada para crear una
// cadena unificada. Útil para encabezados, títulos o logs que requieran
// identificar la aplicación y su versión.
//
// Retorno:
//   - string: El nombre y versión de la app (ej: "SURV v1.30.0")
export function getAppNameWithVersion(): string {
  return `${APP_NAME} ${getFormattedVersion()}`;
}

// ----------------------------------------------------------------------------
// FUNCIÓN: getAppInfoForFooter
// ----------------------------------------------------------------------------
// Genera una cadena informativa para ser mostrada en pies de página, pantallas
// de carga o secciones de información de la aplicación. Permite incluir
// opcionalmente un estado (como Alpha, Beta, etc.) para indicar la fase de
// desarrollo.
//
// Parámetros:
//   - includeStatus: booleano que indica si se debe agregar el estado (por defecto false)
//   - status: cadena que representa el estado a mostrar (por defecto "Alpha")
//
// Retorno:
//   - string: Información formateada (ej: "SURV • v1.30.0 • Alpha")
export function getAppInfoForFooter(includeStatus: boolean = false, status: string = "Alpha"): string {
  const base = `${APP_NAME} • ${getFormattedVersion()}`;
  if (includeStatus) {
    return `${base} • ${status}`;
  }
  return base;
}

// ----------------------------------------------------------------------------
// FUNCIÓN: getVersionNumber
// ----------------------------------------------------------------------------
// Devuelve únicamente el número de versión de la aplicación, sin formateo
// adicional. Útil para lógica interna o cuando se requiere solo el número.
//
// Retorno:
//   - string: La versión de la aplicación (ej: "1.30.0")
export function getVersionNumber(): string {
  return APP_VERSION;
}