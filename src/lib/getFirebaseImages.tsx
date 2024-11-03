import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  StorageReference
} from "firebase/storage";
import { auth, storage } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface StorageFile {
  name: string;
  url: string;
  path?: string;
}

export const useFirebaseImages = () => {
  const [images, setImages] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth || !storage) {
      setError("Firebase is not initialized properly");
      setLoading(false);
      return;
    } 

    let isMounted = true;

    const getImageUrl = async (itemRef: StorageReference): Promise<StorageFile | null> => {
      try {
        const url = await getDownloadURL(itemRef);
        console.log(`Got URL for ${itemRef.name}:`, url);

        // URL'nin geçerliliğini kontrol et
        const response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) {
          console.error(`Invalid URL for ${itemRef.name}`);
          return null;
        }

        return {
          name: itemRef.name,
          url: url,
          path: itemRef.fullPath
        };
      } catch (error) {
        console.error(`Error getting URL for ${itemRef.name}:`, error);
        return null;
      }
    };

    const fetchImages = async (userId: string) => {
      try {
        setLoading(true);
        console.log("Fetching images for user:", userId);

        const listRef = ref(storage, `users/${userId}/images`);
        console.log("Storage reference path:", listRef.fullPath);

        const res = await listAll(listRef);
        console.log("Found items:", res.items.length);

        if (res.items.length === 0) {
          setImages([]);
          return;
        }

        const imagePromises = res.items.map(getImageUrl);
        const results = await Promise.all(imagePromises);

        // null değerleri filtrele
        const validImages = results.filter((item): item is StorageFile => item !== null);

        console.log("Valid images found:", validImages.length);
        validImages.forEach(img => console.log("Image:", img.name, img.url));

        if (isMounted) {
          setImages(validImages);
          setError(null);
        }
      } catch (err) {
        console.error("Error in fetchImages:", err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch images");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated, fetching images...");
        fetchImages(user.uid);
      } else {
        console.log("No authenticated user");
        if (isMounted) {
          setImages([]);
          setError("Please sign in to view images");
          setLoading(false);
        }
      }
    });

    return () => {
      console.log("Cleaning up useFirebaseImages hook");
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Debug için ekstra bilgi
  useEffect(() => {
    console.log("Images state updated:", images.length, "images");
    images.forEach(img => console.log("Image in state:", img.name, img.url));
  }, [images]);

  return { 
    images, 
    loading, 
    error,
    // Yeniden yükleme fonksiyonu ekleyelim
    refresh: async () => {
      if (!auth.currentUser) return;
      setLoading(true);
      try {
        const listRef = ref(storage, `users/${auth.currentUser.uid}/images`);
        const res = await listAll(listRef);
        const urls = await Promise.all(
          res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return {
              name: itemRef.name,
              url,
              path: itemRef.fullPath
            };
          })
        );
        setImages(urls);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to refresh images");
      } finally {
        setLoading(false);
      }
    }
  };
};