import React from "react";
import { ActivityIndicator, View } from "react-native";
import AppText from "@/components/atoms/content/AppText";
import AppStack from "@/components/atoms/structure/AppStack";
import AppContainer from "@/components/atoms/structure/AppContainer";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";

export default function LoadingAnimation() {
  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      <AppStack
        flex={1}
        justify="center"
        align="center"
        style={{ padding: SPACING.xl }}
      >
        <AppStack align="center" gap="xl" style={{ marginBottom: SPACING.xxl }}>
          <View
            style={{
              padding: SPACING.l,
              borderRadius: 100,
              backgroundColor: "rgba(245, 123, 56, 0.05)",
            }}
          >
            <ActivityIndicator size="large" color={PALETTE.sunsetOrange} />
          </View>

          <AppStack align="center" gap="xs">
            <AppText variant="h1" style={{ fontSize: 32, letterSpacing: -0.5 }}>
              SurvivalSpend
            </AppText>
            <View
              style={{
                height: 2,
                width: 40,
                backgroundColor: PALETTE.sunsetOrange,
                borderRadius: 1,
                marginVertical: SPACING.s,
              }}
            />
            <AppText
              variant="label"
              color="secondary"
              style={{
                letterSpacing: 4,
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              Cargando
            </AppText>
          </AppStack>
        </AppStack>

        <View style={{ position: "absolute", bottom: SPACING.xxl }}>
          <AppText variant="label" color="secondary" style={{ opacity: 0.4 }}>
            v1.0.0 • Alpha
          </AppText>
        </View>
      </AppStack>
    </AppContainer>
  );
}
