import { useEffect, useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { PALETTE } from "@/constants/colors";
import LoadingAnimation from "./(animations)/loading";

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: PALETTE.deepNight,
    card: PALETTE.deepNight,
    text: PALETTE.creamWhite,
  },
};

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Ionicons.font);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn("Error loading assets:", e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <ThemeProvider value={CustomDarkTheme}>
        <StatusBar style="light" />
        <LoadingAnimation />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={CustomDarkTheme}>
      <View style={{ flex: 1, backgroundColor: PALETTE.deepNight }}>
        <StatusBar style="light" />
        <Stack 
          screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: PALETTE.deepNight },
            animation: 'fade'
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(animations)" options={{ animation: 'fade' }} />
        </Stack>
      </View>
    </ThemeProvider>
  );
}