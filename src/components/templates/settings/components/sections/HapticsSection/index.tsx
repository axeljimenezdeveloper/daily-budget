// ============================================================================
// SECCIÓN DE HÁPTICOS - HapticsSection
//
// Componente que muestra la opción de activar/desactivar la respuesta háptica
// (vibración) en la interfaz. Sigue el mismo patrón que SecuritySection,
// LanguageSection y otras secciones de ajustes.
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

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES
// ----------------------------------------------------------------------------
import { SPACING } from '@/constants/metrics';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------
import { HapticsSectionProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (MEMOIZADO)
// ----------------------------------------------------------------------------
export const HapticsSection: React.FC<HapticsSectionProps> = React.memo(({
  hapticFeedback,
  onToggle,
}) => {
  const { t } = useTranslation();

  return (
    <AppBox marginBottom="xl">
      {/* Título de la sección con color acento */}
      <AppText
        variant="h3"
        color="accent"
        style={{ marginBottom: SPACING.s }}
      >
        {t('settings.haptics_section')}
      </AppText>

      {/* Ítem con switch */}
      <AppBox>
        <AppListItem
          label={t('settings.haptics_title')}
          subLabel={t('settings.haptics_description')}
          icon="hand-right-outline"  // Icono representativo (vibración/mano)
          rightContent={
            <AppSwitch
              value={hapticFeedback}
              onValueChange={onToggle}
            />
          }
        />
      </AppBox>
    </AppBox>
  );
});

HapticsSection.displayName = 'HapticsSection';