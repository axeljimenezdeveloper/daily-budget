// app/(main)/debug-reset.tsx - VERSIÓN CORREGIDA
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

// Store
import { useVaultStore } from "@/store/useVaultStore";
import { formatMoney } from "@/store/useVaultStore/index.utils";

// Componentes atómicos
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppCard from "@/components/atoms/surface/AppCard";
import AppButton from "@/components/atoms/action/AppButton";
import AppText from "@/components/atoms/content/AppText";
import AppDivider from "@/components/atoms/structure/AppDivider";
import AppBadge from "@/components/atoms/visual/AppBadge";
import AppProgressBar from "@/components/atoms/visual/AppProgressBar";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";

export default function DebugResetScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    totalBudget,
    remainingBudget,
    isConfigured,
    isExtremeMode,
    transactions,
    daysDuration,
    startDate,
    currency,
    language,
    hasFinishedOnboarding,
    
    resetVault,
    initVault,
  } = useVaultStore();

  const [isResetting, setIsResetting] = useState(false);

  const totalSpent = totalBudget - remainingBudget;
  const progress = totalBudget > 0 ? remainingBudget / totalBudget : 0;
  const transactionCount = transactions.length;

  // Reset completo
  const handleNuclearReset = () => {
    Alert.alert(
      "⚠️ RESET NUCLEAR",
      "¿Estás seguro de querer BORRAR TODO?\n\nEsta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "BORRAR TODO",
          style: "destructive",
          onPress: () => {
            setIsResetting(true);
            resetVault();
            setTimeout(() => {
              setIsResetting(false);
              Alert.alert("✅", "Reset nuclear completado");
              // CORRECCIÓN: Usar replace en lugar de back
              router.replace("/(main)");
            }, 500);
          },
        },
      ]
    );
  };

  // Reset solo de transacciones
  const handleSoftReset = () => {
    Alert.alert(
      "🔄 RESET PARCIAL",
      "¿Reiniciar solo las transacciones?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Reiniciar transacciones",
          onPress: () => {
            setIsResetting(true);
            initVault(totalBudget, daysDuration, currency);
            setTimeout(() => {
              setIsResetting(false);
              Alert.alert("✅", "Transacciones reiniciadas");
            }, 500);
          },
        },
      ]
    );
  };

  // Reset de onboarding
  const handleOnboardingReset = () => {
    Alert.alert(
      "🎬 REINICIAR ONBOARDING",
      "¿Volver a mostrar las pantallas de bienvenida?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Reiniciar onboarding",
          onPress: () => {
            useVaultStore.setState({ hasFinishedOnboarding: false });
            Alert.alert("✅", "Onboarding reiniciado");
            // CORRECCIÓN: Usar replace para ir al onboarding
            router.replace("/(welcome)/onboarding1");
          },
        },
      ]
    );
  };

  // Configuración de prueba rápida
  const handleQuickSetup = () => {
    Alert.alert(
      "⚡ CONFIGURACIÓN RÁPIDA",
      "¿Crear una configuración de prueba?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Crear demo",
          onPress: () => {
            initVault(10000, 30, "$");
            Alert.alert("✅", "Configuración demo creada");
            // CORRECCIÓN: Usar replace en lugar de back
            router.replace("/(main)");
          },
        },
      ]
    );
  };

  return (
    <AppContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: SPACING.xxl }}>
        <AppStack gap="l" style={{ padding: SPACING.m }}>
          
          <AppStack align="center" gap="m">
            <AppText variant="h2" style={{ color: PALETTE.warningOrange }}>
              ⚠️ PANEL EXPERIMENTAL
            </AppText>
            <AppText variant="caption" color="secondary" align="center">
              Solo para desarrollo. Los cambios aquí afectan datos persistentes.
            </AppText>
            <AppBadge label="DEBUG MODE" status="warning" variant="filled" />
          </AppStack>

          <AppDivider />

          <AppCard>
            <AppStack gap="m">
              <AppText variant="h3">ESTADO ACTUAL</AppText>
              
              <AppStack gap="s">
                <AppStack direction="horizontal" justify="space-between">
                  <AppText color="secondary">Configurado:</AppText>
                  <AppBadge 
                    label={isConfigured ? "SÍ" : "NO"} 
                    status={isConfigured ? "success" : "error"} 
                  />
                </AppStack>
                
                <AppStack direction="horizontal" justify="space-between">
                  <AppText color="secondary">Onboarding:</AppText>
                  <AppBadge 
                    label={hasFinishedOnboarding ? "COMPLETADO" : "PENDIENTE"} 
                    status={hasFinishedOnboarding ? "success" : "warning"} 
                  />
                </AppStack>
                
                <AppStack direction="horizontal" justify="space-between">
                  <AppText color="secondary">Modo extremo:</AppText>
                  <AppBadge 
                    label={isExtremeMode ? "ACTIVO" : "INACTIVO"} 
                    status={isExtremeMode ? "error" : "success"} 
                  />
                </AppStack>
                
                <AppStack direction="horizontal" justify="space-between">
                  <AppText color="secondary">Idioma:</AppText>
                  <AppText>{language === "es" ? "🇪🇸 Español" : "🇺🇸 English"}</AppText>
                </AppStack>
              </AppStack>

              {isConfigured && (
                <AppStack gap="xs">
                  <AppStack direction="horizontal" justify="space-between">
                    <AppText color="secondary">Oxígeno restante:</AppText>
                    <AppText>{formatMoney(remainingBudget, currency)}</AppText>
                  </AppStack>
                  <AppProgressBar 
                    progress={progress} 
                    status={isExtremeMode ? "error" : "success"}
                    height={6}
                  />
                  <AppStack direction="horizontal" justify="space-between">
                    <AppText variant="caption" color="secondary">
                      Total: {formatMoney(totalBudget, currency)}
                    </AppText>
                    <AppText variant="caption" color="secondary">
                      Gastado: {formatMoney(totalSpent, currency)}
                    </AppText>
                  </AppStack>
                </AppStack>
              )}

              <AppStack gap="s">
                <AppStack direction="horizontal" justify="space-between">
                  <AppText color="secondary">Transacciones:</AppText>
                  <AppText>{transactionCount} registros</AppText>
                </AppStack>
                
                {startDate && (
                  <AppStack direction="horizontal" justify="space-between">
                    <AppText color="secondary">Inicio:</AppText>
                    <AppText variant="caption">
                      {new Date(startDate).toLocaleDateString()}
                    </AppText>
                  </AppStack>
                )}
                
                {daysDuration > 0 && (
                  <AppStack direction="horizontal" justify="space-between">
                    <AppText color="secondary">Duración configurada:</AppText>
                    <AppText>{daysDuration} días</AppText>
                  </AppStack>
                )}
              </AppStack>
            </AppStack>
          </AppCard>

          <AppStack gap="m">
            <AppText variant="h3">ACCIONES DE RESET</AppText>
            
            <AppButton
              onPress={handleNuclearReset}
              status="error"
              disabled={isResetting}
              style={{ opacity: isResetting ? 0.5 : 1 }}
            >
              <AppText style={{ fontWeight: "700" }}>
                {isResetting ? "RESETEANDO..." : "🚨 RESET NUCLEAR"}
              </AppText>
            </AppButton>

            <AppButton
              onPress={handleSoftReset}
              status="warning"
              variant="outline"
              disabled={isResetting || !isConfigured}
            >
              <AppText>🔄 Reiniciar solo transacciones</AppText>
            </AppButton>

            <AppButton
              onPress={handleOnboardingReset}
              status="info"
              variant="outline"
              disabled={isResetting}
            >
              <AppText>🎬 Reiniciar onboarding</AppText>
            </AppButton>

            <AppButton
              onPress={handleQuickSetup}
              status="success"
              variant="outline"
              disabled={isResetting}
            >
              <AppText>⚡ Crear configuración demo</AppText>
            </AppButton>
          </AppStack>

          <AppCard style={{ backgroundColor: `${PALETTE.nightBlue}80` }}>
            <AppStack gap="s">
              <AppText variant="caption" color="secondary">
                📁 Datos persistentes:
              </AppText>
              <AppText variant="label" color="secondary">
                • AsyncStorage key: "vault-storage"
              </AppText>
              <AppText variant="label" color="secondary">
                • Reinicio manual: desinstalar la app
              </AppText>
            </AppStack>
          </AppCard>

          {/* CORRECCIÓN: Usar replace en lugar de back */}
          <AppButton
            onPress={() => router.replace("/(main)/settings")}
            status="neutral"
            variant="outline"
          >
            <AppText>← Volver a Ajustes</AppText>
          </AppButton>

          <AppStack align="center">
            <AppText variant="label" color="secondary">
              v1.28.0 • Debug Panel • Solo desarrollo
            </AppText>
          </AppStack>
        </AppStack>
      </ScrollView>
    </AppContainer>
  );
}