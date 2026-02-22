// ============================================================================
// SECCIÓN DE EXPORTACIÓN DE DATOS - ExportSection
//
// Componente que agrupa las opciones de exportación/importación de datos del usuario:
//   - Exportar a CSV (formato plano)
//   - Exportar backup cifrado (protegido con biometría)
//   - Importar backup cifrado (restaurar desde archivo)
//
// Cada opción se representa con un AppListItem que muestra su estado de carga
// individual (spinner) y su respectivo callback.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from 'react';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS
// ----------------------------------------------------------------------------
import AppBox from '@/components/atoms/structure/AppBox';
import AppText from '@/components/atoms/content/AppText';
import AppListItem from '@/components/atoms/action/AppListItem';
import AppIcon from '@/components/atoms/content/AppIcon';
import AppSpinner from '@/components/atoms/visual/AppSpinner';

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES
// ----------------------------------------------------------------------------
import { SPACING } from '@/constants/metrics';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------
import { ExportSectionProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (MEMOIZADO)
// ----------------------------------------------------------------------------
export const ExportSection: React.FC<ExportSectionProps> = React.memo(({
  isExporting,
  onExport,
  isBackupExporting,
  onBackupExport,
  isImporting,
  onImport,
}) => {
  const { t } = useTranslation();

  // Contenido derecho para CSV
  const csvRightContent = isExporting ? (
    <AppSpinner size="s" color="accent" />
  ) : (
    <AppIcon name="chevron-forward" library="Ionicons" size="m" color="secondary" />
  );

  // Contenido derecho para exportación de backup
  const backupRightContent = isBackupExporting ? (
    <AppSpinner size="s" color="accent" />
  ) : (
    <AppIcon name="chevron-forward" library="Ionicons" size="m" color="secondary" />
  );

  // Contenido derecho para importación de backup
  const importRightContent = isImporting ? (
    <AppSpinner size="s" color="accent" />
  ) : (
    <AppIcon name="chevron-forward" library="Ionicons" size="m" color="secondary" />
  );

  return (
    <AppBox marginBottom="xl">
      {/* Título de la sección */}
      <AppText
        variant="h3"
        color="accent"
        style={{ marginBottom: SPACING.s }}
      >
        {t('settings.export_section')}
      </AppText>

      <AppBox>
        {/* ----------------------------------------------------------------
          ITEM 1: EXPORTACIÓN A CSV
        ---------------------------------------------------------------- */}
        <AppListItem
          label={t('settings.export_csv')}
          subLabel={isExporting ? t('settings.export_loading') : undefined}
          icon="download-outline"
          onPress={onExport}
          disabled={isExporting}
          isActive={!isExporting}
          rightContent={csvRightContent}
        />

        {/* ----------------------------------------------------------------
          ITEM 2: EXPORTACIÓN DE BACKUP CIFRADO
        ---------------------------------------------------------------- */}
        <AppListItem
          label={t('settings.export_backup')}
          subLabel={isBackupExporting ? t('settings.export_backup_loading') : undefined}
          icon="lock-closed-outline"
          onPress={onBackupExport}
          disabled={isBackupExporting}
          isActive={!isBackupExporting}
          rightContent={backupRightContent}
        />

        {/* ----------------------------------------------------------------
          ITEM 3: IMPORTACIÓN DE BACKUP CIFRADO
        ---------------------------------------------------------------- */}
        <AppListItem
          label={t('settings.import_backup')}
          subLabel={isImporting ? t('settings.import_backup_loading') : undefined}
          icon="folder-open-outline"
          onPress={onImport}
          disabled={isImporting}
          isActive={!isImporting}
          rightContent={importRightContent}
        />
      </AppBox>
    </AppBox>
  );
});

ExportSection.displayName = 'ExportSection';