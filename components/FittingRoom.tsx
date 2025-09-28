import React, { useState, useRef, useEffect } from 'react';
import { generateVirtualTryOn } from '../services/geminiService';
import Loader from './Loader';
import { Product } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface FittingRoomProps {
    products: Product[];
}

const FittingRoom: React.FC<FittingRoomProps> = ({ products }) => {
  const { t } = useTranslation();
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [personImageUrl, setPersonImageUrl] = useState<string | null>(null);
  const [selectedClothingUrl, setSelectedClothingUrl] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set a default selected clothing item if one isn't already selected
    if (products.length > 0 && !selectedClothingUrl) {
        setSelectedClothingUrl(products[0].imageUrl);
    }
    // If the currently selected item is removed from the list, default to the first
    if (products.length > 0 && selectedClothingUrl && !products.some(p => p.imageUrl === selectedClothingUrl)) {
        setSelectedClothingUrl(products[0].imageUrl);
    }
    if (products.length === 0) {
        setSelectedClothingUrl(null);
    }
  }, [products, selectedClothingUrl]);

  if (products.length === 0) {
    return (
        <div className="my-12 p-8 bg-white rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-slate-700">{t('noItemsInFittingRoom')}</h2>
        </div>
    );
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPersonImage(file);
      setPersonImageUrl(URL.createObjectURL(file));
      setResultImage(null);
      setError(null);
    }
  };

  const handleTryOn = async () => {
    if (!personImage || !selectedClothingUrl) {
      setError(t('errorPrompt'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const generatedImage = await generateVirtualTryOn(personImage, selectedClothingUrl);
      setResultImage(generatedImage);
    } catch (err: any) {
      setError(t('imageGenError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-12 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">{t('virtualFittingRoom')}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-lg mb-2">{t('step1')}</h3>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-80 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            {personImageUrl ? (
              <img src={personImageUrl} alt="Person" className="w-full h-full object-contain" />
            ) : (
              <p className="text-slate-500">{t('uploadPrompt')}</p>
            )}
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
            <h3 className="font-bold text-lg mb-2">{t('step2')}</h3>
            <div className="w-full h-80 border-2 border-slate-200 rounded-lg bg-slate-50 p-4 flex flex-col items-center">
                {selectedClothingUrl && <img src={selectedClothingUrl} alt="Selected Clothing" className="max-w-full max-h-48 object-contain mb-4"/>}
                <div className="grid grid-cols-3 gap-2 mt-auto w-full overflow-y-auto max-h-24">
                    {products.map(item => (
                        <button key={item.id} onClick={() => setSelectedClothingUrl(item.imageUrl)} className={`p-1 rounded border-2 ${selectedClothingUrl === item.imageUrl ? 'border-slate-900' : 'border-transparent'}`}>
                            <img src={item.imageUrl} alt={item.name} className="w-full h-16 object-contain bg-white rounded"/>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-bold text-lg mb-2">{t('step3')}</h3>
          <div className="w-full h-80 border-2 border-slate-300 rounded-lg flex items-center justify-center bg-slate-50 overflow-hidden">
            {isLoading ? (
                <Loader messageKey="generatingImage" />
            ) : resultImage ? (
                <img src={resultImage} alt="Virtual Try-On Result" className="w-full h-full object-contain" />
            ) : (
                <p className="text-slate-500">{t('resultPlaceholder')}</p>
            )}
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
          <button 
            onClick={handleTryOn} 
            disabled={!personImage || isLoading || !selectedClothingUrl}
            className="bg-slate-900 text-white font-bold py-3 px-12 rounded-full hover:bg-slate-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? t('trying') : t('tryNow')}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default FittingRoom;