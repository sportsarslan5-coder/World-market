
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED' | 'PKR';
export type LanguageCode = 'en' | 'ar' | 'fr' | 'es' | 'de';
export type SellerRank = 'Gold' | 'Silver' | 'Standard';

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
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  price: number;
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
}

export interface CartItem extends Product {
  quantity: number;
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
