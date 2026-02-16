
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, SaleRecord, Customer } from '../types';
import { PRODUCTS, MOCK_CUSTOMERS } from '../constants';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  sales: SaleRecord[];
  customers: Customer[];
  addProduct: (product: Omit<Product, 'id' | 'datePosted'>) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [sales, setSales] = useState<SaleRecord[]>([]);

  // Generate initial sales data based on products
  useEffect(() => {
    const initialSales: SaleRecord[] = Array.from({ length: 50 }).map((_, i) => {
      const p = products[i % products.length];
      const c = customers[i % customers.length];
      return {
        id: `sale-${i}`,
        productId: p.id,
        productName: p.name,
        customerName: c.name,
        customerEmail: c.email,
        amount: p.price,
        date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        status: i % 5 === 0 ? 'Processing' : 'Delivered'
      };
    });
    setSales(initialSales);
  }, []);

  const addProduct = (newP: Omit<Product, 'id' | 'datePosted'>) => {
    const fullProduct: Product = {
      ...newP,
      id: `custom-${Date.now()}`,
      datePosted: new Date().toISOString()
    };
    setProducts([fullProduct, ...products]);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{ products, cart, sales, customers, addProduct, addToCart, removeFromCart, clearCart }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
