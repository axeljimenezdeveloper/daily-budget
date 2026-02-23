// ============================================================================
// LAYOUT BASE PARA LA PANTALLA PRINCIPAL (DASHBOARD)
// ============================================================================

import React from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppContainer from '@/components/atoms/structure/AppContainer';
import AppStack from '@/components/atoms/structure/AppStack';
import { PALETTE } from '@/constants/colors';
import { SPACING } from '@/constants/metrics';
import { DashboardLayoutProps } from './index.props';

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  onRefresh,
  refreshing = false,
  refreshControlColor = PALETTE.sunsetOrange,
  fab,
}) => {
  const insets = useSafeAreaInsets();

  const refreshControl = onRefresh ? (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={refreshControlColor}
      colors={[refreshControlColor]}
    />
  ) : undefined;

  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight, position: 'relative' }}>
      <AppStack flex={1} style={{ paddingHorizontal: SPACING.l }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          // Padding inferior dinámico: si hay FAB, se reserva espacio para que no tape el contenido
          contentContainerStyle={{
            paddingBottom: fab ? SPACING.xxxl + insets.bottom : SPACING.xxxl,
          }}
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      </AppStack>

      {/* FAB flotante posicionado absolutamente */}
      {fab && (
        <View
          style={{
            position: 'absolute',
            bottom: insets.bottom + SPACING.xl,
            right: SPACING.l,
            zIndex: 10,
          }}
        >
          {fab}
        </View>
      )}
    </AppContainer>
  );
};