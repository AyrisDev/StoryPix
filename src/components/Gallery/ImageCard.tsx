import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";

import { ImageCardStyles as styles } from "@/styles";
import { getImageSize } from "@/constants/common";

export default function ImageCard({ item, index, column }) {
  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) };
  };

  const isLastInRow = () => {
    return (index + 1) % column === 0;
  };
  return (
    <Pressable style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}>
      <Image
        style={[styles.image, getImageHeight()]}
        source="https://picsum.photos/seed/2000/3000"
        contentFit="cover"
        transition={1000}
      />
    </Pressable>
  );
}
