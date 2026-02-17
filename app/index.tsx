import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useVaultStore } from "@/store/useVaultStore";
import LoadingAnimation from "./(animations)/loading";
import { ROUTES } from "@/constants/navigation"; 

export default function HomeScreen() {
  const router = useRouter();
  const hasFinishedOnboarding = useVaultStore((state) => state.hasFinishedOnboarding);
  const isBiometricEnabled = useVaultStore((state) => state.isBiometricEnabled);
  
  console.log('HomeScreen - hasFinishedOnboarding:', hasFinishedOnboarding);
  console.log('HomeScreen - isBiometricEnabled:', isBiometricEnabled);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasFinishedOnboarding) {
        router.replace(ROUTES.WELCOME.ONBOARDING1);
      } else {
        // Si ya completó onboarding, evaluamos si requiere biometría
        if (isBiometricEnabled) {
          router.replace(ROUTES.AUTH.BIOMETRIC);
        } else {
          router.replace(ROUTES.MAIN.INDEX);
        }
      }
    }, 200); // Pequeño retraso para asegurar que el store esté listo

    return () => clearTimeout(timer);
  }, [hasFinishedOnboarding, isBiometricEnabled, router]);

  return (
    <LoadingAnimation />
  );
}

// ============================================================================
// 🔧 MODO DE DEPURACIÓN
// ============================================================================
// Para inspeccionar el store o probar componentes, descomenta la línea inferior
// y comenta TODO el código de arriba (desde "export default" hasta el final).
// Esto redirigirá directamente a la pantalla test-store.
//
// export { default } from "./test-store";