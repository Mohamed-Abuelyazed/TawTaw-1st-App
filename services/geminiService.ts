import { GoogleGenAI, Modality } from '@google/genai';
import { Product } from '../types';

// Fix: Comply with guideline to use process.env.API_KEY for the API key.
// The value is injected at build time via vite.config.ts. This also fixes the TypeScript error.
const apiKey = process.env.API_KEY;

export const isApiKeySet = !!apiKey && apiKey !== 'undefined';

// Fix: Comply with guideline to use a const for the AI client.
const ai = isApiKeySet ? new GoogleGenAI({ apiKey: apiKey! }) : null;

if (!ai) {
  console.error(
    'Gemini API key is not set. Please set the API_KEY environment variable.'
  );
}

// Use a CORS proxy to fetch images from external domains.
const CORS_PROXY = 'https://proxy.cors.sh/';

const imageUrlToBase64 = async (url: string): Promise<{ base64: string; mimeType: string }> => {
    // This proxy is used to bypass CORS restrictions when fetching product images from the browser.
    const proxiedUrl = `${CORS_PROXY}${url}`;
    const response = await fetch(proxiedUrl, {
        headers: {
            // Using a temporary public key for cors.sh service
            'x-cors-api-key': 'temp_228eca136511a5a043538b72506a7c49',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch image via proxy for ${url}: ${response.statusText}`);
    }
    const blob = await response.blob();
    const mimeType = blob.type;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result !== 'string') {
                return reject(new Error('FileReader did not return a string.'));
            }
            const base64 = reader.result.split(',')[1];
            resolve({ base64, mimeType });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const generateTryOnImage = async (
  personImageBase64: string,
  personImageMimeType: string,
  products: Product[]
): Promise<string> => {
  if (!ai) {
    throw new Error('Gemini API client not initialized. Check API key.');
  }

  const model = 'gemini-2.5-flash-image-preview';
  
  const personImagePart = {
    inlineData: {
      data: personImageBase64,
      mimeType: personImageMimeType,
    },
  };
  
  const textPart = {
    text: `You are an expert virtual fashion stylist. Your task is to edit the provided image of a person to show them wearing a selection of clothing items from the other images provided.
    
Please edit the FIRST image (the person) to show them realistically wearing the clothing items from the SUBSEQUENT images.

- Carefully extract the clothing item from each product image.
- Fit the clothing naturally onto the person's body, respecting their pose and body shape.
- Maintain the original background of the person's photo.
- Ensure the final image is photorealistic and high quality.
- Do not include any text, logos, or other annotations on the final image. The result should be only the edited image.
`,
  };

  const parts: any[] = [personImagePart];

  const productPromises = products.map(async (product) => {
    try {
      const { base64, mimeType } = await imageUrlToBase64(product.imageUrl);
      return {
        inlineData: {
          data: base64,
          mimeType: mimeType,
        },
      };
    } catch (error) {
      console.warn(`Could not fetch image for product ${product.name}:`, error);
      return null;
    }
  });

  const productParts = (await Promise.all(productPromises)).filter(p => p !== null);

  if (productParts.length === 0) {
      throw new Error("Could not load any product images. The try-on cannot proceed.");
  }
  
  parts.push(...productParts);
  parts.push(textPart);


  const response = await ai.models.generateContent({
    model: model,
    contents: {
      parts: parts,
    },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  const candidate = response.candidates?.[0];
  if (!candidate || !candidate.content || !candidate.content.parts) {
    const responseText = response.text;
    if (responseText) {
      throw new Error(`Image generation failed. Model responded with: ${responseText}`);
    }
    throw new Error('Invalid response from the model.');
  }

  for (const part of candidate.content.parts) {
    if (part.inlineData && part.inlineData.data) {
      return part.inlineData.data;
    }
  }

  // If no image is returned, check for text which might contain an error/refusal.
  const responseText = response.text;
  if (responseText) {
    throw new Error(
      `Image generation failed. Model responded with: ${responseText}`
    );
  }

  throw new Error(
    'Image generation failed: No image was returned from the model.'
  );
};