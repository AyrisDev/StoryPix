import { StyleSheet } from "react-native";
import { hp, wp } from "@/constants/common";
import { theme } from "@/constants/theme";
export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: "#d55021",
    fontFamily: "Oxanium-Regular",
  },
  creditsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d55021",
    fontFamily: "Oxanium-Regular",
  },
});
