import React from 'react';
import { ShoppingBag, ChevronRight, Star } from 'lucide-react';
import { CatalogProduct, PageView } from '../types';
import { CATALOG_PRODUCTS } from '../data/mockData';
import { formatINR } from '../utils/formatCurrency';

interface TrendingProductsProps {
  onNavigate: (view: PageView) => void;
  onSelectProduct: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct, e: React.MouseEvent) => void;
}

export const TrendingProducts: React.FC<TrendingProductsProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
}) => {
  // Select 4 key trending products for Relights motion lighting
  const trendingList = CATALOG_PRODUCTS.slice(0, 4);

  return (
    <section id="trending-products-section" className="space-y-6">
      {/* SECTION HEADER: "Trending" + "View All >" */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Trending
        </h2>

        <button
          onClick={() => {
            onNavigate('product');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 px-4 py-2 rounded-full transition-all cursor-pointer shadow-sm"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      {/* 4-COLUMN PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {trendingList.map((product, idx) => {
          // Custom badge text for trending section
          const badgeText =
            product.badge ||
            (idx === 0
              ? 'TRENDING NOW'
              : idx === 1
              ? 'BESTSELLER'
              : idx === 2
              ? 'POPULAR'
              : 'NEW GEN 3');

          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Product Image Frame with Badge Overlay */}
                <div className="relative w-full aspect-[4/3] mb-3.5 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden flex items-center justify-center">
                  {/* Top Left Badge inside image frame */}
                  {badgeText && (
                    <span className="absolute top-2.5 left-2.5 bg-red-600 text-white font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded shadow-sm z-10">
                      {badgeText}
                    </span>
                  )}

                  {/* Top Right Floating Cart Icon inside image frame */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, e);
                    }}
                    title="Add to Cart"
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-slate-200/80 flex items-center justify-center text-slate-800 hover:scale-110 hover:bg-white transition-all z-10 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-slate-900" />
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Product Title */}
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug tracking-tight mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating Badge & Reviews Count */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="bg-slate-900 text-white text-[11px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <span>{product.rating.toFixed(1)}</span>
                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    ({product.reviewsCount})
                  </span>
                </div>

                {/* Subtitle / Feature summary */}
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-2">
                  {product.tagline}
                </p>
              </div>

              {/* Bottom Price & "Buy it now" Button */}
              <div className="pt-2.5 flex items-center justify-between gap-2 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-[11px] text-slate-400 line-through font-medium">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product);
                  }}
                  className="bg-black hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Buy it now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
