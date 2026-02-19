// ============================================================================
// SECCIÓN DE MONEDA - CurrencySection
//
// Componente que muestra la moneda actualmente seleccionada por el usuario.
// Es una sección de solo lectura, utilizada en la pantalla de ajustes.
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

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES
// ----------------------------------------------------------------------------
import { SPACING } from '@/constants/metrics';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------
import { CurrencySectionProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (MEMOIZADO)
// ----------------------------------------------------------------------------
export const CurrencySection: React.FC<CurrencySectionProps> = React.memo(({
  currency,
}) => {
  const { t } = useTranslation();

  return (
    <AppBox marginBottom="xl">
      <AppText
        variant="h3"
        color="accent"
        style={{ marginBottom: SPACING.s }}
      >
        {t('settings.currency_section')}
      </AppText>
      <AppBox>
        <AppListItem
          label={t('settings.currency')}
          subLabel={currency}
          icon="cash-outline"
        />
      </AppBox>
    </AppBox>
  );
});

CurrencySection.displayName = 'CurrencySection';