
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: string;
  stock: number;
  datePosted: string;
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
