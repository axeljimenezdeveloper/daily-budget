import React from "react";
import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";

import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppButton from "@/components/atoms/action/AppButton";
import AppProgressDots from "@/components/atoms/visual/AppProgressDots";

import { SetupStepLayoutProps } from "./index.props";

import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

export const SetupStepLayout: React.FC<SetupStepLayoutProps> = ({
  title,
  description,
  totalSteps,
  currentStep,
  children,
  actionButtonText,
  onActionPress,
  isActionDisabled = false,
  isProcessing = false,
  onBackPress,
  iconName = "help-circle-outline",
  backgroundColor = PALETTE.deepNight,
  accentColor = PALETTE.sunsetOrange,
  showBackButton = true,
}) => {
  const { t } = useTranslation();

  return (
    <AppContainer style={{ backgroundColor }}>
      {showBackButton && (
        <AppStack 
          direction="horizontal" 
          justify="flex-start" 
          style={{ paddingHorizontal: SPACING.m, paddingTop: SPACING.l }}
        >
          <AppButton
            onPress={onBackPress}
            variant="outline"
            status="neutral"
            style={{
              paddingHorizontal: SPACING.m,
              paddingVertical: SPACING.s,
            }}
          >
            <AppText variant="caption" style={{ fontWeight: "500" }}>
              {t("common.back")}
            </AppText>
          </AppButton>
        </AppStack>
      )}
      <ScrollView 
        contentContainerStyle={{ 
          flexGrow: 1,
          paddingHorizontal: SPACING.m,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ 
          minHeight: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: SPACING.xl,
        }}>
          <AppStack 
            align="center" 
            gap="l"
            style={{ width: "100%", maxWidth: 400 }}
          >
            <View
              style={{
                padding: SPACING.l,
                borderRadius: BORDER_RADIUS.round,
                backgroundColor: `${accentColor}15`,
                borderWidth: 1,
                borderColor: `${accentColor}30`,
                marginBottom: SPACING.s,
              }}
            >
              <AppIcon
                name={iconName}
                library="Ionicons"
                size="xxl"
                color="accent"
              />
            </View>

            <AppStack align="center" gap="xs" style={{ width: "100%", marginBottom: SPACING.l }}>
              <AppText 
                variant="h1" 
                align="center"
                style={{ marginBottom: SPACING.xs }}
              >
                {title}
              </AppText>

              {description && (
                <AppText
                  variant="body"
                  align="center"
                  color="secondary"
                  style={{ lineHeight: 22, paddingHorizontal: SPACING.s }}
                >
                  {description}
                </AppText>
              )}
            </AppStack>

            {children}

            <View style={{ marginBottom: SPACING.xl }}>
              <AppProgressDots
                total={totalSteps}
                current={currentStep}
                size="m"
                spacing="m"
                activeColor={accentColor}
                inactiveColor={PALETTE.slateGray}
                inactiveOpacity={0.5}
              />
            </View>

            <AppStack style={{ width: "100%" }}>
              <AppButton
                onPress={onActionPress}
                status="accent"
                style={{ width: "100%" }}
                disabled={isActionDisabled || isProcessing}
              >
                <AppText style={{ fontWeight: "700" }}>
                  {isProcessing ? t("common.processing") : actionButtonText}
                </AppText>
              </AppButton>
            </AppStack>
          </AppStack>
        </View>
      </ScrollView>
    </AppContainer>
  );
};