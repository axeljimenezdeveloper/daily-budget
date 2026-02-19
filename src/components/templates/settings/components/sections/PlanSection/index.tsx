// ============================================================================
// SECCIÓN DE PLAN ACTUAL - PlanSection
//
// Componente que muestra el resumen del plan del usuario:
// - Presupuesto total formateado
// - Días restantes / duración total
// - Indicador de modo cuidado (si está activo)
// - Botón para editar plan (funcionalidad futura)
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS
// ----------------------------------------------------------------------------
import AppBox from '@/components/atoms/structure/AppBox';
import AppText from '@/components/atoms/content/AppText';
import AppListItem from '@/components/atoms/action/AppListItem';
import AppDivider from '@/components/atoms/structure/AppDivider';

// ----------------------------------------------------------------------------
// UTILIDADES DEL STORE
// ----------------------------------------------------------------------------
import { formatMoney } from '@/store/useVaultStore/index.utils';

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES
// ----------------------------------------------------------------------------
import { SPACING } from '@/constants/metrics';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------
import { PlanSectionProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (MEMOIZADO)
// ----------------------------------------------------------------------------
export const PlanSection: React.FC<PlanSectionProps> = React.memo(({
  totalBudget,
  remainingDays,
  daysDuration,
  isExtremeMode,
  currency,
  onEditPress,
}) => {
  const { t } = useTranslation();
  const formattedTotalBudget = formatMoney(totalBudget, currency);

  return (
    <AppBox marginBottom="xl">
      <AppText
        variant="h3"
        color="accent"
        style={{ marginBottom: SPACING.s }}
      >
        {t('settings.current_plan_section', 'Tu plan actual')}
      </AppText>
      <AppBox>
        <AppListItem
          label={t('settings.total_budget', 'Presupuesto total')}
          subLabel={formattedTotalBudget}
          icon="wallet-outline"
        />
        <AppDivider color="darkBorder" thickness={1} marginVertical="s" />

        <AppListItem
          label={t('settings.remaining_days', 'Días restantes')}
          subLabel={`${remainingDays} / ${daysDuration}`}
          icon="calendar-outline"
        />

        {isExtremeMode && (
          <>
            <AppDivider
              color="darkBorder"
              thickness={1}
              marginVertical="s"
            />
            <AppListItem
              label={t('settings.extreme_mode', 'Modo cuidado')}
              subLabel={t('settings.activated', 'Activado')}
              icon="warning"
              isActive
            />
          </>
        )}

        <AppDivider color="darkBorder" thickness={1} marginVertical="s" />
        <AppListItem
          label={t('settings.edit_plan', 'Editar plan')}
          icon="create-outline"
          onPress={onEditPress}
        />
      </AppBox>
    </AppBox>
  );
});

PlanSection.displayName = 'PlanSection';