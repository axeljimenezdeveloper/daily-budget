import { Stack } from "expo-router";
import { PALETTE } from "@/constants/colors";

export default function AnimationsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade", 
        contentStyle: {
          backgroundColor: PALETTE.deepNight,
        },
      }}
    >
      <Stack.Screen name="loading" />
      <Stack.Screen name="success" />
      <Stack.Screen name="transition" />
    </Stack>
  );
}