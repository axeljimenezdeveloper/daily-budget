import { useRouter } from 'expo-router';

export const useOnboardingNavigation = () => {
  const router = useRouter();

  const goToNextStep = (currentStep: number) => {
    if (currentStep < 3) {
      router.push(`/(welcome)/onboarding${currentStep + 1}`);
    } else {
      router.replace('/(animations)/transition');
    }
  };

  const skipOnboarding = () => {
    router.replace('/(animations)/transition');
  };

  return {
    goToNextStep,
    skipOnboarding,
  };
};