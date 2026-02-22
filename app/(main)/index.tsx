import React from "react";
import { View } from "react-native";
import AppText from "@/components/atoms/content/AppText";
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppStack from "@/components/atoms/structure/AppStack";
import AppIcon from "@/components/atoms/content/AppIcon";
import { PALETTE } from "@/constants/colors";
import { SPACING, BORDER_RADIUS } from "@/constants/metrics";

export default function HomePlaceholder() {
  return (
    <AppContainer>
      <AppStack
        flex={1}
        direction="vertical"
        justify="center"
        align="center"
        gap="xl"
      >
        <View style={{ transform: [{ scale: 1.5 }] }}>
          <AppIcon
            name="rocket-outline"
            library="Ionicons"
            size="xxl"
            color="secondary"
          />
        </View>

        <AppStack
          direction="vertical"
          align="center"
          gap="s"
          style={{ paddingHorizontal: SPACING.l }}
        >
          <AppText
            variant="h2"
            align="center"
            style={{ textTransform: "uppercase", letterSpacing: 1 }}
          >
            Próximamente
          </AppText>
          <AppText
            variant="body"
            align="center"
            color="secondary"
            style={{ maxWidth: 300 }}
          >
            Estamos construyendo el dashboard financiero definitivo para ti.
            ¡Prepárate!
          </AppText>
        </AppStack>

        <View
          style={{
            marginTop: SPACING.m,
            paddingVertical: SPACING.xs,
            paddingHorizontal: SPACING.m,
            backgroundColor: PALETTE.nightBlue,
            borderWidth: 1,
            borderColor: PALETTE.darkBorder,
            borderRadius: BORDER_RADIUS.round,
          }}
        >
          <AppText
            variant="label"
            color="accent"
            align="center"
            style={{ fontWeight: "700" }}
          >
            EN DESARROLLO
          </AppText>
        </View>
      </AppStack>
    </AppContainer>
  );
}
