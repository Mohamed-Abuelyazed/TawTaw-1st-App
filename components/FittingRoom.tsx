// FIX: This file was empty. Implemented the FittingRoom component for the virtual try-on feature.
import React, { useState, useRef, useCallback } from 'react';
import { Product } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import { generateTryOnImage } from '../services/geminiService';
import Loader from './Loader';

interface FittingRoomProps {
  products: Product[];
}

const FittingRoom: React.FC<FittingRoomProps> = ({ products }) => {
  const { t } = useTranslation();
  const [personImage, setPersonImage] = useState<{
    base64: string;
    mimeType: string;
    previewUrl: string;
  } | null>(null);
  // State changed to handle multiple product selections
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const MAX_WIDTH = 1024;
            const MAX_HEIGHT = 1024;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.drawImage(img, 0, 0, width, height);

            const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
            const base64String = dataUrl.split(',')[1];
            
            setPersonImage({
                base64: base64String,
                mimeType: 'image/jpeg',
                previewUrl: dataUrl
            });
            setGeneratedImage(null);
            setError(null);
        };
        img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Handler to toggle product selection
  const handleProductSelect = (product: Product) => {
    setSelectedProducts(prevSelected => {
        const isSelected = prevSelected.find(p => p.id === product.id);
        if (isSelected) {
            return prevSelected.filter(p => p.id !== product.id);
        } else {
            return [...prevSelected, product];
        }
    });
  };

  const handleGenerateClick = useCallback(async () => {
    // Check for multiple products
    if (!personImage || selectedProducts.length === 0) {
      setError(t('selectImageAndProductError'));
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      // Pass array of products to the service
      const resultBase64 = await generateTryOnImage(
        personImage.base64,
        personImage.mimeType,
        selectedProducts
      );
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (e: any) {
      setError(e.message || t('generationFailedError'));
    } finally {
      setIsLoading(false);
    }
  }, [personImage, selectedProducts, t]);

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  if (products.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-4 text-slate-800">{t('fittingRoom')}</h1>
            <p className="text-slate-500 text-xl">{t('fittingRoomEmpty')}</p> 
            <p className="text-slate-400 mt-2">{t('fittingRoomEmptyHint')}</p>
        </div>
      )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 text-center">{t('fittingRoom')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1 flex flex-col space-y-6">
          <div className="text-center p-4 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{t('step1Upload')}</h2>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={triggerFileUpload}
              className="w-full bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 transition-colors"
            >
              {personImage ? t('changeYourImage') : t('uploadYourImage')}
            </button>
            {personImage && <img src={personImage.previewUrl} alt="Your upload" className="mt-4 rounded-lg mx-auto max-h-48" />}
          </div>

          <div className="p-4 border-2 border-dashed rounded-lg flex-grow">
            <h2 className="text-xl font-semibold mb-3 text-center">{t('step2Select')}</h2>
            <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
              {products.map(p => {
                const isSelected = selectedProducts.some(sp => sp.id === p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => handleProductSelect(p)}
                    className={`relative cursor-pointer border-2 rounded-lg p-1 transition-all ${isSelected ? 'border-slate-900 scale-105' : 'border-transparent hover:border-slate-300'}`}
                  >
                    <img src={p.imageUrl} alt={t(p.name)} className="w-full h-24 object-cover rounded-md" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center rounded-md m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-100 rounded-lg p-4 flex flex-col items-center justify-center min-h-[400px] lg:min-h-[600px] relative">
            {!generatedImage && !isLoading && (
                <div className="text-center text-slate-500">
                    <p className="text-lg font-semibold">{t('yourVirtualTryOn')}</p>
                    <p>{t('yourImageWillAppearHere')}</p>
                </div>
            )}
            {isLoading && <Loader messageKey="generatingImage" />}
            {error && <div className="text-center text-red-500 p-4">
              <p className="font-bold">{t('errorOccurred')}</p>
              <p>{error}</p>
            </div>}
            {generatedImage && !isLoading && (
              <img src={generatedImage} alt="Virtual try-on result" className="max-w-full max-h-full object-contain rounded-lg" />
            )}

            <button
                onClick={handleGenerateClick}
                disabled={!personImage || selectedProducts.length === 0 || isLoading}
                className="absolute bottom-6 bg-slate-900 text-white font-bold py-3 px-12 rounded-lg hover:bg-slate-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed text-lg shadow-lg"
            >
                {t('generate')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default FittingRoom;