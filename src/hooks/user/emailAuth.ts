// utils/emailAuth.ts
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import DeviceInfo from "react-native-device-info";
import { v4 as uuidv4 } from "uuid";
import { Platform } from "react-native";
import { Redirect } from "expo-router";

interface AuthCredentials {
  email: string;
  password: string;
  displayName?: string;
}

interface AuthResponse {
  success: boolean;
  error?: string;
  userData?: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
}

// Login işlemi
export const handleEmailLogin = async (
  credentials: AuthCredentials,
  setLoading?: (loading: boolean) => void
): Promise<AuthResponse> => {
  try {
    setLoading?.(true);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
    };

    await AsyncStorage.setItem("@user", JSON.stringify(userData));

    return {
      success: true,
      userData,
    };
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      error: getAuthErrorMessage(error.code),
    };
  } finally {
    setLoading?.(false);
  }
};

export const handleEmailRegister = async (
  credentials: AuthCredentials,
  setLoading?: (loading: boolean) => void
): Promise<AuthResponse> => {
  try {
    setLoading?.(true);
    //  const deviceID = await DeviceInfo.getUniqueId();
    let deviceID;

    if (Platform.OS === "android" || Platform.OS === "ios") {
      deviceID = await DeviceInfo.getUniqueId();
    } else {
      // Windows veya desteklenmeyen diğer platformlar için UUID oluştur
      deviceID = uuidv4();
    }
    console.log(deviceID + "deviceID");
    const checkDeviceResponse = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/checkDevice`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deviceID }),
      }
    );

    if (!checkDeviceResponse.ok) {
      throw new Error("Device check failed.");
    }

    // Email ve şifre ile kayıt ol
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    if (credentials.displayName) {
      await updateProfile(userCredential.user, {
        displayName: credentials.displayName,
      });
    }

    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: credentials.displayName || null,
      photoURL: null,
    };

    // Kullanıcıyı backend’e ekle
    const addUserResponse = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/addUserToDb`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.uid,
          email: userData.email,
          deviceID: deviceID,
        }),
      }
    );

    if (!addUserResponse.ok) {
      throw new Error("Failed to add user to the database.");
    }

    await AsyncStorage.setItem("@user", JSON.stringify(userData));
    router.replace({
      pathname: "(tabs)",
    });

    return {
      success: true,
      userData,
    };
  } catch (error: any) {
    console.error("Register error:", error);
    return {
      success: false,
      error: getAuthErrorMessage(error.code),
    };
  } finally {
    setLoading?.(false);
  }
};

// Hata mesajları için yardımcı fonksiyon
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    // Login hataları
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/wrong-password":
      return "Invalid password";

    // Register hataları
    case "auth/email-already-in-use":
      return "An account with this email already exists";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled";
    case "auth/weak-password":
      return "Password is too weak";

    default:
      return "An error occurred. Please try again.";
  }
};
