
export type Category = 'Men' | 'Women' | 'Kids' | 'Shoes' | 'Accessories';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}

export interface CarouselSlide {
    id: number;
    titleKey: TranslationKey;
    subtitleKey: TranslationKey;
    imageUrl: string;
}

export type TranslationKey = string;