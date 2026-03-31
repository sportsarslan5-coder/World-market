
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, SaleRecord, Customer, Currency, Language, CurrencyCode, LanguageCode } from '../types';
import { PRODUCTS, MOCK_CUSTOMERS, CURRENCIES, LANGUAGES } from '../constants';
import { detectShowName } from '../services/routingUtils';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  sales: SaleRecord[];
  customers: Customer[];
  activeShowName: string | null;
  referralCode: string | null;
  currency: Currency;
  language: Language;
  quickViewProduct: Product | null;
  setCurrency: (code: CurrencyCode) => void;
  setLanguage: (code: LanguageCode) => void;
  setQuickViewProduct: (product: Product | null) => void;
  formatPrice: (amount: number) => string;
  addProduct: (product: Omit<Product, 'id' | 'datePosted'>) => void;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [activeShowName, setActiveShowName] = useState<string | null>(detectShowName());
  const [referralCode, setReferralCode] = useState<string | null>(null);
  
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]);
  const [language, setLanguageState] = useState<Language>(LANGUAGES[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    const detected = detectShowName();
    if (detected) setActiveShowName(detected);
    
    // Capture referral code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
      setReferralCode(ref);
      // Persist referral code in session storage
      sessionStorage.setItem('referralCode', ref);
    } else {
      const storedRef = sessionStorage.getItem('referralCode');
      if (storedRef) setReferralCode(storedRef);
    }
    
    // Simple auto-detection simulation for currency/language
    const browserLang = navigator.language.split('-')[0];
    const foundLang = LANGUAGES.find(l => l.code === browserLang);
    if (foundLang) setLanguageState(foundLang);

    // Auto-detect currency based on locale
    const locale = navigator.language;
    if (locale.includes('GB')) setCurrency('GBP');
    else if (locale.includes('PK')) setCurrency('PKR');
    else if (locale.includes('AE')) setCurrency('AED');
    else if (locale.includes('DE') || locale.includes('FR') || locale.includes('ES')) setCurrency('EUR');
    else setCurrency('USD');
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    const found = CURRENCIES.find(c => c.code === code);
    if (found) setCurrencyState(found);
  };

  const setLanguage = (code: LanguageCode) => {
    const found = LANGUAGES.find(l => l.code === code);
    if (found) {
      setLanguageState(found);
      document.documentElement.dir = found.dir;
      document.documentElement.lang = found.code;
    }
  };

  const formatPrice = (amount: number) => {
    const converted = amount * currency.rate;
    return `${currency.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

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

  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string, selectedColor?: string) => {
    const size = selectedSize || product.sizes?.[0];
    const color = selectedColor || product.colors?.[0];

    setCart(prev => {
      const exists = prev.find(item => 
        item.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );
      if (exists) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size && item.selectedColor === color) 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
        );
      }
      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (id: string, selectedSize?: string, selectedColor?: string) => {
    setCart(prev => prev.filter(item => 
      !(item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{ 
      products, cart, sales, customers, activeShowName, referralCode,
      currency, language, quickViewProduct,
      setCurrency, setLanguage, setQuickViewProduct, formatPrice,
      addProduct, addToCart, removeFromCart, clearCart 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
