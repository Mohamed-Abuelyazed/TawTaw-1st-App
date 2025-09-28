

import { GoogleGenAI, Modality } from "@google/genai";

// Ensure API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Improved getBase64Parts function for better mime type handling from File objects.
const getBase64Parts = (source: File | string): Promise<{ mimeType: string, data: string }> =>
  new Promise((resolve, reject) => {
    if (source instanceof File) {
        const reader = new FileReader();
        reader.readAsDataURL(source);
        reader.onload = () => {
            const result = reader.result as string;
            const data = result.split(',')[1];
            if (!data) {
                return reject(new Error("Invalid file format for base64 conversion."));
            }
            resolve({ mimeType: source.type || 'application/octet-stream', data });
        };
        reader.onerror = (error) => reject(error);
    } else if (typeof source === 'string' && source.startsWith('data:')) {
        const [header, data] = source.split(',');
        if (!header || !data) {
            return reject(new Error("Invalid data URL format."));
        }
        const mimeTypeMatch = header.match(/:(.*?);/);
        const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'application/octet-stream';
        resolve({ mimeType, data });
    } else {
        reject(new Error("Unsupported source type for getBase64Parts."));
    }
  });


export const generateVirtualTryOn = async (personImage: File | string, clothingImageUrl: string): Promise<string> => {
  try {
    const personImageParts = await getBase64Parts(personImage);
    
    // Fetch clothing image and convert to base64
    const clothingImageResponse = await fetch(clothingImageUrl);
    if (!clothingImageResponse.ok) {
        throw new Error(`Failed to fetch clothing image: ${clothingImageResponse.statusText}`);
    }
    const clothingImageBlob = await clothingImageResponse.blob();
    const clothingImageFile = new File([clothingImageBlob], "clothing.jpg", { type: clothingImageBlob.type });
    const clothingImageParts = await getBase64Parts(clothingImageFile);

    // FIX: Improved and more direct prompt for the model.
    const prompt = `You are a virtual stylist. The user has provided an image of a person and an image of a clothing item. Your task is to realistically overlay the clothing item onto the person. Ensure the clothing fits the person's body shape, posture, and orientation. Preserve the original background and the person's features (like head, arms, and legs) that are not covered by the new clothing. The final image should be a high-quality, believable photo of the person wearing the new outfit.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          { inlineData: { data: personImageParts.data, mimeType: personImageParts.mimeType } },
          { inlineData: { data: clothingImageParts.data, mimeType: clothingImageParts.mimeType } },
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }

    // FIX: Replaced hardcoded Arabic error message with a translation key.
    throw new Error("noImageGenerated");
  } catch (error) {
    console.error("Error in generateVirtualTryOn:", error);
    // FIX: Replaced hardcoded Arabic error message with a translation key.
    throw new Error("imageGenError");
  }
};
