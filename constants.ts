import { Product, Category, CarouselSlide } from './types';

// Women ID 1-200
// Men ID 201-300
// Kids ID 301-400
// Shoes ID 401-500
// Accessories ID 501-600

export const categories: Category[] = ['Men', 'Women', 'Kids', 'Shoes', 'Accessories'];

export const products: Product[] = [
  // Women
  {
    id: 1,
    name: 'Julia Embroidered Blouse',
    price: 375,
    imageUrl: 'https://i.ibb.co/vCySnMLg/image.jpg',
    category: 'Women',
  },
  {
    id: 101,
    name: 'Light Blue Jeans',
    price: 150,
    imageUrl: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Women',
  },
  {
    id: 102,
    name: 'Floral Summer Dress',
    price: 220,
    imageUrl: 'https://images.pexels.com/photos/2235832/pexels-photo-2235832.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Women',
  },
  // Men
  {
    id: 201,
    name: 'White Cotton T-Shirt',
    price: 75,
    imageUrl: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Men',
  },
  {
    id: 202,
    name: 'Black Printed T-Shirt',
    price: 85,
    imageUrl: 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Men',
  },
  // Kids
  {
    id: 301,
    name: 'Kids Graphic Tee',
    price: 90,
    imageUrl: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Kids',
  },
  // Shoes
  {
    id: 401,
    name: 'White Sneakers',
    price: 350,
    imageUrl: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Shoes',
  },
  // Accessories
  {
    id: 501,
    name: 'Leather Belt',
    price: 180,
    imageUrl: 'https://images.pexels.com/photos/984859/pexels-photo-984859.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Accessories',
  }
];

export const carouselSlides: CarouselSlide[] = [
    {
        id: 1,
        titleKey: 'latestCollections',
        subtitleKey: 'discoverSummer',
        imageUrl: 'https://via.placeholder.com/1200x400.png/CCCCCC/FFFFFF?text=Summer+Collection',
    },
    {
        id: 2,
        titleKey: 'saleUpTo50',
        subtitleKey: 'midSeasonSale',
        imageUrl: 'https://via.placeholder.com/1200x400.png/AAAAAA/FFFFFF?text=Sale+50%25',
    },
];

export const governorates: string[] = [
    '6th of October', 'Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Borg El Arab', 'Cairo', 'Dakahlia', 
    'Damietta', 'Faiyum', 'Gharbia', 'Giza', 'Helwan', 'Ismailia', 'Kafr El Sheikh', 'Luxor', 'Maadi', 
    'Matruh', 'Minya', 'Monufia', 'New Valley', 'North Sinai', 'Port Said', 'Qalyubia', 'Qena', 'Red Sea', 
    'Sharqia', 'Sohag', 'South Sinai', 'Suez'
];

export const shippingCosts: { [key: string]: number } = {
  // 100 EGP
  'Gharbia': 100,
  'Monufia': 100,
  'Dakahlia': 100,
  'Kafr El Sheikh': 100,
  'Sharqia': 100,
  'Qalyubia': 100,
  'Damietta': 100,
  // 200 EGP
  'Cairo': 200,
  'Giza': 200,
  '6th of October': 200,
  'Helwan': 200,
  'Maadi': 200,
  'Alexandria': 200,
  'Borg El Arab': 200,
  'Beheira': 200,
  'Ismailia': 200,
  'Port Said': 200,
  'Suez': 200,
  'Faiyum': 200,
  'Beni Suef': 200,
  // 300 EGP
  'Matruh': 300,
  'North Sinai': 300,
  'South Sinai': 300,
  'Red Sea': 300,
  'Minya': 300,
  'Asyut': 300,
  'Sohag': 300,
  'Qena': 300,
  'Luxor': 300,
  'Aswan': 300,
  'New Valley': 300,
};