import { StyleSheet } from "react-native";
import { hp, wp } from "@/constants/common";
import { theme } from "@/constants/theme";
export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },

  gradient: {
    width: wp(100),
    height: hp(65),
    bottom: 0,
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14,
  },
  title: {
    fontSize: hp(7),
    color: "#ba4d25",
    fontWeight: theme.fontWeights.bold,
    fontFamily: "Oxanium-Regular",
  },
  puncline: {
    fontSize: hp(2),
    fontWeight: theme.fontWeights.medium,
    marginBottom: 10,
    letterSpacing: 1,
    fontFamily: "Oxanium-Regular",
  },
  startButton: {
    marginBottom: 50,
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  startButtonGradient: {
    flex: 1,
    marginBottom: 50,
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  startText: {
    fontFamily: "Oxanium-Regular",
  },
});
