import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Mail, Lock } from "lucide-react-native";
import { loginPageStyles as styles } from "@/styles";
import { useRouter, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LogScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Kullanıcı bilgilerini kaydet
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        // Hassas bilgileri (şifre gibi) kaydetmiyoruz
      };

      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      router.push("/(tabs)");
    } catch (error: any) {
      console.error("Login error:", error);

      // Daha detaylı hata mesajları
      let errorMessage = "Login failed. Please try again.";
      if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "User not found.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Invalid password.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your connection.";
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const backButton = async () => {
    router.replace("/register");
  };

  return (
    <SafeAreaView className="h-full flex-1">
      <StatusBar style="light" hidden />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.backText}>back!</Text>
          <Text style={styles.subtitle}>
            Sign in to continue and stay connected to get real-time updates and
            see what's happening!
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Mail color="red" size={24} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock color="red" size={24} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Pressable style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </Pressable>

          <Pressable style={styles.signInButton} onPress={handleLogin}>
            <Text style={styles.signInButtonText}>Sign in</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Pressable onPress={backButton}>
            <Text style={styles.createAccountText}>Create an account</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LogScreen;
