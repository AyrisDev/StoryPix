import { StyleSheet, Platform, StatusBar } from "react-native";
import { hp, wp } from "@/constants/common";
import { theme } from "@/constants/theme";
export const aiSenseStyles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
    marginTop: wp(4),
    paddingHorizontal: wp(2),
    paddingVertical: hp(4),
    marginRight: wp(4),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  apptitle: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.bold,
    color: "#d55021",
    fontFamily: "Oxanium-Regular",
  },
  welcomeSection: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: wp(1),
  },
  greeting: {
    fontSize: hp(2),
    color: "#d55021",
    fontWeight: theme.fontWeights.bold,
    fontFamily: "Oxanium-Regular",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e91f64",
    marginTop: 4,
    fontFamily: "Oxanium-Regular",
  },
  question: {
    fontSize: 16,
    color: "#e91f64",
    marginTop: 4,
    fontFamily: "Oxanium-Regular",
  },
  creditsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    gap: 4,
    borderRadius: 12,
  },
  creditsLabel: {
    fontSize: 12,
    color: "#9b3622",
    fontFamily: "Oxanium-Regular",
  },
  creditsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d55021",
    fontFamily: "Oxanium-Regular",
  },
  inputSection: {
    marginBottom: 12,
  },
  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    marginRight: 4,
    fontFamily: "Oxanium-Regular",
  },
  inputOptions: {
    flexDirection: "row",
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    height: 120,
    backgroundColor: "#fff",
  },
  sizeSection: {
    marginBottom: 24,
    alignContent: "center",
    justifyContent: "center",
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: "#e9874e",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    width: 100,
  },
  sizeOptionText: {
    fontSize: 16,
    color: "#e9874e",
  },
  styleCards: {
    gap: 16,
    paddingRight: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
  },
  selectedOption: {
    backgroundColor: "#9b3622", // Mor renk, isterseniz değiştirebilirsiniz
    borderColor: "#9b3622",
  },
  selectedOptionText: {
    color: "#FFFFFF", // Seçili durumda text rengi beyaz
    fontWeight: "600",
    fontFamily: "Oxanium-Regular",
  },
  generateButton: {
    backgroundColor: "#9b3622",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 16,
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Oxanium-Regular",
  },
  generateButtonDisabled: {
    backgroundColor: "#cccccc",
    opacity: 0.7,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 12,
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

  lottieView: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  loadingOverlay: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "space-between",
  },
  modalImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  footerButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  pressedImage: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
