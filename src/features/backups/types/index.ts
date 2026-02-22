// ============================================================================
// TIPOS COMPARTIDOS PARA EL MÓDULO DE BACKUPS
// ============================================================================

/**
 * Resultado de la operación de obtención de la clave biométrica.
 * - `success: true` y `key` si se obtuvo correctamente.
 * - `success: false` y `error` si falló (incluye código de error si existe).
 */
export type BackupKeyResult =
  | { success: true; key: Uint8Array }
  | { success: false; error: string; code?: string };

/**
 * Información sobre el estado de la clave biométrica.
 */
export interface BackupKeyStatus {
  /** Indica si la clave ya existe en SecureStore (sin necesidad de autenticación para saberlo) */
  hasKey: boolean;
  /** Cargando la verificación inicial */
  loading: boolean;
  /** Error al verificar la existencia de la clave */
  error: string | null;
}

// ============================================================================
// TIPOS COMPARTIDOS PARA EL MÓDULO DE BACKUPS
// ============================================================================

// ... (tipos existentes) ...

/**
 * Resultado de una operación de exportación/importación.
 */
export interface BackupOperationResult {
  success: boolean;
  error?: string;
  filePath?: string; // para exportación
}