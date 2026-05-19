// ============================================================================
// COMPONENTE HEADER TITLE – Título traducible para la barra de navegación
//
// Renderiza un AppText con el estilo estándar de título de pantalla
// (negrita, color primario, tamaño 18, mayúsculas) y contenido traducible.
// ============================================================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import AppText from '@/components/atoms/content/AppText';
import { HeaderTitleProps } from './index.props';

export default function HeaderTitle({ i18nKey, fallback }: HeaderTitleProps) {
  const { t } = useTranslation();

  return (
    <AppText
      variant="h3"          // h3 = header (20px, semibold)
      color="primary"       // color blanco
      style={{
        fontWeight: '700',  // negrita
        fontSize: 18,       // tamaño fijo para consistencia
        textTransform: 'uppercase',
      }}
    >
      {t(i18nKey, { defaultValue: fallback ?? i18nKey })}
    </AppText>
  );
}