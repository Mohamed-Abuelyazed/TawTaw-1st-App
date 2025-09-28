
import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const SupportButton: React.FC = () => {
    const { t } = useTranslation();

    const openWhatsApp = () => {
        const whatsappNumber = "201119770094";
        const whatsappUrl = `https://wa.me/${whatsappNumber}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <button
            onClick={openWhatsApp}
            className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 bg-green-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-transform transform hover:scale-110 z-30"
            aria-label={t('support')}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
            >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004-1.22 4.434 4.545-1.192zM12 5.222c-3.749 0-6.791 3.042-6.791 6.791s3.042 6.791 6.791 6.791c3.749 0 6.791-3.042 6.791-6.791s-3.042-6.791-6.791-6.791zm3.264 8.243c-.143.435-1.018 1.405-1.127 1.43-.109.025-.373.025-.572-.05-.199-.075-1.042-.387-1.983-1.222-.733-.657-1.222-1.472-1.37-1.72-.148-.248-.025-.373.05-.5.075-.123.174-.223.248-.298.074-.074.099-.123.148-.223.05-.099.025-.174-.025-.273s-.522-1.245-.721-1.693c-.199-.448-.423-.373-.572-.373h-.472c-.174 0-.448.074-.672.348-.223.273-.87 1.018-.87 2.48s.894 2.879 1.018 3.078c.123.199 1.745 2.688 4.227 3.731.597.248 1.067.397 1.442.522.622.199 1.17.174 1.593.1.472-.074 1.018-.423 1.167-.822.148-.397.148-.746.1-.822-.05-.074-.174-.123-.348-.223z"/>
            </svg>
        </button>
    );
};

export default SupportButton;