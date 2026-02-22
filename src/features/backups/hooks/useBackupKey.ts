// ============================================================================
// HOOK PERSONALIZADO: useBackupKey
//
// Gestiona la clave de cifrado para backups, almacenada de forma segura
// en expo-secure-store con protección biométrica (requireAuthentication: true).
// Proporciona:
//   - Verificación de existencia de la clave.
//   - Generación y almacenamiento de una clave aleatoria de 256 bits.
//   - Obtención de la clave (dispara autenticación biométrica).
//   - Limpieza de la clave (para desactivación biométrica).
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS
// ----------------------------------------------------------------------------
import { useState, useCallback, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Crypto from 'expo-crypto';
import { Buffer } from 'buffer'; // Añadido para manejo base64

// ----------------------------------------------------------------------------
// TIPOS LOCALES
// ----------------------------------------------------------------------------
import { BackupKeyResult, BackupKeyStatus } from '../types';

// ----------------------------------------------------------------------------
// CONSTANTES
// ----------------------------------------------------------------------------
const BACKUP_KEY_STORAGE_KEY = 'surv.backup.encryptionKey';
const KEY_LENGTH_BYTES = 32; // 256 bits

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------
export const useBackupKey = () => {
  const [status, setStatus] = useState<BackupKeyStatus>({
    hasKey: false,
    loading: true,
    error: null,
  });

  // --------------------------------------------------------------------------
  // VERIFICACIÓN INICIAL DE EXISTENCIA DE CLAVE
  // --------------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    const checkKeyExists = async () => {
      try {
        // Nota: getItemAsync sin opciones NO requiere autenticación,
        // solo verifica si la clave existe (devuelve null si no).
        const key = await SecureStore.getItemAsync(BACKUP_KEY_STORAGE_KEY);
        if (isMounted) {
          setStatus({
            hasKey: key !== null,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (isMounted) {
          setStatus({
            hasKey: false,
            loading: false,
            error: err instanceof Error ? err.message : 'Error al verificar clave de backup',
          });
        }
      }
    };

    checkKeyExists();

    return () => {
      isMounted = false;
    };
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
        requireAuthentication: true, // ← ACTIVADO: fuerza autenticación al leer
      });

      setStatus({ hasKey: true, loading: false, error: null });

      return { success: true, key: randomBytes };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al generar clave de backup';
      return { success: false, error: msg };
    }
  }, []);

  // --------------------------------------------------------------------------
  // OBTENER CLAVE (dispara autenticación)
  // --------------------------------------------------------------------------
  /**
   * Recupera la clave almacenada. Si la clave no existe, se genera automáticamente.
   * En iOS, SecureStore lanza automáticamente el diálogo de autenticación.
   *
   * @returns {Promise<BackupKeyResult>} - Clave en Uint8Array si éxito.
   */
  const getKey = useCallback(async (): Promise<BackupKeyResult> => {
    try {
      // Verificar si existe
      const existingKeyBase64 = await SecureStore.getItemAsync(BACKUP_KEY_STORAGE_KEY);

      if (!existingKeyBase64) {
        // No existe → generar nueva
        return await generateAndStoreKey();
      }

      // Existe → recuperar (esto dispara autenticación en iOS si la clave se guardó con requireAuthentication)
      const keyBase64 = await SecureStore.getItemAsync(BACKUP_KEY_STORAGE_KEY);
      if (!keyBase64) {
        // Podría ocurrir si el usuario canceló la autenticación (en ese caso getItemAsync devuelve null)
        return { success: false, error: 'Autenticación cancelada o fallida' };
      }

      // Convertir base64 a Uint8Array
      const keyBuffer = Buffer.from(keyBase64, 'base64');
      const key = new Uint8Array(keyBuffer.buffer, keyBuffer.byteOffset, keyBuffer.byteLength);

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
      setStatus({ hasKey: false, loading: false, error: null });
    } catch (err) {
      console.warn('[useBackupKey] Error al eliminar clave:', err);
    }
  }, []);

  return {
    ...status,
    generateAndStoreKey,
    getKey,
    deleteKey,
  };
};