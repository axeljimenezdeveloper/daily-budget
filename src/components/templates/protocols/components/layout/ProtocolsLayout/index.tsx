// ============================================================================
// LAYOUT BASE PARA LA PANTALLA DE PROTOCOLOS
//
// Este componente provee la estructura visual común a la pantalla de protocolos:
// fondo negro corporativo, padding lateral consistente y ScrollView con
// contenido flexible. No añade título porque el header nativo ya lo muestra
// (proporcionado por InfoLayout en app/(info)/_layout.tsx).
// ============================================================================

import React from 'react';
import { ScrollView } from 'react-native';

import AppContainer from '@/components/atoms/structure/AppContainer';
import AppStack from '@/components/atoms/structure/AppStack';
import AppBox from '@/components/atoms/structure/AppBox';

import { PALETTE } from '@/constants/colors';
import { SPACING } from '@/constants/metrics';

import { ProtocolsLayoutProps } from './index.props';

export const ProtocolsLayout: React.FC<ProtocolsLayoutProps> = ({
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
          {children}
          {footer && <AppBox marginTop="xl">{footer}</AppBox>}
        </ScrollView>
      </AppStack>
    </AppContainer>
  );
};