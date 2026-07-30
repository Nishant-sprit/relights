import React, { useState, useMemo } from 'react';
import {
  STEP_OPTIONS,
  LED_COLOR_OPTIONS,
  PRODUCT_SPECS,
  WHAT_IS_INCLUDED,
  WALL_LIGHT_SPECS,
  WALL_LIGHT_INCLUDED,
  PRODUCT_FAQS,
  CUSTOMER_REVIEWS,
  GALLERY_IMAGES,
  CATALOG_PRODUCTS,
} from '../data/mockData';
import {
  ProductOption,
  LedColorOption,
  CartItem,
  ReviewItem,
  CatalogProduct,
} from '../types';
import { ProductCard } from '../components/ProductCard';
import { formatINR } from '../utils/formatCurrency';
import { ThreeSixtyProductViewer } from '../components/360ProductViewer';
import { InteractiveStaircase } from '../components/InteractiveStaircase';
import { WallLightSimulator } from '../components/WallLightSimulator';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { WiringGuideModal } from '../components/WiringGuideModal';
import { ReviewModal } from '../components/ReviewModal';
import {
  Star,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Heart,
  ChevronRight,
  Sparkles,
  Search,
  ChevronDown,
  X,
  Plus,
  Play,
  RotateCcw,
  Clock,
  Sun,
  Maximize2,
  ThumbsUp,
  FileText,
  Wrench,
  Layers,
  Cpu,
  Scan,
  Cable,
  Check,
  ArrowLeft,
  SlidersHorizontal,
  LayoutGrid,
  Award,
} from 'lucide-react';

interface ProductViewProps {
  onAddToCart: (item: CartItem) => void;
  onBuyNowDirect: (item: CartItem) => void;
  initialProductId?: string | null;
}

export const ProductView: React.FC<ProductViewProps> = ({
  onAddToCart,
  onBuyNowDirect,
  initialProductId,
}) => {
  // Selected Product State (null = Catalog view, object = Detail view)
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(
    initialProductId
      ? CATALOG_PRODUCTS.find((p) => p.id === initialProductId) || null
      : null
  );

  // Catalog Filters & Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Product detail options
  const [selectedStepOption, setSelectedStepOption] = useState<ProductOption>(STEP_OPTIONS[0]); // 32-step default
  const [selectedLedColor] = useState<LedColorOption>(LED_COLOR_OPTIONS[0]); // 3000K Warm White 3K default
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'gallery' | '360' | 'video'>('gallery');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string>('');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  // Zoom state for hero photo
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number; isHovered: boolean }>({
    x: 50,
    y: 50,
    isHovered: false,
  });

  const handleMouseMoveHero = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y, isHovered: true });
  };

  const handleMouseLeaveHero = () => {
    setZoomPos((prev) => ({ ...prev, isHovered: false }));
  };

  // Delivery check state
  const [zipInput, setZipInput] = useState<string>('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  // Modals state
  const [wiringModalOpen, setWiringModalOpen] = useState<boolean>(false);
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(CUSTOMER_REVIEWS);
  const [activeOfferModal, setActiveOfferModal] = useState<'cashback' | 'bank' | 'partner' | null>(null);

  // FAQ state
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  // Video Demo state
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  // Filtered products for catalog view
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const categoriesList = [
    'All',
    'Controllers',
    'Foot Lights',
    'LED Strips',
    'Power Supplies',
    'Profiles & Channels',
    'Sensors & Accessories',
  ];

  const handleSelectProduct = (product: CatalogProduct) => {
    setSelectedProduct(product);
    setSelectedGalleryImg(product.image);
    if (product.stepOptions && product.stepOptions.length > 0) {
      setSelectedStepOption(product.stepOptions[0]);
    }
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput.trim().length >= 4) {
      setDeliveryResult('✅ In Stock & Ready! Estimated Delivery: Thursday (Express 2-3 Days)');
    }
  };

  const createCartItemForProduct = (product: CatalogProduct): CartItem => {
    const hasStepOptions = !!(product.stepOptions && product.stepOptions.length > 0);
    const isControllerWithOptions = product.category === 'Controllers' && hasStepOptions;
    return {
      id: `cart-${product.id}-${isControllerWithOptions && selectedStepOption ? selectedStepOption.id : 'default'}-${selectedLedColor ? selectedLedColor.id : 'default'}`,
      productName: product.name,
      stepOption: isControllerWithOptions ? selectedStepOption : undefined,
      ledColor: product.ledColors ? selectedLedColor : undefined,
      quantity,
      unitPrice: isControllerWithOptions && selectedStepOption ? selectedStepOption.price : product.price,
      image: selectedGalleryImg || product.image,
    };
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    onAddToCart(createCartItemForProduct(selectedProduct));
  };

  const handleBuyNow = () => {
    if (!selectedProduct) return;
    onBuyNowDirect(createCartItemForProduct(selectedProduct));
  };

  const hasCurrentStepOptions = !!(selectedProduct?.stepOptions && selectedProduct.stepOptions.length > 0);

  const currentProductPrice = selectedProduct
    ? (selectedProduct.category === 'Controllers' && hasCurrentStepOptions && selectedStepOption)
      ? selectedStepOption.price
      : selectedProduct.price
    : 0;

  const currentOriginalPrice = selectedProduct
    ? (selectedProduct.category === 'Controllers' && hasCurrentStepOptions && selectedStepOption)
      ? selectedStepOption.originalPrice
      : selectedProduct.originalPrice
    : 0;

  // Render Catalog View if no specific product selected
  if (!selectedProduct) {
    return (
      <div id="product-catalog-view" className="space-y-10 pb-16 animate-fadeIn">
        {/* CATALOG HEADER HERO */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto space-y-4 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3.5 py-1.5 rounded-full border border-blue-800/60 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Relights Architectural Collection
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Smart Staircase Store & Products
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Explore our complete range of intelligent motion controllers, high-density COB LED reels, silent power transformers, and anodized aluminum step profiles.
            </p>
          </div>
        </section>

        {/* CATALOG CONTROLS: SEARCH, CATEGORIES & SORT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search motion controllers, LED strips, power supplies..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat} {cat === 'All' ? `(${CATALOG_PRODUCTS.length})` : ''}
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-500">
                Showing <span className="text-slate-900 font-extrabold">{filteredProducts.length}</span> Products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={handleSelectProduct}
                    onAddToCart={(p, e) => {
                      e.stopPropagation();
                      onAddToCart({
                        id: `cart-${p.id}`,
                        productName: p.name,
                        unitPrice: p.price,
                        quantity: 1,
                        image: p.image,
                      });
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
                <Search className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">No products match your search</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search query or selecting another category above.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Render Product Detail View for selectedProduct
  return (
    <div id="product-detail-view" className="space-y-12 pb-16 animate-fadeIn bg-slate-50/50 min-h-screen">
      {/* BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span
            onClick={() => setSelectedProduct(null)}
            className="hover:text-slate-900 cursor-pointer"
          >
            Home
          </span>
          <span>/</span>
          <span
            onClick={() => {
              setSelectedCategory(selectedProduct.category);
              setSelectedProduct(null);
            }}
            className="hover:text-slate-900 cursor-pointer"
          >
            Shop
          </span>
          <span>/</span>
          <span className="text-slate-900 font-bold uppercase tracking-wider truncate">
            {selectedProduct.name}
          </span>
        </nav>
      </div>

      {/* MAIN TWO-COLUMN REDESIGN (LEFT 45% / RIGHT 55%) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* LEFT SIDE (45%): LARGE PRODUCT GALLERY */}
          <div className="w-full lg:w-[45%] space-y-4">
            
            {/* View Mode Tab Toggles */}
            <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl w-fit text-xs font-bold text-slate-600">
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                    : 'hover:text-slate-900'
                }`}
              >
                Photos
              </button>

              <button
                onClick={() => setActiveTab('video')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'video'
                    ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                    : 'hover:text-slate-900'
                }`}
              >
                <Play className="w-3.5 h-3.5 text-blue-600" /> Demo Video
              </button>
            </div>

            {/* TAB CONTENTS */}
            {activeTab === 'gallery' && (
              <div className="space-y-4">
                {/* LARGE HERO IMAGE CONTAINER */}
                <div
                  onMouseMove={handleMouseMoveHero}
                  onMouseLeave={handleMouseLeaveHero}
                  className="relative w-full h-[400px] sm:h-[500px] bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 flex items-center justify-center overflow-hidden cursor-crosshair group shadow-sm transition-all"
                >
                  <img
                    src={selectedGalleryImg || selectedProduct.image}
                    alt={selectedProduct.name}
                    style={{
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }}
                    className={`max-w-full max-h-full object-contain transition-transform duration-200 ease-out ${
                      zoomPos.isHovered ? 'scale-150' : 'scale-100'
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Zoom instruction pill */}
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Hover to Zoom
                  </div>
                </div>

                {/* THUMBNAILS UNDERNEATH */}
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                  {(selectedProduct.galleryImages.length > 0
                    ? selectedProduct.galleryImages
                    : GALLERY_IMAGES.map((g) => g.url)
                  ).map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedGalleryImg(imgUrl)}
                      title={`Photo ${idx + 1}`}
                      className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-white p-1 flex items-center justify-center ${
                        (selectedGalleryImg || selectedProduct.image) === imgUrl
                          ? 'border-slate-900 ring-2 ring-slate-900/10 scale-105 shadow-sm'
                          : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="max-w-full max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === '360' && <ThreeSixtyProductViewer />}

            {activeTab === 'video' && (
              <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-6 text-center text-white">
                {!isVideoPlaying ? (
                  <div className="space-y-4 max-w-md">
                    <div
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-2xl hover:scale-110 cursor-pointer transition-transform"
                    >
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <h3 className="text-xl font-bold">Watch Relights Motion Cascade Video</h3>
                    <p className="text-xs text-slate-300">
                      See how dual PIR sensors trigger step-by-step cascading warm light automatically.
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                      title="Relights Product Demo"
                      className="w-full h-full rounded-xl"
                      allow="autoplay"
                    />
                    <button
                      onClick={() => setIsVideoPlaying(false)}
                      className="absolute top-4 right-4 bg-slate-900/90 text-white px-3 py-1.5 rounded-xl text-xs font-bold"
                    >
                      Close Video
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE (55%): PRODUCT INFORMATION SECTION */}
          <div className="w-full lg:w-[55%] space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
            
            {/* BRAND & TITLE & SUBTITLE */}
            <div className="space-y-1.5 border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {selectedProduct.brand || 'RELIGHTS'}
                </span>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    isWishlisted ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-slate-700 bg-slate-50'
                  }`}
                  title="Add to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {selectedProduct.name}
              </h1>

              <p className="text-sm font-medium text-slate-500 leading-normal">
                {selectedProduct.tagline || '360° Motion Cascade Lighting for Safe, Intelligent Step-by-Step Staircase Illumination'}
              </p>

              {/* STAR RATING & REVIEWS */}
              <div className="flex items-center gap-3 pt-2">
                <div className="bg-slate-900 text-white text-xs font-black px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{selectedProduct.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  ({selectedProduct.reviewsCount.toLocaleString()} Reviews)
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  In Stock
                </span>
              </div>
            </div>

            {/* PRICING & DISCOUNT BADGE & TAX INFO */}
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  {formatINR(currentProductPrice)}
                </span>
                {currentOriginalPrice > currentProductPrice && (
                  <span className="text-lg text-slate-400 line-through font-medium">
                    {formatINR(currentOriginalPrice)}
                  </span>
                )}
                {currentOriginalPrice > currentProductPrice && (
                  <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md">
                    Save {Math.round(((currentOriginalPrice - currentProductPrice) / currentOriginalPrice) * 100)}%
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                <span>Inclusive of all taxes</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-bold">
                  Excl. GST: {formatINR(Math.round(currentProductPrice / 1.18))}
                </span>
              </p>
            </div>

            {/* OFFERS CARDS SECTION (Matching Product Page Offers) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Offers & Bank Discounts</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Offer 1: Cashback */}
                <button
                  type="button"
                  onClick={() => setActiveOfferModal('cashback')}
                  className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1 text-left hover:border-blue-400 transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-extrabold text-slate-900 block">Cashback</span>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Upto ₹28.00 cashback as Amazon Pay / UPI Balance...
                  </p>
                  <span className="text-[11px] font-bold text-blue-600 block group-hover:underline">
                    2 offers &gt;
                  </span>
                </button>

                {/* Offer 2: Bank Offer */}
                <button
                  type="button"
                  onClick={() => setActiveOfferModal('bank')}
                  className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1 text-left hover:border-blue-400 transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-extrabold text-slate-900 block">Bank Offer</span>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Upto ₹1,000.00 discount on select Credit Cards...
                  </p>
                  <span className="text-[11px] font-bold text-blue-600 block group-hover:underline">
                    44 offers &gt;
                  </span>
                </button>

                {/* Offer 3: Partner Offers */}
                <button
                  type="button"
                  onClick={() => setActiveOfferModal('partner')}
                  className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1 text-left hover:border-blue-400 transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-extrabold text-slate-900 block">Partner Offers</span>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Get GST invoice and save up to 18% on business...
                  </p>
                  <span className="text-[11px] font-bold text-blue-600 block group-hover:underline">
                    1 offer &gt;
                  </span>
                </button>
              </div>
            </div>

            {/* DESCRIPTION SUMMARY */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* CONFIGURATION SELECTION (IF ANY) */}
            {selectedProduct.stepOptions && selectedProduct.stepOptions.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <label className="text-xs font-bold text-slate-900 flex justify-between">
                  <span>
                    {selectedProduct.category === 'Foot Lights'
                      ? 'Select Pack Quantity Option:'
                      : 'Configuration Specification:'}
                  </span>
                  <span className="text-blue-600 font-extrabold">
                    {selectedStepOption.name}
                  </span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {selectedProduct.stepOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedStepOption(opt)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedStepOption.id === opt.id
                          ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900 shadow-sm'
                          : 'border-slate-200 hover:border-slate-400 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">{opt.name}</div>
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {selectedProduct.category === 'Foot Lights'
                            ? 'PIR Radar Motion Sensor + Die-Cast Aluminium Body'
                            : 'Includes Dual 3K PIR Sensors & Master Controller Hub'}
                        </div>
                      </div>
                      <div className="text-sm font-extrabold text-slate-900">
                        {formatINR(opt.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY & ACTION BUTTONS */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity Control */}
                <div className="flex items-center justify-between sm:justify-start border border-slate-300 rounded-xl bg-slate-50 px-3 py-2 min-w-[120px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg hover:bg-white text-slate-700 font-extrabold text-base flex items-center justify-center cursor-pointer transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-extrabold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg hover:bg-white text-slate-700 font-extrabold text-base flex items-center justify-center cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl border-2 border-red-600 hover:bg-red-50 text-red-600 font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to cart
                </button>

                {/* Buy it now button */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Buy it now
                </button>
              </div>
            </div>

            {/* TRUST BADGES ROW */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
              <div className="flex flex-col items-center text-center space-y-2 p-2">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 leading-snug">
                  1 Year Warranty
                </span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 p-2">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 leading-snug">
                  7 Day Return (Unused Only)
                </span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 p-2">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 leading-snug">
                  Quality Verified
                </span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 p-2">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 leading-snug">
                  Free Shipping
                </span>
              </div>
            </div>

            {/* ZIP CODE DELIVERY CHECKER */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <form onSubmit={handleZipCheck} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter ZIP code for delivery estimate"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  Check
                </button>
              </form>
              {deliveryResult && <p className="text-xs font-bold text-emerald-800">{deliveryResult}</p>}
            </div>

          </div>
        </div>
      </section>

      {/* UNIQUE INTERACTIVE SIMULATION CANVAS */}
      {selectedProduct.category === 'Foot Lights' || selectedProduct.id === 'prod-wall-step-light-3w' ? (
        <section id="interactive-wall-light-demo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WallLightSimulator />
        </section>
      ) : selectedProduct.category === 'Controllers' ? (
        <section id="interactive-staircase-demo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveStaircase stepCount={selectedStepOption.stepsCount} ledColor={selectedLedColor} />
        </section>
      ) : (
        <section id="interactive-wall-light-demo-default" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WallLightSimulator />
        </section>
      )}

      {/* TECHNICAL SPECIFICATIONS & WHAT'S INCLUDED */}
      {(() => {
        const isFootLight = selectedProduct.category === 'Foot Lights' || selectedProduct.id === 'prod-wall-step-light-3w';
        const specsToRender = isFootLight ? WALL_LIGHT_SPECS : PRODUCT_SPECS;
        const includedToRender = isFootLight ? WALL_LIGHT_INCLUDED : WHAT_IS_INCLUDED;

        return (
          <>
            <section id="specifications-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* WHAT'S INCLUDED IN THE BOX */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        Unboxing Package
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 mt-1">What’s Included in the Box</h3>
                    </div>
                    <button
                      onClick={() => setWiringModalOpen(true)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" /> Wiring Diagram
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {includedToRender.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                          <span className="flex items-center gap-1.5 text-blue-600">
                            <Check className="w-4 h-4 text-emerald-600" /> {item.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SPECIFICATIONS TABLE */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
                  <h3 className="text-xl font-extrabold text-slate-900">Technical Specifications</h3>

                  <div className="divide-y divide-slate-100 text-xs">
                    {specsToRender.map((spec, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between">
                        <span className="font-semibold text-slate-500">{spec.label}</span>
                        <span className="font-extrabold text-slate-900 text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* BEFORE / AFTER TRANSFORMATION COMPARISON - ONLY SHOWN FOR CONTROLLERS / STAIR STRIPS */}
            {!isFootLight && (
              <section id="before-after-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <BeforeAfterSlider />
              </section>
            )}
          </>
        );
      })()}

      {/* CUSTOMER REVIEWS */}
      <section id="customer-reviews-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Customer Reviews ({reviewsList.length})
            </h2>
            <p className="text-xs text-slate-500">Verified homeowner & designer installations</p>
          </div>
          <button
            onClick={() => setReviewModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
          >
            + Write a Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {rev.userPhoto ? (
                    <img src={rev.userPhoto} alt={rev.author} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {rev.author[0]}
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                    <p className="text-[10px] text-slate-400">{rev.location}</p>
                  </div>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-900">{rev.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED & COMPATIBLE PRODUCTS */}
      <section id="related-products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Frequently Bought Together
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Compatible System Accessories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATALOG_PRODUCTS.filter((p) => p.id !== selectedProduct.id)
            .slice(0, 4)
            .map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelectProduct={handleSelectProduct}
                onAddToCart={(prod, e) => {
                  e.stopPropagation();
                  onAddToCart({
                    id: `cart-${prod.id}`,
                    productName: prod.name,
                    unitPrice: prod.price,
                    quantity: 1,
                    image: prod.image,
                  });
                }}
              />
            ))}
        </div>
      </section>

      {/* Modals */}
      <WiringGuideModal
        isOpen={wiringModalOpen}
        onClose={() => setWiringModalOpen(false)}
        isFootLight={selectedProduct.category === 'Foot Lights' || selectedProduct.id === 'prod-wall-step-light-3w'}
      />
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmitReview={(newRev) => setReviewsList([newRev, ...reviewsList])}
      />

      {/* Offers & Bank Discounts Modal */}
      {activeOfferModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-fadeIn relative">
            <button
              onClick={() => setActiveOfferModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {activeOfferModal === 'cashback' && 'Cashback & Rewards Offers'}
                  {activeOfferModal === 'bank' && 'Bank & Credit Card Discounts'}
                  {activeOfferModal === 'partner' && 'Business & GST Invoice Offers'}
                </h3>
                <p className="text-xs text-slate-500">Applicable at checkout on this product</p>
              </div>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {activeOfferModal === 'cashback' && (
                <>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">Amazon Pay / UPI Cashback</span>
                    <p className="text-xs text-slate-600">Get ₹28.00 back as reward points or Amazon Pay balance when paying via UPI.</p>
                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className="font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Code: RELIGHTS28</span>
                      <span className="text-blue-600 font-bold">Auto-applied at payment</span>
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">Instant Flat ₹100 Cashback</span>
                    <p className="text-xs text-slate-600">Valid on orders above ₹1,000 using any prepaid netbanking or wallet payment.</p>
                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Code: PREPAID100</span>
                      <span className="text-blue-600 font-bold">Eligible at checkout</span>
                    </div>
                  </div>
                </>
              )}

              {activeOfferModal === 'bank' && (
                <>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">HDFC Bank Credit Cards</span>
                    <p className="text-xs text-slate-600">10% Instant Discount up to ₹1,000 on Non-EMI Credit Card transactions.</p>
                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className="font-mono bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold">Code: HDFC1000</span>
                      <span className="text-emerald-600 font-bold">Active Offer</span>
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">ICICI & SBI Bank Debit Cards</span>
                    <p className="text-xs text-slate-600">Flat ₹500 Instant Discount on orders above ₹2,999.</p>
                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className="font-mono bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold">Code: BANK500</span>
                      <span className="text-emerald-600 font-bold">Active Offer</span>
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">No-Cost EMI for 3 & 6 Months</span>
                    <p className="text-xs text-slate-600">Available on major credit cards including Axis, HDFC, SBI, and ICICI.</p>
                  </div>
                </>
              )}

              {activeOfferModal === 'partner' && (
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">GST Business Invoice & 18% Tax Credit</span>
                  <p className="text-xs text-slate-600">Save up to 18% on your purchase by entering your company GSTIN during checkout. Get official tax invoice for business expense claim.</p>
                  <div className="pt-1 text-[11px] text-blue-600 font-bold">Input GSTIN at Checkout Screen</div>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveOfferModal(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs cursor-pointer transition-colors"
            >
              Close & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
