
import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../constants';

const Products: React.FC = () => {
  const { products, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, query, products]);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Strip */}
      <div className="bg-gray-50 border-b overflow-x-auto whitespace-nowrap scrollbar-hide sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex py-3 gap-2">
          {['All', ...CATEGORIES].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 border hover:border-blue-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b pb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
              {activeCategory} <span className="text-blue-600 underline">COLLECTION</span>
            </h1>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-2">
              Showing {filteredProducts.length} high-performance items posted by Apex Sellers
            </p>
          </div>
          <div className="flex gap-2 text-[10px] font-black uppercase">
            <span className="text-gray-400">Sort by:</span>
            <select className="bg-transparent outline-none cursor-pointer hover:text-blue-500">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Featured</option>
            </select>
          </div>
        </div>

        {/* Dense Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map(p => (
            <div key={p.id} className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl p-3 hover:shadow-2xl hover:border-blue-100 transition-all duration-500">
              <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative mb-4">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span className="bg-blue-600 text-white text-[8px] font-black px-2 py-1 rounded uppercase shadow-lg">Seller Direct</span>
                  {p.stock < 20 && <span className="bg-red-500 text-white text-[8px] font-black px-2 py-1 rounded uppercase shadow-lg">Limited Stock</span>}
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black text-white">
                  ⭐ {p.rating}
                </div>
              </div>
              
              <div className="flex flex-col flex-grow">
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight h-10 mb-1">{p.name}</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.category}</p>
                
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-lg font-black tracking-tighter text-gray-900">${p.price.toFixed(2)}</span>
                    <span className="text-[8px] font-bold text-green-600 uppercase">✓ In Stock</span>
                  </div>
                  <button 
                    onClick={() => addToCart(p)}
                    className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 hover:bg-black hover:scale-110 transition-all transform active:scale-90"
                    title="Add to Cart"
                  >
                    <span className="text-xl">🛒</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <span className="text-7xl block mb-6 animate-bounce">📦</span>
            <h2 className="text-3xl font-black text-gray-300 uppercase italic tracking-tighter">No matching results found</h2>
            <p className="text-gray-400 font-bold uppercase text-xs mt-2">Try adjusting your filters or search keywords</p>
            <button onClick={() => { setActiveCategory('All'); window.history.replaceState({}, '', '/products'); }} className="mt-8 text-blue-600 font-black uppercase text-sm tracking-widest hover:underline">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
