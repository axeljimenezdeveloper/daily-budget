import React from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

// Componentes atómicos
import AppText from "@/components/atoms/content/AppText";
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppButton from "@/components/atoms/action/AppButton";
import AppProgressDots from "@/components/atoms/visual/AppProgressDots";

// Constantes de diseño
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";
import { PALETTE } from "@/constants/colors";

export default function Onboarding1() {
  const router = useRouter();
  const { t } = useTranslation();

  // Manejadores de navegación
  const handleNext = () => router.push("/(welcome)/onboarding2");
  const handleSkip = () => router.replace("/(welcome)/setup");

  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      <AppStack
        flex={1}
        style={{ paddingVertical: SPACING.l, paddingHorizontal: SPACING.m }}
      >
        {/* Header con botón de saltar */}
        <AppStack direction="horizontal" justify="flex-end">
          <AppButton
            onPress={handleSkip}
            variant="outline"
            status="neutral"
            style={{
              paddingHorizontal: SPACING.m,
              paddingVertical: SPACING.s,
            }}
          >
            <AppText variant="caption" style={{ fontWeight: "500" }}>
              {t("onboarding.skip")}
            </AppText>
          </AppButton>
        </AppStack>

        {/* Contenido principal */}
        <AppStack flex={1} justify="center" align="center" gap="xl">
          {/* Icono decorativo */}
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
              name="water-outline"
              library="Ionicons"
              size="xxxl"
              color="accent"
              style={{ transform: [{ rotate: "45deg" }] }}
            />
          </View>

          {/* Título y descripción */}
          <AppStack align="center" gap="m" style={{ maxWidth: 320 }}>
            <AppText variant="h1" align="center">
              {t("onboarding.screen1.title")}
            </AppText>

            <AppText
              variant="body"
              align="center"
              color="secondary"
              style={{ lineHeight: 24 }}
            >
              {t("onboarding.screen1.description_part1")}{" "}
              <AppText
                variant="body"
                color="accent"
                style={{ fontWeight: "600" }}
              >
                {t("onboarding.screen1.description_accent")}
              </AppText>
              {t("onboarding.screen1.description_part2")}
            </AppText>
          </AppStack>

          {/* Indicador de progreso */}
          <AppProgressDots
            total={3}
            current={0}
            size="m"
            spacing="m"
            activeColor={PALETTE.sunsetOrange}
            inactiveColor={PALETTE.slateGray}
            inactiveOpacity={0.5}
          />

          {/* Botón de siguiente */}
          <AppStack style={{ width: "100%" }}>
            <AppButton
              onPress={handleNext}
              status="primary"
              style={{ width: "100%" }}
            >
              <AppText style={{ fontWeight: "700" }}>
                {t("onboarding.next")}
              </AppText>
            </AppButton>
          </AppStack>
        </AppStack>
      </AppStack>
    </AppContainer>
  );
}