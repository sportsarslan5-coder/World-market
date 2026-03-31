
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED' | 'PKR';
export type LanguageCode = 'en' | 'ar' | 'fr' | 'es' | 'de';
export type SellerRank = 'Gold' | 'Silver' | 'Starter';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Rate relative to USD
  name: string;
}

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  country?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  stock: number;
  datePosted: string;
  fabric?: string;
  quality?: 'Standard' | 'Premium' | 'Export Quality';
  sizes?: string[];
  colors?: string[];
  reviews?: Review[];
  shippingCountry?: string;
  sellerId?: string;
  sales?: number;
  viewers?: number;
  saleEndsAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  imageAlt?: string;
  badges?: string[];
  ratingCount?: number;
  ratingBreakdown?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface SaleRecord {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped';
  sellerId?: string;
  commissionEarned?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  location: string;
  totalSpent: number;
  orderCount: number;
  lastOrderDate: string;
}

export interface SellerInfo {
  id: string;
  fullName: string;
  whatsapp: string;
  email: string;
  country: string;
  city: string;
  contactNumber: string;
  paymentDetails: string;
  showName: string;
  rank: SellerRank;
  rating: number;
  totalSales: number;
  responseTime: string;
  isVerified: boolean;
  joinedDate: string;
  balance: number;
  commissionRate: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
}
