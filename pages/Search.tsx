
import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../constants';
import { Search as SearchIcon, Filter, Grid, List as ListIcon, Star, ArrowRight, ShoppingBag, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || searchParams.get('cat') || 'All';
  const { formatPrice, setQuickViewProduct, products, searchProducts } = useStore();

  const [sortBy, setSortBy] = useState('best-selling');
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    selectedCategory: categoryParam,
    selectedSize: 'All',
    selectedColor: 'All'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sync category from URL
  React.useEffect(() => {
    setFilters(prev => ({ ...prev, selectedCategory: categoryParam }));
  }, [categoryParam]);

  const rawResults = useMemo(() => {
    return searchProducts(query, filters.selectedCategory);
  }, [query, filters.selectedCategory, products]); // Added products to deps just in case

  const filteredAndSortedResults = useMemo(() => {
    let items = [...rawResults];

    // Category Filter (already handled by searchProducts partially, but extra check)
    if (filters.selectedCategory !== 'All') {
      items = items.filter(p => p.category === filters.selectedCategory);
    }

    // Price Filter
    items = items.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    // Size Filter
    if (filters.selectedSize !== 'All') {
      items = items.filter(p => p.sizes?.includes(filters.selectedSize));
    }

    // Color Filter
    if (filters.selectedColor !== 'All') {
      items = items.filter(p => p.colors?.includes(filters.selectedColor));
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        items.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
        break;
      case 'price-low':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'best-selling':
      default:
        items.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
    }

    return items;
  }, [rawResults, filters, sortBy]);

  const handleInlineSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuery = (formData.get('inline-search') as string) || '';
    setSearchParams({ q: newQuery, category: filters.selectedCategory });
  };

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach(p => p.sizes?.forEach(s => sizes.add(s)));
    return ['All', ...Array.from(sizes).sort()];
  }, [products]);

  const allColors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach(p => p.colors?.forEach(c => colors.add(c)));
    return ['All', ...Array.from(colors).sort()];
  }, [products]);

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <div className="bg-gray-50 border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
            <div className="flex-grow">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <SearchIcon size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Search Results</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
                {query ? (
                  <>Results for <span className="text-blue-600 underline">"{query}"</span></>
                ) : (
                  <>Explore <span className="text-blue-600 underline">Catalog</span></>
                )}
              </h1>
              <div className="mt-8 max-w-xl">
                 <form onSubmit={handleInlineSearch} className="relative group">
                    <input 
                      name="inline-search"
                      type="text" 
                      defaultValue={query}
                      placeholder="Refine your search..."
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-6 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm font-bold shadow-lg shadow-gray-200/50"
                    />
                    <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                 </form>
              </div>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-6">
                Found {filteredAndSortedResults.length} items matching your criteria
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-col gap-1.5 min-w-[160px]">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-blue-600 transition-all cursor-pointer"
                >
                  <option value="best-selling">Best Selling</option>
                  <option value="newest">Newest Arrival</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">View</label>
                <div className="flex p-1 bg-gray-100 rounded-2xl">
                  <button className="p-2 bg-white rounded-xl shadow-sm"><Grid size={16} /></button>
                  <button className="p-2 text-gray-400 hover:text-black"><ListIcon size={16} /></button>
                </div>
              </div>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all mt-auto h-[46px] ${showFilters ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-900 hover:border-black'}`}
              >
                <Filter size={14} />
                Filters {showFilters ? 'Active' : ''}
              </button>
            </div>
          </div>

          {/* Expanded Filters Section */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 mt-12 border-t border-gray-100">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 pb-2 border-b border-gray-100">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {['All', ...CATEGORIES].map(cat => (
                        <button 
                          key={cat}
                          onClick={() => {
                             setFilters({...filters, selectedCategory: cat});
                             setSearchParams({ q: query, category: cat });
                          }}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${filters.selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 pb-2 border-b border-gray-100">Size</h4>
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map(size => (
                        <button 
                          key={size}
                          onClick={() => setFilters({...filters, selectedSize: size})}
                          className={`min-w-[40px] px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${filters.selectedSize === size ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 pb-2 border-b border-gray-100">Color</h4>
                    <div className="flex flex-wrap gap-2">
                      {allColors.map(color => (
                        <button 
                          key={color}
                          onClick={() => setFilters({...filters, selectedColor: color})}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${filters.selectedColor === color ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 pb-2 border-b border-gray-100">Price Range</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black font-mono">
                        <span>{formatPrice(filters.priceRange[0])}</span>
                        <span>{formatPrice(filters.priceRange[1])}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="10000" 
                        step="100"
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        value={filters.priceRange[1]}
                        onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <button 
                    onClick={() => {
                      setFilters({
                        priceRange: [0, 10000],
                        selectedCategory: 'All',
                        selectedSize: 'All',
                        selectedColor: 'All'
                      });
                      setSortBy('best-selling');
                    }}
                    className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {filteredAndSortedResults.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredAndSortedResults.map(product => (
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
          <div className="py-20 flex flex-col items-center">
            <div className="text-center mb-16">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                🔍
              </div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">No exact matches found</h2>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest max-w-md mx-auto leading-loose mb-8">
                {filters.selectedCategory !== 'All' 
                  ? `No items matching your search in "${filters.selectedCategory}". Showing all items from this category instead.`
                  : "We couldn't find any matches. Try adjusting your search term or explore our catalog by category."}
              </p>
              <button 
                onClick={() => {
                  setFilters({
                    priceRange: [0, 10000],
                    selectedCategory: 'All',
                    selectedSize: 'All',
                    selectedColor: 'All'
                  });
                  setSortBy('best-selling');
                  setSearchParams({ q: '', category: 'All' });
                }}
                className="bg-black text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all"
              >
                Clear All & Reset Search
              </button>
            </div>

            {/* Recommendations - Strictly SAME CATEGORY or Selected Category */}
            <div className="w-full">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none">
                    {filters.selectedCategory !== 'All' ? `More from ${filters.selectedCategory}` : 'Featured items'}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">
                    {filters.selectedCategory !== 'All' ? `Discover gear in this collection` : 'Popular global selections'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {(filters.selectedCategory !== 'All' 
                  ? products.filter(p => p.category === filters.selectedCategory)
                  : products.sort((a,b) => (b.sales||0) - (a.sales||0))
                ).slice(0, 8).map(product => (
                  <div key={product.id} className="group relative flex flex-col">
                    <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden mb-4 border border-gray-100">
                      <Link to={`/products/${product.id}`} className="block w-full h-full">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    </div>
                    <div className="px-2">
                       <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-1 block">{product.category}</span>
                       <h4 className="text-sm font-black uppercase truncate mb-1">{product.name}</h4>
                       <span className="text-sm font-black text-gray-950">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
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
