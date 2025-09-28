
import React from 'react';
import { Product } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product, onBack }) => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <button onClick={onBack} className="mb-6 text-slate-600 hover:text-slate-900">
          &larr; {t('backToProducts')}
        </button>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src={product.imageUrl} alt={t(product.name)} className="w-full rounded-lg" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{t(product.name)}</h1>
            <p className="text-2xl text-slate-800 mb-4">{t('price')}: {product.price} {t('currency')}</p>
            <p className="text-lg text-slate-600 mb-4"><span className="font-bold">{t('category')}:</span> {t(product.category)}</p>
            <div className="mt-8 space-x-4 rtl:space-x-reverse">
              <button className="bg-slate-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors">
                {t('addToCart')}
              </button>
              <button className="border border-slate-900 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-slate-100 transition-colors">
                {t('virtualTryOn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
