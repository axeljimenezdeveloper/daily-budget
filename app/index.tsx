// ============================================================================
// PANTALLA DE INICIO (REDIRECCIÓN)
// ============================================================================

import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useVaultStore } from "@/store/useVaultStore";
import { ROUTES } from "@/constants/navigation";

export default function HomeScreen() {
  const router = useRouter();
  const hasFinishedOnboarding = useVaultStore((state) => state.hasFinishedOnboarding);
  const isBiometricEnabled = useVaultStore((state) => state.isBiometricEnabled);

  useEffect(() => {
    // Pequeño retraso para garantizar que el layout raíz ya esté montado
    const timer = setTimeout(() => {
      if (!hasFinishedOnboarding) {
        router.replace(ROUTES.WELCOME.ONBOARDING1);
      } else {
        if (isBiometricEnabled) {
          router.replace(ROUTES.AUTH.BIOMETRIC);
        } else {
          router.replace(ROUTES.MAIN.INDEX);
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [hasFinishedOnboarding, isBiometricEnabled, router]);

  return null;
}