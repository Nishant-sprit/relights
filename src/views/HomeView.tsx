import React from 'react';
import { PageView, CatalogProduct } from '../types';
import { HeroCarousel } from '../components/HeroCarousel';
import { TrendingProducts } from '../components/TrendingProducts';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Award,
  ChevronRight,
  ArrowRight,
  Home as HomeIcon,
  Building,
  Building2,
  Hotel,
  Briefcase,
  Layers,
  Scan,
  RotateCw,
  Truck,
  Lock,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: PageView) => void;
  onBuyNow: () => void;
  onSelectProduct?: (product: CatalogProduct) => void;
  onAddToCart?: (product: CatalogProduct, e: React.MouseEvent) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onBuyNow,
  onSelectProduct = () => {
    onNavigate('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  onAddToCart = () => {
    onBuyNow();
  },
}) => {
  return (
    <div id="home-view-page" className="space-y-10 sm:space-y-12 pb-16 animate-fadeIn">
      {/* FULL-BLEED HERO PHOTO CAROUSEL AT TOP OF HOME PAGE */}
      <HeroCarousel onNavigate={onNavigate} onBuyNow={onBuyNow} />

      {/* TRENDING PRODUCTS SECTION RIGHT AFTER HEADER IMAGE */}
      <section id="homepage-trending-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <TrendingProducts
          onNavigate={onNavigate}
          onSelectProduct={onSelectProduct}
          onAddToCart={onAddToCart}
        />
      </section>

      {/* WHY CHOOSE RELIGHTS */}
      <section id="why-choose-relights" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Engineered Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Relights Smart Controller
          </h2>
          <p className="text-sm text-slate-600">
            Crafted for homeowners and interior architects who demand uncompromising quality, safety, and modern elegance.
          </p>
        </div>

        {/* 4 Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Scan className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Motion Activated</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dual PIR wide-cone sensors instantly detect your approach at top or bottom stairs, triggering cascading lights smoothly.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Energy Efficient</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Integrated Lux daylight sensor ensures lights turn on only when dark. Consumes under 0.35W standby power.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Easy Installation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Color-coded terminal blocks and clear wire labelling make installation straightforward for any electrician or DIY installer.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Premium Build Quality</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fire-retardant ABS housing with aluminum heat sink casing tested for over 50,000 continuous hours of operation.
            </p>
          </div>
        </div>
      </section>

      {/* WORKS WITH SECTION */}
      <section id="works-with-section" className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Universal Architectural Compatibility
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Works With Any Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Relights is designed to adapt seamlessly to all residential and commercial building layouts.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Home', icon: HomeIcon, desc: 'Single Family' },
              { label: 'Villa', icon: Building2, desc: 'Luxury Estates' },
              { label: 'Duplex', icon: Layers, desc: 'Multi-Level' },
              { label: 'Office', icon: Briefcase, desc: 'Corporate HQ' },
              { label: 'Hotel', icon: Hotel, desc: 'Boutique Suites' },
              { label: 'Apartment', icon: Building, desc: 'Penthouses' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/60 hover:bg-slate-800 transition-all text-center space-y-2 group cursor-pointer"
              >
                <item.icon className="w-7 h-7 mx-auto text-blue-400 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-[10px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER TRUST & PROOF BAR */}
      <section id="customer-trust-banner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">
              Ready to Upgrade Your Staircase Safety?
            </h3>
            <p className="text-xs text-blue-200">
              Join over 12,000+ happy homeowners enjoying automatic motion lighting every night.
            </p>
          </div>

          <button
            onClick={() => {
              onNavigate('product');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-white hover:bg-blue-50 text-blue-900 text-xs font-black px-8 py-4 rounded-2xl shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            Explore Product Landing Page &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
