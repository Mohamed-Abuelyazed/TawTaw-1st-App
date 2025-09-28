import React from 'react';
import { Product } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  onVirtualTryOn: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onVirtualTryOn, onAddToCart }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-transform duration-300">
      <img src={product.imageUrl} alt={t(product.name)} className="w-full h-56 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-slate-800 flex-grow">{t(product.name)}</h3>
        <p className="text-slate-600 mt-1">{t('price')}: {product.price} {t('currency')}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-slate-900 text-white font-bold py-2 px-2 rounded-lg hover:bg-slate-700 transition-colors text-sm"
          >
            {t('addToCart')}
          </button>
          <button
            onClick={() => onVirtualTryOn(product)}
            className="w-full bg-slate-200 text-slate-800 font-bold py-2 px-2 rounded-lg hover:bg-slate-300 transition-colors text-sm"
          >
            {t('virtualTryOn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
