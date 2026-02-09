import React from 'react';
import { useTranslation } from 'react-i18next';

import AppContainer from '@/components/atoms/structure/AppContainer';
import AppStack from '@/components/atoms/structure/AppStack';
import AppButton from '@/components/atoms/action/AppButton';
import AppText from '@/components/atoms/content/AppText';

import { SPACING } from '@/constants/metrics';
import { PALETTE } from '@/constants/colors';

import { OnboardingLayoutProps } from './index.props';

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  onSkip,
  skipButtonText,
}) => {
  const { t } = useTranslation();

  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      <AppStack
        flex={1}
        style={{ paddingVertical: SPACING.l, paddingHorizontal: SPACING.m }}
      >
        <AppStack direction="horizontal" justify="flex-end">
          <AppButton
            onPress={onSkip}
            variant="outline"
            status="neutral"
            style={{
              paddingHorizontal: SPACING.m,
              paddingVertical: SPACING.s,
            }}
          >
            <AppText variant="caption" style={{ fontWeight: '500' }}>
              {skipButtonText || t('onboarding.skip')}
            </AppText>
          </AppButton>
        </AppStack>

        <AppStack flex={1} justify="center" align="center" gap="xl">
          {children}
        </AppStack>
      </AppStack>
    </AppContainer>
  );
};