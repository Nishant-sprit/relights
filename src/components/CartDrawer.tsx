import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ShieldCheck, ArrowRight, ShoppingBag, Sparkles, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { formatINR } from '../utils/formatCurrency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (appliedDiscount: number, discountCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMsg, setDiscountMsg] = useState<{ text: string; success: boolean } | null>(null);
  const [zipCode, setZipCode] = useState('');
  const [shippingEst, setShippingEst] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discountAmount = appliedDiscount > 0 ? (appliedDiscount < 1 ? subtotal * appliedDiscount : appliedDiscount) : 0;
  const shippingFee = subtotal > 99 || subtotal === 0 ? 0 : 9.99;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'RELIGHTS15' || clean === 'SAVE15') {
      setAppliedDiscount(15);
      setDiscountMsg({ text: '$15.00 VIP Promo Code Applied!', success: true });
    } else if (clean === 'WELCOME10') {
      setAppliedDiscount(0.10);
      setDiscountMsg({ text: '10% Welcome Discount Applied!', success: true });
    } else {
      setDiscountMsg({ text: 'Invalid code. Try "RELIGHTS15" or "WELCOME10"', success: false });
    }
  };

  const handleEstimateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length >= 5) {
      setShippingEst('Priority Express Delivery: Guaranteed in 2-3 Business Days');
    }
  };

  return (
    <div id="shopping-cart-drawer-backdrop" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-slideLeft overflow-hidden">
        {/* Cart Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Your Shopping Cart</h3>
              <p className="text-[11px] text-slate-500">{cartItems.length} item(s) selected</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-slate-800">Your cart is empty</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore the Relights Smart Staircase Motion Controller and customize your setup.
              </p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex gap-3 relative group"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-xs font-extrabold text-slate-900 truncate">
                      {item.productName}
                    </p>
                    <p className="text-[11px] font-semibold text-blue-600">
                      {item.stepOption.name}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      LED Color: {item.ledColor.name}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 py-0.5 shadow-2xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-slate-500 hover:text-slate-900 p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-900 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-slate-500 hover:text-slate-900 p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-black text-slate-900">
                        {formatINR(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Promo Coupon Applicator */}
              <div className="pt-2">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. RELIGHTS15)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-medium focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {discountMsg && (
                  <p
                    className={`text-[11px] font-semibold mt-1.5 ${
                      discountMsg.success ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {discountMsg.text}
                  </p>
                )}
              </div>

              {/* Shipping Estimator Placeholder */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-600" /> Shipping Calculator
                </p>
                <form onSubmit={handleEstimateShipping} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Postal Zip Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  <button
                    type="submit"
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                  >
                    Estimate
                  </button>
                </form>
                {shippingEst && (
                  <p className="text-[11px] text-emerald-700 font-medium">{shippingEst}</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Order Summary & Checkout Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">{formatINR(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount Promo</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Priority Shipping</span>
                <span className="font-bold text-emerald-600">
                  {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-slate-900 font-black">{formatINR(total)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (window.location.hostname.includes('myshopify.com') || window.location.pathname.includes('/checkout')) {
                  window.location.href = '/checkout';
                  return;
                }
                onProceedToCheckout(discountAmount, couponCode);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Proceed to Shopify Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>30-Day Money Back Guarantee &bull; 256-Bit SSL Encrypted</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
