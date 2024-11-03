import React from "react";
import { View, SafeAreaView } from "react-native";

import Header from "@/components/Header";
import ImageGrid from "@/components/Gallery/ImageGrid";
import { StatusBar } from "expo-status-bar";

export default function GalerScreen() {
  return (
    <SafeAreaView className="flex-1  bg-[#fdf6ef]">
      <StatusBar style="light" hidden />
      <View className="p-4">
        <Header />
      </View>

      <ImageGrid />
    </SafeAreaView>
  );
}
