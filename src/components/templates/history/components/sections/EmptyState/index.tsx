// ============================================================================
// COMPONENTE DE ESTADO VACÍO – EmptyState
//
// Se muestra cuando no hay gastos registrados en el historial.
// Incluye un icono representativo, título y subtítulo traducidos.
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
import AppStack from '@/components/atoms/structure/AppStack';
import AppText from '@/components/atoms/content/AppText';
import AppIcon from '@/components/atoms/content/AppIcon';
import { SPACING } from '@/constants/metrics';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------
import { EmptyStateProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
export const EmptyState: React.FC<EmptyStateProps> = () => {
  const { t } = useTranslation();

  return (
    <AppStack
      flex={1}
      justify="center"
      align="center"
      gap="l"
      style={{ paddingHorizontal: SPACING.l }}
    >
      {/* Icono grande y semitransparente */}
      <AppIcon name="list-outline" size="xxxxl" color="secondary" />

      {/* Título del estado vacío */}
      <AppText variant="h3" align="center" color="primary">
        {t('history.empty.title')}
      </AppText>

      {/* Subtítulo descriptivo */}
      <AppText variant="body" align="center" color="secondary">
        {t('history.empty.subtitle')}
      </AppText>
    </AppStack>
  );
};