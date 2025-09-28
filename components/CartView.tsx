import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { Product } from '../types';

interface CartViewProps {
    cart: Product[];
    onRemoveFromCart: (productId: number) => void;
    onCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cart, onRemoveFromCart, onCheckout }) => {
    const { t } = useTranslation();

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-slate-800">{t('shoppingCart')}</h1>
                {cart.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-slate-500 text-xl">{t('cartEmpty')}</p>
                    </div>
                ) : (
                    <div>
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <img src={item.imageUrl} alt={t(item.name)} className="w-20 h-20 object-cover rounded-md" />
                                        <div>
                                            <h3 className="font-bold text-slate-700">{t(item.name)}</h3>
                                            <p className="text-slate-500">{item.price} {t('currency')}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => onRemoveFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 font-semibold"
                                    >
                                        {t('removeFromCart')}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-4 border-t">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-slate-800">{t('totalPrice')}:</span>
                                <span className="text-xl font-bold text-slate-900">{totalPrice} {t('currency')}</span>
                            </div>
                            <button 
                                onClick={onCheckout}
                                className="w-full mt-6 bg-slate-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors"
                            >
                                {t('checkout')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartView;
