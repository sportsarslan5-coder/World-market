
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface DesignRequest {
  sport: string;
  colorScheme: string;
  quantity: string;
  specialInstructions: string;
}

export enum AppRoute {
  Home = '/',
  Products = '/products',
  AIDesigner = '/ai-designer',
  Contact = '/contact',
  Cart = '/cart',
  Admin = '/admin'
}
