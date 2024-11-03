import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Pressable,
  Modal,
} from "react-native";

import { Image } from "expo-image"; // expo-image'i import ediyoruz
import { useFirebaseImages } from "@/lib/getFirebaseImages";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


const { width } = Dimensions.get("window");
const IMAGE_MARGIN = 5;
const IMAGE_WIDTH = (width - IMAGE_MARGIN * 4) / 2;

const ImageGallery = () => {
  const { images, loading, error } = useFirebaseImages();
  const [selectedImage, setSelectedImage] = useState(null);
   const [modalVisible, setModalVisible] = useState(false);
  console.log(images);
  if (loading) {
    return (
      <View className="flex justify-center items-center">
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading images...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const handleDownload = async () => {
    if (selectedImage && selectedImage.url) {
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need media library permissions to download the image.');
          return;
        }

        const fileUri = `${FileSystem.documentDirectory}${selectedImage.name}`;
        const downloadResumable = FileSystem.createDownloadResumable(
          selectedImage.url,
          fileUri
        );

        const { uri } = await downloadResumable.downloadAsync();
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("Downloads", asset, false);

        alert('Image downloaded successfully!');
      } catch (error) {
        console.error('Download error:', error);
        alert('Failed to download image. Please try again.');
      }
    }
  };
  const handleImagePress = (item) => {
    setSelectedImage(item);
    setModalVisible(true);
  };

  const renderImage = ({ item }) => (
    <Pressable onPress={() => handleImagePress(item)}>
      <Image
        style={styles.image}
        source={item.url}
        contentFit="cover"
        transition={1000}
      />
    </Pressable>
  );
  const keyExtractor = (item, index) => {
    return item && item.name ? item.name : `image-${index}`;
  };

  return (
    <View style={styles.container}>
      {images && images.length > 0 ? (
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={keyExtractor}
          numColumns={2}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.message}>No images found</Text>
      )}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {selectedImage && (
            <>
              <Image
                source={{ uri: selectedImage.url }}
                style={styles.fullImage}
               
              />
              <Pressable style={styles.downloadButton} onPress={handleDownload}>
                <Text style={styles.downloadButtonText}>Download</Text>
              </Pressable>
            </>
          )}
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingHorizontal: IMAGE_MARGIN,
  },
  listContent: {
    paddingVertical: IMAGE_MARGIN,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    margin: IMAGE_MARGIN,
    borderRadius: 5,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  fullImage: {
    width: '100%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  downloadButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ImageGallery;
