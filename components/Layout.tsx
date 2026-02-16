
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white bg-white">
      {/* App-like Top Bar */}
      <div className="bg-gray-900 py-1.5 px-4 text-[10px] flex justify-between uppercase font-bold text-gray-400 tracking-widest border-b border-white/5">
        <span className="flex items-center gap-1"><span className="text-green-500">●</span> 24/7 Seller Support</span>
        <div className="flex gap-4">
          <Link to="/admin" className="hover:text-white transition-colors">Seller Center</Link>
          <span className="text-gray-600">|</span>
          <span>Ship to: Worldwide</span>
        </div>
      </div>

      {/* Primary Amazon-Style Nav */}
      <nav className="bg-black text-white sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-20 gap-4 md:gap-8">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <span className="text-3xl font-black font-oswald tracking-tighter text-blue-500 italic group-hover:text-white transition-colors">APEX</span>
              <span className="text-xl font-bold font-oswald hidden sm:block tracking-widest border-l border-white/20 pl-2 text-gray-400">MARKET</span>
            </Link>

            {/* Global Search */}
            <form onSubmit={handleSearch} className="flex flex-grow relative max-w-3xl">
              <input 
                type="text" 
                placeholder="Search across thousands of designs..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-6 pr-12 focus:bg-white focus:text-black focus:ring-4 focus:ring-blue-500/30 transition-all outline-none text-sm font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 text-lg">
                🔍
              </button>
            </form>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Hello, Sign in</span>
                <span className="text-xs font-black tracking-tight">Account & Lists</span>
              </div>
              <Link to="/products" className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Returns</span>
                <span className="text-xs font-black tracking-tight">& Orders</span>
              </Link>
            </div>

            {/* Cart Button */}
            <Link to="/cart" className="relative flex items-center gap-2 group p-2 hover:bg-white/5 rounded-xl transition-all">
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

        {/* Secondary Navigation Strip (Amazon Style) */}
        <div className="bg-gray-800/50 backdrop-blur-md border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 flex py-2 gap-6 text-[11px] font-black uppercase tracking-widest overflow-x-auto whitespace-nowrap scrollbar-hide">
            <button className="flex items-center gap-1 hover:text-blue-500">☰ All</button>
            <Link to="/products" className="hover:text-blue-500">Today's Deals</Link>
            <Link to="/ai-designer" className="text-blue-500 hover:underline">AI Design Studio</Link>
            <Link to="/products?cat=Soccer" className="hover:text-blue-500">Soccer</Link>
            <Link to="/products?cat=Basketball" className="hover:text-blue-500">Basketball</Link>
            <Link to="/admin" className="ml-auto text-gray-400 hover:text-white">Seller Dashboard</Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Amazon-style Footer */}
      <footer className="bg-gray-950 text-white">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full bg-gray-900 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors border-b border-white/5"
        >
          Back to Top
        </button>
        
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h4 className="font-black uppercase text-sm mb-6 text-blue-500 tracking-widest">Get to Know Us</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-bold">
              <li><Link to="/" className="hover:underline">About Apex</Link></li>
              <li><Link to="/" className="hover:underline">Careers</Link></li>
              <li><Link to="/" className="hover:underline">Press Center</Link></li>
              <li><Link to="/" className="hover:underline">Investor Relations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-sm mb-6 text-blue-500 tracking-widest">Make Money with Us</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-bold">
              <li><Link to="/admin" className="hover:underline">Sell on Apex Market</Link></li>
              <li><Link to="/admin" className="hover:underline">Sell on Apex Apps</Link></li>
              <li><Link to="/" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link to="/admin" className="hover:underline">Self-Publish with Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-sm mb-6 text-blue-500 tracking-widest">Apex Payment Products</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-bold">
              <li><Link to="/" className="hover:underline">Apex Rewards Visa</Link></li>
              <li><Link to="/" className="hover:underline">ApexMarket.com Store Card</Link></li>
              <li><Link to="/" className="hover:underline">Apex Business Card</Link></li>
              <li><Link to="/" className="hover:underline">Shop with Points</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-sm mb-6 text-blue-500 tracking-widest">Let Us Help You</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-bold">
              <li><Link to="/contact" className="hover:underline">Your Account</Link></li>
              <li><Link to="/contact" className="hover:underline">Your Orders</Link></li>
              <li><Link to="/contact" className="hover:underline">Shipping Rates & Policies</Link></li>
              <li><Link to="/contact" className="hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>

        <div className="bg-black py-12 border-t border-white/5 text-center">
          <div className="flex justify-center items-center gap-10 mb-8 grayscale opacity-40">
            <span className="text-3xl font-black italic">APEX</span>
            <span className="text-xl">💳 VISA</span>
            <span className="text-xl">🏦 BANK</span>
            <span className="text-xl">📦 LOGISTICS</span>
          </div>
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4">
            Conditions of Use & Sale &nbsp; | &nbsp; Privacy Notice &nbsp; | &nbsp; Interest-Based Ads &nbsp; | &nbsp; © 2025 Apex Sportswear Manufacturing Co.
          </p>
        </div>
      </footer>

      {/* App Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 z-[60] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <Link to="/" className="flex flex-col items-center gap-1">
          <span className="text-xl">🏠</span>
          <span className="text-[9px] font-bold uppercase text-gray-400">Home</span>
        </Link>
        <Link to="/products" className="flex flex-col items-center gap-1">
          <span className="text-xl">📦</span>
          <span className="text-[9px] font-bold uppercase text-gray-400">Shop</span>
        </Link>
        <Link to="/ai-designer" className="flex flex-col items-center gap-1">
          <span className="text-xl text-blue-500">✨</span>
          <span className="text-[9px] font-bold uppercase text-blue-500">AI Lab</span>
        </Link>
        <Link to="/admin" className="flex flex-col items-center gap-1">
          <span className="text-xl">📊</span>
          <span className="text-[9px] font-bold uppercase text-gray-400">Sell</span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center gap-1 relative">
          <span className="text-xl">🛒</span>
          <span className="text-[9px] font-bold uppercase text-gray-400">Cart</span>
          {cartCount > 0 && <span className="absolute -top-1 right-0 bg-blue-600 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-black">{cartCount}</span>}
        </Link>
      </div>
    </div>
  );
};

export default Layout;
