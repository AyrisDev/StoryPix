import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { useFonts } from "expo-font";
SplashScreen.preventAutoHideAsync();
import TabBar from "@/components/Tabbar";
import { useAuth } from "@/lib/useAuth";
export default function RootLayout() {
  const [loaded] = useFonts({
    "Oxanium-Regular": require("../assets/fonts/Oxanium-Regular.ttf"),
    "Oxanium-Medium": require("../assets/fonts/Oxanium-Medium.ttf"),
    "Oxanium-SemiBold": require("../assets/fonts/Oxanium-SemiBold.ttf"),
    "Oxanium-Bold": require("../assets/fonts/Oxanium-Bold.ttf"),
  });

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <TabBar />
    </View>
  );
}
