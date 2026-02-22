// ============================================================================
// HOOK PERSONALIZADO: useBackupExport (CORREGIDO - NUEVA API EXPO FILE SYSTEM)
//
// Encapsula la lógica para exportar un backup cifrado del estado actual de la
// bóveda (useVaultStore). El proceso incluye:
//   - Obtener la clave biométrica mediante useBackupKey (se genera si no existe).
//   - Serializar el estado a JSON y cifrarlo con AES-256-GCM (nonce aleatorio).
//   - Escribir el archivo cifrado en el directorio temporal de la app usando la nueva API.
//   - Compartir el archivo mediante la hoja nativa de intercambio (expo-sharing).
//
// Expone estados de carga y error para ser utilizados en la UI.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import { useState, useCallback } from 'react';
import { File, Paths } from 'expo-file-system';          // Nueva API orientada a objetos
import * as Sharing from 'expo-sharing';
import { gcm } from '@noble/ciphers/aes.js';             // extensión .js obligatoria
import { getRandomBytesAsync } from 'expo-crypto';       // función correcta para bytes aleatorios
import { Buffer } from 'buffer';

// ----------------------------------------------------------------------------
// DEPENDENCIAS LOCALES
// ----------------------------------------------------------------------------
import { useBackupKey } from './useBackupKey';
import { useVaultStore } from '@/store/useVaultStore';
import { BackupOperationResult } from '../types';

// ----------------------------------------------------------------------------
// CONSTANTES
// ----------------------------------------------------------------------------
const BACKUP_FILE_NAME = 'surv-backup.surv';
const BACKUP_MIME_TYPE = 'application/octet-stream';
const NONCE_LENGTH = 12; // bytes (recomendado para AES-GCM)
const BACKUP_VERSION = 1;

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------
export const useBackupExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getKey } = useBackupKey();

  // --------------------------------------------------------------------------
  // EXPORTAR BACKUP
  // --------------------------------------------------------------------------
  const exportBackup = useCallback(async (): Promise<BackupOperationResult> => {
    setIsExporting(true);
    setError(null);

    try {
      // 1. Obtener estado actual del store (excluir flags internos no persistibles)
      const state = useVaultStore.getState();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _hasHydrated, _storeVersion, ...cleanState } = state;

      // 2. Obtener (o generar) la clave biométrica
      const keyResult = await getKey();
      if (!keyResult.success) {
        throw new Error(keyResult.error || 'No se pudo obtener la clave de cifrado');
      }

      // 3. Serializar estado a JSON y convertirlo a Uint8Array
      const plaintext = JSON.stringify(cleanState, null, 2);
      const plaintextBytes = new TextEncoder().encode(plaintext);

      // 4. Generar nonce aleatorio (12 bytes) con expo-crypto
      const nonce = await getRandomBytesAsync(NONCE_LENGTH);

      // 5. Cifrar con AES-256-GCM (el tag se incluye automáticamente al final del ciphertext)
      const aes = gcm(keyResult.key, nonce);
      const ciphertext = aes.encrypt(plaintextBytes);

      // 6. Construir objeto de backup (versión + nonce + ciphertext en base64)
      const backupData = {
        version: BACKUP_VERSION,
        nonce: Buffer.from(nonce).toString('base64'),
        ciphertext: Buffer.from(ciphertext).toString('base64'),
      };

      // 7. Escribir archivo en el directorio cache usando la nueva API
      const backupFile = new File(Paths.cache, BACKUP_FILE_NAME);
      // Crear/sobrescribir el archivo (operación síncrona, pero podemos dejar que write también lo cree)
      // Para asegurar que el directorio existe, no es necesario porque Paths.cache ya existe.
      // Usamos create con overwrite para reiniciar el archivo si ya existe.
      backupFile.create({ overwrite: true });
      // Escribir el contenido (acepta string o Uint8Array)
      backupFile.write(JSON.stringify(backupData));

      const fileUri = backupFile.uri; // URI completa para compartir

      // 8. Verificar que se pueda compartir y lanzar el diálogo nativo
      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (!isSharingAvailable) {
        throw new Error('Compartir no está disponible en este dispositivo');
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: BACKUP_MIME_TYPE,
        dialogTitle: 'Guardar respaldo cifrado',
        UTI: 'public.data', // necesario para iOS
      });

      // Opcional: eliminar el archivo temporal después de compartir (no crítico)
      // await backupFile.delete();

      setIsExporting(false);
      return { success: true, filePath: fileUri };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido al exportar';
      setError(msg);
      setIsExporting(false);
      return { success: false, error: msg };
    }
  }, [getKey]);

  return {
    exportBackup,
    isExporting,
    error,
  };
};