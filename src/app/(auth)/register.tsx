import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
  Linking,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Mail, Lock } from "lucide-react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { registerStyles as styles } from "@/styles";

import { handleEmailRegister } from "@/hooks/user/emailAuth";

export default function Log() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialCheck, setInitialCheck] = useState(true);
  const router = useRouter();

  const handlePrivacyPolicy = () => {
    Linking.openURL("https://yourapp.com/privacy-policy");
  };

  const handleTerms = () => {
    Linking.openURL("https://yourapp.com/terms");
  };

  const validateForm = () => {
    if (!email || !password || !rePassword) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }

    if (password !== rePassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    const result = await handleEmailRegister({ email, password }, setLoading);

    if (!result.success) {
      Alert.alert("Registration Failed", result.error);
    }
  };

  const loginButton = () => {
    router.replace("/login");
  };

  return (
    <SafeAreaView className="flex-1  w-full justify-center">
      <StatusBar style="light" hidden />
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.helloText}>Hello</Text>
          <Text style={styles.thereText}>there!</Text>
          <Text style={styles.subtitle}>
            Create an account to save your patch history and get real-time
            updates to your dashboard
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View
            style={[
              styles.inputContainer,
              isEmailFocused && styles.inputContainerFocused,
            ]}
          >
            <Mail color="red" size={24} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              isPasswordFocused && styles.inputContainerFocused,
            ]}
          >
            <Lock color="red" size={24} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Create your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              isPasswordFocused && styles.inputContainerFocused,
            ]}
          >
            <Lock color="red" size={24} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Re-type your password"
              value={rePassword}
              onChangeText={setRePassword}
              secureTextEntry
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
          </View>

          <Pressable style={styles.signUpButton} onPress={handleRegister}>
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />

            <View style={styles.dividerLine} />
          </View>
          <Text style={styles.termsText}>
            By signing up, you agree to our
            <Text style={styles.linkText} onPress={handleTerms}>
              Terms of Service
            </Text>
            and
            <Text style={styles.linkText} onPress={handlePrivacyPolicy}>
              Privacy Policy
            </Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Pressable onPress={loginButton}>
            <Text style={styles.signInText}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
