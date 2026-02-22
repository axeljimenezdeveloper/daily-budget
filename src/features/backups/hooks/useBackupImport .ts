// ============================================================================
// HOOK PERSONALIZADO: useBackupImport
//
// Encapsula la lógica para importar y restaurar un backup cifrado.
// El proceso incluye:
//   - Seleccionar un archivo mediante expo-document-picker.
//   - Leer el archivo con la nueva API de expo-file-system.
//   - Validar la estructura del backup (versión, nonce, ciphertext).
//   - Obtener la clave biométrica con useBackupKey.
//   - Descifrar el contenido con AES-256-GCM.
//   - Restaurar el estado en useVaultStore mediante restoreFromBackup.
//
// Expone estados de carga, error y función para importar.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import { useState, useCallback } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';                // Nueva API orientada a objetos
import { gcm } from '@noble/ciphers/aes.js';           // extensión .js obligatoria
import { Buffer } from 'buffer';

// ----------------------------------------------------------------------------
// DEPENDENCIAS LOCALES
// ----------------------------------------------------------------------------
import { useBackupKey } from './useBackupKey';
import { useVaultStore } from '@/store/useVaultStore';
import { BackupOperationResult } from '../types';        // Tipo centralizado

// ----------------------------------------------------------------------------
// CONSTANTES
// ----------------------------------------------------------------------------
const BACKUP_VERSION = 1;
const NONCE_LENGTH = 12; // bytes, debe coincidir con exportación

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------
export const useBackupImport = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getKey } = useBackupKey();
  const restoreFromBackup = useVaultStore((state) => state.restoreFromBackup);

  // --------------------------------------------------------------------------
  // IMPORTAR BACKUP
  // --------------------------------------------------------------------------
  const importBackup = useCallback(async (): Promise<BackupOperationResult> => {
    setIsImporting(true);
    setError(null);

    try {
      // 1. Seleccionar archivo
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/octet-stream', // o 'application/json' o '*/*'
        copyToCacheDirectory: true,        // para tener una copia local accesible
      });

      if (result.canceled) {
        setIsImporting(false);
        return { success: false, error: 'Importación cancelada por el usuario' };
      }

      const asset = result.assets[0];
      if (!asset) {
        throw new Error('No se pudo obtener el archivo seleccionado');
      }

      // 2. Leer archivo usando la nueva API (asíncrono)
      const file = new File(asset.uri);
      const fileContent = await file.text(); // método asíncrono, no bloquea

      // 3. Parsear JSON
      let backupData: any;
      try {
        backupData = JSON.parse(fileContent);
      } catch (parseErr) {
        throw new Error('El archivo no contiene un JSON válido');
      }

      // 4. Validar estructura básica
      if (!backupData.version || !backupData.nonce || !backupData.ciphertext) {
        throw new Error('El archivo de backup no tiene la estructura esperada');
      }

      if (backupData.version !== BACKUP_VERSION) {
        throw new Error(`Versión de backup no soportada. Se esperaba ${BACKUP_VERSION}`);
      }

      // 5. Obtener clave biométrica
      const keyResult = await getKey();
      if (!keyResult.success) {
        throw new Error(keyResult.error || 'No se pudo obtener la clave de cifrado');
      }

      // 6. Decodificar nonce y ciphertext desde base64
      let nonce: Uint8Array, ciphertext: Uint8Array;
      try {
        nonce = Buffer.from(backupData.nonce, 'base64');
        ciphertext = Buffer.from(backupData.ciphertext, 'base64');
      } catch (decodeErr) {
        throw new Error('Error al decodificar los datos del backup');
      }

      if (nonce.length !== NONCE_LENGTH) {
        throw new Error(`Longitud de nonce inválida. Se esperaban ${NONCE_LENGTH} bytes`);
      }

      // 7. Descifrar con AES-256-GCM
      let plaintextBytes: Uint8Array;
      try {
        const aes = gcm(keyResult.key, nonce);
        plaintextBytes = aes.decrypt(ciphertext);
      } catch (cryptoErr) {
        throw new Error('Error al descifrar el backup. ¿La clave es correcta?');
      }

      // 8. Convertir a string y parsear el estado
      const plaintext = new TextDecoder().decode(plaintextBytes);
      let restoredState: any;
      try {
        restoredState = JSON.parse(plaintext);
      } catch (parseErr) {
        throw new Error('El contenido descifrado no es un JSON válido');
      }

      // 9. Restaurar en el store (la acción se encarga de sincronizar idioma, versión, etc.)
      restoreFromBackup(restoredState);

      setIsImporting(false);
      return { success: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido al importar';
      setError(msg);
      setIsImporting(false);
      return { success: false, error: msg };
    }
  }, [getKey, restoreFromBackup]);

  return {
    importBackup,
    isImporting,
    error,
  };
};