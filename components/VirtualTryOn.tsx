import React from 'react';

const VirtualTryOn: React.FC = () => {
    return (
        <div>
            {/* This component can be used to trigger the virtual try-on experience */}
            <button className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors">
                تجربة افتراضية
            </button>
        </div>
    );
};

export default VirtualTryOn;
