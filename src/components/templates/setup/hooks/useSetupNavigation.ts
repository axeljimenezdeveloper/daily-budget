import { useRouter } from 'expo-router';
import { Currency } from '../types';

export const useSetupNavigation = () => {
  const router = useRouter();

  const navigateToBudget = (currency: Currency) => {
    router.push({
      pathname: "/(welcome)/setup-budget",
      params: {
        currencyJSON: JSON.stringify(currency)
      }
    });
  };

  const navigateToDuration = (currency: Currency, budget: string) => {
    router.push({
      pathname: "/(welcome)/setup-duration",
      params: {
        currencyJSON: JSON.stringify(currency),
        budget: budget,
      }
    });
  };

  const navigateBack = () => {
    router.back();
  };

  const navigateToOnboarding = () => {
    router.replace("/(welcome)/onboarding1");
  };

  const navigateToSuccess = () => {
    router.replace("/(animations)/success");
  };

  return {
    navigateToBudget,
    navigateToDuration,
    navigateBack,
    navigateToOnboarding,
    navigateToSuccess
  };
};