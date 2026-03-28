
import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useStore } from '../context/StoreContext';
import { ADMIN_WHATSAPP } from '../constants';
import { Star, Truck, ShieldCheck, RotateCcw, MessageCircle, ShoppingCart, ChevronRight, Share2, Heart, CheckCircle2, Eye, Clock, Zap } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { productId, showName: pathShowName } = useParams();
  const { products, addToCart, activeShowName: subdomainShowName, formatPrice } = useStore();
  const showName = pathShowName || subdomainShowName;
  const navigate = useNavigate();

  const product = useMemo(() => products.find(p => p.id === productId), [products, productId]);
  
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Product Not Found</h2>
        <Link to="/products" className="bg-black text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest">Back to Catalog</Link>
      </div>
    );
  }

  const handleWhatsAppOrder = () => {
    const message = `NEW ORDER INQUIRY - World Market Shop
---------------------------------
SOURCE SHOW: ${showName ? showName.toUpperCase() : 'MAIN STORE'}
Item: ${product.name}
Price: $${product.price.toFixed(2)}
Size: ${selectedSize}
Color: ${selectedColor}
Quantity: ${quantity}
Total: $${(product.price * quantity).toFixed(2)}
---------------------------------
REQUIRED DATA:
Full Name: 
Shipping Address: 
Contact Number: 
---------------------------------
Please fill the above data to proceed with manufacturing.`;

    const waLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    // Optional: show a toast or redirect to cart
    // navigate('/cart');
  };

  const getLink = (to: string) => {
    if (showName) {
      const cleanTo = to === '/' ? '' : to.startsWith('/') ? to : `/${to}`;
      return `/${showName}${cleanTo}`;
    }
    return to;
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO 
        title={product.metaTitle || product.name}
        description={product.metaDescription || product.description}
        image={product.image}
        keywords={[product.category, 'factory direct', 'wholesale', product.name, ...(product.metaKeywords?.split(',') || [])]}
      />
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link to={getLink('/')} className="hover:text-blue-600">Home</Link>
          <ChevronRight size={12} />
          <Link to={getLink('/products')} className="hover:text-blue-600">Products</Link>
          <ChevronRight size={12} />
          <span className="text-gray-400">{product.category}</span>
          <ChevronRight size={12} />
          <span className="text-black truncate max-w-[150px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 cursor-crosshair group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img 
                src={selectedImage} 
                alt={product.name} 
                className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all">
                  <Heart size={18} />
                </button>
                <button className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all">
                  <Share2 size={18} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                {product.quality}
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[product.image, ...(product.images || [])].slice(0, 4).map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-blue-600 shadow-lg' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Middle: Product Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.badges?.map(badge => (
                  <span key={badge} className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-tight mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(Number(product.rating)) ? 'currentColor' : 'none'} />
                  ))}
                  <span className="text-xs font-black text-gray-900 ml-1">{product.rating}</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline cursor-pointer">
                  {Math.floor(Math.random() * 500) + 100} Ratings
                </span>
              </div>
            </div>

            <div className="py-6 border-y border-gray-100">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tighter text-gray-900">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-xs font-bold text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                )}
                {product.discount && (
                  <span className="text-xs font-black text-red-600 uppercase tracking-widest">{product.discount}% OFF</span>
                )}
              </div>
              <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest">Inclusive of all taxes</p>
              
              {/* Urgency & Social Proof */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-blue-600 animate-pulse">
                  <Eye size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{product.viewers || 24} people are viewing this right now</span>
                </div>
                {product.stock && product.stock < 10 && (
                  <div className="flex items-center gap-2 text-red-600">
                    <Zap size={14} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Only {product.stock} left in stock - order soon</span>
                  </div>
                )}
                {product.saleEndsAt && (
                  <div className="flex items-center gap-2 text-orange-600">
                    <Clock size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Flash Sale ends in 02h 45m 12s</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Size Selector */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Size</label>
                  <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Size Chart</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl font-black text-xs transition-all border-2 ${selectedSize === size ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-gray-100 text-gray-900 hover:border-blue-600'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors?.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${selectedColor === color ? 'bg-black border-black text-white shadow-lg' : 'bg-white border-gray-100 text-gray-900 hover:border-black'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Product Description</h4>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {product.description}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[8px] font-black uppercase text-gray-400 block mb-1">Fabric</span>
                  <span className="text-[10px] font-black uppercase">{product.fabric}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[8px] font-black uppercase text-gray-400 block mb-1">Grade</span>
                  <span className="text-[10px] font-black uppercase">{product.quality}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Buy Box (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-white border-2 border-gray-100 rounded-[2.5rem] p-8 sticky top-32 shadow-2xl shadow-blue-500/5">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black tracking-tighter">${(product.price * quantity).toFixed(2)}</span>
                  <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <CheckCircle2 size={12} />
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Quantity</label>
                  <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center font-black text-xl hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="flex-grow text-center font-black text-sm">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-12 h-12 flex items-center justify-center font-black text-xl hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all transform active:scale-95"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-green-600 transition-all transform active:scale-95 shadow-xl shadow-green-500/20"
                  >
                    <MessageCircle size={18} />
                    Order via WhatsApp
                  </button>
                </div>

                <div className="pt-8 space-y-4 border-t border-gray-50">
                  <div className="flex items-start gap-3">
                    <Truck size={18} className="text-blue-600 mt-1" />
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-widest">Worldwide Shipping</h5>
                      <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase">Estimated Delivery: 7-12 Business Days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RotateCcw size={18} className="text-blue-600 mt-1" />
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-widest">Easy Returns</h5>
                      <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase">30-Day Money Back Guarantee</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} className="text-blue-600 mt-1" />
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-widest">Factory Direct</h5>
                      <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase">Export Quality Certified</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 bg-gray-50 -mx-8 -mb-8 p-8 rounded-b-[2.5rem] border-t">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs">
                      {showName ? showName[0].toUpperCase() : 'WM'}
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-widest">{showName ? showName.replace(/-/g, ' ') : 'World Market Official'}</h5>
                      <p className="text-[9px] font-bold text-gray-400 uppercase">Verified Seller Since 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Reviews Section */}
        <div className="mt-24 pt-24 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-6">Customer <span className="text-blue-600">Reviews</span></h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-black tracking-tighter">{product.rating}</span>
                  <div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < Math.floor(Number(product.rating)) ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Global Average Rating</p>
                  </div>
                </div>
                
                <div className="space-y-2 pt-6">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-gray-400 w-4">{star}</span>
                      <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full" 
                          style={{ width: `${star === 5 ? 85 : (star === 4 ? 10 : 5)}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 w-8">{star === 5 ? '85%' : (star === 4 ? '10%' : '5%')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-12">
              {product.reviews?.map(review => (
                <div key={review.id} className="space-y-4 animate-fadeIn">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-xs text-gray-400">
                        {review.user[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-black uppercase tracking-tight">{review.user}</h5>
                          {review.country && (
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">{review.country}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} fill={i < review.rating ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">Helpful</button>
                    <span className="text-gray-200">|</span>
                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">Report</button>
                  </div>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:border-blue-600 hover:text-blue-600 transition-all">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
        {/* Related Products Section */}
        <div className="mt-24 pt-24 border-t border-gray-100">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">You may <span className="text-blue-600">also like</span></h2>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Recommended based on this item</p>
            </div>
            <Link to={getLink('/products')} className="text-blue-600 font-black uppercase text-[10px] tracking-widest hover:underline flex items-center gap-2">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(p => (
              <Link to={getLink(`/products/${p.id}`)} key={p.id} className="group flex flex-col gap-4">
                <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden relative border border-gray-100">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black shadow-sm">
                    ⭐ {p.rating}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-xs line-clamp-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{p.name}</h4>
                  <div className="text-gray-900 font-black text-lg tracking-tighter mt-1">{formatPrice(p.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
