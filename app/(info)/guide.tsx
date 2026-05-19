// ============================================================================
// PANTALLA PLACEHOLDER - GUÍA DE USO
//
// Muestra un mensaje informativo de que la funcionalidad estará disponible
// próximamente. El layout (InfoLayout) ya proporciona la cabecera y el botón
// de retroceso.
// ============================================================================

import React from 'react';
import { useTranslation } from 'react-i18next';

import AppSafeView from '@/components/atoms/structure/AppSafeView';
import AppBox from '@/components/atoms/structure/AppBox';
import AppText from '@/components/atoms/content/AppText';

export default function GuideScreen() {
  const { t } = useTranslation();

  return (
    <AppSafeView background="deepNight" edges={['top', 'bottom']}>
      <AppBox flex={1} align="center" justify="center" padding="xl">
        <AppText variant="body" color="secondary" align="center">
          {t('info.coming_soon', 'Próximamente')}
        </AppText>
      </AppBox>
    </AppSafeView>
  );
}