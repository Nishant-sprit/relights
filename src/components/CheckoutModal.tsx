import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Lock, ArrowLeft, Download, Sparkles } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { formatINR } from '../utils/formatCurrency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedDiscount: number;
  discountCode: string;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedDiscount,
  discountCode,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'paypal' | 'klarna'>('card');
  const [formData, setFormData] = useState({
    name: 'Alexander Wright',
    email: 'alexander.wright@example.com',
    phone: '+1 (512) 839-2041',
    address: '742 Evergreen Terrace',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '888',
  });

  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discountAmount = appliedDiscount;
  const shippingFee = 0;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = 'RL-' + Math.floor(100000 + Math.random() * 900000);
    const order: OrderDetails = {
      orderId,
      items: cartItems,
      subtotal,
      discount: discountAmount,
      shippingFee,
      total,
      customerName: formData.name,
      email: formData.email,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
      paymentMethod: paymentMethod.toUpperCase(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };

    setCompletedOrder(order);
    setStep('success');
    onOrderComplete();
  };

  return (
    <div id="checkout-modal-backdrop" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[92vh] overflow-y-auto animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Relights Express Checkout</h2>
                <p className="text-xs text-slate-500">Fast 256-bit encrypted checkout</p>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Shipping Address */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  1. Shipping Address & Contact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="sm:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  2. Select Payment Method
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'card', name: 'Credit Card', icon: CreditCard },
                    { id: 'apple', name: 'Apple Pay', icon: Sparkles },
                    { id: 'paypal', name: 'PayPal', icon: ShieldCheck },
                    { id: 'klarna', name: 'Klarna 0%', icon: Lock },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        paymentMethod === m.id
                          ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <m.icon className="w-4 h-4" />
                      <span>{m.name}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-3 gap-2 text-xs pt-2">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="col-span-3 p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expDate}
                      onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                )}
              </div>

              {/* Summary Box */}
              <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount Promo</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Priority Express Shipping</span>
                  <span className="text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total Due Today</span>
                  <span className="text-white font-black">{formatINR(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-4 rounded-2xl shadow-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Complete Purchase &bull; {formatINR(total)}
              </button>
            </form>
          </div>
        ) : (
          /* SUCCESS ORDER CONFIRMATION SCREEN */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Order Confirmed
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Thank You for Your Relights Order!
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Your order reference is <strong className="text-slate-900 font-mono">{completedOrder?.orderId}</strong>. A confirmation email with tracking has been sent to {completedOrder?.email}.
              </p>
            </div>

            {/* Order Invoice Summary */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2 font-bold text-slate-800">
                <span>Shipping To:</span>
                <span>{completedOrder?.customerName}</span>
              </div>
              <p className="text-slate-600 font-medium">{completedOrder?.shippingAddress}</p>

              <div className="pt-2 border-t border-slate-200 space-y-2">
                <p className="font-bold text-slate-800">Purchased Items:</p>
                {completedOrder?.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-slate-700">
                    <span>
                      {item.quantity}x {item.productName}
                    </span>
                    <span className="font-mono font-bold">{formatINR(item.unitPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                <span>Total Paid:</span>
                <span className="text-slate-900 font-black">{completedOrder ? formatINR(completedOrder.total) : ''}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  alert('Tax invoice receipt PDF generated and sent to email.');
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download PDF Receipt
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Back to Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
