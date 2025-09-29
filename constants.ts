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
    imageUrl: 'https://i.ibb.co/vCySnML/image.jpg',
    category: 'Women',
  },
  {
    id: 2,
    name: 'Andora Women\'s Knitted Fleece Hooded Sweater',
    price: 450,
    imageUrl: 'https://i.ibb.co/6y40g5K/61-E42-Hm-Hp-XL-AC-SX679.jpg',
    category: 'Women',
  },
  {
    id: 3,
    name: 'Girls . Women\'s High Waist Star Print Wide Leg Joggers - Modern and Comfortable Fashion from Meeza',
    price: 220,
    imageUrl: 'https://i.ibb.co/LnhXF2L/61-Pm-Bl-Cca-TL-AC-SY741.jpg',
    category: 'Women',
  },
  {
    id: 4,
    name: 'Women\'s wide leg high waisted trousers with elastic and drawstring - comfortable and stylish for home and going out from Romba',
    price: 220,
    imageUrl: 'https://i.ibb.co/GvxYc3W/61q-QLTz0-SLL-AC-SY741.jpg',
    category: 'Women',
  },
  {
    id: 103,
    name: 'Karina Women\'s Elegant Fishnet Beach Shirt',
    price: 640,
    imageUrl: 'https://i.ibb.co/v4bK3qY/513-Zee-Mv-5-L-AC-SY741.jpg',
    category: 'Women',
  },

  // Men
  
  {
    id: 201,
    name: 'Firewood Men\'s Classic Basic Short Sleeve Shirt',
    price: 250,
    imageUrl: 'https://i.ibb.co/1KbbjK7/71q8-Yfkq-SEL-AC-SY741.jpg',
    category: 'Men',
  },
  {
    id: 202,
    name: 'Andorra Men\'s Long Sleeve Western Style Oxford Cotton Shirt',
    price: 330,
    imageUrl: 'https://i.ibb.co/y51J0Rj/61-LNb-M9d-I4-L-AC-SX679.jpg',
    category: 'Men',
  },
  {
    id: 203,
    name: 'Avon Men\'s Plaid Shirt with Two Front Pockets',
    price: 330,
    imageUrl: 'https://i.ibb.co/wJm86fM/410-CZ3-Hdnm-L-AC.jpg',
    category: 'Men',
  },
  {
    id: 204,
    name: 'Men\'s Oversized Cotton T-Shirt - Casual Graphic Print Short Sleeve Crew Neck Slim Fit Relaxed Fit',
    price: 330,
    imageUrl: 'https://i.ibb.co/tZ5W2D3/719-Vj-DS7-Nx-L-AC-SX679.jpg',
    category: 'Men',
  },
  {
    id: 205,
    name: 'New casual lightning and thunder t-shirt for youth and men from Meeza',
    price: 330,
    imageUrl: 'https://i.ibb.co/qD4dBDC/711j-T-lh-O4-L-AC-SX679.jpg',
    category: 'Men',
  },
  {
    id: 206,
    name: 'Andora Men\'s Casual Elastic Waist Drawstring Trousers with Side Pockets',
    price: 330,
    imageUrl: 'https://i.ibb.co/vD3CjjB/61-b-Sl3-DQd-L-AC-SX342-SY445-QL70-ML2.jpg',
    category: 'Men',
  },
  {
    id: 207,
    name: 'Dot Jeans Wear Men\'s Boyfriend Jeans',
    price: 330,
    imageUrl: 'https://i.ibb.co/7C96T5d/51-Wn-Jqrpfe-L-AC-SX679.jpg',
    category: 'Men',
  },

  // Kids
  {
    id: 301,
    name: 'Boys\' 2-Piece Winter Tracksuit - Hooded Sweatshirt and Joggers - Multicolor',
    price: 500,
    imageUrl: 'https://i.ibb.co/T1S8T9F/31px-AHUy-FFL-AC.jpg',
    category: 'Kids',
  },
  {
    id: 302,
    name: 'Andora Boys\' Checked Quilted Hooded Jacket',
    price: 500,
    imageUrl: 'https://i.ibb.co/0J61p0x/71-LDq-C-mdt-L-AC-SX679.jpg',
    category: 'Kids',
  },

  // Shoes
  {
    id: 401,
    name: 'Women\'s Casual Sneakers - Lightweight - Natural Materials Resistant to Bacteria, Fungi and Odors - Colors {Grey, Black & White} - (Model 7)',
    price: 350,
    imageUrl: 'https://i.ibb.co/fQzXyM2/7132x-NFxdi-L-AC-SY575.jpg',
    category: 'Shoes',
  },
  {
    id: 402,
    name: 'Mintra Men\'s Kai Wire Sneaker',
    price: 250,
    imageUrl: 'https://i.ibb.co/Ld3cRzY/71h2d-Ju-Uej-L-AC-SY695.jpg',
    category: 'Shoes',
  },
  // Accessories
  {
    id: 501,
    name: 'Leather Belt',
    price: 180,
    imageUrl: 'https://i.ibb.co/xJ52Dhy/pexels-photo-984859.jpg',
    category: 'Accessories',
  }
];

export const carouselSlides: CarouselSlide[] = [
    {
        id: 1,
        titleKey: 'latestCollections',
        subtitleKey: 'discoverSummer',
        imageUrl: 'https://i.ibb.co/NgDY3fh/Generated-Image-September-29-2025-12-19-AM.png',
    },
    {
        id: 2,
        titleKey: 'saleUpTo50',
        subtitleKey: 'midSeasonSale',
        imageUrl: 'https://i.ibb.co/m5K7NFG/a-stylish-and-modern-social-media-promotional-image-for-tawtaw-clothing-brand-showcase-trendy-and-c.jpg',
    },
    {
        id: 3,
        titleKey: 'saleUpTo50',
        subtitleKey: 'midSeasonSale',
        imageUrl: 'https://i.ibb.co/pjbrf1F/Generated-Image-September-29-2025-12-23-AM.png',}
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