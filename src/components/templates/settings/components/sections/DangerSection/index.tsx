// ============================================================================
// SECCIÓN DE ZONA DE PELIGRO - DangerSection
//
// Componente que muestra la opción de reiniciar la bóveda (reset).
// Incluye un icono de advertencia y un chevron hacia la derecha.
// Al presionar, ejecuta el callback onResetPress para abrir el modal.
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

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES
// ----------------------------------------------------------------------------
import { SPACING } from '@/constants/metrics';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------
import { DangerSectionProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (MEMOIZADO)
// ----------------------------------------------------------------------------
export const DangerSection: React.FC<DangerSectionProps> = React.memo(({
  onResetPress,
}) => {
  const { t } = useTranslation();

  return (
    <AppBox marginBottom="xl">
      <AppText
        variant="h3"
        color="error"
        style={{ marginBottom: SPACING.s }}
      >
        {t('settings.danger_zone')}
      </AppText>
      <AppBox>
        <AppListItem
          label={t('settings.reset_vault')}
          icon="trash-outline"
          iconColor="error"
          onPress={onResetPress}
          isActive
          rightContent={
            <AppIcon name="chevron-forward" library="Ionicons" size="m" color="error" />
          }
        />
      </AppBox>
    </AppBox>
  );
});

DangerSection.displayName = 'DangerSection';