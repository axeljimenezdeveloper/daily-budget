import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useVaultStore } from "@/store/useVaultStore";
import LoadingAnimation from "./(animations)/loading";

export default function HomeScreen() {
  const router = useRouter();
  const hasFinishedOnboarding = useVaultStore((state) => state.hasFinishedOnboarding);
  console.log('HomeScreen - hasFinishedOnboarding:', hasFinishedOnboarding);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasFinishedOnboarding) {
        router.replace("/(welcome)/onboarding1");
      } else {
        router.replace("/(main)");
      }
    }, 200); // Pequeño retraso para asegurar que el store esté listo

    return () => clearTimeout(timer);
  }, [hasFinishedOnboarding, router]);

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