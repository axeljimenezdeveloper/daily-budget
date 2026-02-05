// app/welcome/setup-currency.tsx
import React from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

// Componentes atómicos
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppButton from "@/components/atoms/action/AppButton";
import AppProgressDots from "@/components/atoms/visual/AppProgressDots";

// Componentes de templates (existentes)
import CurrencySection from "@/components/templates/setup/CurrencySection";
import CurrencyModal from "@/components/templates/setup/CurrencyModal";

// Hook de formulario (modificado)
import { useSetupForm } from "@/components/templates/setup/hooks/useSetupForm";

// Constantes de diseño
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

export default function SetupCurrencyScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  // Usar el hook de formulario para manejar el estado de la moneda
  const {
    currency,
    setCurrency,
    showCurrencyModal,
    setShowCurrencyModal,
  } = useSetupForm();

  const handleNext = () => {
    // Validación básica: asegurarse de que hay una moneda seleccionada
    if (currency && currency.code) {
      // Navegar a la siguiente pantalla PASANDO LA MONEDA como parámetro
      router.push({
        pathname: "/(welcome)/setup-budget",
        params: {
          // Pasar la moneda completa como JSON serializado
          currencyJSON: JSON.stringify(currency)
        }
      });
    }
  };

  const handleBack = () => {
    // Usamos replace para limpiar el historial de navegación
    // y redirigir directamente a onboarding1
    router.replace("/(welcome)/onboarding1");
  };

  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      {/* Botón de atrás */}
      <AppStack direction="horizontal" justify="flex-start" style={{ paddingHorizontal: SPACING.m, paddingTop: SPACING.l }}>
        <AppButton
          onPress={handleBack}
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

      {/* ScrollView para asegurar que todo el contenido sea accesible */}
      <ScrollView 
        contentContainerStyle={{ 
          flexGrow: 1,
          paddingHorizontal: SPACING.m,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Contenido principal centrado con altura mínima */}
        <View style={{ 
          minHeight: "100%", // Asegura que ocupe al menos toda la pantalla
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: SPACING.xl, // Espacio vertical consistente
        }}>
          <AppStack 
            align="center" 
            gap="l" // Reducido de "xl" para menos espacio entre elementos
            style={{ width: "100%", maxWidth: 400 }}
          >
            {/* Icono decorativo - tamaño ajustado */}
            <View
              style={{
                padding: SPACING.l, // Reducido de "xl"
                borderRadius: BORDER_RADIUS.round,
                backgroundColor: `${PALETTE.sunsetOrange}15`,
                borderWidth: 1,
                borderColor: `${PALETTE.sunsetOrange}30`,
                marginBottom: SPACING.s, // Espacio controlado
              }}
            >
              <AppIcon
                name="cash-outline"
                library="Ionicons"
                size="xxl" // Reducido de "xxxl"
                color="accent"
              />
            </View>

            {/* Título y descripción - márgenes controlados */}
            <AppStack align="center" gap="xs" style={{ width: "100%", marginBottom: SPACING.l }}>
              <AppText 
                variant="h1" 
                align="center"
                style={{ marginBottom: SPACING.xs }}
              >
                {t("setup.currency_label", "Moneda de la misión")}
              </AppText>

              <AppText
                variant="body"
                align="center"
                color="secondary"
                style={{ lineHeight: 22, paddingHorizontal: SPACING.s }}
              >
                {t(
                  "setup.divisa_description",
                  "Selecciona la moneda con la que gestionarás tu oxígeno.",
                )}
              </AppText>
            </AppStack>

            {/* Sección de selección de moneda - espaciado consistente */}
            <AppStack style={{ width: "100%", marginBottom: SPACING.xl }} gap="m">
              <CurrencySection
                currency={currency}
                onPressCurrency={() => setShowCurrencyModal(true)}
              />
            </AppStack>

            {/* Indicador de progreso - espacio fijo */}
            <View style={{ marginBottom: SPACING.xl }}>
              <AppProgressDots
                total={3}
                current={0}
                size="m"
                spacing="m"
                activeColor={PALETTE.sunsetOrange}
                inactiveColor={PALETTE.slateGray}
                inactiveOpacity={0.5}
              />
            </View>

            {/* Botón de siguiente - posición fija relativa */}
            <AppStack style={{ width: "100%" }}>
              <AppButton
                onPress={handleNext}
                status="accent"
                style={{ width: "100%" }}
                disabled={!currency || !currency.code}
              >
                <AppText style={{ fontWeight: "700" }}>
                  {t("onboarding.next", "Siguiente")}
                </AppText>
              </AppButton>
            </AppStack>
          </AppStack>
        </View>
      </ScrollView>

      {/* Modal de selección de moneda (componente existente) */}
      <CurrencyModal
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        currency={currency}
        setCurrency={setCurrency}
      />
    </AppContainer>
  );
}