import { Redirect } from "expo-router";

export default function HomeScreen() {
  const isFirstTime = true;

  if (isFirstTime) {
    return <Redirect href="/(welcome)/onboarding1" />;
  }

  // return <Redirect href="/(main)/debug-reset" />;
  // return <Redirect href="/test-store" />;
  // return <Redirect href="/(main)" />;
}
