import React from "react";
import { Image, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { welcomeStyles as styles } from "@/styles";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function WelcomeScreen() {
  const router = useRouter();

  const goLogin = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      <Image
        source={require("@/assets/bgImage.png")}
        className="w-full h-full absolute"
        resizeMode="stretch"
      />
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        <View className="justify-end flex-1 text-center w-full p-4">
          <Text className="text-[#ba4d25] text-4xl text-center font-[Oxanium-Bold]">
            StoryPix
          </Text>
          <Text className="mb-4 text-center font-[Oxanium-Regular] ">
            Childbook Illustrations With AI
          </Text>
          <View className="rounded-xl mb-12">
            <Pressable onPress={goLogin} className="rounded-xl">
              <LinearGradient
                className="rounded p-4 text-center"
                colors={["#d2692e", "#ba4d25", "#9b3622"]}
              >
                <Text className="text-center text-white font-[Oxanium-Regular] text-2xl">
                  Get Started
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
