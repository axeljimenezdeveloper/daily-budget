// ============================================================================
// SECCIÓN DE EXPORTACIÓN DE DATOS - ExportSection
//
// Componente que muestra la opción de exportar los datos a CSV.
// Incluye un indicador de carga y un icono de navegación.
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
}) => {
  const { t } = useTranslation();

  // Contenido derecho condicional: spinner si está exportando, flecha si no
  const rightContent = isExporting ? (
    <AppSpinner size="s" color="accent" />
  ) : (
    <AppIcon name="chevron-forward" library="Ionicons" size="m" color="secondary" />
  );

  return (
    <AppBox marginBottom="xl">
      <AppText
        variant="h3"
        color="accent"
        style={{ marginBottom: SPACING.s }}
      >
        {t('settings.export_section', 'Exportar datos')}
      </AppText>
      <AppBox>
        <AppListItem
          label={t('settings.export_csv')}
          subLabel={isExporting ? t('settings.export_loading') : undefined}
          icon="download-outline"
          onPress={onExport}
          disabled={isExporting}
          isActive={!isExporting}
          rightContent={rightContent}
        />
      </AppBox>
    </AppBox>
  );
});

ExportSection.displayName = 'ExportSection';