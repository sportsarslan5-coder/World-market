
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, SaleRecord, Customer, Currency, Language, CurrencyCode, LanguageCode, SellerInfo } from '../types';
import { PRODUCTS, MOCK_CUSTOMERS, CURRENCIES, LANGUAGES, SELLERS } from '../constants';
import { detectShowName } from '../services/routingUtils';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  sales: SaleRecord[];
  customers: Customer[];
  activeShowName: string | null;
  referralCode: string | null;
  activeSeller: SellerInfo | null;
  sellers: SellerInfo[];
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
  addSale: (sale: Omit<SaleRecord, 'id' | 'date'>) => void;
  addSeller: (seller: Omit<SellerInfo, 'id' | 'joinedDate' | 'totalSales' | 'balance' | 'totalEarnings' | 'withdrawnAmount' | 'rating' | 'rank' | 'isVerified' | 'verificationStatus' | 'commissionRate'>) => void;
  updateSaleStatus: (id: string, status: SaleRecord['status']) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wm_products');
    if (saved) return JSON.parse(saved);
    return PRODUCTS.filter(p => p.image && p.image.trim() !== '' && p.name && p.category);
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [sales, setSales] = useState<SaleRecord[]>(() => {
    const saved = localStorage.getItem('wm_sales');
    if (saved) return JSON.parse(saved);
    return [];
  });
  const [sellers, setSellers] = useState<SellerInfo[]>(() => {
    const saved = localStorage.getItem('wm_sellers');
    if (saved) return JSON.parse(saved);
    return SELLERS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('wm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('wm_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('wm_sellers', JSON.stringify(sellers));
  }, [sellers]);

  const [activeShowName, setActiveShowName] = useState<string | null>(detectShowName());
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [activeSeller, setActiveSeller] = useState<SellerInfo | null>(null);
  
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]);
  const [language, setLanguageState] = useState<Language>(LANGUAGES[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    const detected = detectShowName();
    if (detected) setActiveShowName(detected);
    
    // Capture referral code or seller from URL
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    const sellerParam = urlParams.get('seller');
    
    if (sellerParam) {
      setReferralCode(sellerParam);
      sessionStorage.setItem('referralCode', sellerParam);
    } else if (ref) {
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

  // Update activeSeller whenever activeShowName or referralCode changes
  useEffect(() => {
    const sellerId = referralCode || activeShowName;
    if (sellerId) {
      const found = sellers.find(s => s.showName.toLowerCase() === sellerId.toLowerCase());
      if (found) {
        setActiveSeller(found);
      } else {
        setActiveSeller(null);
      }
    } else {
      setActiveSeller(null);
    }
  }, [activeShowName, referralCode, sellers]);

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

  // Generate initial sales data if empty
  useEffect(() => {
    if (sales.length === 0) {
      const initialSales: SaleRecord[] = Array.from({ length: 50 }).map((_, i) => {
        const p = products[i % products.length];
        const c = customers[i % customers.length];
        return {
          id: `sale-${i}`,
          items: [{
            productId: p.id,
            name: p.name,
            price: p.price,
            quantity: 1,
            size: p.sizes?.[0],
            color: p.colors?.[0]
          }],
          customerName: c.name,
          customerPhone: "+1234567890",
          customerEmail: c.email,
          customerAddress: "Mock Address 123",
          amount: p.price,
          date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
          status: i % 5 === 0 ? 'Processing' : 'Delivered',
          sellerId: sellers[i % sellers.length].id,
          sellerShopName: sellers[i % sellers.length].shopName || sellers[i % sellers.length].showName
        };
      });
      setSales(initialSales);
    }
  }, [products, customers, sellers, sales.length]);

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

  const addSale = (newSale: Omit<SaleRecord, 'id' | 'date'>) => {
    const sale: SaleRecord = {
      ...newSale,
      id: `sale-${Date.now()}`,
      date: new Date().toISOString()
    };
    setSales(prev => [sale, ...prev]);
  };

  const addSeller = (newS: Omit<SellerInfo, 'id' | 'joinedDate' | 'totalSales' | 'balance' | 'totalEarnings' | 'withdrawnAmount' | 'rating' | 'rank' | 'isVerified' | 'verificationStatus' | 'commissionRate'>) => {
    const seller: SellerInfo = {
      ...newS,
      id: `seller-${Date.now()}`,
      joinedDate: new Date().toISOString(),
      totalSales: 0,
      balance: 0,
      totalEarnings: 0,
      withdrawnAmount: 0,
      rating: 5.0,
      rank: 'Standard',
      isVerified: false,
      verificationStatus: 'Pending',
      commissionRate: 10,
      responseTime: "24h"
    };
    setSellers(prev => [seller, ...prev]);
  };

  const updateSaleStatus = (id: string, status: SaleRecord['status']) => {
    setSales(prev => prev.map(sale => 
      sale.id === id ? { ...sale, status } : sale
    ));
  };

  return (
    <StoreContext.Provider value={{ 
      products, cart, sales, customers, activeShowName, referralCode, activeSeller, sellers,
      currency, language, quickViewProduct,
      setCurrency, setLanguage, setQuickViewProduct, formatPrice,
      addProduct, addToCart, removeFromCart, clearCart,
      addSale, addSeller, updateSaleStatus
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
