
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import SEO from './SEO';
import { useStore } from '../context/StoreContext';
import { detectShowName } from '../services/routingUtils';
import { CURRENCIES, LANGUAGES, PRODUCTS } from '../constants';
import Fuse from 'fuse.js';
import { useTranslation } from '../src/translations';
import { 
  Search, 
  ShoppingCart, 
  Globe, 
  ShieldCheck, 
  ChevronDown, 
  User, 
  Menu, 
  X,
  Star,
  Clock,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    cart, currency, language, setCurrency, setLanguage, formatPrice,
    quickViewProduct, setQuickViewProduct, addToCart, activeSeller
  } = useStore();
  const { t } = useTranslation(language.code);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentShow, setCurrentShow] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  
  const searchRef = useRef<HTMLDivElement>(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Sync current show based on the URL
  useEffect(() => {
    const detected = detectShowName();
    setCurrentShow(detected);
  }, [location]);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes?.[0] || '');
      setSelectedColor(quickViewProduct.colors?.[0] || '');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const fuse = useMemo(() => new Fuse(PRODUCTS, {
    keys: ['name', 'category', 'description', 'tags'],
    threshold: 0.4,
    distance: 100,
    includeScore: true
  }), []);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const results = fuse.search(searchQuery);
    return results.slice(0, 6).map(r => r.item);
  }, [searchQuery, fuse]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const path = currentShow ? `/${currentShow}/products` : '/products';
      navigate(`${path}?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const getLink = (to: string) => {
    const RESERVED_GLOBAL = ['/admin', '/register-show'];
    if (currentShow && !RESERVED_GLOBAL.includes(to)) {
      const cleanTo = to === '/' ? '' : to.startsWith('/') ? to : `/${to}`;
      return `/${currentShow}${cleanTo}`;
    }
    return to;
  };

  const renderSuggestions = () => {
    if (!showSuggestions || suggestions.length === 0) return null;
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[70] animate-fadeIn">
        <div className="p-2">
          {suggestions.map(p => (
            <Link 
              key={p.id}
              to={getLink(`/products/${p.id}`)}
              onClick={() => setShowSuggestions(false)}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase truncate max-w-[150px] md:max-w-none">{p.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-black text-blue-600">{formatPrice(p.price)}</span>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">{p.category}</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
        {searchQuery.length > 2 && (
          <div className="bg-gray-50 p-3 border-t border-gray-100 text-center">
            <button 
              onClick={handleSearch}
              className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline"
            >
              See all results for "{searchQuery}"
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white bg-white ${language.dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <SEO />
      {/* Top Bar */}
      <div className="bg-gray-900 py-1.5 px-4 text-[10px] flex justify-between items-center uppercase font-bold text-gray-400 tracking-widest border-b border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 md:gap-4 truncate">
          <span className="flex items-center gap-1 shrink-0">
            <span className="text-green-500 animate-pulse">●</span> 
            {activeSeller 
              ? `${activeSeller.fullName.toUpperCase()} OFFICIAL` 
              : currentShow 
                ? `${currentShow.toUpperCase()} SHOW` 
                : '24/7 SUPPORT'}
          </span>
          <div className="hidden sm:flex items-center gap-4 border-l border-white/10 pl-4">
            <div className="flex items-center gap-1 group cursor-pointer relative">
              <span className="group-hover:text-white transition-colors">{language.flag} {language.name}</span>
              <ChevronDown size={10} />
              <div className="absolute top-full left-0 mt-2 w-40 bg-gray-900 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] p-2">
                {LANGUAGES.map(l => (
                  <button 
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 ${language.code === l.code ? 'text-blue-500' : 'text-gray-400'}`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 group cursor-pointer relative">
              <span className="group-hover:text-white transition-colors">{currency.code} ({currency.symbol})</span>
              <ChevronDown size={10} />
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] p-2">
                {CURRENCIES.map(c => (
                  <button 
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between ${currency.code === c.code ? 'text-blue-500' : 'text-gray-400'}`}
                  >
                    <span>{c.code} - {c.name}</span>
                    <span>{c.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Link 
            to="/admin" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-1 rounded-lg transition-all flex items-center gap-1.5 shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <ShieldCheck size={10} className="md:w-3 md:h-3" />
            <span className="whitespace-nowrap">Seller Login / Dashboard</span>
          </Link>
          <span className="text-gray-700 hidden xs:inline">|</span>
          <span className="hidden xs:inline">Worldwide</span>
        </div>
      </div>

      {/* Main Header */}
      <nav className="bg-black text-white sticky top-0 z-50 shadow-2xl overflow-visible">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop/Tablet Row */}
          <div className="flex items-center h-16 md:h-20 gap-4 md:gap-8 justify-between">
            {/* Logo */}
            <Link to={getLink('/')} className="flex-shrink-0 active:scale-95 transition-transform">
              <BrandLogo className="h-8 md:h-10 w-auto" />
            </Link>

            {/* Advanced Search - Desktop */}
            <div className="hidden md:block flex-grow relative max-w-3xl" ref={searchRef}>
              <form onSubmit={handleSearch} className="flex relative">
                <input 
                  type="text" 
                  placeholder={t('search_placeholder')}
                  className="w-full bg-white/10 border border-white/10 rounded-full py-2.5 pl-6 pr-12 focus:bg-white focus:text-black focus:ring-4 focus:ring-blue-500/30 transition-all outline-none text-sm font-semibold placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors active:scale-125">
                  <Search size={18} />
                </button>
              </form>
              {/* Suggestions dropdown same as before */}
              {renderSuggestions()}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-6">
              <div className="hidden lg:flex flex-col cursor-pointer group">
                <span className="text-[10px] font-bold text-gray-500 uppercase leading-none mb-1">{t('account')}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black tracking-tight group-hover:text-blue-500 transition-colors">Sign In</span>
                  <ChevronDown size={12} className="text-gray-500" />
                </div>
              </div>
              <Link to={getLink('/products')} className="flex flex-col group">
                <span className="text-[10px] font-bold text-gray-500 uppercase">{t('returns')}</span>
                <span className="text-xs font-black tracking-tight group-hover:text-blue-500 transition-colors">& {t('orders')}</span>
              </Link>
            </div>

            {/* Cart - Always Visible */}
            <Link to={getLink('/cart')} className="relative flex items-center gap-2 group p-2 hover:bg-white/5 rounded-xl transition-all">
              <div className="relative">
                <ShoppingCart size={24} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-black animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:block text-xs font-black uppercase tracking-widest mt-1">{t('cart')}</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 hover:bg-white/5 rounded-xl flex items-center gap-1 active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">{t('menu')}</span>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Search Row - visible only on small screens */}
          <div className="md:hidden pb-4" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex relative">
              <input 
                type="text" 
                placeholder={t('search_placeholder')}
                className="w-full bg-white/10 border border-white/10 rounded-full py-2.5 pl-5 pr-12 focus:bg-white focus:text-black focus:ring-4 focus:ring-blue-500/30 transition-all outline-none text-sm font-semibold placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 active:scale-125">
                <Search size={18} />
              </button>
              {renderSuggestions()}
            </form>
          </div>
        </div>

        {/* Sub-nav */}
        <div className="bg-gray-800/50 backdrop-blur-md border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 flex py-2 gap-6 text-[11px] font-black uppercase tracking-widest overflow-x-auto whitespace-nowrap scrollbar-hide">
            <button className="flex items-center gap-1 hover:text-blue-500 group">
              <Menu size={14} />
              <span>All</span>
            </button>
            <Link to={getLink('/products')} className="hover:text-blue-500">Today's Deals</Link>
            <Link to="/sport-store" className="text-yellow-500 hover:underline">Sport Store 🔥</Link>
            <Link to={getLink('/ai-designer')} className="text-blue-500 hover:underline">AI Design Studio</Link>
            <Link to={getLink('/products?cat=Clothing')} className="hover:text-blue-500">Clothing</Link>
            <Link to={getLink('/products?cat=Shoes')} className="hover:text-blue-500">Shoes</Link>
            <Link to={getLink('/products?cat=Sportswear')} className="hover:text-blue-500">Sportswear</Link>
            <Link to={getLink('/products?cat=Bags')} className="hover:text-blue-500">Bags</Link>
            <Link to={getLink('/products?cat=Outdoor')} className="hover:text-blue-500">Outdoor</Link>
            <Link to="/register-show" className="text-blue-400 hover:underline font-black">Become A Seller</Link>
            <Link to="/admin" className="ml-auto text-gray-400 hover:text-white">Seller Dashboard</Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl lg:hidden animate-fadeIn">
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-12">
              <BrandLogo />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>
            
            <div className="space-y-8 overflow-y-auto flex-grow">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Language</span>
                  <select 
                    className="bg-transparent text-white font-black w-full outline-none"
                    value={language.code}
                    onChange={(e) => setLanguage(e.target.value as any)}
                  >
                    {LANGUAGES.map(l => <option key={l.code} value={l.code} className="bg-black">{l.flag} {l.name}</option>)}
                  </select>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Currency</span>
                  <select 
                    className="bg-transparent text-white font-black w-full outline-none"
                    value={currency.code}
                    onChange={(e) => setCurrency(e.target.value as any)}
                  >
                    {CURRENCIES.map(c => <option key={c.code} value={c.code} className="bg-black">{c.code} ({c.symbol})</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <Link to={getLink('/')} className="text-3xl font-black uppercase italic tracking-tighter text-white hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to={getLink('/products')} className="text-3xl font-black uppercase italic tracking-tighter text-white hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>Shop All</Link>
                <Link to={getLink('/ai-designer')} className="text-3xl font-black uppercase italic tracking-tighter text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>AI Designer</Link>
                <Link to={getLink('/cart')} className="text-3xl font-black uppercase italic tracking-tighter text-white hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>Cart ({cartCount})</Link>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-white/10 space-y-4">
              <Link to="/admin" className="block w-full bg-blue-600 text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-500/20" onClick={() => setIsMobileMenuOpen(false)}>
                Seller Login / Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {children}
      </main>

      {/* Floating Seller Badge */}
      {activeSeller && (
        <div className="fixed bottom-8 left-8 z-[100] animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-xl border border-blue-100 p-4 rounded-[2rem] shadow-2xl flex items-center gap-4 group hover:scale-105 transition-all duration-500">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">
              🏪
            </div>
            <div className="flex flex-col pr-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-0.5">Official Seller</span>
              <h4 className="text-sm font-black uppercase tracking-tighter text-gray-900 leading-none">{activeSeller.fullName}</h4>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{activeSeller.showName}</span>
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setQuickViewProduct(null)}
          />
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl flex flex-col md:flex-row animate-scaleIn">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
              <img 
                src={quickViewProduct.image} 
                alt={quickViewProduct.name} 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>

            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-black text-gray-900">{quickViewProduct.rating}</span>
                </div>
              </div>

              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4 leading-none">
                {quickViewProduct.name}
              </h2>

              <div className="text-3xl font-black text-blue-600 mb-6 tracking-tighter">
                {formatPrice(quickViewProduct.price)}
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {quickViewProduct.description}
              </p>

              <div className="space-y-6 mb-8">
                {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Select Size</h4>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 ${
                            selectedSize === size 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                              : 'bg-white border-gray-100 text-gray-900 hover:border-blue-600'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Select Color</h4>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 ${
                            selectedColor === color 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                              : 'bg-white border-gray-100 text-gray-900 hover:border-blue-600'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6 mt-auto">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-black">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(quickViewProduct, quantity, selectedSize, selectedColor);
                      setQuickViewProduct(null);
                      setQuantity(1);
                    }}
                    className="flex-grow bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                  >
                    Add to Cart
                  </button>
                </div>
                
                <Link 
                  to={getLink(`/products/${quickViewProduct.id}`)}
                  onClick={() => setQuickViewProduct(null)}
                  className="block text-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors"
                >
                  View Full Product Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            {/* Brand & Newsletter */}
            <div className="space-y-8">
              <Link to="/" className="block">
                <BrandLogo />
              </Link>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                The global marketplace for factory-direct products. Buy anything, sell everywhere.
              </p>
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-white">Newsletter</h4>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-500">Quick Links</h4>
              <ul className="space-y-4">
                <li><Link to="/about-us" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">About Us</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Shop All</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Our Blog</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Seller Links */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-500">Seller Central</h4>
              <ul className="space-y-4">
                <li><Link to="/become-seller" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Become a Seller</Link></li>
                <li><Link to="/seller-dashboard" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Seller Dashboard</Link></li>
                <li><Link to="/seller-ranking" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Ranking System</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Seller Terms</Link></li>
              </ul>
            </div>

            {/* Customer Support */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-500">Support</h4>
              <ul className="space-y-4">
                <li><Link to="/contact-us" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Contact Us</Link></li>
                <li><Link to="/track-order" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Track Order</Link></li>
                <li><Link to="/shipping-policy" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Shipping Policy</Link></li>
                <li><Link to="/refund-policy" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Refund & Returns</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex items-center gap-2 text-gray-500">
                <ShieldCheck size={16} className="text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Pay_Logo.svg" alt="Google Pay" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="h-5" />
              </div>
            </div>

            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
              © 2025 W-LORD MARKET. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
