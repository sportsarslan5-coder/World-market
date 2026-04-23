
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BarChart3, Box, ShoppingBag, Bell, Plus, Settings, 
  ChevronRight, ArrowUpRight, ArrowDownRight, Package,
  Clock, CheckCircle2, AlertCircle, X, Search, User as UserIcon
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const SellerPanel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    sales, products, sellers, notifications, unreadNotificationsCount,
    formatPrice, addProduct, updateSaleStatus, markNotificationAsRead 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'notifications' | 'profile'>('overview');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const seller = sellers.find(s => s.id === id || s.showName === id);
  const sellerProducts = products.filter(p => p.sellerId === seller?.id);
  const sellerSales = sales.filter(s => s.sellerId === seller?.id);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: CATEGORIES[0],
    image: '',
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'White']
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for professional feel
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-black border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Loading Seller Portal</p>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl text-center border border-gray-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} />
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-4">Access <span className="text-red-500">Denied</span></h2>
          <p className="text-gray-500 font-medium mb-8">We couldn't find a seller profile matching this ID. Please contact support or check your link.</p>
          <Link to="/" className="inline-block bg-black text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Back to Market</Link>
        </div>
      </div>
    );
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct({
        ...newProduct,
        sellerId: seller.id,
        rating: 5.0,
        reviews: [],
        badges: ['Legacy'],
        stock: 50,
        ratingCount: 0,
        sales: 0,
        viewers: 0
      });
      setIsAddingProduct(false);
      setNewProduct({
        name: '', price: 0, category: CATEGORIES[0], image: '', description: '',
        sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Navy', 'White']
      });
      alert('Product added successfully!');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const sellerNotifications = notifications.filter(n => n.sellerId === seller.id || (n.targetRole === 'seller' && !n.sellerId));
  const unreadCount = sellerNotifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row font-sans text-gray-900">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-100 p-8 h-screen sticky top-0 shadow-sm">
        <div className="mb-12">
          <h2 className="text-2xl font-black italic tracking-tighter">PARTNER <span className="text-blue-600">CENTRAL</span></h2>
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Global Distribution Network</p>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'overview', label: 'Dashboard', icon: BarChart3 },
            { id: 'orders', label: 'My Orders', icon: ShoppingBag },
            { id: 'products', label: 'My Products', icon: Box },
            { id: 'notifications', label: 'Alerts', icon: Bell, badge: unreadCount },
            { id: 'profile', label: 'Shop Details', icon: Settings }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                : 'text-gray-400 hover:text-black hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} />
                <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-50">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black">
              {seller.shopName?.charAt(0) || 'S'}
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase truncate">{seller.shopName || seller.showName}</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Verified Partner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b p-4 sticky top-0 z-40 flex justify-between items-center">
        <h2 className="text-xl font-black italic tracking-tighter">PARTNER <span className="text-blue-600">CENTRAL</span></h2>
        <div className="flex items-center gap-4">
           <button onClick={() => setActiveTab('notifications')} className="relative p-2">
            <Bell size={20} />
            {unreadCount > 0 && <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>}
           </button>
           <button onClick={() => setActiveTab('profile')} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><Settings size={18}/></button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-12 max-w-6xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <header className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-tight">Welcome, <br/><span className="text-blue-600 underline">{seller.fullName.split(' ')[0]}</span></h2>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-2">Performance Breakdown for your shop</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Total Balance</p>
                  <p className="text-3xl font-black italic tracking-tighter">{formatPrice(seller.balance)}</p>
                </div>
              </header>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: 'Total Earnings', value: formatPrice(seller.totalEarnings), icon: ArrowUpRight, color: 'text-green-600 bg-green-50' },
                  { label: 'Sales Count', value: sellerSales.length, icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
                  { label: 'Products', value: sellerProducts.length, icon: Box, color: 'text-purple-600 bg-purple-50' },
                  { label: 'Avg Rating', value: seller.rating, icon: AlertCircle, color: 'text-yellow-600 bg-yellow-50' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                    <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-tight">{stat.label}</p>
                    <p className="text-xl font-black mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-6">
                   <div className="flex justify-between items-center">
                     <h3 className="text-lg font-black uppercase italic tracking-tight">Recent Orders</h3>
                     <button onClick={() => setActiveTab('orders')} className="text-[10px] font-black uppercase text-blue-600 hover:underline">View All</button>
                   </div>
                   <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 divide-y">
                     {sellerSales.length === 0 ? (
                        <div className="p-12 text-center text-gray-400">
                          <Package className="mx-auto mb-4 opacity-20" size={48} />
                          <p className="text-[10px] font-black uppercase tracking-widest">No orders yet</p>
                        </div>
                     ) : (
                       sellerSales.slice(0, 5).map(order => (
                         <div key={order.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-blue-600">
                                <ShoppingBag size={20} />
                              </div>
                              <div>
                                <p className="text-xs font-black uppercase">{order.customerName}</p>
                                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">ORDER #{order.id.slice(-6)} • {new Date(order.date).toLocaleDateString()}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-6">
                             <div className="text-right">
                               <p className="text-xs font-black">{formatPrice(order.amount)}</p>
                               <span className={`text-[8px] font-black uppercase ${order.status === 'Confirmed' ? 'text-green-600' : 'text-orange-500'}`}>{order.status}</span>
                             </div>
                             <button onClick={() => setSelectedOrder(order)} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight size={16}/></button>
                           </div>
                         </div>
                       ))
                     )}
                   </div>
                 </div>

                 <div className="space-y-6">
                    <h3 className="text-lg font-black uppercase italic tracking-tight">Quick Actions</h3>
                    <div className="space-y-3">
                      <button 
                        onClick={() => setIsAddingProduct(true)}
                        className="w-full bg-black text-white p-6 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-between hover:bg-blue-600 transition-all shadow-xl"
                      >
                        Add Product <Plus size={18}/>
                      </button>
                      <button className="w-full bg-white text-gray-900 border border-gray-100 p-6 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-between hover:bg-gray-50 transition-all shadow-sm">
                        Request Payout <ArrowUpRight size={18}/>
                      </button>
                    </div>

                    <div className="bg-blue-600 rounded-3xl p-6 text-white overflow-hidden relative">
                       <div className="relative z-10">
                         <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Support Status</h4>
                         <p className="text-lg font-black italic mb-4">Dedicated Account Manager Available</p>
                         <button className="bg-white text-blue-600 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Contact Now</button>
                       </div>
                       <Package className="absolute -bottom-6 -right-6 text-white/10" size={120} />
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">My <span className="text-blue-600 underline">Orders</span></h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-grow sm:flex-grow-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14}/>
                    <input type="text" placeholder="Search orders..." className="bg-white border rounded-xl pl-9 pr-4 py-2 text-xs font-bold w-full sm:w-64 outline-none focus:ring-2 focus:ring-blue-600/10"/>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="p-6 text-[9px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                        <th className="p-6 text-[9px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                        <th className="p-6 text-[9px] font-black uppercase tracking-widest text-gray-400">Date</th>
                        <th className="p-6 text-[9px] font-black uppercase tracking-widest text-gray-400 text-center">Amount</th>
                        <th className="p-6 text-[9px] font-black uppercase tracking-widest text-gray-400">Status</th>
                        <th className="p-6 text-[9px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {sellerSales.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50/50">
                          <td className="p-6 text-xs font-black">#{order.id.slice(-6)}</td>
                          <td className="p-6">
                            <p className="text-xs font-black uppercase">{order.customerName}</p>
                            <p className="text-[9px] text-gray-400 font-bold">{order.customerCity}</p>
                          </td>
                          <td className="p-6 text-xs font-bold text-gray-400">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="p-6 text-center text-xs font-black">{formatPrice(order.amount)}</td>
                          <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                              order.status === 'Confirmed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-6 text-right">
                             <button onClick={() => setSelectedOrder(order)} className="bg-gray-100 text-[9px] font-black uppercase px-4 py-1.5 rounded-lg hover:bg-black hover:text-white transition-all">Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="space-y-8"
             >
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase">My <span className="text-blue-600 underline">Inventory</span></h2>
                  <button 
                    onClick={() => setIsAddingProduct(true)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase shadow-xl flex items-center gap-2"
                  >
                    <Plus size={18}/> New Product
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sellerProducts.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-dashed border-gray-200">
                      <Box className="mx-auto mb-4 text-gray-300" size={48}/>
                      <p className="text-sm font-black uppercase text-gray-400 tracking-widest">No products in your shop</p>
                    </div>
                  ) : (
                    sellerProducts.map(product => (
                      <div key={product.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm group">
                        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 relative">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="text-xs font-black uppercase tracking-tight truncate max-w-[70%]">{product.name}</h4>
                           <p className="text-sm font-black">{formatPrice(product.price)}</p>
                        </div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase mb-4">{product.category}</p>
                        <div className="flex gap-2">
                           <button className="flex-grow bg-gray-100 text-[10px] font-black uppercase py-2.5 rounded-xl hover:bg-black hover:text-white transition-all">Edit</button>
                           <button className="bg-red-50 text-red-500 p-2.5 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
             </motion.div>
          )}

          {activeTab === 'notifications' && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="space-y-8"
             >
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase">Activity <span className="text-blue-600 underline">Stream</span></h2>
                  <button className="text-[10px] font-black uppercase text-gray-400 hover:text-black">Mark All as Read</button>
                </div>

                <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 divide-y">
                   {sellerNotifications.length === 0 ? (
                      <div className="p-20 text-center text-gray-300">
                        <Bell className="mx-auto mb-4 opacity-20" size={60}/>
                        <p className="text-[10px] font-black uppercase tracking-widest">Everything is up to date</p>
                      </div>
                   ) : (
                     sellerNotifications.map(n => (
                       <div 
                         key={n.id}
                         onClick={() => markNotificationAsRead(n.id)}
                         className={`p-8 flex gap-6 hover:bg-gray-50 transition-colors cursor-pointer ${!n.isRead ? 'bg-blue-50/20' : ''}`}
                       >
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                            n.type === 'New Order' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                         }`}>
                           {n.type === 'New Order' ? <ShoppingBag size={20}/> : <AlertCircle size={20}/>}
                         </div>
                         <div className="flex-grow">
                            <div className="flex justify-between mb-1">
                               <p className="text-xs font-black uppercase">{n.title}</p>
                               <p className="text-[8px] font-bold text-gray-400 uppercase">{new Date(n.timestamp).toLocaleTimeString()}</p>
                            </div>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">{n.message}</p>
                         </div>
                       </div>
                     ))
                   )}
                </div>
             </motion.div>
          )}

          {activeTab === 'profile' && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="space-y-8"
             >
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">Shop <span className="text-blue-600 underline">Profile</span></h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
                     <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-blue-600 text-white rounded-[1.5rem] flex items-center justify-center text-3xl font-black italic shadow-xl shadow-blue-600/20">
                          {seller.shopName?.charAt(0) || 'S'}
                        </div>
                        <div>
                           <h4 className="text-2xl font-black uppercase italic tracking-tighter">{seller.shopName || seller.showName}</h4>
                           <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase px-2 py-1 rounded inline-block mt-2 tracking-widest">{seller.rank} Tier Seller</span>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="flex justify-between p-4 bg-gray-50 rounded-2xl">
                           <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Full Name</span>
                           <span className="text-[10px] font-black uppercase">{seller.fullName}</span>
                        </div>
                        <div className="flex justify-between p-4 bg-gray-50 rounded-2xl">
                           <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Email</span>
                           <span className="text-[10px] font-bold">{seller.email}</span>
                        </div>
                        <div className="flex justify-between p-4 bg-gray-50 rounded-2xl">
                           <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">WhatsApp</span>
                           <span className="text-[10px] font-bold">{seller.whatsapp}</span>
                        </div>
                        <div className="flex justify-between p-4 bg-gray-50 rounded-2xl">
                           <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">City</span>
                           <span className="text-[10px] font-black uppercase">{seller.city}</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                       <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-6">Verification Documents</h4>
                       <div className="flex items-center justify-between p-6 bg-green-50 border border-green-100 rounded-2xl">
                          <div className="flex items-center gap-4">
                             <CheckCircle2 className="text-green-600" size={24}/>
                             <div>
                               <p className="text-xs font-black uppercase text-green-800">Shop Verified</p>
                               <p className="text-[9px] font-bold text-green-700/70 uppercase">Documents Approved on {seller.joinedDate}</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                       <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-6">Payout Information</h4>
                       <div className="p-6 bg-gray-50 rounded-2xl">
                          <p className="text-[9px] font-black uppercase text-gray-400 mb-2">Banking Methods</p>
                          <p className="text-xs font-bold leading-relaxed">{seller.paymentDetails}</p>
                          <button className="mt-6 text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">Update Details</button>
                       </div>
                    </div>
                  </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-xl w-full overflow-hidden">
            <div className="bg-black text-white p-8 mb-6">
               <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-black italic tracking-tighter uppercase">Order <span className="text-blue-500 underline">Summary</span></h2>
                 <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-white/10 rounded-full"><X/></button>
               </div>
               <p className="text-[10px] font-black uppercase text-gray-400 mt-2 tracking-widest">Order ID: #{selectedOrder.id}</p>
            </div>
            
            <div className="p-8 pb-10 space-y-8 max-h-[60vh] overflow-y-auto">
               <div className="grid grid-cols-2 gap-8 text-left">
                  <section>
                    <h4 className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-2">Delivery To</h4>
                    <p className="text-xs font-black uppercase">{selectedOrder.customerName}</p>
                    <p className="text-[10px] font-bold text-gray-500 mt-1">{selectedOrder.customerPhone}</p>
                    <p className="text-[10px] font-bold text-gray-500 leading-tight mt-2">{selectedOrder.customerAddress}, {selectedOrder.customerCity}</p>
                  </section>
                  <section className="text-right">
                    <h4 className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-2">Order Date</h4>
                    <p className="text-xs font-black uppercase">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                    <div className="mt-4">
                       <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                          selectedOrder.status === 'Confirmed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                          {selectedOrder.status}
                        </span>
                    </div>
                  </section>
               </div>

               <div>
                 <h4 className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-4">Items Summary</h4>
                 <div className="space-y-3">
                    {selectedOrder.items?.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                         <div>
                            <p className="text-xs font-black uppercase">{item.name}</p>
                            <p className="text-[8px] font-bold text-gray-400 uppercase mt-1">Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</p>
                         </div>
                         <p className="text-xs font-black">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                 </div>
               </div>

               <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
                  <p className="text-sm font-black italic uppercase">Total Order Value</p>
                  <p className="text-2xl font-black italic tracking-tighter text-blue-600">{formatPrice(selectedOrder.amount)}</p>
               </div>
            </div>

            <div className="p-8 pt-0 flex gap-4">
              {selectedOrder.status === 'Pending Payment' && (
                <button 
                  onClick={() => {
                    updateSaleStatus(selectedOrder.id, 'Confirmed');
                    setSelectedOrder({...selectedOrder, status: 'Confirmed'});
                  }}
                  className="flex-grow bg-blue-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all"
                >
                  Confirm Shipment
                </button>
              )}
              <button 
                onClick={() => setSelectedOrder(null)}
                className="flex-grow bg-gray-100 text-black py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-black hover:text-white transition-all"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full overflow-hidden animate-scaleIn">
            <div className="bg-black text-white p-10 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">List <span className="text-blue-500 underline">New Item</span></h2>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2">{seller.shopName} Inventory</p>
              </div>
              <button onClick={() => setIsAddingProduct(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddProduct} className="p-10 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Product Name</label>
                <input 
                  required
                  placeholder="e.g. Ultra Mesh Sport Hoodie"
                  className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Your Price ($)</label>
                  <input 
                    required
                    type="number"
                    className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                    value={isNaN(newProduct.price) ? '' : newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Category</label>
                  <select 
                    className="w-full bg-gray-50 border p-4 rounded-xl font-bold uppercase text-xs"
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Image URL</label>
                <input 
                  required
                  placeholder="Paste product image link"
                  className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                  value={newProduct.image}
                  onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Item Description</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>
              <div className="pt-6">
                <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">Publish to Marketplace</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerPanel;

