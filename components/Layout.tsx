
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Utility Bar */}
      <div className="bg-gray-100 py-1 px-4 text-[10px] flex justify-between uppercase font-bold text-gray-500 tracking-tighter">
        <span>Manufacturer Direct Pricing</span>
        <div className="flex gap-4">
          <Link to="/admin" className="hover:text-black">Seller Dashboard</Link>
          <span>Support: +1 (800) APEX-PRO</span>
        </div>
      </div>

      {/* Main Header */}
      <nav className="bg-black text-white sticky top-0 z-50 shadow-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-20 gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-3xl font-black font-oswald tracking-tighter text-blue-500 italic">APEX</span>
              <span className="text-xl font-bold font-oswald hidden sm:block tracking-widest border-l border-white/20 pl-2">PRO</span>
            </Link>

            {/* Search Bar (Amazon Style) */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-2xl relative">
              <input 
                type="text" 
                placeholder="Search across 1,000+ uniform styles..."
                className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 focus:bg-white focus:text-black focus:ring-4 focus:ring-blue-500/20 transition-all outline-none text-sm font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                🔍
              </button>
            </form>

            {/* Nav Links */}
            <div className="flex items-center gap-6">
              <Link to="/products" className={`font-bold text-sm uppercase tracking-widest hidden lg:block ${location.pathname === '/products' ? 'text-blue-500' : 'text-gray-400'}`}>Shop</Link>
              <Link to="/ai-designer" className={`font-bold text-sm uppercase tracking-widest hidden lg:block ${location.pathname === '/ai-designer' ? 'text-blue-500' : 'text-gray-400'}`}>AI Lab</Link>
              
              <Link to="/cart" className="relative group">
                <span className="text-2xl group-hover:scale-110 block transition-transform">🛒</span>
                <span className="absolute -top-2 -right-2 bg-blue-600 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                  2
                </span>
              </Link>

              <button className="md:hidden text-2xl">☰</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-10">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-4xl font-black font-oswald text-blue-500 mb-6 italic">APEX GLOBAL MANUFACTURING</h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              The world's most advanced digital sportswear factory. Combining high-volume production with AI-powered customization.
            </p>
          </div>
          <div>
            <h4 className="font-black uppercase mb-6 text-sm tracking-widest text-blue-500">Categories</h4>
            <ul className="space-y-3 text-gray-500 text-sm font-bold uppercase">
              <li><Link to="/products" className="hover:text-white transition-colors">Team Uniforms</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Gym & Fitness</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Custom Accessories</Link></li>
              <li><Link to="/ai-designer" className="hover:text-white transition-colors">AI Concept Lab</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase mb-6 text-sm tracking-widest text-blue-500">Customer Care</h4>
            <ul className="space-y-3 text-gray-500 text-sm font-bold uppercase">
              <li><Link to="/contact" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Wholesale Inquiry</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Seller Portal</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
          <div className="flex gap-8 text-xs font-bold uppercase">
            <span>© {new Date().getFullYear()} Apex Mfg.</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          <div className="flex gap-4 text-2xl">
            💳 🏦 📦 🛡️
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
