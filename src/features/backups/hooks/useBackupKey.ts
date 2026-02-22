// ============================================================================
// HOOK PERSONALIZADO: useBackupKey (CORREGIDO)
//
// Gestiona la clave de cifrado para backups, almacenada de forma segura
// en expo-secure-store con protección biométrica (requireAuthentication: true).
//
// IMPORTANTE: Este hook NO ejecuta ninguna operación automática al montarse.
// La clave solo se obtiene o genera bajo demanda mediante las funciones expuestas.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS
// ----------------------------------------------------------------------------
import { useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Crypto from 'expo-crypto';
import { Buffer } from 'buffer';

// ----------------------------------------------------------------------------
// TIPOS LOCALES
// ----------------------------------------------------------------------------
import { BackupKeyResult } from '../types';

// ----------------------------------------------------------------------------
// CONSTANTES
// ----------------------------------------------------------------------------
const BACKUP_KEY_STORAGE_KEY = 'surv.backup.encryptionKey';
const KEY_LENGTH_BYTES = 32; // 256 bits

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------
export const useBackupKey = () => {
  // Estado para saber si la clave existe (útil para UI, pero no crítico)
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  // Podríamos añadir loading si fuera necesario, pero por ahora lo omitimos

  // --------------------------------------------------------------------------
  // VERIFICACIÓN DE EXISTENCIA (sin autenticación)
  // --------------------------------------------------------------------------
  /**
   * Verifica si la clave existe en SecureStore.
   * Esta operación NO requiere autenticación porque getItemAsync se llama sin opciones.
   * Útil para habilitar/deshabilitar opciones en UI sin forzar biometría.
   */
  const checkKeyExists = useCallback(async (): Promise<boolean> => {
    try {
      const key = await SecureStore.getItemAsync(BACKUP_KEY_STORAGE_KEY);
      const exists = key !== null;
      setHasKey(exists);
      return exists;
    } catch (err) {
      console.warn('[useBackupKey] Error al verificar existencia de clave:', err);
      setHasKey(false);
      return false;
    }
  }, []);

  // --------------------------------------------------------------------------
  // GENERAR Y GUARDAR CLAVE (solo si no existe)
  // --------------------------------------------------------------------------
  /**
   * Genera una clave aleatoria de 32 bytes y la guarda en SecureStore
   * con autenticación biométrica requerida.
   *
   * @returns {Promise<BackupKeyResult>} - Resultado de la operación.
   */
  const generateAndStoreKey = useCallback(async (): Promise<BackupKeyResult> => {
    try {
      // 1. Verificar que la biometría esté disponible y configurada
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        return { success: false, error: 'Biometría no disponible en este dispositivo' };
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        return { success: false, error: 'No hay huellas/rostro registrados en el sistema' };
      }

      // 2. Generar clave aleatoria segura
      const randomBytes = await Crypto.getRandomBytesAsync(KEY_LENGTH_BYTES);
      const keyBase64 = Buffer.from(randomBytes).toString('base64');

      // 3. Guardar en SecureStore con autenticación biométrica
      await SecureStore.setItemAsync(BACKUP_KEY_STORAGE_KEY, keyBase64, {
        keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
        requireAuthentication: true, // ← La lectura futura requerirá biometría
      });

      setHasKey(true);
      return { success: true, key: randomBytes };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al generar clave de backup';
      return { success: false, error: msg };
    }
  }, []);

  // --------------------------------------------------------------------------
  // OBTENER CLAVE (dispara autenticación si la clave existe)
  // --------------------------------------------------------------------------
  /**
   * Recupera la clave almacenada. Si la clave no existe, se genera automáticamente.
   * En iOS, SecureStore lanza automáticamente el diálogo de autenticación.
   *
   * @returns {Promise<BackupKeyResult>} - Clave en Uint8Array si éxito.
   */
  const getKey = useCallback(async (): Promise<BackupKeyResult> => {
    try {
      // Verificar si existe (esto no pide autenticación)
      const existingKeyBase64 = await SecureStore.getItemAsync(BACKUP_KEY_STORAGE_KEY);

      if (!existingKeyBase64) {
        // No existe → generar nueva (esto tampoco pide autenticación)
        return await generateAndStoreKey();
      }

      // Existe → recuperar (esto SÍ dispara autenticación en iOS si la clave se guardó con requireAuthentication)
      const keyBase64 = await SecureStore.getItemAsync(BACKUP_KEY_STORAGE_KEY);
      if (!keyBase64) {
        // El usuario canceló la autenticación o falló
        return { success: false, error: 'Autenticación cancelada o fallida' };
      }

      // Convertir base64 a Uint8Array
      const keyBuffer = Buffer.from(keyBase64, 'base64');
      const key = new Uint8Array(keyBuffer.buffer, keyBuffer.byteOffset, keyBuffer.byteLength);

      setHasKey(true);
      return { success: true, key };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al obtener clave de backup';
      return { success: false, error: msg };
    }
  }, [generateAndStoreKey]);

  // --------------------------------------------------------------------------
  // ELIMINAR CLAVE (para desactivar biometría)
  // --------------------------------------------------------------------------
  /**
   * Elimina la clave almacenada. Útil cuando el usuario desactiva la biometría.
   */
  const deleteKey = useCallback(async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(BACKUP_KEY_STORAGE_KEY);
      setHasKey(false);
    } catch (err) {
      console.warn('[useBackupKey] Error al eliminar clave:', err);
    }
  }, []);

  return {
    // Estado
    hasKey,

    // Métodos
    checkKeyExists,      // Para consultar existencia sin autenticar (ej. en UI)
    generateAndStoreKey, // Exponemos por si se necesita forzar regeneración (raro)
    getKey,              // Principal: obtiene la clave (genera si no existe, o pide autenticación)
    deleteKey,
  };
};