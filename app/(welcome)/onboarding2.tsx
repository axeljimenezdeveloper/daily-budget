import React from "react";
import { useRouter } from "expo-router";
import AppText from "@/components/atoms/content/AppText";
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppPressable from "@/components/atoms/action/AppPressable";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";
import { PALETTE } from "@/constants/colors";

export default function Onboarding2() {
  const router = useRouter();

  const handleNext = () => router.push("/(welcome)/onboarding3");

  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      <AppStack 
        flex={1} 
        justify="center" 
        align="center" 
        gap="xl" 
        style={{ padding: SPACING.l }}
      >
        <AppIcon 
          name="card-outline" 
          library="Ionicons" 
          size="xxl" 
          color="accent" 
        />
        
        <AppStack gap="m" align="center">
          <AppText variant="h1" align="center">
            Gastos bajo Lupa
          </AppText>
          <AppText variant="body" align="center" color="secondary">
            Categoriza tus consumos y descubre a dónde se va realmente tu dinero.
          </AppText>
        </AppStack>

        <AppPressable 
          onPress={handleNext}
          style={{ 
            backgroundColor: PALETTE.nightBlue, 
            paddingVertical: SPACING.m, 
            paddingHorizontal: SPACING.xl, 
            borderRadius: BORDER_RADIUS.round 
          }}
        >
          <AppText style={{ fontWeight: "700" }}>
            Siguiente
          </AppText>
        </AppPressable>
      </AppStack>
    </AppContainer>
  );
}