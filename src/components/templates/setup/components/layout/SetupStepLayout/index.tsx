// ============================================================================
// LAYOUT BASE PARA TODAS LAS PANTALLAS DE CONFIGURACIÓN (SetupStepLayout)
//
// Este componente proporciona la estructura visual común a los pasos de:
// - Selección de moneda (setup-currency)
// - Ingreso de presupuesto (setup-budget)
// - Selección de duración (setup-duration)
//
// Incluye: botón de retroceso, ícono decorativo, título, descripción,
// área de contenido dinámico (children), indicador de progreso y botón de acción.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from "react";
import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS REUTILIZABLES
// ----------------------------------------------------------------------------
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppText from "@/components/atoms/content/AppText";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppButton from "@/components/atoms/action/AppButton";
import AppProgressDots from "@/components/atoms/visual/AppProgressDots";

// ----------------------------------------------------------------------------
// PROPS Y CONSTANTES GLOBALES
// ----------------------------------------------------------------------------
import { SetupStepLayoutProps } from "./index.props";
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * SetupStepLayout – Estructura base para pantallas del flujo de configuración.
 *
 * @param props - Ver SetupStepLayoutProps en index.props.ts
 * @returns Componente con layout completo de paso de configuración.
 */
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

  // RENDERIZADO
  // --------------------------------------------------------------------------
  return (
    <AppContainer style={{ backgroundColor }}>
      {/* ----------------------------------------------------------------
        BOTÓN DE RETROCESO (opcional)
        Se muestra solo si showBackButton es true. El botón tiene estilo
        outline y texto traducido "common.back".
      ---------------------------------------------------------------- */}
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
            {/* ------------------------------------------------------------
              CÍRCULO DECORATIVO CON ÍCONO
              Fondo semitransparente basado en accentColor, borde del mismo
              color. El ícono se personaliza mediante iconName.
            ------------------------------------------------------------ */}
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

            {/* ------------------------------------------------------------
              ENCABEZADO DE TEXTO: TÍTULO Y DESCRIPCIÓN
              Título con variant h1, descripción con color secundario.
              La descripción es opcional.
            ------------------------------------------------------------ */}
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

            {/* ------------------------------------------------------------
              CONTENIDO DINÁMICO DEL PASO
              Se inyecta mediante children (BudgetSection, CurrencySection,
              DurationSection, etc.)
            ------------------------------------------------------------ */}
            {children}

            {/* ------------------------------------------------------------
              INDICADOR DE PROGRESO
              Muestra el paso actual respecto al total de pasos del flujo.
              El color activo se toma de accentColor.
            ------------------------------------------------------------ */}
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

            {/* ------------------------------------------------------------
              BOTÓN DE ACCIÓN PRINCIPAL
              Texto configurable (actionButtonText). Se deshabilita cuando
              isActionDisabled o isProcessing es true. Muestra "Procesando..."
              durante el estado de carga.
            ------------------------------------------------------------ */}
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