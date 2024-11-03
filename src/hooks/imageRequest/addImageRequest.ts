export const addImageRequest = async ({
  userId,
  prompt,
  creditsUsed,
  imageSize,
  generatedImageURL,
}) => {
  try {
    const requestBody = JSON.stringify({
      userId: userId,
      prompt: prompt,
      creditsUsed: creditsUsed,
      imageSize: imageSize,
      generatedImageURL: generatedImageURL,
    });

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/addImageRequest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Credits error:", error);
    throw error;
  }
};
