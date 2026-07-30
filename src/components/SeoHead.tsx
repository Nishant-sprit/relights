import React, { useEffect } from 'react';
import { PageView } from '../types';

interface SeoHeadProps {
  currentView: PageView;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ currentView }) => {
  useEffect(() => {
    let title = 'Relights | Smart Staircase Motion Sensor Controller';
    let description = 'Light Every Step Automatically. Premium smart home staircase motion sensor controller kit with cascading LED step illumination, daylight sensor, and energy efficiency.';

    if (currentView === 'product') {
      title = 'Relights Pro Smart Staircase Motion Sensor Controller Kit | Buy Online';
      description = 'Buy Relights Smart Staircase Motion Controller. Supports 16 to 32 steps, dual PIR sensors, cascading animations, adjustable speed and brightness. Free shipping & 2-year warranty.';
    } else if (currentView === 'about') {
      title = 'About Us | Relights Architectural Smart Lighting';
      description = 'Discover Relights mission to revolutionize smart home safety and architectural staircase lighting through precision motion sensing technology.';
    } else if (currentView === 'contact') {
      title = 'Contact Us | Relights Customer Support & Sales';
      description = 'Get in touch with Relights for technical guidance, installation assistance, bulk orders, or customer support.';
    }

    document.title = title;

    // Meta description update
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Schema.org Structured Data
    const schemaData = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'Relights Smart Staircase Motion Sensor Controller',
      image: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      ],
      description: 'Intelligent cascading motion lighting controller for staircase steps with dual PIR sensors, daylight sensor, and DC 12V-24V output.',
      brand: {
        '@type': 'Brand',
        name: 'Relights',
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        lowPrice: '1299.00',
        highPrice: '5799.00',
        offerCount: '3',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.95',
        reviewCount: '184',
      },
    };

    let schemaScript = document.getElementById('json-ld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'json-ld-schema';
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schemaData);

  }, [currentView]);

  return null;
};
