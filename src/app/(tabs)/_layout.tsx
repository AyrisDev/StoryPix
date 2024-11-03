import { useEffect } from "react";
import { router, Tabs } from "expo-router";
import { auth } from "@/config/firebase";

export default function Layout() {
  useEffect(() => {
    if (!auth) {
      return router.push("/(auth)");
    }
  }, []);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="gallery" />
      <Tabs.Screen name="profile" />
      {/* diğer tab'ler */}
    </Tabs>
  );
}
