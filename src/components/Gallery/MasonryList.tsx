import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  Share,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Download, Share2, X } from "lucide-react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const MasonryList = ({ images = [], numColumns, spacing = 5 }) => {
  const [columnHeights, setColumnHeights] = useState(Array(numColumns).fill(0));
  const [processedImages, setProcessedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const columnWidth = (screenWidth - spacing * (numColumns + 1)) / numColumns;

  useEffect(() => {
    if (!Array.isArray(images)) {
      setError("Images prop must be an array");
      setLoading(false);
      return;
    }
    processImages();
  }, [images]);

  const validateImageUri = (img) => {
    if (!img) return false;
    if (typeof img === "string") return { uri: img };
    if (typeof img === "object" && img.uri) return img;
    return false;
  };

  const processImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const validImages = images
        .map((img) => validateImageUri(img))
        .filter(Boolean);

      if (validImages.length === 0) {
        setError("No valid images provided");
        setLoading(false);
        return;
      }

      const imagePromises = validImages.map(async (img) => {
        return new Promise((resolve) => {
          Image.getSize(
            img.uri,
            (width, height) => {
              const aspectRatio = height / width;
              const calculatedHeight = columnWidth * aspectRatio;
              resolve({
                ...img,
                width: columnWidth,
                height: calculatedHeight,
                originalWidth: width,
                originalHeight: height,
              });
            },
            () => {
              resolve(null);
            }
          );
        });
      });

      const processedImgs = (await Promise.all(imagePromises)).filter(
        (img) => img !== null
      );

      if (processedImgs.length === 0) {
        setError("Failed to load any images");
        setLoading(false);
        return;
      }

      const columnArrays = Array.from({ length: numColumns }, () => []);
      const heights = Array(numColumns).fill(0);

      processedImgs.forEach((img) => {
        const shortestColumnIndex = heights.indexOf(Math.min(...heights));
        columnArrays[shortestColumnIndex] = [
          ...columnArrays[shortestColumnIndex],
          img,
        ];
        heights[shortestColumnIndex] += img.height + spacing;
      });

      setColumnHeights(heights);
      setProcessedImages(columnArrays);
      setLoading(false);
    } catch (err) {
      console.error("Error processing images:", err);
      setError("Failed to process images");
      setLoading(false);
    }
  };

  const handleDownload = async (imageUrl) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        // Show loading indicator or progress here if needed
        const filename = imageUrl.split("/").pop();
        const fileUri = FileSystem.documentDirectory + filename;

        const downloadResumable = FileSystem.createDownloadResumable(
          imageUrl,
          fileUri,
          {}
        );

        const { uri } = await downloadResumable.downloadAsync();
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("Downloads", asset, false);

        Alert.alert("Success", "Image saved to gallery!");
      } else {
        Alert.alert(
          "Permission needed",
          "Please grant permission to save images"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to download image");
      console.error(error);
    }
  };

  const handleShare = async (imageUrl) => {
    try {
      await Share.share({
        url: imageUrl,
        message: "Check out this image!",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share image");
      console.error(error);
    }
  };

  const ImageModal = () => {
    if (!selectedImage) return null;

    const imageRatio =
      selectedImage.originalHeight / selectedImage.originalWidth;
    let modalImageWidth = screenWidth;
    let modalImageHeight = screenWidth * imageRatio;

    if (modalImageHeight > screenHeight * 0.8) {
      modalImageHeight = screenHeight * 0.8;
      modalImageWidth = modalImageHeight / imageRatio;
    }

    return (
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalImageContainer}>
            <Image
              source={{ uri: selectedImage.uri }}
              style={{
                width: modalImageWidth,
                height: modalImageHeight,
                borderRadius: 12,
              }}
              resizeMode="contain"
            />
          </View>

          {/* Footer Toolbar */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => handleDownload(selectedImage.uri)}
            >
              <Download color="white" size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => handleShare(selectedImage.uri)}
            >
              <Share2 color="white" size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => setModalVisible(false)}
            >
              <X color="white" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerClassName="flex flex-row py-4">
        {processedImages.map((column, columnIndex) => (
          <View
            key={`column_${columnIndex}`}
            style={[
              styles.column,
              {
                marginLeft: spacing,
                width: columnWidth,
              },
            ]}
            className="gap-2"
          >
            {column.map((item, index) => (
              <Pressable
                key={`${columnIndex}_${index}`}
                style={({ pressed }) => [
                  { marginBottom: spacing },
                  pressed && styles.pressedImage,
                ]}
                onPress={() => {
                  setSelectedImage(item);
                  setModalVisible(true);
                }}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: item.width,
                    height: item.height,
                    borderRadius: 8,
                  }}
                  resizeMode="contain"
                />
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
      <ImageModal />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 5,
    flex: 1,
  },
  column: {
    flexDirection: "column",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 20,
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

export default MasonryList;
