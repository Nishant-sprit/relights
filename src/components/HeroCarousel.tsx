import React, { useState, useEffect, useRef } from 'react';
import { PageView } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  Play,
  Pause,
  CheckCircle2,
} from 'lucide-react';

interface HeroCarouselProps {
  onNavigate: (view: PageView) => void;
  onBuyNow: () => void;
}

interface SlideItem {
  id: string;
  tag: string;
  titleLine1: string;
  titleHighlight: string;
  subtitle: string;
  image: string;
  badge: string;
  priceTag?: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  primaryAction: 'buy' | 'product' | 'contact';
}

const SLIDES: SlideItem[] = [
  {
    id: 'slide-gen3-controller',
    tag: 'NEW: GEN 3 MOTION CONTROLLER',
    titleLine1: 'Smart Lighting for',
    titleHighlight: 'Every Step.',
    subtitle:
      'Experience ultimate safety and luxury with the Relights Intelligent Motion Controller. Automatically illuminate your staircase with seamless step-by-step cascading motion sensing.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    badge: 'Dual PIR Motion Activation',
    priceTag: 'Rs. 5,799.00',
    primaryCtaText: 'Order Now — Rs. 5,799.00',
    secondaryCtaText: 'View Product Details',
    primaryAction: 'buy',
  },
  {
    id: 'slide-cascading-illumination',
    tag: 'HANDS-FREE SAFETY & ELEGANCE',
    titleLine1: 'Cascading Motion',
    titleHighlight: 'Precision.',
    subtitle:
      'Engineered with microprocessors that trigger sequential LED lighting step-by-step as you walk. Soft fade-in and smooth dimming create a breathtaking architectural transition.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=80',
    badge: 'Smooth Sequential Dimming',
    primaryCtaText: 'Shop Controller Kit',
    secondaryCtaText: 'See Wiring Specs',
    primaryAction: 'product',
  },
  {
    id: 'slide-luxury-villas',
    tag: 'ARCHITECTURAL INTEGRATION',
    titleLine1: 'Modern Luxury for',
    titleHighlight: 'Floating Stairs.',
    subtitle:
      'Perfect for modern duplexes, private villas, and commercial spaces. Compatible with 12V / 24V COB LED strips, under-tread channels, and wall skirt boards.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
    badge: 'Supports 16 to 32 Steps',
    primaryCtaText: 'Explore System Compatibility',
    secondaryCtaText: 'Contact Technical Team',
    primaryAction: 'contact',
  },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onNavigate,
  onBuyNow,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideCount = SLIDES.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const handlePrimaryClick = (action: 'buy' | 'product' | 'contact') => {
    if (action === 'buy') {
      onBuyNow();
    } else if (action === 'product') {
      onNavigate('product');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToContent = () => {
    const target = document.getElementById('features-section') || document.getElementById('before-after-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 600, behavior: 'smooth' });
    }
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <div
      id="hero-carousel"
      className="relative w-full min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] bg-slate-950 text-white overflow-hidden flex flex-col justify-between group"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* BACKGROUND IMAGE CAROUSEL SLIDES WITH SMOOTH OVERLAY FADE */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.titleLine1}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out brightness-[0.45] contrast-105"
            referrerPolicy="no-referrer"
          />

          {/* Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
        </div>
      ))}

      {/* OVERLAY NAVIGATION HEADER SPACER */}
      <div className="relative z-20 pt-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex justify-between items-center text-xs font-semibold text-slate-300">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-[11px] uppercase tracking-widest text-blue-300 font-bold">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span>{currentSlide.tag}</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 text-slate-400">
          <span className="text-white font-bold">{currentIndex + 1}</span>
          <span>/</span>
          <span>{slideCount}</span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-2 hover:text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* MAIN CAROUSEL CONTENT BLOCK */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 my-auto w-full py-12 lg:py-16">
        <div className="max-w-2xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-extrabold tracking-wide">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>{currentSlide.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] transition-all duration-500">
            {currentSlide.titleLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500">
              {currentSlide.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
            {currentSlide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => {
                onNavigate('product');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {currentSlide.secondaryCtaText}
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>

          {/* Key Bullet Highlights */}
          <div className="pt-4 flex flex-wrap gap-6 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" /> Free Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" /> 2-Year Warranty
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" /> 30-Day Money Back
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER OF CAROUSEL: SLIDE CONTROLS & SCROLL ARROW */}
      <div className="relative z-20 pb-8 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-end justify-between">
        {/* Left Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700/80 hover:bg-blue-600 hover:border-blue-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700/80 hover:bg-blue-600 hover:border-blue-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Center Down Chevron (Scroll Indicator like in user screenshot) */}
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center text-slate-400 hover:text-white transition-colors cursor-pointer group"
          title="Scroll down to explore"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity mb-1">
            Scroll
          </span>
          <ChevronDown className="w-6 h-6 animate-bounce text-slate-300 group-hover:text-blue-400" />
        </button>

        {/* Right Carousel Indicator Pill Dots (like `- • •` in screenshot) */}
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 bg-blue-500 shadow-sm shadow-blue-500'
                  : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
