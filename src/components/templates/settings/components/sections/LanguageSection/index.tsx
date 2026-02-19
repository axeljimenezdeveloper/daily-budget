// ============================================================================
// SECCIÓN DE IDIOMA - LanguageSection
//
// Componente que muestra la opción de idioma actual y permite abrir el modal
// de selección. Es una sección interactiva utilizada en la pantalla de ajustes.
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
import { LanguageSectionProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (MEMOIZADO)
// ----------------------------------------------------------------------------
export const LanguageSection: React.FC<LanguageSectionProps> = React.memo(({
  language,
  onPress,
}) => {
  const { t } = useTranslation();

  // Determinar el texto a mostrar según el idioma actual
  const languageDisplay = language === 'es' ? '🇪🇸 Español' : '🇺🇸 English';

  return (
    <AppBox marginBottom="xl">
      <AppText
        variant="h3"
        color="accent"
        style={{ marginBottom: SPACING.s }}
      >
        {t('settings.language_section')}
      </AppText>
      <AppBox>
        <AppListItem
          label={t('settings.language')}
          subLabel={languageDisplay}
          icon="language-outline"
          onPress={onPress}
          rightContent={
            <AppIcon
              name="chevron-forward"
              library="Ionicons"
              size="m"
              color="secondary"
            />
          }
        />
      </AppBox>
    </AppBox>
  );
});

LanguageSection.displayName = 'LanguageSection';