
import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useStore } from '../context/StoreContext';
import Fuse from 'fuse.js';
import { Search as SearchIcon, Filter, Grid, List as ListIcon, Star, ArrowRight, ShoppingBag } from 'lucide-react';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { formatPrice, setQuickViewProduct } = useStore();

  const fuse = useMemo(() => new Fuse(PRODUCTS, {
    keys: ['name', 'category', 'description', 'tags'],
    threshold: 0.4,
    distance: 100,
  }), []);

  const results = useMemo(() => {
    if (!query.trim()) return PRODUCTS;
    return fuse.search(query).map(r => r.item);
  }, [query, fuse]);

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <div className="bg-gray-50 border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <SearchIcon size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Search Results</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">
                {query ? (
                  <>Results for <span className="text-blue-600 underline">"{query}"</span></>
                ) : (
                  <>Explore <span className="text-blue-600 underline">Catalog</span></>
                )}
              </h1>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-4">
                Found {results.length} professional sportswear items matching your query
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-black transition-all">
                <Filter size={14} />
                Filter
              </button>
              <div className="flex p-1 bg-gray-100 rounded-2xl">
                <button className="p-2 bg-white rounded-xl shadow-sm"><Grid size={16} /></button>
                <button className="p-2 text-gray-400 hover:text-black"><ListIcon size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {results.map(product => (
              <div key={product.id} className="group relative flex flex-col">
                {/* Product Image Stage */}
                <div className="relative aspect-[3/4] bg-gray-50 rounded-[2.5rem] overflow-hidden mb-6 border border-gray-100/50 group-hover:border-blue-600/20 transition-all duration-500">
                  <Link to={`/products/${product.id}`} className="block w-full h-full">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                    />
                  </Link>

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {product.badges?.map((badge, idx) => (
                      <span key={idx} className={`${badge === 'Hot' ? 'bg-orange-600' : 'bg-blue-600'} text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl`}>{badge}</span>
                    ))}
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3">
                    <button 
                      onClick={() => setQuickViewProduct(product)}
                      className="bg-white text-black px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
                    >
                      Quick View
                    </button>
                    <Link 
                      to={`/products/${product.id}`}
                      className="text-white text-[10px] font-black uppercase tracking-widest hover:underline transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow px-2">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-600/60">{product.category}</span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[10px] font-black text-gray-900">{product.rating}</span>
                    </div>
                  </div>
                  
                  <Link to={`/products/${product.id}`} className="group-hover:text-blue-600 transition-colors">
                    <h3 className="text-lg font-black italic uppercase tracking-tighter leading-tight mb-2 truncate">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-gray-950 tracking-tighter">{formatPrice(product.price)}</span>
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Available in {product.sizes?.length || 0} sizes</span>
                    </div>
                    <button 
                       onClick={() => setQuickViewProduct(product)}
                       className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all active:scale-95"
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center text-6xl mb-8 animate-bounce">
              🔍
            </div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">No results for "{query}"</h2>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest max-w-md mx-auto leading-loose mb-12">
              We couldn't find any professional gear matching your search. Try different keywords or browse our top categories.
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="bg-black text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-600 transition-all">
                Browse All Gear
              </Link>
              <Link to="/" className="bg-gray-100 text-gray-900 px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
                Go to Home
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Featured Brands / Trust Section */}
      <div className="bg-gray-50 py-24 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center gap-12 md:gap-24 opacity-20 grayscale scale-90 md:scale-100">
             <span className="text-4xl font-black italic tracking-tighter uppercase whitespace-nowrap">Adidas</span>
             <span className="text-4xl font-black italic tracking-tighter uppercase whitespace-nowrap">Nike</span>
             <span className="text-4xl font-black italic tracking-tighter uppercase whitespace-nowrap">Puma</span>
             <span className="text-4xl font-black italic tracking-tighter uppercase whitespace-nowrap">Reebok</span>
             <span className="text-4xl font-black italic tracking-tighter uppercase whitespace-nowrap">Under</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
