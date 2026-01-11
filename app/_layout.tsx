import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
// Resource loading utilities
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  // Application readiness state to prevent early rendering
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load icon fonts required for atomic components (e.g., AppSelect)
        await Font.loadAsync(Ionicons.font);
      } catch (e) {
        // Silently handle font loading errors to prevent app crash
        console.warn("Error loading font assets:", e);
      } finally {
        // Release splash screen hold
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  // Guard clause to ensure assets are ready before mounting the stack
  if (!appIsReady) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}