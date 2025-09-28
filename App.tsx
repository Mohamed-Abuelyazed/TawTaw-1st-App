import React, { useState } from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import CategoryTabs from './components/CategoryTabs';
import ProductCard from './components/ProductCard';
import FittingRoom from './components/FittingRoom';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import SupportButton from './components/SupportButton';
import ApiKeyError from './components/ApiKeyError';
import { products, categories, carouselSlides } from './constants';
import { Product, Category } from './types';
import { useTranslation } from './contexts/LanguageContext';
import { isApiKeySet } from './services/geminiService';


function App() {
  const [view, setView] = useState<'home' | 'fittingRoom' | 'cart' | 'checkout'>('home');
  const [activeCategory, setActiveCategory] = useState<Category>('Men');
  const [fittingRoomProducts, setFittingRoomProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const { language } = useTranslation();

  if (!isApiKeySet) {
    return <ApiKeyError />;
  }

  const handleAddToCart = (productToAdd: Product) => {
    setCart(prevCart => {
      // Prevent adding duplicate items to the cart
      if (prevCart.find(item => item.id === productToAdd.id)) {
        return prevCart;
      }
      return [...prevCart, productToAdd];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleVirtualTryOn = (product: Product) => {
    setFittingRoomProducts(prevProducts => {
        if (prevProducts.find(p => p.id === product.id)) {
            return prevProducts;
        }
        return [...prevProducts, product];
    });
  };

  const handleProceedToCheckout = () => {
    setView('checkout');
  };
  
  const handleBackToCart = () => {
    setView('cart');
  };

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  const renderView = () => {
    switch(view) {
        case 'home':
            return (
                <>
                    <Carousel slides={carouselSlides} />
                    <CategoryTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {filteredProducts.map((product) => (
                        <ProductCard 
                        key={product.id} 
                        product={product} 
                        onVirtualTryOn={handleVirtualTryOn}
                        onAddToCart={handleAddToCart} 
                        />
                    ))}
                    </div>
                </>
            );
        case 'fittingRoom':
            return <FittingRoom products={fittingRoomProducts} />;
        case 'cart':
            return <CartView cart={cart} onRemoveFromCart={handleRemoveFromCart} onCheckout={handleProceedToCheckout} />;
        case 'checkout':
            return <CheckoutView cart={cart} onBackToCart={handleBackToCart} />;
        default:
            return null;
    }
  }

  return (
    <div className={`bg-slate-100 min-h-screen font-sans ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header setView={setView} cartCount={cart.length} />
      
      <main className="container mx-auto p-4 md:p-8">
        {renderView()}
      </main>
      <SupportButton />
    </div>
  );
}

export default App;