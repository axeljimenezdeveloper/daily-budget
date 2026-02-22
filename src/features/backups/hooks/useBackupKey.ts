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
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  // --------------------------------------------------------------------------
  // VERIFICACIÓN DE EXISTENCIA (sin autenticación)
  // --------------------------------------------------------------------------
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
  const generateAndStoreKey = useCallback(async (): Promise<BackupKeyResult> => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        return { success: false, error: 'Biometría no disponible en este dispositivo' };
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        return { success: false, error: 'No hay huellas/rostro registrados en el sistema' };
      }

      const randomBytes = await Crypto.getRandomBytesAsync(KEY_LENGTH_BYTES);
      const keyBase64 = Buffer.from(randomBytes).toString('base64');

      await SecureStore.setItemAsync(BACKUP_KEY_STORAGE_KEY, keyBase64, {
        keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
        requireAuthentication: true,
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
  const getKey = useCallback(async (): Promise<BackupKeyResult> => {
    try {
      const existingKeyBase64 = await SecureStore.getItemAsync(BACKUP_KEY_STORAGE_KEY);

      if (!existingKeyBase64) {
        return await generateAndStoreKey();
      }

      // Intenta obtener la clave (esto puede lanzar autenticación o retornar null si se cancela)
      const keyBase64 = await SecureStore.getItemAsync(BACKUP_KEY_STORAGE_KEY);
      if (!keyBase64) {
        // El usuario canceló la autenticación
        return { success: false, error: 'user_cancelled' };
      }

      const keyBuffer = Buffer.from(keyBase64, 'base64');
      const key = new Uint8Array(keyBuffer.buffer, keyBuffer.byteOffset, keyBuffer.byteLength);

      setHasKey(true);
      return { success: true, key };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al obtener clave de backup';
      // Detectar si el error es por cancelación del usuario
      if (msg.toLowerCase().includes('cancel')) {
        return { success: false, error: 'user_cancelled' };
      }
      return { success: false, error: msg };
    }
  }, [generateAndStoreKey]);

  // --------------------------------------------------------------------------
  // ELIMINAR CLAVE
  // --------------------------------------------------------------------------
  const deleteKey = useCallback(async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(BACKUP_KEY_STORAGE_KEY);
      setHasKey(false);
    } catch (err) {
      console.warn('[useBackupKey] Error al eliminar clave:', err);
    }
  }, []);

  return {
    hasKey,
    checkKeyExists,
    generateAndStoreKey,
    getKey,
    deleteKey,
  };
};