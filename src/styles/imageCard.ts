import { StyleSheet } from "react-native";
import { hp, wp } from "@/constants/common";
import { theme } from "@/constants/theme";
export const ImageCardStyles = StyleSheet.create({
  gridContainer: {
   
    width: wp(100),
    marginTop: wp(4),
  },
  masonStyle: {
    paddingHorizontal: wp(4),
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    width: "100%",
  },
  imageWrapper: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
});
