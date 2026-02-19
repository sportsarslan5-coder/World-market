
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { detectShowName } from '../services/routingUtils';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentShow, setCurrentShow] = useState<string | null>(null);

  // Sync current show based on the URL
  useEffect(() => {
    const detected = detectShowName();
    setCurrentShow(detected);
  }, [location]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const path = currentShow ? `/s/${currentShow}/products` : '/products';
      navigate(`${path}?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getLink = (to: string) => {
    if (currentShow && to !== '/admin') {
      const cleanTo = to === '/' ? '' : to.startsWith('/') ? to : `/${to}`;
      return `/s/${currentShow}${cleanTo}`;
    }
    return to;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white bg-white">
      <div className="bg-gray-900 py-1.5 px-4 text-[10px] flex justify-between uppercase font-bold text-gray-400 tracking-widest border-b border-white/5">
        <span className="flex items-center gap-1">
          <span className="text-green-500">●</span> 
          {currentShow ? `${currentShow.toUpperCase()} OFFICIAL SHOW` : '24/7 Seller Support'}
        </span>
        <div className="flex gap-4">
          <Link to="/admin" className="hover:text-white transition-colors">Seller Center</Link>
          <span className="text-gray-600">|</span>
          <span>Ship to: Worldwide</span>
        </div>
      </div>

      <nav className="bg-black text-white sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-20 gap-4 md:gap-8">
            <Link to={getLink('/')} className="flex items-center gap-2 flex-shrink-0 group">
              <span className="text-3xl font-black font-oswald tracking-tighter text-blue-500 italic group-hover:text-white transition-colors">APEX</span>
              <span className="text-xl font-bold font-oswald hidden sm:block tracking-widest border-l border-white/20 pl-2 text-gray-400">
                {currentShow ? currentShow.toUpperCase() : 'MARKET'}
              </span>
            </Link>

            <form onSubmit={handleSearch} className="flex flex-grow relative max-w-3xl">
              <input 
                type="text" 
                placeholder={`Search ${currentShow ? currentShow : 'Apex'} catalog...`}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-6 pr-12 focus:bg-white focus:text-black focus:ring-4 focus:ring-blue-500/30 transition-all outline-none text-sm font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 text-lg">
                🔍
              </button>
            </form>

            <div className="hidden lg:flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Hello, Sign in</span>
                <span className="text-xs font-black tracking-tight">Account & Lists</span>
              </div>
              <Link to={getLink('/products')} className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Returns</span>
                <span className="text-xs font-black tracking-tight">& Orders</span>
              </Link>
            </div>

            <Link to={getLink('/cart')} className="relative flex items-center gap-2 group p-2 hover:bg-white/5 rounded-xl transition-all">
              <div className="relative">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-black animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:block text-xs font-black uppercase tracking-widest mt-1">Cart</span>
            </Link>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-md border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 flex py-2 gap-6 text-[11px] font-black uppercase tracking-widest overflow-x-auto whitespace-nowrap scrollbar-hide">
            <button className="flex items-center gap-1 hover:text-blue-500">☰ All</button>
            <Link to={getLink('/products')} className="hover:text-blue-500">Today's Deals</Link>
            <Link to={getLink('/ai-designer')} className="text-blue-500 hover:underline">AI Design Studio</Link>
            <Link to={getLink('/products?cat=Soccer')} className="hover:text-blue-500">Soccer</Link>
            <Link to={getLink('/products?cat=Basketball')} className="hover:text-blue-500">Basketball</Link>
            <Link to="/admin" className="ml-auto text-gray-400 hover:text-white">Seller Dashboard</Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-950 text-white">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full bg-gray-900 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors border-b border-white/5"
        >
          Back to Top
        </button>
        
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-black uppercase text-sm mb-6 text-blue-500 tracking-widest">Commission System</h4>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full max-w-[250px]">
              <div className="flex justify-between mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Seller Share</span>
                <span className="text-sm font-black text-green-500">5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Admin Share</span>
                <span className="text-sm font-black text-blue-500">95%</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase text-sm mb-6 text-blue-500 tracking-widest">Seller Links</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-bold">
              <li><Link to="/register-show" className="hover:underline">Create Your Show</Link></li>
              <li><Link to="/admin" className="hover:underline">Admin Center</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-sm mb-6 text-blue-500 tracking-widest">Payments</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-bold">
              <li><span className="text-xs">Global: Bank Transfer / IBAN</span></li>
              <li><span className="text-xs">Pakistan: JazzCash</span></li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-black uppercase text-sm mb-6 text-blue-500 tracking-widest">Social</h4>
            <div className="flex gap-4 text-xl">
              <span>📱</span> <span>📘</span> <span>📸</span>
            </div>
          </div>
        </div>

        <div className="bg-black py-12 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4">
            © 2025 {currentShow ? currentShow.toUpperCase() : 'Apex'} & Apex Sportswear Mfg. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
