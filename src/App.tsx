import React, { useState } from 'react';
import { PageView, CartItem } from './types';
import { STEP_OPTIONS, LED_COLOR_OPTIONS, GALLERY_IMAGES } from './data/mockData';
import { SeoHead } from './components/SeoHead';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { HomeView } from './views/HomeView';
import { ProductView } from './views/ProductView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [productViewKey, setProductViewKey] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Initial default item in cart for quick testing
    {
      id: 'cart-32-step-3000k',
      productName: 'Relights Smart Staircase Motion Sensor Controller Kit (32 Steps, 3K Sensor)',
      stepOption: STEP_OPTIONS[0],
      ledColor: LED_COLOR_OPTIONS[0],
      quantity: 1,
      unitPrice: STEP_OPTIONS[0].price,
      image: GALLERY_IMAGES[0].url,
    },
  ]);

  const handleNavigate = (page: PageView) => {
    if (page === 'product') {
      setProductViewKey((prev) => prev + 1);
    }
    setCurrentView(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [wishlistCount, setWishlistCount] = useState<number>(1);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState<string>('');

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const handleBuyNowDirect = (item?: CartItem) => {
    if (item) {
      setCartItems([item]);
    } else if (cartItems.length === 0) {
      // Default to 24 step kit if cart empty
      setCartItems([
        {
          id: 'cart-32-step-3000k',
          productName: 'Relights Smart Staircase Motion Sensor Controller Kit (32 Steps, 3K Sensor)',
          stepOption: STEP_OPTIONS[0],
          ledColor: LED_COLOR_OPTIONS[0],
          quantity: 1,
          unitPrice: STEP_OPTIONS[0].price,
          image: GALLERY_IMAGES[0].url,
        },
      ]);
    }
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* SEO Metadata and Structured JSON-LD Schema */}
      <SeoHead currentView={currentView} />

      {/* Main App Bar Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        wishlistCount={wishlistCount}
        onOpenCart={() => setIsCartOpen(true)}
        onBuyNowDirect={() => handleBuyNowDirect()}
      />

      {/* Dynamic View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onBuyNow={() => handleBuyNowDirect()}
          />
        )}

        {currentView === 'product' && (
          <ProductView
            key={productViewKey}
            onAddToCart={handleAddToCart}
            onBuyNowDirect={handleBuyNowDirect}
          />
        )}

        {currentView === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentView === 'contact' && <ContactView />}
      </main>

      {/* Application Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Shopping Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={(discount, code) => {
          setAppliedDiscount(discount);
          setDiscountCode(code);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        appliedDiscount={appliedDiscount}
        discountCode={discountCode}
        onOrderComplete={() => {
          setCartItems([]);
        }}
      />
    </div>
  );
}
