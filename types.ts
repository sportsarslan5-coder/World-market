
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
  rating: string;
  stock: number;
  datePosted: string;
  fabric?: string;
  quality?: 'Standard' | 'Premium' | 'Export Quality';
  sizes?: string[];
  colors?: string[];
  reviews?: Review[];
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
  fullName: string;
  whatsapp: string;
  email: string;
  country: string;
  city: string;
  contactNumber: string;
  paymentDetails: string;
  showName: string;
}
