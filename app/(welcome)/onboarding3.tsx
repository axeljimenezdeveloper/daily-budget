import React from "react";
import { useRouter } from "expo-router";
import AppText from "@/components/atoms/content/AppText";
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppIcon from "@/components/atoms/content/AppIcon";
import AppPressable from "@/components/atoms/action/AppPressable";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";
import { PALETTE } from "@/constants/colors";

export default function Onboarding3() {
  const router = useRouter();

  const handleFinish = () => {
    // Redirigimos a la pantalla de éxito en lugar del Main directamente
    router.replace("/(animations)/success");
  };
  
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
          name="notifications-outline" 
          library="Ionicons" 
          size="xxl" 
          color="accent" 
        />
        
        <AppStack gap="m" align="center">
          <AppText variant="h1" align="center">
            Alertas Inteligentes
          </AppText>
          <AppText variant="body" align="center" color="secondary">
            Recibe notificaciones cuando estés cerca de tus límites. Tu ahorro es nuestra prioridad.
          </AppText>
        </AppStack>

        <AppPressable 
          onPress={handleFinish}
          style={{ 
            backgroundColor: PALETTE.sunsetOrange, 
            paddingVertical: SPACING.m, 
            paddingHorizontal: SPACING.xl, 
            borderRadius: BORDER_RADIUS.round 
          }}
        >
          <AppText style={{ fontWeight: "700" }}>
            Comenzar Ahora
          </AppText>
        </AppPressable>
      </AppStack>
    </AppContainer>
  );
}