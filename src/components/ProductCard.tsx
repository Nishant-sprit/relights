import React from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { CatalogProduct } from '../types';
import { formatINR } from '../utils/formatCurrency';

interface ProductCardProps {
  product: CatalogProduct;
  onSelectProduct: (product: CatalogProduct) => void;
  onAddToCart: (product: CatalogProduct, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
}) => {
  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Product Image Area with Floating Bag Icon */}
      <div>
        <div className="relative w-full h-64 sm:h-72 mb-4 bg-white rounded-xl flex items-center justify-center p-2 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />

          {/* Floating Shopping Bag Icon Top Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, e);
            }}
            title="Add to Cart"
            className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-800 hover:scale-110 hover:bg-slate-50 transition-all cursor-pointer z-10"
          >
            <ShoppingBag className="w-4 h-4 text-slate-900" />
          </button>
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug tracking-tight mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Star Rating Badge */}
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-black text-white text-xs font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
            <span>{product.rating.toFixed(1)}</span>
            <Star className="w-3 h-3 fill-white text-white" />
          </div>
          <span className="text-xs text-slate-400 font-medium">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Product Subtitle / Tagline */}
        <p className="text-xs text-slate-500 line-clamp-2 font-normal leading-relaxed mb-6">
          {product.tagline}
        </p>
      </div>

      {/* Bottom Pricing & Buy Button Row */}
      <div className="pt-2 flex items-end justify-between gap-2 border-t border-slate-100">
        <div className="flex flex-col">
          <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            {formatINR(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs sm:text-sm text-slate-400 line-through font-semibold mt-0.5">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          className="bg-black hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
        >
          Buy it now
        </button>
      </div>
    </div>
  );
};
