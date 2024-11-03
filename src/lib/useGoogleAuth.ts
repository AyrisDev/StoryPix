import { useState } from "react";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import * as Linking from "expo-linking";
WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "430675657504-ebfq43fbu59ihkl8o44tb6grbi5qtjl7.apps.googleusercontent.com",
    iosClientId:
      "430675657504-p8jbjn7unkmrmfabjuphqk5v5knschpv.apps.googleusercontent.com",
    webClientId:
      "430675657504-4l3ohi0dbjsdoh07ube8j1gqjr8d54ak.apps.googleusercontent.com",

    redirectUri: Linking.createURL("/login", { scheme: "acme" }),
  });

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      if (Platform.OS === "web") {
        const provider = new GoogleAuthProvider();
        provider.addScope("email");
        provider.addScope("profile");

        const result = await signInWithPopup(auth, provider);
        return result.user;
      } else {
        const result = await promptAsync();

        if (result?.type === "success") {
          const { id_token } = result.params;
          const credential = GoogleAuthProvider.credential(id_token);
          const userCredential = await signInWithCredential(auth, credential);
          return userCredential.user;
        } else {
          throw new Error("Google sign in was cancelled");
        }
      }
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Sign Out Error:", error);
      throw error;
    }
  };

  return {
    signInWithGoogle,
    signOut,
    loading,
    error,
  };
};
