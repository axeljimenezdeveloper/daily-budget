import React, { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import AppText from "@/components/atoms/content/AppText";
import AppStack from "@/components/atoms/structure/AppStack";
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppIcon from "@/components/atoms/content/AppIcon";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";

export default function SuccessAnimation() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(main)");
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      <AppStack flex={1} justify="center" align="center" style={{ padding: SPACING.xl }}>
        
        <AppStack align="center" gap="xl">
          <View style={{ 
            padding: SPACING.xl, 
            borderRadius: 100, 
            backgroundColor: 'rgba(72, 187, 120, 0.1)' 
          }}>
            <AppIcon 
              name="checkmark-circle" 
              library="Ionicons" 
              size="xxl" 
              color="success" 
            />
          </View>

          <AppStack align="center" gap="xs">
            <AppText variant="h1" style={{ fontSize: 32, textAlign: 'center' }}>
              ¡Todo listo!
            </AppText>
            
            <View style={{ 
              height: 2, 
              width: 60, 
              backgroundColor: PALETTE.successGreen, 
              borderRadius: 1,
              marginVertical: SPACING.s 
            }} />

            <AppText 
              variant="body" 
              color="secondary" 
              align="center"
              style={{ opacity: 0.9 }}
            >
              Estamos configurando tu tablero personal...
            </AppText>
          </AppStack>
        </AppStack>

      </AppStack>
    </AppContainer>
  );
}