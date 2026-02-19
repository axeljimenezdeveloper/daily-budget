// ============================================================================
// SECCIÓN DE SEGURIDAD - SecuritySection
//
// Componente que muestra la opción de activar/desactivar el bloqueo biométrico.
// Incluye un spinner durante la autenticación y maneja el estado de carga.
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
import AppSwitch from '@/components/atoms/action/AppSwitch';
import AppSpinner from '@/components/atoms/visual/AppSpinner';

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES
// ----------------------------------------------------------------------------
import { SPACING } from '@/constants/metrics';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------
import { SecuritySectionProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (MEMOIZADO)
// ----------------------------------------------------------------------------
export const SecuritySection: React.FC<SecuritySectionProps> = React.memo(({
  isBiometricEnabled,
  onToggle,
  isLoading,
  isAvailabilityLoading,
  isDisabled = false,
}) => {
  const { t } = useTranslation();

  const rightContent = isLoading ? (
    <AppSpinner size="s" color="accent" />
  ) : (
    <AppSwitch
      value={isBiometricEnabled}
      onValueChange={onToggle}
      disabled={isAvailabilityLoading || isDisabled}
    />
  );

  return (
    <AppBox marginBottom="xl">
      <AppText
        variant="h3"
        color="accent"
        style={{ marginBottom: SPACING.s }}
      >
        {t('settings.security_section')}
      </AppText>
      <AppBox>
        <AppListItem
          label={t('settings.biometric_title')}
          subLabel={t('settings.biometric_description')}
          icon="finger-print-outline"
          rightContent={rightContent}
        />
      </AppBox>
    </AppBox>
  );
});

SecuritySection.displayName = 'SecuritySection';