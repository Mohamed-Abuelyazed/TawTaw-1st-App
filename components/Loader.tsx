import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface LoaderProps {
  messageKey: 'generatingImage';
}

const Loader: React.FC<LoaderProps> = ({ messageKey }) => {
  const { t } = useTranslation();
  
  const loadingMessages = useMemo(() => [
    t('generatingImage'),
    t('stylingYourLook'),
    t('fittingTheClothes'),
    t('almostThere'),
  ], [t]);

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [loadingMessages.length]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-900 bg-opacity-90 text-white p-8 text-center">
      <svg
        className="animate-spin h-16 w-16 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p className="mt-4 text-xl font-semibold">{loadingMessages[messageIndex]}</p>
      <p className="mt-2 text-sm text-slate-300">{t('pleaseWait')}</p>
    </div>
  );
};

export default Loader;