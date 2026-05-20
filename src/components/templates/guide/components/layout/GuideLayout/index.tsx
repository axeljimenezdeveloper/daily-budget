// ============================================================================
// LAYOUT BASE PARA LA PANTALLA DE GUÍA (FAQ)
//
// Este componente provee la estructura visual común a la pantalla de guía:
// fondo negro corporativo, padding lateral consistente y ScrollView con
// contenido flexible. No añade título porque el header nativo ya lo muestra
// (proporcionado por InfoLayout en app/(info)/_layout.tsx).
// Sigue el patrón de componentes de layout como SettingsLayout y DashboardLayout.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from 'react';
import { ScrollView } from 'react-native';

// ----------------------------------------------------------------------------
// COMPONENTES ATMÓMICOS
// ----------------------------------------------------------------------------
import AppContainer from '@/components/atoms/structure/AppContainer';
import AppStack from '@/components/atoms/structure/AppStack';
import AppBox from '@/components/atoms/structure/AppBox';

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES
// ----------------------------------------------------------------------------
import { PALETTE } from '@/constants/colors';
import { SPACING } from '@/constants/metrics';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------
import { GuideLayoutProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
export const GuideLayout: React.FC<GuideLayoutProps> = ({
  children,
  footer,
}) => {
  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      <AppStack flex={1} style={{ paddingHorizontal: SPACING.m }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: SPACING.m,
            paddingBottom: SPACING.xl,
          }}
        >
          {/* ------------------------------------------------------------------
            CONTENIDO PRINCIPAL (ACORDEONES)
          ------------------------------------------------------------------ */}
          {children}

          {/* ------------------------------------------------------------------
            PIE DE PÁGINA OPCIONAL (ej. versión de la app)
          ------------------------------------------------------------------ */}
          {footer && <AppBox marginTop="xl">{footer}</AppBox>}
        </ScrollView>
      </AppStack>
    </AppContainer>
  );
};