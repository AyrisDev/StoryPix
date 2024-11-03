// services/creditService.js
import { auth } from "@/config/firebase";

export const getUserCredits = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/fetchCredits`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: auth.currentUser.uid }),
      }
    );
    const data = await response.json();
    if (!data.success) {
      console.log(data.success);
    }

    return data.files;
  } catch (error) {
    console.error("Credits error:", error);
    throw error;
  }
};

export const useUserCredits = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/useCredits`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: auth.currentUser.uid }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error);
    }

    return data.files;
  } catch (error) {
    console.error("Credits error:", error);
    throw error;
  }
};
