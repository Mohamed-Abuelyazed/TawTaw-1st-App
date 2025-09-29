import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import { generateTryOnImage } from '../services/geminiService';
import Loader from './Loader';

// Helper to convert file to base64
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface FittingRoomProps {
  products: Product[];
}

const FittingRoom: React.FC<FittingRoomProps> = ({ products }) => {
  const { t } = useTranslation();
  const [personImage, setPersonImage] = useState<{ file: File; base64: string } | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await toBase64(file);
        setPersonImage({ file, base64 });
        setGeneratedImage(null); // Clear previous result on new image upload
        setError(null);
      } catch (err) {
        setError(t('generationFailedError'));
        console.error("Error converting file to base64:", err);
      }
    }
  };

  const handleGenerateClick = async () => {
    if (!personImage || products.length === 0) {
      setError(t('selectImageAndProductError'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
        // Extract base64 data and mime type from the data URL
      const [header, base64Data] = personImage.base64.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
      
      const resultBase64 = await generateTryOnImage(base64Data, mimeType, products);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err: any) {
      console.error('Image generation failed:', err);
      if (err.message.includes('quota')) {
          setError(t('quotaExceededError'));
      } else if (err.message.includes('Could not load') || err.message.includes('Failed to fetch')) {
          setError(err.message);
      }
       else {
          setError(`${t('generationFailedError')}: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 text-center">{t('fittingRoom')}</h1>
      
      {products.length === 0 ? (
         <div className="text-center py-16">
            <p className="text-slate-500 text-xl">{t('fittingRoomEmpty')}</p> 
            <p className="text-slate-400 mt-2">{t('fittingRoomEmptyHint')}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column: Controls */}
            <div className="space-y-6">
                {/* Step 1: Upload Image */}
                <div>
                    <h2 className="text-xl font-bold text-slate-700 mb-3">{t('step1Upload')}</h2>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            ref={fileInputRef}
                            className="hidden"
                        />
                        {personImage ? (
                            <div className="flex flex-col items-center">
                                <img src={personImage.base64} alt="User" className="w-32 h-32 object-cover rounded-lg mb-4" />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
                                >
                                    {t('changeYourImage')}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full bg-slate-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors"
                            >
                                {t('uploadYourImage')}
                            </button>
                        )}
                    </div>
                </div>

                {/* Step 2: Selected Items */}
                <div>
                    <h2 className="text-xl font-bold text-slate-700 mb-3">{t('step2Select')}</h2>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {products.map(p => (
                            <div key={p.id} className="flex items-center bg-slate-100 p-2 rounded-md">
                                <img src={p.imageUrl} alt={t(p.name)} className="w-12 h-12 object-cover rounded-md mr-4 rtl:mr-0 rtl:ml-4" />
                                <span className="text-sm font-semibold text-slate-700">{t(p.name)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleGenerateClick}
                    disabled={isLoading || !personImage}
                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed text-lg"
                >
                    {isLoading ? t('generatingImage') : t('generate')}
                </button>
            </div>

            {/* Right Column: Result */}
            <div className="bg-slate-100 rounded-lg flex items-center justify-center min-h-[400px] p-4 relative overflow-hidden">
                {isLoading && <Loader messageKey="generatingImage" />}
                {!isLoading && generatedImage && (
                    <img src={generatedImage} alt="Virtual Try-On Result" className="max-w-full max-h-full object-contain rounded-md" />
                )}
                {!isLoading && !generatedImage && !error && (
                    <div className="text-center text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="mt-2 font-semibold">{t('yourVirtualTryOn')}</p>
                        <p className="text-sm">{t('yourImageWillAppearHere')}</p>
                    </div>
                )}
                 {error && !isLoading && (
                    <div className="absolute inset-0 bg-red-100 text-red-800 p-4 flex flex-col items-center justify-center text-center rounded-lg">
                        <h3 className="font-bold text-lg">{t('errorOccurred')}</h3>
                        <p className="mt-1 text-sm">{error}</p>
                    </div>
                 )}
            </div>
        </div>
      )}
    </div>
  );
};

export default FittingRoom;