import React, { useState } from 'react';
import { PageView } from '../types';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer id="main-application-footer" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Customer Trust Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Fast Priority Shipping</p>
              <p className="text-xs text-slate-400">Same-day dispatch before 2 PM</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Secure Encrypted Payments</p>
              <p className="text-xs text-slate-400">256-Bit SSL protection</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">2-Year Warranty</p>
              <p className="text-xs text-slate-400">Full hardware replacement</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">24/7 Expert Support</p>
              <p className="text-xs text-slate-400">Dedicated tech assistance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/30">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.2L18 8v8l-6 3.8L6 16V8l6-3.8zM12 8a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              RELIGHTS
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            Relights is the leader in smart architectural motion illumination. Light every step automatically with energy-efficient, cascading precision sensors engineered for modern luxury homes.
          </p>

          {/* Newsletter Form */}
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Subscribe for Smart Home Tips & VIP Discounts
            </p>
            {subscribed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Thank you! You are subscribed to Relights VIP updates.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-xs px-3.5 py-2.5 rounded-xl flex-1 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Join
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button
                onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => { onNavigate('product'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Smart Controller Kit
              </button>
            </li>
            <li>
              <button
                onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                About Relights
              </button>
            </li>
            <li>
              <button
                onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Contact Support
              </button>
            </li>
          </ul>
        </div>

        {/* Product Highlights */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
            Product Lineup
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>16-Step Motion Controller</li>
            <li>24-Step Motion Controller</li>
            <li>32-Step Motion Controller</li>
            <li>Dual PIR Lux Sensors</li>
            <li>24V COB LED Strips</li>
            <li>Aluminum Step Channels</li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
            Direct Contact
          </h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>+1 (800) 582-7309</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>support@relights.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Relights Innovation Hub, 450 Smart Home Way, Suite 300, Austin, TX 78701</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 mt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Relights Inc. All rights reserved. Light Every Step Automatically.</p>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Warranty Claims</span>
          <span>Shipping Policy</span>
        </div>
      </div>
    </footer>
  );
};
