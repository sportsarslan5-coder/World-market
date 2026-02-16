
import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../constants';

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, query]);

  return (
    <div className="bg-white min-h-screen">
      {/* Dynamic Sub-header */}
      <div className="bg-gray-50 border-b overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 flex py-3 gap-2">
          {['All', ...CATEGORIES].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-md text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 border hover:border-blue-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-end mb-8 border-b pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              {activeCategory} <span className="text-blue-500">Collection</span>
            </h1>
            <p className="text-gray-400 text-sm font-bold mt-1">Showing {filteredProducts.length} high-quality items</p>
          </div>
          {query && (
            <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 flex items-center gap-2">
              <span className="text-xs font-bold text-blue-600">Results for: "{query}"</span>
              <button onClick={() => window.history.replaceState({}, '', window.location.pathname)} className="text-blue-400 hover:text-blue-700">✕</button>
            </div>
          )}
        </div>

        {/* Dense Grid for 'Thousands' look */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map(p => (
            <div key={p.id} className="group flex flex-col h-full hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden border border-transparent hover:border-gray-100 p-2">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative mb-4">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black text-white">
                  ⭐ {p.rating}
                </div>
              </div>
              <div className="flex flex-col flex-grow px-2 pb-2">
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">{p.name}</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase mt-1">{p.category}</p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-lg font-black tracking-tighter">${p.price.toFixed(2)}</span>
                  <button className="bg-blue-600 text-white p-2 rounded-lg shadow-lg shadow-blue-500/30 hover:bg-black transition-all transform active:scale-95">
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <span className="text-6xl block mb-4">🔍</span>
            <h2 className="text-2xl font-bold text-gray-300 uppercase italic">No matching products found</h2>
            <button onClick={() => setActiveCategory('All')} className="mt-4 text-blue-600 font-bold hover:underline">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
