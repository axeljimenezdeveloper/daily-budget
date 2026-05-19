// ============================================================================
// LAYOUT BASE PARA LA PANTALLA DE HISTORIAL
//
// Este componente provee la estructura visual común a la pantalla de historial:
// fondo negro corporativo, padding lateral consistente y un contenedor que
// puede ser ScrollView (por defecto) o FlatList (para carga infinita).
// ============================================================================

import React from 'react';
import { ScrollView, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import AppContainer from '@/components/atoms/structure/AppContainer';
import AppStack from '@/components/atoms/structure/AppStack';
import AppBox from '@/components/atoms/structure/AppBox';
import AppSpinner from '@/components/atoms/visual/AppSpinner';
import AppText from '@/components/atoms/content/AppText';
import { PALETTE } from '@/constants/colors';
import { SPACING } from '@/constants/metrics';
import { HistoryLayoutProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
export const HistoryLayout: React.FC<HistoryLayoutProps> = ({
  children,
  footer,
  flatListData,
  renderGroup,
  onEndReached,
  onEndReachedThreshold = 100,
  isLoadingMore = false,
  hasMore = false,
  loadingFooter,
  endFooter,
}) => {
  const { t } = useTranslation();

  // --------------------------------------------------------------------------
  // RENDER DEL FOOTER PARA FLATLIST (spinner o mensaje final)
  // --------------------------------------------------------------------------
  const renderFlatListFooter = () => {
    if (isLoadingMore) {
      return (
        <AppBox marginTop="l" marginBottom="xl" align="center">
          {loadingFooter || <AppSpinner size="l" color="accent" />}
        </AppBox>
      );
    }
    if (!hasMore && flatListData && flatListData.length > 0) {
      return (
        <AppBox marginTop="l" marginBottom="xl" align="center">
          {endFooter || (
            <AppText variant="caption" color="secondary" align="center">
              {t('history.noMore')}
            </AppText>
          )}
        </AppBox>
      );
    }
    return null;
  };

  // --------------------------------------------------------------------------
  // RENDER PRINCIPAL
  // --------------------------------------------------------------------------
  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      <AppStack flex={1} style={{ paddingHorizontal: SPACING.m }}>
        {flatListData && renderGroup ? (
          // Modo carga infinita con FlatList
          <FlatList
            data={flatListData}
            keyExtractor={(item) => item.date}
            renderItem={({ item, index }) => renderGroup(item, index)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: SPACING.xl }}
            onEndReached={onEndReached}
            onEndReachedThreshold={onEndReachedThreshold}
            ListFooterComponent={renderFlatListFooter}
          />
        ) : (
          // Modo tradicional con ScrollView
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: SPACING.xl }}
          >
            {children}
            {footer && <AppBox marginTop="xl">{footer}</AppBox>}
          </ScrollView>
        )}
      </AppStack>
    </AppContainer>
  );
};