import React from 'react';
import { PageView } from '../types';
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  Award,
  Zap,
  Users,
  Building,
  Heart,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div id="about-us-page" className="space-y-20 pb-16 animate-fadeIn">
      {/* HERO / STORY HEADER */}
      <section className="bg-slate-900 text-white pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            About Relights
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Illuminating the Future of Architectural Automation
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            At Relights, we combine precision motion microprocessors with sleek architectural linear lighting to create effortless smart home staircases.
          </p>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Our Journey
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Crafted Out of a Need for Safe & Elegant Lighting
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Founded in Austin, Texas by a team of electrical engineers and architectural lighting designers, Relights was born out of a simple realization: standard hallway switches and dark staircases were both outdated and unsafe.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We set out to engineer a reliable, self-contained hardware controller that requires no complex app setups or unstable Wi-Fi connections—delivering smooth, instantaneous cascading illumination every single time someone takes a step.
            </p>
          </div>

          <div className="lg:col-span-6">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Relights Architectural Lighting Engineering"
              className="w-full h-80 sm:h-96 object-cover rounded-3xl border border-slate-200 shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-blue-50/60 border border-blue-100 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              To make every home safer and more beautiful by engineering intelligent, energy-efficient motion lighting systems that seamlessly integrate into luxury modern architecture.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-3 border border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/30">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To become the global standard for smart architectural staircase lighting, trusted by homeowners, interior designers, and luxury builders worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* OUR CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Guiding Principles
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Product Quality',
              desc: 'We never compromise on microchip components, heat sink aluminum casing, or safety certifications.',
              icon: ShieldCheck,
            },
            {
              title: 'Customer Satisfaction',
              desc: 'Over 12,000+ homes illuminated with 24/7 dedicated technical support and a 2-year full warranty.',
              icon: Heart,
            },
            {
              title: 'Continuous Innovation',
              desc: 'Refining cascading algorithms, dimming smoothness, and daylight lux sensitivity.',
              icon: Cpu,
            },
            {
              title: 'Dedicated Support',
              desc: 'Direct access to experienced electrical engineers for wiring guidance and installation tips.',
              icon: Users,
            },
          ].map((val, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <val.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{val.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE RELIGHTS SUMMARY CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl font-black text-white">
            Experience the Relights Difference
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Ready to bring safety, automation, and luxury to your staircase?
          </p>
          <button
            onClick={() => {
              onNavigate('product');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-8 py-4 rounded-2xl cursor-pointer"
          >
            Buy Relights Controller Kit &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
