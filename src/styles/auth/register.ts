import { StyleSheet } from "react-native";
import { hp, wp } from "@/constants/common";
import { theme } from "@/constants/theme";

export const registerStyles = StyleSheet.create({
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
  helloText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FF3B30",
    fontFamily: "Oxanium-Bold",
  },
  thereText: {
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
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 18,
    fontFamily: "Oxanium-Regular",
  },
  linkText: {
    color: "#FF3B30",
    textDecorationLine: "underline",
    fontFamily: "Oxanium-Regular",
  },
  signUpButton: {
    backgroundColor: "#FF3B30",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Oxanium-Regular",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#666",
    fontSize: 14,
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
    fontFamily: "Oxanium-Regular",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  signInText: {
    fontSize: 14,
    color: "#FF3B30",
    fontWeight: "600",
  },
});
