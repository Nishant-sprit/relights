import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';
import { PageView } from '../types';

interface HeaderProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onBuyNowDirect: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onBuyNowDirect,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'product', label: 'Products' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Floating Moving Announcement Bar */}
      <div id="top-announcement-bar" className="bg-white text-slate-900 border-b border-slate-200/80 py-2 overflow-hidden select-none shadow-2xs">
        <div className="animate-marquee whitespace-nowrap text-xs font-bold tracking-tight">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0 px-4">
              <span>Welcome Offer – Get 5% Off Your First Order | Use Code: <span className="text-blue-600 font-black">RELIGHTS5</span></span>
              <span className="text-slate-400 font-bold">•</span>
              <span>Free Priority Express Worldwide Shipping on All Relights Smart Controller Orders</span>
              <span className="text-slate-400 font-bold">•</span>
              <span>Smart Motion Lighting Solutions for Safe, Intelligent Staircases</span>
              <span className="text-slate-400 font-bold">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
            : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            id="header-logo-button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">
                Relights
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav id="desktop-navigation-menu" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-semibold transition-colors cursor-pointer relative py-1 ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons & CTA */}
          <div className="flex items-center gap-3">
            {/* Wishlist Button */}
            <button
              id="header-wishlist-button"
              onClick={() => handleNavClick('product')}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors relative cursor-pointer"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-button"
              onClick={onOpenCart}
              className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors relative cursor-pointer flex items-center gap-1.5"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-semibold text-slate-700">
                Cart
              </span>
            </button>


            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 shadow-lg animate-fadeIn">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  id="mobile-buy-now-button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBuyNowDirect();
                  }}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-center shadow-md shadow-blue-500/20"
                >
                  Buy Relights Controller
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
