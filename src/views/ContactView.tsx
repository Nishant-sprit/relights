import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      }, 3000);
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/18005827309?text=Hello%20Relights%20Team,%20I%20have%20a%20question%20about%20the%20Smart%20Staircase%20Motion%20Controller.', '_blank');
  };

  return (
    <div id="contact-us-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          We are here to help
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Get in Touch with Relights Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have a question about step counts, LED compatibility, wiring diagrams, or shipping? Send us a message or chat directly via WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Send Us a Direct Message</h3>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2 text-emerald-900">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold">Message Sent Successfully!</h4>
              <p className="text-xs text-emerald-700">
                Thank you for contacting Relights. One of our technical engineers will reply to your email within 2 to 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (512) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="General Inquiry">General Product Question</option>
                    <option value="Installation Guidance">Installation & Wiring Help</option>
                    <option value="Order Tracking">Order & Shipping Status</option>
                    <option value="Commercial / Bulk">Architectural / Bulk Trade Discount</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your staircase project or ask a technical question..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-md shadow-blue-500/20 text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar & Map (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct WhatsApp Button */}
          <div className="p-6 bg-emerald-600 text-white rounded-3xl space-y-3 shadow-lg shadow-emerald-600/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold">Instant WhatsApp Tech Chat</h4>
                <p className="text-xs text-emerald-100">Get quick answers from our engineers</p>
              </div>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=919876543210&text=Hello%20Relights%20Team,%20I%20have%20a%20question%20about%20the%20Smart%20Staircase%20Motion%20Controller."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold py-3 rounded-2xl text-xs transition-colors cursor-pointer shadow-sm text-center block"
            >
              Chat on WhatsApp Now &rarr;
            </a>
          </div>

          {/* Contact Info Card */}
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4 text-xs">
            <h4 className="font-extrabold text-slate-900 text-sm">Direct Contact Information</h4>

            <div className="space-y-3 text-slate-600">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Customer Toll-Free</p>
                  <p>+1 (800) 582-7309</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Support Email</p>
                  <p>support@relights.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Business Hours</p>
                  <p>Monday – Friday: 8:00 AM – 7:00 PM EST</p>
                  <p>Saturday: 9:00 AM – 3:00 PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Headquarters</p>
                  <p>Relights Innovation Hub, 450 Smart Home Way, Suite 300, Austin, TX 78701</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map Placeholder Visual */}
          <div className="relative h-48 bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex items-center justify-center text-center p-4">
            <div className="space-y-2 z-10">
              <MapPin className="w-8 h-8 text-blue-500 mx-auto animate-bounce" />
              <p className="text-xs font-bold text-white">Austin Innovation Hub, Texas</p>
              <p className="text-[10px] text-slate-400">Google Maps Location Placeholder</p>
            </div>
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
