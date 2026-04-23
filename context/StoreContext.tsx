
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, SaleRecord, Customer, Currency, Language, CurrencyCode, LanguageCode, SellerInfo } from '../types';
import { PRODUCTS, MOCK_CUSTOMERS, CURRENCIES, LANGUAGES, SELLERS } from '../constants';
import { detectShowName } from '../services/routingUtils';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  query, 
  orderBy,
  addDoc,
  serverTimestamp,
  getDocs,
  writeBatch,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import Fuse from 'fuse.js';

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
  isProductsLoading: boolean;
  hasMoreProducts: boolean;
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  setCurrency: (code: CurrencyCode) => void;
  setLanguage: (code: LanguageCode) => void;
  setQuickViewProduct: (product: Product | null) => void;
  formatPrice: (amount: number) => string;
  addProduct: (product: Omit<Product, 'id' | 'datePosted'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
  addSale: (sale: Omit<SaleRecord, 'id' | 'date'>) => Promise<void>;
  addSeller: (seller: Omit<SellerInfo, 'id' | 'joinedDate' | 'totalSales' | 'balance' | 'totalEarnings' | 'withdrawnAmount' | 'rating' | 'rank' | 'isVerified' | 'verificationStatus' | 'commissionRate'>) => Promise<void>;
  updateSaleStatus: (id: string, status: SaleRecord['status']) => Promise<void>;
  loadMoreProducts: () => Promise<void>;
  searchProducts: (query: string, category?: string) => Product[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [sellers, setSellers] = useState<SellerInfo[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  // Real-time synchronization with Firestore
  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('datePosted', 'desc'), limit(1000));
    const unsubscribeProducts = onSnapshot(q, (snapshot) => {
      let productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      
      if (productList.length < 5) {
        setProducts(PRODUCTS);
        setHasMoreProducts(false);
      } else {
        setProducts(productList);
        setHasMoreProducts(snapshot.size === 1000);
        if (snapshot.docs.length > 0) {
          setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        }
      }
      setIsProductsLoading(false);
    }, (error) => {
      console.error("Products sync error:", error);
      if (products.length === 0) setProducts(PRODUCTS);
      setIsProductsLoading(false);
    });

    // Initial load state
    setIsProductsLoading(true);

    // Sync Sales (Real-time for Admin)
    const unsubscribeSales = onSnapshot(
      query(collection(db, 'sales'), orderBy('date', 'desc')), 
      (snapshot) => {
        console.log(`Sales update received: ${snapshot.size} records`);
        const salesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SaleRecord));
        setSales(salesList);
      },
      (error) => {
        console.warn("Sales access restricted or permission denied:", error.message);
      }
    );

    // Sync Sellers
    const unsubscribeSellers = onSnapshot(
      collection(db, 'sellers'), 
      (snapshot) => {
        const sellerList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SellerInfo));
        if (sellerList.length === 0) {
          const userEmail = auth.currentUser?.email;
          if (userEmail === 'sportsarslan199@gmail.com') {
            const batch = writeBatch(db);
            SELLERS.forEach(s => {
              const docRef = doc(db, 'sellers', s.id);
              batch.set(docRef, s);
            });
            batch.commit().catch(err => console.warn("Failed to bootstrap sellers:", err));
          }
        } else {
          setSellers(sellerList);
        }
      },
      (error) => console.error("Sellers sync error:", error)
    );

    // Sync Notifications
    const unsubscribeNotifications = onSnapshot(
      query(collection(db, 'notifications'), orderBy('timestamp', 'desc'), limit(50)),
      (snapshot) => {
        const notifList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AppNotification));
        setNotifications(notifList);
      },
      (error) => console.warn("Notifications sync error:", error)
    );
    
    return () => {
      unsubscribeProducts();
      unsubscribeSales();
      unsubscribeSellers();
      unsubscribeNotifications();
    };
  }, []);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const loadMoreProducts = async () => {
    if (!lastVisible || !hasMoreProducts || isProductsLoading) return;
    
    setIsProductsLoading(true);
    try {
      const q = query(
        collection(db, 'products'), 
        orderBy('datePosted', 'desc'), 
        startAfter(lastVisible), 
        limit(24)
      );
      const snapshot = await getDocs(q);
      
      const newProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      
      if (newProducts.length > 0) {
        setProducts(prev => {
          // Prevent duplicates
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNew = newProducts.filter(p => !existingIds.has(p.id));
          return [...prev, ...uniqueNew];
        });
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setHasMoreProducts(snapshot.docs.length === 24);
      } else {
        setHasMoreProducts(false);
      }
    } catch (error) {
      console.error("Load more products error:", error);
    } finally {
      setIsProductsLoading(false);
    }
  };

  // Initialize Fuse for search
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ['name', 'category', 'description', 'tags'],
      threshold: 0.35,
      distance: 100,
      includeScore: true
    });
  }, [products]);

  const searchProducts = (term: string, category: string = 'All') => {
    if (!term && category === 'All') return products;
    
    let baseProducts = products;
    if (category !== 'All') {
      baseProducts = products.filter(p => p.category === category);
    }
    
    if (!term) return baseProducts;

    // Synonyms for intelligent expansion
    const synonyms: Record<string, string[]> = {
      'shirt': ['t-shirt', 'polo', 'top', 'jersey', 'clothing'],
      't-shirt': ['shirt', 'polo', 'top', 'jersey', 'clothing'],
      'hoodi': ['hoodie', 'sweatshirt', 'pullover', 'jacket', 'fleece'], // Typo tolerance
      'hoodie': ['sweatshirt', 'pullover', 'jacket', 'fleece', 'clothing'],
      'shoes': ['sneaker', 'boot', 'footwear', 'jogger', 'trainer'],
      'sneaker': ['shoes', 'footwear', 'jogger', 'trainer'],
      'jacket': ['coat', 'windbreaker', 'hoodie', 'outerwear'],
      'pants': ['jogger', 'trouser', 'legging', 'sweatpants', 'shorts'],
      'gym': ['fitness', 'workout', 'sportswear', 'activewear'],
      'sport': ['sportswear', 'activewear', 'exercise']
    };

    let processedTerm = term.toLowerCase();
    const searchTerms = [processedTerm];
    
    // Add synonyms to search array
    Object.keys(synonyms).forEach(key => {
      if (processedTerm.includes(key) || key.includes(processedTerm)) {
        searchTerms.push(...synonyms[key]);
      }
    });
    
    const finalSearchQuery = Array.from(new Set(searchTerms)).join(' ');

    const fuseInstance = new Fuse(baseProducts, {
      keys: [
        { name: 'name', weight: 3 },
        { name: 'category', weight: 1 },
        { name: 'tags', weight: 2 },
        { name: 'description', weight: 0.5 }
      ],
      threshold: 0.45, // Balanced for typo tolerance vs precision
      distance: 100,
      minMatchCharLength: 2,
      shouldSort: true
    });
    
    const results = fuseInstance.search(finalSearchQuery);
    
    if (results.length === 0 && term.length > 2) {
       // if no match, return popular items in the same category or general trending items
       return baseProducts.length > 0 ? baseProducts.slice(0, 8) : products.slice(0, 8);
    }

    return results.map(r => r.item);
  };

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
      sessionStorage.setItem('referralCode', ref);
    } else {
      const storedRef = sessionStorage.getItem('referralCode');
      if (storedRef) setReferralCode(storedRef);
    }
    
    // Auto-detect currency/language
    const browserLang = navigator.language.split('-')[0];
    const foundLang = LANGUAGES.find(l => l.code === browserLang);
    if (foundLang) setLanguageState(foundLang);

    const locale = navigator.language;
    if (locale.includes('GB')) setCurrency('GBP');
    else if (locale.includes('PK')) setCurrency('PKR');
    else if (locale.includes('AE')) setCurrency('AED');
    else if (locale.includes('DE') || locale.includes('FR') || locale.includes('ES')) setCurrency('EUR');
    else setCurrency('USD');
  }, []);

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

  const addProduct = async (newP: Omit<Product, 'id' | 'datePosted'>) => {
    try {
      const docRef = doc(collection(db, 'products'));
      const productData = {
        ...newP,
        id: docRef.id,
        datePosted: new Date().toISOString()
      };
      await setDoc(docRef, productData);
      console.log("Product added successfully:", docRef.id);
    } catch (e) {
      console.error("Error adding product:", e);
      throw e;
    }
  };

  const updateProduct = async (id: string, updatedP: Partial<Product>) => {
    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, updatedP);
    } catch (e) {
      console.error("Error updating product:", e);
      throw e;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const batch = writeBatch(db);
      batch.delete(doc(db, 'products', id));
      await batch.commit();
    } catch (e) {
      console.error("Error deleting product:", e);
      throw e;
    }
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

  const addSale = async (newSale: Omit<SaleRecord, 'id' | 'date'>) => {
    try {
      const docRef = doc(collection(db, 'sales'));
      const saleData = {
        ...newSale,
        id: docRef.id,
        date: new Date().toISOString(),
        status: newSale.status || 'Pending Payment'
      };
      
      // Ensure specific fields are present for Admin visibility
      if (!saleData.customerCity) saleData.customerCity = 'N/A';
      if (!saleData.customerCountry) saleData.customerCountry = 'N/A';
      if (!saleData.customerZip) saleData.customerZip = 'N/A';
      
      await setDoc(docRef, saleData);
      
      // Create real-time notification
      await addNotification({
        type: 'New Order',
        title: 'New Order Received',
        message: `Order for ${saleData.amount.toFixed(2)} from ${saleData.customerName}`,
        targetId: docRef.id,
        targetRole: 'admin'
      });

      // If there's a seller, notify them too
      if (saleData.sellerId && saleData.sellerId !== 'Direct') {
        await addNotification({
          type: 'New Order',
          title: 'You have a new order!',
          message: `Order #${docRef.id.slice(-6)} needs your attention.`,
          targetId: docRef.id,
          targetRole: 'seller',
          sellerId: saleData.sellerId
        });
      }

      console.log(`Order created successfully: ${docRef.id}`);
    } catch (error) {
      console.error("Error creating sale:", error);
      throw error;
    }
  };

  const addNotification = async (newNotif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => {
    try {
      const docRef = doc(collection(db, 'notifications'));
      await setDoc(docRef, {
        ...newNotif,
        id: docRef.id,
        isRead: false,
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      console.error("Error adding notification:", e);
    }
  };

  const markNotificationAsRead = async (id: string) => {
    try {
      const docRef = doc(db, 'notifications', id);
      await updateDoc(docRef, { isRead: true });
    } catch (e) {
      console.error("Error marking notif as read:", e);
    }
  };

  const addSeller = async (newS: Omit<SellerInfo, 'id' | 'joinedDate' | 'totalSales' | 'balance' | 'totalEarnings' | 'withdrawnAmount' | 'rating' | 'rank' | 'isVerified' | 'verificationStatus' | 'commissionRate'>) => {
    const docRef = doc(collection(db, 'sellers'));
    await setDoc(docRef, {
      ...newS,
      id: docRef.id,
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
    });
  };

  const updateSaleStatus = async (id: string, status: SaleRecord['status']) => {
    const docRef = doc(db, 'sales', id);
    await updateDoc(docRef, { status });
  };

  return (
    <StoreContext.Provider value={{ 
      products, cart, sales, customers, activeShowName, referralCode, activeSeller, sellers,
      notifications, unreadNotificationsCount,
      currency, language, quickViewProduct, isProductsLoading, hasMoreProducts,
      setCurrency, setLanguage, setQuickViewProduct, formatPrice,
      addProduct, updateProduct, deleteProduct, addToCart, removeFromCart, clearCart,
      addSale, addSeller, updateSaleStatus, loadMoreProducts, searchProducts,
      addNotification, markNotificationAsRead
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
