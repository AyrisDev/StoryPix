import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyBEiENqpu_pKWfEOMfAzA0F8rAdgOflIi8",
  authDomain: "storypix-28de7.firebaseapp.com",
  projectId: "storypix-28de7",
  storageBucket: "storypix-28de7.appspot.com",
  messagingSenderId: "430675657504",
  appId: "1:430675657504:web:dda62c537d38e9cb748d45",
  measurementId: "G-5FR5N2JLD2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const auth = initializeAuth(app, {   persistence: getReactNativePersistence(ReactNativeAsyncStorage), });

// Platform'a göre auth persistence ayarla
export const auth =
  Platform.OS === "web"
    ? initializeAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      });

