// app/welcome/onboarding3.tsx (MODIFICADO)
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

export default function Onboarding3() {
  const router = useRouter();
  const { t } = useTranslation();

  // Manejadores de navegación - Pantalla final - MODIFICADOS
  const handleFinish = () => router.replace("/(animations)/transition"); // CAMBIADO A TRANSICIÓN
  const handleSkip = () => router.replace("/(animations)/transition"); // CAMBIADO A TRANSICIÓN

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
          {/* Icono decorativo con temática de finalización */}
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
              name="checkmark-done-outline"
              library="Ionicons"
              size="xxxl"
              color="accent"
            />
          </View>

          {/* Título y descripción */}
          <AppStack align="center" gap="m" style={{ maxWidth: 320 }}>
            <AppText variant="h1" align="center">
              {t("onboarding.screen3.title")}
            </AppText>

            <AppText
              variant="body"
              align="center"
              color="secondary"
              style={{ lineHeight: 24 }}
            >
              {t("onboarding.screen3.description_part1")}{" "}
              <AppText
                variant="body"
                color="success"
                style={{ fontWeight: "600" }}
              >
                {t("onboarding.screen3.description_accent_success")}
              </AppText>
              {" "}{t("onboarding.screen3.description_part2")}{" "}
              <AppText
                variant="body"
                color="warning"
                style={{ fontWeight: "600" }}
              >
                {t("onboarding.screen3.description_accent_warning")}
              </AppText>
              {t("onboarding.screen3.description_part3")}
            </AppText>
          </AppStack>

          {/* Indicador de progreso - Pantalla final */}
          <AppProgressDots
            total={3}
            current={2}
            size="m"
            spacing="m"
            activeColor={PALETTE.sunsetOrange}
            inactiveColor={PALETTE.slateGray}
            inactiveOpacity={0.5}
          />

          {/* Botón de acción principal - Comienza la configuración */}
          <AppStack style={{ width: "100%" }}>
            <AppButton
              onPress={handleFinish}
              status="accent"
              style={{ width: "100%" }}
            >
              <AppText style={{ fontWeight: "700" }}>
                {t("onboarding.get_started", "Comenzar Ahora")}
              </AppText>
            </AppButton>
          </AppStack>
        </AppStack>
      </AppStack>
    </AppContainer>
  );
}