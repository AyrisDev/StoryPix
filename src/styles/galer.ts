import { StyleSheet } from "react-native";
import { hp, wp } from "@/constants/common";
import { theme } from "@/constants/theme";
export const galerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6ef", //50
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.black,
  },
});
