import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import AppText from "@/components/atoms/content/AppText";
import AppStack from "@/components/atoms/structure/AppStack";
import AppContainer from "@/components/atoms/structure/AppContainer";
import { PALETTE } from "@/constants/colors";
import { SPACING } from "@/constants/metrics";
import { getAppInfoForFooter } from "@/utils/version"; // Importar función centralizada

export default function TransitionAnimation() {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(welcome)/setup-currency");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      <AppStack 
        flex={1} 
        justify="center" 
        align="center" 
        style={{ padding: SPACING.xl }}
      >
        <AppStack align="center" gap="xl" style={{ marginBottom: SPACING.xxl }}>
          {/* Contenedor circular con spinner */}
          <View
            style={{
              padding: SPACING.l,
              borderRadius: 100,
              backgroundColor: "rgba(66, 153, 225, 0.05)",
            }}
          >
            <ActivityIndicator size="large" color={PALETTE.infoBlue} />
          </View>

          {/* Contenido textual */}
          <AppStack align="center" gap="xs">
            {/* Título internacionalizado */}
            <AppText 
              variant="h1" 
              style={{ 
                fontSize: 28, 
                letterSpacing: -0.5,
                textAlign: 'center'
              }}
            >
              {t("animations.transition.title")}
            </AppText>
            
            <View
              style={{
                height: 2,
                width: 40,
                backgroundColor: PALETTE.infoBlue,
                borderRadius: 1,
                marginVertical: SPACING.s,
              }}
            />
            
            {/* Subtítulo internacionalizado */}
            <AppText
              variant="body"
              color="secondary"
              align="center"
              style={{ 
                maxWidth: 280,
                lineHeight: 22,
                opacity: 0.9
              }}
            >
              {t("animations.transition.subtitle")}
            </AppText>
          </AppStack>
        </AppStack>

        {/* Pie de página con función centralizada */}
        <View style={{ position: "absolute", bottom: SPACING.xxl }}>
          <AppText variant="label" color="secondary" style={{ opacity: 0.4 }}>
            {getAppInfoForFooter(true, "Alpha")}
          </AppText>
        </View>
      </AppStack>
    </AppContainer>
  );
}