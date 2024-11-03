import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { ChevronLeft } from "lucide-react";

const BackButton = ({ onPress, text = "Back" }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <ChevronLeft size={24} color="#333333" />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignSelf: "flex-start",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: "#e0e0e0",
  },
  text: {
    fontSize: 16,
    color: "#333333",
    marginLeft: 4,
    fontWeight: "500",
  },
});

export default BackButton;
