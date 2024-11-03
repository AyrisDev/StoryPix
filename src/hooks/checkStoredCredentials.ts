import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { LogBox } from "react-native";

// Hata mesajlarını konsola yazdırmak için güvenli bir fonksiyon
const safeLog = (message: string, error?: any) => {
  if (__DEV__) {
    LogBox.ignoreLogs([message]);
    console.log(message, error);
  }
};

export const checkStoredCredentials = async () => {
  try {
    const storedUser = await AsyncStorage.getItem("@user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData) {
        return {
          isAuthenticated: true,
          userData,
        };
      }
    }
    return {
      isAuthenticated: false,
      userData: null,
    };
  } catch (error) {
    safeLog("Error checking stored credentials:", error);
    return {
      isAuthenticated: false,
      userData: null,
      error,
    };
  }
};

export const checkAndRedirect = async () => {
  try {
    const { isAuthenticated } = await checkStoredCredentials();
    if (isAuthenticated) {
      router.replace("/(tabs)");
      return true;
    }
    return false;
  } catch (error) {
    safeLog("Error in checkAndRedirect:", error);
    return false;
  }
};
