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
    imageUrl: 'https://images.pexels.com/photos/10398249/pexels-photo-10398249.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Women',
  },
  {
    id: 2,
    name: 'Andora Women\'s Knitted Fleece Hooded Sweater',
    price: 450,
    imageUrl: 'https://m.media-amazon.com/images/I/61E42HmHpXL._AC_SX679_.jpg',
    category: 'Women',
  },
  {
    id: 3,
    name: 'Girls . Women\'s High Waist Star Print Wide Leg Joggers - Modern and Comfortable Fashion from Meeza',
    price: 220,
    imageUrl: 'https://m.media-amazon.com/images/I/61PmBlCcaTL._AC_SY741_.jpg',
    category: 'Women',
  },
  {
    id: 4,
    name: 'Women\'s wide leg high waisted trousers with elastic and drawstring - comfortable and stylish for home and going out from Romba',
    price: 220,
    imageUrl: 'https://m.media-amazon.com/images/I/61qQLTz0SLL._AC_SY741_.jpg',
    category: 'Women',
  },
  {
    id: 103,
    name: 'Karina Women\'s Elegant Fishnet Beach Shirt',
    price: 640,
    imageUrl: 'https://m.media-amazon.com/images/I/513ZeeMv-5L._AC_SY741_.jpg',
    category: 'Women',
  },

  // Men
  
  {
    id: 201,
    name: 'Firewood Men\'s Classic Basic Short Sleeve Shirt',
    price: 250,
    imageUrl: 'https://m.media-amazon.com/images/I/71q8YfkqSEL._AC_SY741_.jpg',
    category: 'Men',
  },
  {
    id: 202,
    name: 'Andorra Men\'s Long Sleeve Western Style Oxford Cotton Shirt',
    price: 330,
    imageUrl: 'https://m.media-amazon.com/images/I/61LNbM9dI4L._AC_SX679_.jpg',
    category: 'Men',
  },
  {
    id: 203,
    name: 'Avon Men\'s Plaid Shirt with Two Front Pockets',
    price: 330,
    imageUrl: 'https://m.media-amazon.com/images/I/410CZ3HdnmL._AC_.jpg',
    category: 'Men',
  },
  {
    id: 204,
    name: 'Men\'s Oversized Cotton T-Shirt - Casual Graphic Print Short Sleeve Crew Neck Slim Fit Relaxed Fit',
    price: 330,
    imageUrl: 'https://m.media-amazon.com/images/I/719VjDS7NxL._AC_SX679_.jpg',
    category: 'Men',
  },
  {
    id: 205,
    name: 'New casual lightning and thunder t-shirt for youth and men from Meeza',
    price: 330,
    imageUrl: 'https://m.media-amazon.com/images/I/711jT-lhO4L._AC_SX679_.jpg',
    category: 'Men',
  },
  {
    id: 206,
    name: 'Andora Men\'s Casual Elastic Waist Drawstring Trousers with Side Pockets',
    price: 330,
    imageUrl: 'https://m.media-amazon.com/images/I/61-bSl3DQdL._AC_SX569_.jpg',
    category: 'Men',
  },
  {
    id: 207,
    name: 'Dot Jeans Wear Men\'s Boyfriend Jeans',
    price: 330,
    imageUrl: 'https://m.media-amazon.com/images/I/51WnJqrpfeL._AC_SX679_.jpg',
    category: 'Men',
  },

  // Kids
  {
    id: 301,
    name: 'Boys\' 2-Piece Winter Tracksuit - Hooded Sweatshirt and Joggers - Multicolor',
    price: 500,
    imageUrl: 'https://m.media-amazon.com/images/I/31pxAHUyFFL._AC_.jpg',
    category: 'Kids',
  },
  {
    id: 302,
    name: 'Andora Boys\' Checked Quilted Hooded Jacket',
    price: 500,
    imageUrl: 'https://m.media-amazon.com/images/I/71LDqC-mdtL._AC_SX679_.jpg',
    category: 'Kids',
  },

  // Shoes
  {
    id: 401,
    name: 'Women\'s Casual Sneakers - Lightweight - Natural Materials Resistant to Bacteria, Fungi and Odors - Colors {Grey, Black & White} - (Model 7)',
    price: 350,
    imageUrl: 'https://m.media-amazon.com/images/I/7132xNFxdiL._AC_SY575_.jpg',
    category: 'Shoes',
  },
  {
    id: 402,
    name: 'Mintra Men\'s Kai Wire Sneaker',
    price: 250,
    imageUrl: 'https://m.media-amazon.com/images/I/71h2dJuUejL._AC_SY695_.jpg',
    category: 'Shoes',
  },
  // Accessories
  {
    id: 501,
    name: 'Leather Belt',
    price: 180,
    imageUrl: 'https://images.pexels.com/photos/984859/pexels-photo-984859.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Accessories',
  }
];

export const carouselSlides: CarouselSlide[] = [
    {
        id: 1,
        titleKey: 'latestCollections',
        subtitleKey: 'discoverSummer',
        imageUrl: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 2,
        titleKey: 'saleUpTo50',
        subtitleKey: 'midSeasonSale',
        imageUrl: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 3,
        titleKey: 'saleUpTo50',
        subtitleKey: 'midSeasonSale',
        imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',}
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