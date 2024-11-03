import { auth } from "@/config/firebase";

export const getImages = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/fetchImage`,
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
    console.error("getImages error:", error);
    throw error;
  }
};

export const generateImages = async ({
  prompt,
  selectedRatio,
  selectedFormat,
}) => {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }

    const requestBody = JSON.stringify({
      prompt: prompt,
      selectedRatio: selectedRatio,
      selectedFormat: selectedFormat,
    });

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/generate-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("generateImages error:", error);
    throw error;
  }
};

export const uploadImages = async ({ url }) => {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/upload-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: auth.currentUser.uid, url }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (!data.success) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error("uploadImages error:", error);
    throw error;
  }
};
