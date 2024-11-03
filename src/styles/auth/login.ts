import { StyleSheet } from "react-native";
import { hp, wp } from "@/constants/common";

export const loginPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  header: {
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FF3B30",
    fontFamily: "Oxanium-Bold",
  },

  backText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Oxanium-Bold",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    fontFamily: "Oxanium-Regular",
  },
  form: {
    marginTop: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 12,
    
  },
  inputContainerFocused: {
    borderColor: "#E5E5E5",
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    paddingTop: 16,
    paddingBottom: 16,
    marginLeft: 16,
    fontSize: 16,
    fontFamily: "Oxanium-Regular",
    width: wp(100),
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontSize: 14,
    fontFamily: "Oxanium-Regular",
  },
  signInButton: {
    backgroundColor: "#FF3B30",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Oxanium-Regular",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#000",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Oxanium-Regular",
  },
  createAccountText: {
    fontSize: 14,
    color: "#FF3B30",
    fontWeight: "600",
    fontFamily: "Oxanium-Regular",
  },
});
