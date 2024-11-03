import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  Pressable,
  Alert,
  Modal,
  Share,
  ActivityIndicator,
} from "react-native";
import Header from "@/components/Header";
import { Image } from "expo-image";
import { aiSenseStyles as styles } from "@/styles";
import { auth } from "@/config/firebase";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import ratio from "@/data/aspect_ratio.json";
import format from "@/data/output_format.json";
import { useRouter } from "expo-router";
import { getUserCredits, useUserCredits } from "@/hooks/userCredits";
import { generateImages, uploadImages } from "@/hooks/getImages";
import { addImageRequest } from "@/hooks/imageRequest/addImageRequest";
import { StatusBar } from "expo-status-bar";
import { Coins, Download, Share2, X } from "lucide-react-native";

interface UserCredits {
  credits: number;
  totalUsed: number;
  lastUse?: Date;
}

const AiSenseApp = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [prompt, setPrompt] = useState("Beautiful Scenery surreal");

  const [selectedRatio, setSelectedRatio] = useState(ratio[0]?.ratio || null);

  const [selectedFormat, setSelectedFormat] = useState(
    format[0]?.format || null
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const result = await getUserCredits();
        setCredits(result);
      }
    });

    return () => unsubscribe();
  }, []);

  const generateImage = async () => {
    setSelectedImage(null);
    if (!user) {
      setError("Lütfen önce giriş yapın");
      return;
    }

    if (!credits || credits.credits <= 0) {
      Alert.alert(
        "No Credits",
        "You need credits to generate images. Would you like to purchase credits?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Buy Credits",
            onPress: () => {
              // Kredi satın alma sayfasına yönlendir
              // router.push('/store')
              Alert.alert(
                "Coming Soon",
                "Credit purchase will be available soon!"
              );
            },
          },
        ]
      );
      return;
    }

    setModalVisible(true);

    const response = await generateImages({
      prompt: prompt,
      selectedRatio: selectedRatio,
      selectedFormat: selectedFormat,
    });
    const upload = await uploadImages({
      url: response.url,
    });
    console.log(response.url);
    setSelectedImage(response.url);
    const addRequest = await addImageRequest({
      userId: user.uid,
      prompt: prompt,
      creditsUsed: 1,
      imageSize: upload.data.size,
      generatedImageURL: upload.data.downloadUrl,
    });

    const userCredits = await useUserCredits();
    const result = await getUserCredits();
    setCredits(result);
  };

  const ImageModal = () => {
    if (!selectedImage) {
      return (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          statusBarTranslucent
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#9b3622"
              style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
            />
          </View>
        </Modal>
      );
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
              style={{
                width: "80%",
                height: "80%",
                borderRadius: 12,
                position: "relative",
                alignSelf: "center",
              }}
              source={{ uri: selectedImage }}
              contentFit="contain"
              transition={500}
            />
          </View>

          {/* Footer Toolbar */}
          <View style={styles.modalFooter}>
            <Pressable
              style={styles.footerButton}
              onPress={() => handleDownload(selectedImage)}
            >
              <Download color="white" size={24} />
            </Pressable>

            <Pressable
              style={styles.footerButton}
              onPress={() => handleShare(selectedImage)}
            >
              <Share2 color="white" size={24} />
            </Pressable>

            <Pressable
              style={styles.footerButton}
              onPress={() => setModalVisible(false)}
            >
              <X color="white" size={24} />
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  const handleDownload = async (selectedImage) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        // Show loading indicator or progress here if needed
        const filename = selectedImage.split("/").pop();
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

  const handleShare = async (selectedImage) => {
    try {
      await Share.share({
        url: selectedImage,
        message: "Check out this image!",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share image");
      console.error(error);
    }
  };
  return (
    <>
      <SafeAreaView className="flex-1 p-4 bg-[#fdf6ef]">
        <StatusBar style="light" hidden />
        <Header credits={credits?.credits || null} />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
        </View>
        {/* Prompt Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputHeader}>
            <Text style={styles.sectionTitle}>Enter your Prompt</Text>
          </View>

          <TextInput
            className="border-[1px] rounded-xl p-4 mb-2 h-30 border-[#E5E5E5] bg-white"
            placeholder="Enter your Prompt"
            value={prompt}
            onChangeText={setPrompt}
            multiline={true}
            numberOfLines={4}
          />
        </View>

        {/* Size Options */}
        <View style={styles.sizeSection}>
          <Text style={styles.sectionTitle}>Select Ratio</Text>

          <View>
            <View style={styles.styleCards}>
              {ratio.map((item) => (
                <Pressable
                  key={item.ratio}
                  style={[
                    styles.sizeOption,
                    selectedRatio === item.ratio && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedRatio(item.ratio)}
                >
                  <Text
                    style={[
                      styles.sizeOptionText,
                      selectedRatio === item.ratio && styles.selectedOptionText,
                    ]}
                  >
                    {item.ratio}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Format Options */}
        <View style={styles.sizeSection}>
          <Text style={styles.sectionTitle}>Select Format</Text>
          <View>
            <View style={styles.styleCards}>
              {format.map((item) => (
                <Pressable
                  key={item.format}
                  style={[
                    styles.sizeOption,
                    selectedFormat === item.format && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedFormat(item.format)}
                >
                  <Text
                    style={[
                      styles.sizeOptionText,
                      selectedFormat === item.format &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {item.format}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Generate Button with Credits Check */}
        <Pressable
          style={[
            styles.generateButton,
            (!credits || credits.credits <= 0) && styles.generateButtonDisabled,
          ]}
          onPress={generateImage}
        >
          {loading ? (
            <Text style={styles.generateButtonText}>Generating...✨</Text>
          ) : (
            <Text style={styles.generateButtonText}>
              {credits?.credits ? "Do Magic ✨" : "Buy Credits to Continue ✨"}
            </Text>
          )}
        </Pressable>
      </SafeAreaView>
      {modalVisible && <ImageModal />}
    </>
  );
};

export default AiSenseApp;
