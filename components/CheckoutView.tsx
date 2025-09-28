import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { Product } from '../types';
import { governorates, shippingCosts } from '../constants';

interface CheckoutViewProps {
    cart: Product[];
    onBackToCart: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, onBackToCart }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        governorate: '',
    });
    const [shippingCost, setShippingCost] = useState(0);

    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + shippingCost;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'governorate') {
            setShippingCost(shippingCosts[value] || 0);
        }
    };

    const handleCompleteOrder = (e: React.FormEvent) => {
        e.preventDefault();
        
        const whatsappNumber = "201119770094";
        const cartItemsText = cart.map(item => `- ${t(item.name)}: ${item.price} ${t('currency')}`).join('\n');
        
        const messageParts = [
            `*${t('newOrder')}*`,
            '',
            `*${t('customerDetails')}:*`,
            `${t('fullName')}: ${formData.fullName}`,
            `${t('phoneNumber')}: ${formData.phoneNumber}`,
            `${t('governorate')}: ${t(formData.governorate)}`,
            `${t('address')}:`,
            formData.address,
            '',
            `*${t('orderItems')}:*`,
            cartItemsText,
            '',
            `${t('totalPrice')}: ${subtotal} ${t('currency')}`,
            `${t('shipping')}: ${shippingCost} ${t('currency')}`,
            `*${t('total')}: ${total} ${t('currency')}*`
        ];

        const message = messageParts.join('\n').trim();
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <button onClick={onBackToCart} className="mb-6 text-slate-600 hover:text-slate-900 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t('backToCart')}
            </button>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-2xl font-bold mb-6 text-slate-800">{t('shippingInformation')}</h1>
                        <form onSubmit={handleCompleteOrder} className="space-y-4">
                            <input name="fullName" type="text" placeholder={t('fullName')} value={formData.fullName} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-slate-900 placeholder:text-slate-400" />
                            <input name="phoneNumber" type="tel" placeholder={t('phoneNumber')} value={formData.phoneNumber} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-slate-900 placeholder:text-slate-400" />
                            
                            <textarea name="address" placeholder={t('address')} value={formData.address} onChange={handleChange} required rows={3} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-slate-900 placeholder:text-slate-400" />

                            <select name="governorate" value={formData.governorate} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white text-slate-900">
                                <option value="" disabled>{t('governorate')}</option>
                                {governorates.map(gov => <option key={gov} value={gov}>{t(gov)}</option>)}
                            </select>
                            
                             <button type="submit" className="w-full mt-6 bg-slate-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors">
                                {t('placeOrder')}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="lg:col-span-1">
                     <div className="bg-white rounded-lg shadow-lg p-8 sticky top-28">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">{t('orderSummary')}</h2>
                        <div className="space-y-4">
                             {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600">{t(item.name)}</span>
                                    <span className="font-semibold text-slate-700">{item.price} {t('currency')}</span>
                                </div>
                             ))}
                        </div>
                        <div className="mt-6 pt-6 border-t space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">{t('totalPrice')}</span>
                                <span className="font-semibold text-slate-700">{subtotal} {t('currency')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">{t('shipping')}</span>
                                <span className="font-semibold text-slate-700">{formData.governorate ? `${shippingCost} ${t('currency')}` : '---'}</span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-lg pt-4 mt-2 border-t">
                                <span className="text-slate-800">{t('total')}:</span>
                                <span className="text-slate-900">{formData.governorate ? `${total} ${t('currency')}` : `${subtotal} ${t('currency')}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutView;