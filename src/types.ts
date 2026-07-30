export type PageView = 'home' | 'product' | 'about' | 'contact';

export interface ProductOption {
  id: string;
  name: string;
  stepsCount: number;
  price: number;
  originalPrice: number;
  inStock: boolean;
}

export interface LedColorOption {
  id: string;
  name: string;
  colorTemp: string;
  previewColor: string;
  hex: string;
}

export interface CatalogProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'Controllers' | 'Foot Lights' | 'LED Strips' | 'Power Supplies' | 'Profiles & Channels' | 'Sensors & Accessories';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  galleryImages: string[];
  description: string;
  features: string[];
  inStock: boolean;
  stepOptions?: ProductOption[];
  ledColors?: LedColorOption[];
  specs?: SpecItem[];
  includedItems?: IncludedItem[];
}

export interface CartItem {
  id: string;
  productName: string;
  stepOption?: ProductOption;
  ledColor?: LedColorOption;
  selectedVariantName?: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Installation' | 'Compatibility' | 'Shipping & Warranty';
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  userPhoto?: string;
  staircasePhoto?: string;
  helpfulCount: number;
  location: string;
}

export interface SpecItem {
  label: string;
  value: string;
  detail?: string;
}

export interface IncludedItem {
  name: string;
  quantity: string;
  description: string;
  iconName: string;
  image?: string;
}

export interface AccessoryProduct {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviewsCount: number;
  category: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customerName: string;
  email: string;
  shippingAddress: string;
  paymentMethod: string;
  date: string;
}
