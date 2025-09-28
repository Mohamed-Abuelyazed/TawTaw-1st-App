import React from 'react';
import { Category } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, onSelectCategory }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white/80 backdrop-blur-sm sticky top-[80px] z-10 shadow-sm">
      <div className="container mx-auto flex justify-center p-2">
        <div className="flex space-x-2 rtl:space-x-reverse bg-slate-200 rounded-full p-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-6 py-2 text-sm font-bold rounded-full transition-colors duration-300 ease-in-out
                ${
                  activeCategory === category
                    ? 'bg-slate-900 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-300'
                }`}
            >
              {t(category)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;