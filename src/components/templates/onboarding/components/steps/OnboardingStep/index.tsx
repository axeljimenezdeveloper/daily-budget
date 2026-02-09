import React from 'react';
import { View } from 'react-native';

import AppText from '@/components/atoms/content/AppText';
import AppIcon from '@/components/atoms/content/AppIcon';
import AppButton from '@/components/atoms/action/AppButton';
import AppStack from '@/components/atoms/structure/AppStack';
import AppProgressDots from '@/components/atoms/visual/AppProgressDots';

import { OnboardingLayout } from '../../layout/OnboardingLayout';

import { SPACING, BORDER_RADIUS } from '@/constants/metrics';
import { PALETTE } from '@/constants/colors';

import { OnboardingStepProps } from './index.props';

export const OnboardingStep: React.FC<OnboardingStepProps> = ({
  stepNumber,
  totalSteps,
  title,
  description,
  iconName,
  iconLibrary = 'Ionicons',
  buttonText,
  onNext,
  onSkip,
  skipButtonText,
  buttonStatus = 'primary',
  iconRotation = 0,
}) => {
  return (
    <OnboardingLayout
      onSkip={onSkip}
      skipButtonText={skipButtonText}
      currentStep={stepNumber - 1}
      totalSteps={totalSteps}
      showProgress={false} 
    >
      <View
        style={{
          padding: SPACING.xl,
          borderRadius: BORDER_RADIUS.round,
          backgroundColor: `${PALETTE.sunsetOrange}15`,
          borderWidth: 1,
          borderColor: `${PALETTE.sunsetOrange}30`,
        }}
      >
        <AppIcon
          name={iconName}
          library={iconLibrary}
          size="xxxl"
          color="accent"
          style={iconRotation ? { transform: [{ rotate: `${iconRotation}deg` }] } : undefined}
        />
      </View>

      <AppStack align="center" gap="m" style={{ maxWidth: 320 }}>
        <AppText variant="h1" align="center">
          {title}
        </AppText>

        <AppText
          variant="body"
          align="center"
          color="secondary"
          style={{ lineHeight: 24 }}
        >
          {typeof description === 'string' ? description : description}
        </AppText>
      </AppStack>

      <AppProgressDots
        total={totalSteps}
        current={stepNumber - 1}
        size="m"
        spacing="m"
        activeColor={PALETTE.sunsetOrange}
        inactiveColor={PALETTE.slateGray}
        inactiveOpacity={0.5}
      />

      <AppStack style={{ width: '100%' }}>
        <AppButton
          onPress={onNext}
          status={buttonStatus}
          style={{ width: '100%' }}
        >
          <AppText style={{ fontWeight: '700' }}>
            {buttonText}
          </AppText>
        </AppButton>
      </AppStack>
    </OnboardingLayout>
  );
};