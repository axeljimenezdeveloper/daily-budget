import React, { useRef, useEffect } from "react";
import { ScrollView, Animated } from "react-native";
import { useRouter, usePathname } from "expo-router";

import AppOverlay from "@/components/atoms/structure/AppOverlay";
import AppSafeView from "@/components/atoms/structure/AppSafeView";
import AppBox from "@/components/atoms/structure/AppBox";
import AppPanel from "@/components/atoms/surface/AppPanel";
import AppText from "@/components/atoms/content/AppText";
import AppAvatar from "@/components/atoms/content/AppAvatar";
import AppDivider from "@/components/atoms/structure/AppDivider";
import AppProgressBar from "@/components/atoms/visual/AppProgressBar";
import AppListItem from "@/components/atoms/action/AppListItem";

import { AppDrawerProps } from "./index.props";
import { styles, DRAWER_WIDTH } from "./index.styles";
import { MAIN_ROUTES, INFO_ROUTES, getOxygenStatus } from "./index.utils";
import { useVaultStore } from "@/store/useVaultStore";

export default function AppDrawer({ isOpen, onClose }: AppDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { remainingBudget, totalBudget } = useVaultStore();
  
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const progress = totalBudget > 0 ? remainingBudget / totalBudget : 0;
  const status = getOxygenStatus(progress);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path as any);
  };

  return (
    <AppOverlay isOpen={isOpen} onClose={onClose}>
      <Animated.View 
        style={[styles.animatedContainer, { transform: [{ translateX: slideAnim }] }]}
      >
        <AppPanel background="deepNight" flex={1}>
          <AppSafeView edges={["top", "bottom"]} background="transparent">
            
            <AppBox direction="row" align="center" gap="m" padding="m">
              <AppAvatar name="Survival User" size="xxl" />
              <AppBox gap="xs">
                <AppText variant="h3">OPERADOR</AppText>
                <AppText variant="caption" color="secondary">ID: SURV-2026</AppText>
              </AppBox>
            </AppBox>

            <AppDivider />

            <ScrollView contentContainerStyle={styles.scrollContent}>
              <AppText variant="label" color="secondary" style={styles.menuLabel}>
                SISTEMA CENTRAL
              </AppText>
              
              <AppBox gap="s">
                {MAIN_ROUTES.map((route) => (
                  <AppListItem
                    key={route.path}
                    label={route.label}
                    icon={route.icon}
                    isActive={pathname === route.path}
                    onPress={() => handleNavigate(route.path)}
                  />
                ))}
              </AppBox>

              <AppDivider marginVertical="l" />

              <AppText variant="label" color="secondary" style={styles.menuLabel}>
                DOCUMENTACIÓN
              </AppText>
              
              <AppBox gap="s">
                {INFO_ROUTES.map((route) => (
                  <AppListItem
                    key={route.path}
                    label={route.label}
                    icon={route.icon}
                    onPress={() => handleNavigate(route.path)}
                  />
                ))}
              </AppBox>
            </ScrollView>

            <AppBox padding="m" style={styles.footer}>
              <AppBox direction="row" justify="space-between" align="center" style={styles.oxygenInfo}>
                <AppText variant="label" color="secondary">SUMINISTRO OXÍGENO</AppText>
                <AppText variant="caption" color={status}>
                  {Math.round(progress * 100)}%
                </AppText>
              </AppBox>
              <AppProgressBar progress={progress} status={status} height={8} />
            </AppBox>

          </AppSafeView>
        </AppPanel>
      </Animated.View>
    </AppOverlay>
  );
}