import React from "react";
import { View } from "react-native";
import AppText from "@/components/atoms/content/AppText";
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppIcon from "@/components/atoms/content/AppIcon"; 
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

export default function AddExpensePlaceholder() {
  return (
    <AppContainer>
      <AppStack
        flex={1}
        direction="vertical"
        justify="center"
        align="center"
        gap="xl" 
      >
        {/* Icono de registro escalado */}
        <View style={{ 
              transform: [{ scale: 1.5 }] 
        }}>
            <AppIcon 
              name="add-circle-outline" 
              library="Ionicons" 
              size="xxl" 
              color="secondary" 
            />
        </View>

        {/* Sección de textos */}
        <AppStack direction="vertical" align="center" gap="s" style={{ paddingHorizontal: SPACING.l }}>
          <AppText variant="h2" align="center" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            Nuevo Gasto
          </AppText>
          
          <AppText variant="body" align="center" color="secondary" style={{ maxWidth: 300 }}>
            Aquí podrás registrar tus consumos en menos de 5 segundos. Estamos preparando la interfaz de carga rápida.
          </AppText>
        </AppStack>

        {/* Badge de estado del punto de desarrollo */}
        <View style={{
            marginTop: SPACING.m,
            paddingVertical: SPACING.xs,
            paddingHorizontal: SPACING.m,
            backgroundColor: PALETTE.nightBlue, 
            borderWidth: 1,
            borderColor: PALETTE.darkBorder,
            borderRadius: BORDER_RADIUS.round,
        }}>
            <AppText variant="label" color="accent" align="center" style={{ fontWeight: '700' }}>
               PUNTO DE DESARROLLO: REGISTRO
            </AppText>
        </View>

      </AppStack>
    </AppContainer>
  );
}