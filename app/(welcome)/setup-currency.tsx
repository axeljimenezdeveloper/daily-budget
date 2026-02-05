// app/welcome/setup-currency.tsx
import React from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, View, TouchableOpacity } from "react-native";

// Componentes atómicos
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppButton from "@/components/atoms/action/AppButton";
import AppProgressDots from "@/components/atoms/visual/AppProgressDots";
import AppSelect from "@/components/atoms/action/AppSelect";
import AppBadge from "@/components/atoms/visual/AppBadge";
import AppModal from "@/components/atoms/structure/AppModal";

// Constantes de diseño
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

// Interfaz para Currency (integrada directamente)
interface Currency {
  symbol: string;
  name: string;
  code: string;
  flag: string;
  locale: string;
}

// Lista de monedas (integrada directamente)
const CURRENCY_LIST: Currency[] = [
  {
    symbol: "$",
    name: "Dólar Estadounidense",
    code: "USD",
    flag: "🇺🇸",
    locale: "en-US",
  },
  {
    symbol: "Bs",
    name: "Bolívar Venezolano",
    code: "VES",
    flag: "🇻🇪",
    locale: "es-VE",
  },
  {
    symbol: "$",
    name: "Peso Mexicano",
    code: "MXN",
    flag: "🇲🇽",
    locale: "es-MX",
  },
  {
    symbol: "$",
    name: "Peso Colombiano",
    code: "COP",
    flag: "🇨🇴",
    locale: "es-CO",
  },
  {
    symbol: "$",
    name: "Peso Argentino",
    code: "ARS",
    flag: "🇦🇷",
    locale: "es-AR",
  },
  {
    symbol: "S/",
    name: "Sol Peruano",
    code: "PEN",
    flag: "🇵🇪",
    locale: "es-PE",
  },
  {
    symbol: "R$",
    name: "Real Brasileño",
    code: "BRL",
    flag: "🇧🇷",
    locale: "pt-BR",
  },
  { symbol: "€", name: "Euro", code: "EUR", flag: "🇪🇺", locale: "es-ES" },
  {
    symbol: "£",
    name: "Libra Esterlina",
    code: "GBP",
    flag: "🇬🇧",
    locale: "en-GB",
  },
];

export default function SetupCurrencyScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  // Estado local para la moneda y modal (reemplazando useSetupForm)
  const [currency, setCurrency] = React.useState<Currency>(CURRENCY_LIST[0]);
  const [showCurrencyModal, setShowCurrencyModal] = React.useState(false);

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

            {/* Sección de selección de moneda - INTEGRADA DIRECTAMENTE */}
            <AppStack style={{ width: "100%", marginBottom: SPACING.xl }} gap="m">
              <AppStack gap="s">
                <AppStack direction="horizontal" align="center" gap="xs">
                  <AppText variant="h3" color="accent" style={{ fontSize: 16 }}>
                    {t("setup.divisa_title", "DIVISA")}
                  </AppText>
                </AppStack>

                <AppText variant="caption" color="secondary" style={{ marginBottom: SPACING.xs }}>
                  {t("setup.divisa_description", "Selecciona la moneda con la que gestionarás tu oxígeno.")}
                </AppText>

                <AppSelect
                  value={`${currency.flag} ${currency.code} (${currency.symbol})`}
                  onPress={() => setShowCurrencyModal(true)}
                  label={t("setup.mission_currency", "Moneda de la misión")}
                />

                {currency && (
                  <AppStack direction="horizontal" gap="xs" style={{ marginTop: SPACING.xs }}>
                    <AppBadge
                      label={currency.code}
                      status="info"
                      variant="subtle"
                      style={{ paddingHorizontal: SPACING.xs, paddingVertical: 2 }}
                    />
                    <AppBadge
                      label={currency.symbol}
                      status="neutral"
                      variant="subtle"
                      style={{ paddingHorizontal: SPACING.xs, paddingVertical: 2 }}
                    />
                  </AppStack>
                )}
              </AppStack>
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

      {/* Modal de selección de moneda - INTEGRADO DIRECTAMENTE */}
      <AppModal
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        title={t("setup.currency_modal_title", "Divisa")}
      >
        <ScrollView style={{ maxHeight: 400 }}>
          <AppStack gap="s">
            {CURRENCY_LIST.map((item) => (
              <TouchableOpacity
                key={item.code}
                onPress={() => {
                  setCurrency(item);
                  setShowCurrencyModal(false);
                }}
                style={{
                  padding: SPACING.m,
                  backgroundColor:
                    currency.code === item.code
                      ? `${PALETTE.sunsetOrange}15`
                      : "transparent",
                  borderRadius: BORDER_RADIUS.m,
                  borderWidth: 1,
                  borderColor:
                    currency.code === item.code
                      ? PALETTE.sunsetOrange
                      : PALETTE.darkBorder,
                }}
              >
                <AppText>
                  {item.flag} {item.name} ({item.symbol})
                </AppText>
              </TouchableOpacity>
            ))}
          </AppStack>
        </ScrollView>
      </AppModal>
    </AppContainer>
  );
}