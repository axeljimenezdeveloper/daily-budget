// ============================================================================
// HOOK PERSONALIZADO: useSettingsExport
//
// Encapsula la lógica de exportación e importación de datos:
// - Exportación a CSV
// - Exportación de backup cifrado
// - Importación de backup cifrado
// Proporciona estados de carga y errores, y manejadores con feedback visual (toasts).
// ============================================================================

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/useToast';
import { useExportCSV } from '@/hooks/useExportCSV';
import { useBackupExport } from '@/features/backups/hooks/useBackupExport';
import { useBackupImport } from '@/features/backups/hooks/useBackupImport ';

export const useSettingsExport = () => {
  const { t } = useTranslation();
  const toast = useToast();

  // --------------------------------------------------------------------------
  // Exportación CSV
  // --------------------------------------------------------------------------
  const { exportCSV, isExporting, error: exportError } = useExportCSV();

  // --------------------------------------------------------------------------
  // Exportación de backup cifrado
  // --------------------------------------------------------------------------
  const { exportBackup, isExporting: isBackupExporting, error: backupExportError } = useBackupExport();

  // --------------------------------------------------------------------------
  // Importación de backup cifrado
  // --------------------------------------------------------------------------
  const { importBackup, isImporting, error: importError } = useBackupImport();

  // --------------------------------------------------------------------------
  // Manejadores con feedback
  // --------------------------------------------------------------------------
  const handleExportCSV = useCallback(async () => {
    const result = await exportCSV();
    if (!result.success) {
      toast.error(result.error || t('settings.export_csv_error', 'Error al exportar'));
    }
    // Si es exitoso, no mostramos ningún toast
  }, [exportCSV, toast, t]);

  const handleBackupExport = useCallback(async () => {
    const result = await exportBackup();
    if (!result.success) {
      let errorMessage: string;
      if (result.error === 'user_cancelled') {
        errorMessage = t('settings.backup.auth_cancelled');
      } else {
        errorMessage = result.error || t('settings.backup.export_error', 'Error al exportar respaldo');
      }
      toast.error(errorMessage);
    }
    // Si es exitoso, no mostramos ningún toast
  }, [exportBackup, toast, t]);

  const handleBackupImport = useCallback(async () => {
    const result = await importBackup();
    if (result.success) {
      toast.success(t('settings.backup.import_success', 'Respaldo importado correctamente'));
    } else {
      let errorMessage: string;
      if (result.error === 'user_cancelled') {
        errorMessage = t('settings.backup.auth_cancelled');
      } else if (result.error === 'import_cancelled') {
        errorMessage = t('settings.backup.import_cancelled');
      } else {
        errorMessage = result.error || t('settings.backup.import_error', 'Error al importar respaldo');
      }
      toast.error(errorMessage);
    }
  }, [importBackup, toast, t]);

  return {
    isExporting,
    exportError,
    isBackupExporting,
    backupExportError,
    isImporting,
    importError,
    handleExportCSV,
    handleBackupExport,
    handleBackupImport,
  };
};