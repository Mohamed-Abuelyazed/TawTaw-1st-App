import React from 'react';

const ApiKeyError: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4 font-['Cairo',_sans-serif]">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
        <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
                <span dir="rtl">خطأ في الإعدادات</span> / <span dir="ltr">Configuration Error</span>
            </h1>
            <h2 className="text-xl font-semibold text-slate-700 mb-4" dir="ltr">API Key is Missing</h2>
        </div>
        
        <div className="space-y-4 text-slate-600 text-center">
            <p dir="rtl">
                يبدو أن مفتاح واجهة برمجة التطبيقات (API Key) الخاص بـ Gemini غير موجود. لن تعمل الميزات الأساسية للتطبيق، مثل التجربة الافتراضية، بدونه.
            </p>
            <p dir="ltr">
                The Gemini API Key is not configured. Core features like the virtual try-on will not work without it.
            </p>
        </div>

        <div className="mt-8 space-y-6">
            {/* Arabic Instructions */}
            <div dir="rtl" className="bg-slate-50 p-4 rounded-md text-right">
                <h3 className="font-bold text-slate-800 text-lg">ماذا تفعل؟</h3>
                <p className="text-slate-600 mt-2">
                    إذا كنت صاحب هذا الموقع، يرجى إضافة متغير بيئة باسم <code className="bg-slate-200 text-slate-900 font-mono px-1.5 py-0.5 rounded text-sm">API_KEY</code> إلى إعدادات النشر الخاصة بك (على سبيل المثال، في Netlify أو Vercel).
                </p>
            </div>

            {/* English Instructions */}
            <div dir="ltr" className="bg-slate-50 p-4 rounded-md text-left">
                <h3 className="font-bold text-slate-800 text-lg">What to do?</h3>
                <p className="text-slate-600 mt-2">
                    If you are the owner of this site, please add an environment variable named <code className="bg-slate-200 text-slate-900 font-mono px-1.5 py-0.5 rounded text-sm">API_KEY</code> to your deployment settings (e.g., in Netlify or Vercel).
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ApiKeyError;
