
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
      {/* Search Result Summary info */}
      <div className="bg-white border-b border-gray-200 py-3 mb-4 hidden md:block">
        <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center text-sm">
           <div className="text-gray-900">
             <span className="font-bold">1-{Math.min(filteredAndSortedResults.length, 24)} of over {filteredAndSortedResults.length} results</span>
             {query && <span> for <span className="text-[#c45500] font-bold">"{query}"</span></span>}
           </div>
           <div className="flex items-center gap-2">
              <label className="text-[11px] font-bold text-gray-500">Sort by:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="best-selling">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="newest">Newest Arrivals</option>
              </select>
           </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-8">
        
        {/* Amazon-Style Sidebar Facets */}
        <aside className="w-full md:w-64 flex-shrink-0 hidden md:block">
          <div className="space-y-8 sticky top-24">
             <div>
               <h4 className="text-sm font-bold text-gray-900 mb-3">Department</h4>
               <ul className="space-y-1.5 pl-1">
                 <li>
                   <button 
                     onClick={() => {
                        setFilters({...filters, selectedCategory: 'All'});
                        setSearchParams({ q: query, category: 'All' });
                     }}
                     className={`text-xs ${filters.selectedCategory === 'All' ? 'font-black text-gray-900' : 'text-gray-700 hover:text-[#c45500]'}`}
                   >
                     Any Department
                   </button>
                 </li>
                 {CATEGORIES.map(cat => (
                   <li key={cat}>
                     <button 
                       onClick={() => {
                          setFilters({...filters, selectedCategory: cat});
                          setSearchParams({ q: query, category: cat });
                       }}
                       className={`text-xs capitalize ${filters.selectedCategory === cat ? 'font-black text-gray-900' : 'text-gray-700 hover:text-[#c45500]'}`}
                     >
                       {cat}
                     </button>
                   </li>
                 ))}
               </ul>
             </div>

             <div>
               <h4 className="text-sm font-bold text-gray-900 mb-3">Customer Reviews</h4>
               <div className="space-y-2">
                 {[4, 3, 2, 1].map(stars => (
                   <button 
                     key={stars}
                     className="flex items-center gap-1.5 group w-full text-left"
                   >
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} size={14} fill={i < stars ? "currentColor" : "none"} className={i < stars ? "text-yellow-500" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-700 group-hover:text-[#c45500]">& Up</span>
                   </button>
                 ))}
               </div>
             </div>

             <div>
               <h4 className="text-sm font-bold text-gray-900 mb-3">Price Range</h4>
               <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">$</span>
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-500"
                    />
                    <span className="text-xs text-gray-500">$</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-500"
                    />
                    <button className="px-3 py-1 border border-gray-300 rounded shadow-sm hover:bg-gray-50 text-xs">Go</button>
                  </div>
               </div>
             </div>

             <div>
               <h4 className="text-sm font-bold text-gray-900 mb-3">New Arrivals</h4>
               <ul className="space-y-2">
                  <li><label className="flex items-center gap-2 cursor-pointer group"><input type="checkbox" className="rounded" /><span className="text-xs text-gray-700 group-hover:text-[#c45500]">Last 30 days</span></label></li>
                  <li><label className="flex items-center gap-2 cursor-pointer group"><input type="checkbox" className="rounded" /><span className="text-xs text-gray-700 group-hover:text-[#c45500]">Last 90 days</span></label></li>
               </ul>
             </div>
          </div>
        </aside>

        {/* Results Stream */}
        <div className="flex-grow">
          {filteredAndSortedResults.length > 0 ? (
            <div className="flex flex-col gap-6">
               <h2 className="text-xl font-bold text-gray-900 mb-2">Results</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {filteredAndSortedResults.map(product => {
                   const isBestSeller = (product.sales || 0) > 400;
                   const isTopRated = parseFloat(product.rating.toString()) >= 4.8;

                   return (
                     <div key={product.id} className="bg-white border border-gray-200 rounded-lg flex flex-col group hover:shadow-lg transition-shadow overflow-hidden">
                        {/* Image area */}
                        <Link to={`/products/${product.id}`} className="block relative aspect-square bg-gray-50 p-4">
                           <img 
                             src={product.image} 
                             alt={product.name} 
                             className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                           />
                        </Link>

                        {/* Info area */}
                        <div className="p-4 flex flex-col flex-grow bg-white">
                           {/* Badges */}
                           <div className="h-6 mb-2 flex flex-wrap gap-2">
                             {isBestSeller && (
                               <div className="bg-[#cc6600] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Best Seller</div>
                             )}
                             {isTopRated && (
                               <div className="bg-[#232f3e] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                                 <ShoppingBag size={10} className="text-orange-400" />
                                 Sportswear Choice
                               </div>
                             )}
                           </div>

                           <Link to={`/products/${product.id}`} className="hover:text-[#c45500] group/title transition-colors">
                             <h3 className="text-sm md:text-base font-normal text-gray-900 line-clamp-3 mb-1 group-hover/title:underline italic uppercase font-bold tracking-tight leading-tight">
                                {product.name}
                             </h3>
                           </Link>

                           {/* Rating */}
                           <div className="flex items-center gap-1 mb-2">
                             <div className="flex text-yellow-500">
                               {[...Array(5)].map((_, i) => (
                                 <Star 
                                   key={i} 
                                   size={14} 
                                   fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                                   className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"} 
                                 />
                               ))}
                             </div>
                             <span className="text-xs text-blue-600 font-medium hover:text-[#c45500] hover:underline cursor-pointer">{((product.sales || 0) * 1.5).toFixed(0)}</span>
                           </div>

                           {/* Price */}
                           <div className="flex items-start gap-0.5 text-gray-900 mb-1">
                             <span className="text-xs font-medium mt-1">$</span>
                             <span className="text-2xl font-bold">{Math.floor(product.price)}</span>
                             <span className="text-xs font-medium mt-1">{(product.price % 1).toFixed(2).split('.')[1]}</span>
                           </div>

                           {product.oldPrice && (
                             <div className="text-xs text-gray-500 mb-2">
                               Typical: <span className="line-through">{formatPrice(product.oldPrice)}</span>
                             </div>
                           )}

                           <div className="text-xs font-bold text-gray-700 mb-4 flex items-center gap-2">
                             <span className="bg-blue-100 text-blue-800 px-1 rounded text-[10px]">v-prime</span>
                             <span>FREE delivery <span className="font-black">Sun, Apr 28</span></span>
                           </div>

                           <div className="mt-auto">
                             <button 
                               onClick={() => setQuickViewProduct(product)}
                               className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black text-xs font-bold py-2 rounded-full shadow-sm active:shadow-inner transition-all"
                             >
                               See options
                             </button>
                           </div>
                        </div>
                     </div>
                   );
                 })}
               </div>
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center">
              <div className="text-center mb-16">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                  🔍
                </div>
                <h2 className="text-2xl font-bold mb-4 italic uppercase">No exact matches found</h2>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                  We couldn't find any results for "{query}". Try checking your spelling or use more general terms.
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
                  className="bg-[#232f3e] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-black transition-all"
                >
                  Clear Results
                </button>
              </div>

              {/* Suggestions */}
              <div className="w-full">
                <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">More items to consider</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.sort((a,b) => (b.sales||0) - (a.sales||0)).slice(0, 8).map(product => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                       <Link to={`/products/${product.id}`} className="block aspect-square p-2 bg-gray-50">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                       </Link>
                       <div className="p-3">
                          <h4 className="text-xs font-bold text-gray-900 line-clamp-2 italic uppercase mb-1 hover:text-[#c45500] cursor-pointer leading-tight">{product.name}</h4>
                          <div className="flex text-yellow-500 scale-75 origin-left mb-1">
                            {[...Array(5)].map((_, i) => (
                               <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"} />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-gray-950">{formatPrice(product.price)}</span>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
