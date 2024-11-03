import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { ImageCardStyles as styles } from "@/styles";
import { auth } from "@/config/firebase";
import { getColumnCount } from "@/constants/common";
import { useFocusEffect } from "expo-router";
import MasonryList from "@/components/Gallery/MasonryList";
import { getImages } from "@/hooks/getImages";

export default function ImageGrid() {
  const column = getColumnCount();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const loadImages = async () => {
        if (user) {
          try {
            setLoading(true);
            const result = await getImages();

            if (result && Array.isArray(result)) {
              const imageUrls = result.map((image) => image.downloadUrl);
              setImages(imageUrls);
            }
          } catch (error) {
            console.error("Error fetching images:", error);
          } finally {
            setLoading(false);
          }
        }
      };

      loadImages();
    }, [user]) // user değiştiğinde de çalışsın
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator
          size="large"
          color="#9b3622"
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
        />
      </View>
    );
  }

  return (
    <View>
      <MasonryList
        images={images}
        numColumns={column} // İsteğe bağlı, varsayılan 2
      />
    </View>
  );
}
