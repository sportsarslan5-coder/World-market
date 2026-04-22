
import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit2, ShieldCheck, Mail, LogIn, Bell, User as UserIcon, Phone, MapPin, Globe } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../constants';
import { auth } from '../services/firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';

const hashPassword = async (password: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const Admin: React.FC = () => {
  const { 
    products, sales, customers, sellers, notifications, unreadNotificationsCount,
    addProduct, updateSaleStatus, formatPrice, markNotificationAsRead 
  } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'sales' | 'customers' | 'settings' | 'withdrawals'>('overview');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isPassAuthenticated, setIsPassAuthenticated] = useState(false);

  // Search and Detail State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // New Product State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: CATEGORIES[0],
    image: '',
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'White']
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsPassAuthenticated(false);
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputHash = await hashPassword(adminPassword);
    // Secure Hash for 'ADMIN_SECURE'
    const masterHash = '2bb68926d2e07172ca78680d971a1796c836c2f9d656910609a63c638e874936'; 
    
    if (inputHash === masterHash) {
      setIsPassAuthenticated(true);
      setError('');
    } else {
      setError('Access Denied: Invalid Master Key');
    }
  };

  // Filtered sales
  const filteredSales = sales.filter(s => 
    s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.sellerShopName && s.sellerShopName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct({
        ...newProduct,
        rating: 5.0,
        reviews: [],
        badges: ['New'],
        stock: 100,
        ratingCount: 0,
        sales: 0,
        viewers: 0
      });
      setIsAddingProduct(false);
      setNewProduct({
        name: '',
        price: 0,
        category: CATEGORIES[0],
        image: '',
        description: '',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'White']
      });
      alert('Product published to Cloud Firestore successfully!');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-600">
        <div className="animate-spin text-4xl">⚽</div>
      </div>
    );
  }

  const isAdmin = isPassAuthenticated || user?.email === 'sportsarslan199@gmail.com';

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl max-w-md w-full border border-gray-200 text-center">
          <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-xl shadow-blue-500/30">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Admin <span className="text-blue-600">Gate</span></h2>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10 leading-loose">
            High Security Authentication <br/> Restricted to Authorized Personnel
          </p>

          <div className="space-y-6">
            {!user ? (
              <button 
                onClick={handleGoogleLogin}
                className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-4"
              >
                <LogIn size={20} />
                Login with Google
              </button>
            ) : (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                <p className="text-[10px] font-black uppercase tracking-widest">Unauthorized Account</p>
                <p className="text-xs font-bold mt-1">{user.email}</p>
              </div>
            )}

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Or Use Master Key</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Enter Master Security Key"
                className="w-full bg-gray-50 border p-5 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none font-black text-center text-xs tracking-widest text-black"
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
              />
              <button 
                type="submit"
                className="w-full bg-gray-100 text-gray-900 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-lg"
              >
                Verify Key
              </button>
            </form>

            {(user || error) && (
              <button 
                onClick={handleLogout}
                className="w-full text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                Reset Access
              </button>
            )}
          </div>
          {error && <p className="mt-6 text-red-500 text-[10px] font-black uppercase animate-pulse">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-black text-white pt-10 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter">ADMIN <span className="text-blue-500 underline">PATCH SHOP</span></h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Centralized Global Control</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all relative"
              >
                <Bell size={20} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden text-black scale-in-top">
                  <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Recent Notifications</span>
                    <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-black"><X size={14}/></button>
                  </div>
                  <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-400 text-[10px] font-black uppercase tracking-widest">No notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.type === 'New Order') setActiveTab('sales');
                            setShowNotifications(false);
                          }}
                          className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!n.isRead ? 'bg-blue-50/30' : ''}`}
                        >
                          <p className="text-[10px] font-black uppercase text-blue-600 mb-1">{n.type}</p>
                          <p className="text-xs font-bold text-gray-900">{n.title}</p>
                          <p className="text-[10px] text-gray-500 mt-1">{n.message}</p>
                          <p className="text-[8px] text-gray-400 mt-2 font-bold">{new Date(n.timestamp).toLocaleString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="flex bg-white rounded-2xl shadow-xl p-1 mb-8 border border-gray-100 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'overview', label: 'Dashboard', icon: '📊' },
            { id: 'inventory', label: 'Admin Products', icon: '📦' },
            { id: 'sales', label: 'Revenue', icon: '💰' },
            { id: 'customers', label: 'Sellers/Users', icon: '👥' },
            { id: 'withdrawals', label: 'Withdrawals', icon: '💸' },
            { id: 'settings', label: 'System Settings', icon: '⚙️' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-grow py-4 px-8 rounded-xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3 ${activeTab === tab.id ? 'bg-black text-white shadow-2xl scale-[1.02]' : 'text-gray-400 hover:text-black hover:bg-gray-50'}`}
            >
              <span className="text-xl">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Revenue', value: formatPrice(sales.reduce((acc, s) => acc + s.amount, 0)), icon: '💰', color: 'bg-green-50 text-green-600' },
              { label: 'Total Orders', value: sales.length, icon: '📦', color: 'bg-blue-50 text-blue-600' },
              { label: 'Active Sellers', value: sellers.length, icon: '👥', color: 'bg-purple-50 text-purple-600' },
              { label: 'Pending Payments', value: sales.filter(s => s.status === 'Pending Payment').length, icon: '⏳', color: 'bg-orange-50 text-orange-600' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black italic tracking-tighter">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase">Order <span className="text-blue-600 underline">Management</span></h3>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Search Customer / Order ID..."
                  className="bg-white border rounded-xl px-4 py-2.5 text-sm font-bold w-full md:w-64"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase shadow-lg flex-grow md:flex-grow-0">Process All</button>
                  <button className="bg-gray-100 text-gray-900 px-6 py-2.5 rounded-xl font-black text-xs uppercase flex-grow md:flex-grow-0 text-center">Export</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Order & Date</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer Details</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Seller / Shop</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right pr-12">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredSales.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 md:px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">#{s.id.slice(-6)}</span>
                            <span className="text-[10px] font-bold text-gray-400 mt-1">{new Date(s.date).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black uppercase tracking-tighter text-gray-900">{s.customerName}</span>
                            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{s.customerPhone}</span>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest truncate max-w-[150px]">{s.customerEmail}</span>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-xs font-black uppercase text-purple-600 tracking-tight">{s.sellerShopName || 'Main Store'}</span>
                            <span className="text-[9px] text-gray-400 font-bold uppercase">{s.sellerId || 'Direct'}</span>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-gray-900">{formatPrice(s.amount)}</span>
                            <span className="text-[10px] text-gray-400 font-bold">{s.items?.length || 1} Products</span>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-6">
                          <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            s.status === 'Confirmed' ? 'bg-green-50 text-green-600' : 
                            s.status === 'Pending Payment' ? 'bg-orange-50 text-orange-600' : 
                            'bg-blue-50 text-blue-600'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-6 md:px-10 py-6 text-right pr-12">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            {s.status === 'Pending Payment' && (
                              <button 
                                onClick={() => updateSaleStatus(s.id, 'Confirmed')}
                                className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                              >
                                Confirm
                              </button>
                            )}
                            {s.status === 'Confirmed' && (
                              <button 
                                onClick={() => updateSaleStatus(s.id, 'Completed')}
                                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                              >
                                Complete Order
                              </button>
                            )}
                            <button 
                              onClick={() => setSelectedOrder(s)}
                              className="bg-black text-white px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
                <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full overflow-hidden animate-scaleIn">
                  <div className="bg-black text-white p-8 flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-black italic tracking-tighter uppercase">Order <span className="text-blue-500 underline">Details</span></h2>
                      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2 px-1">ID: #{selectedOrder.id}</p>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all text-white"><X size={20} /></button>
                  </div>
                  <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Customer Information</h4>
                        <p className="text-sm font-black uppercase text-gray-900">{selectedOrder.customerName}</p>
                        <p className="text-xs font-bold text-gray-500 mt-1">{selectedOrder.customerPhone}</p>
                        <p className="text-xs font-bold text-gray-500">{selectedOrder.customerEmail}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-4 uppercase">Shipping Address:</p>
                        <p className="text-xs font-bold text-gray-500 leading-relaxed">
                          {selectedOrder.customerAddress || 'No Address'}<br/>
                          {selectedOrder.customerCity && `${selectedOrder.customerCity}, `}{selectedOrder.customerCountry || 'No Country'}<br/>
                          {selectedOrder.customerZip && `Zip: ${selectedOrder.customerZip}`}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Seller Details</h4>
                        <p className="text-sm font-black uppercase text-blue-600">{selectedOrder.sellerShopName || 'Main Admin Account'}</p>
                        <p className="text-xs font-bold text-gray-500 mt-1">Ref Code: {selectedOrder.sellerId || 'Direct'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Ordered Items</h4>
                      <div className="space-y-3">
                        {selectedOrder.items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <div>
                              <p className="text-xs font-black uppercase text-gray-900">{item.name}</p>
                              <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                            </div>
                            <p className="font-black text-sm">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        )) || (
                          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                             <div>
                              <p className="text-xs font-black uppercase text-gray-900">{selectedOrder.productName}</p>
                              <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Legacy Record</p>
                            </div>
                            <p className="font-black text-sm">{formatPrice(selectedOrder.amount)}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
                      <p className="text-lg font-black italic uppercase tracking-tighter">Total Due</p>
                      <p className="text-3xl font-black italic tracking-tighter text-blue-600">{formatPrice(selectedOrder.amount)}</p>
                    </div>
                  </div>
                  <div className="p-8 pt-0 flex gap-4">
                     <button onClick={() => setSelectedOrder(null)} className="flex-grow bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all">Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase">Seller <span className="text-blue-600 underline">Management</span></h3>
              <div className="flex gap-4 w-full md:w-auto">
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase shadow-lg flex-grow md:flex-grow-0">Verify All</button>
                <button className="bg-gray-100 text-gray-900 px-6 py-2.5 rounded-xl font-black text-xs uppercase flex-grow md:flex-grow-0 text-center">Export List</button>
              </div>
            </div>
            
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
               <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Seller & Shop</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">WhatsApp / Contact</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Location</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Rank</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right pr-12">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sellers.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 md:px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black uppercase tracking-tighter text-gray-900">{s.fullName}</span>
                            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{s.shopName || s.showName}</span>
                            <span className="text-[9px] text-gray-400 font-bold uppercase truncate max-w-[150px]">{s.email}</span>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-6">
                          <div className="flex flex-col">
                             <span className="text-xs font-black text-green-600 tracking-tight">{s.whatsapp}</span>
                             <span className="text-[9px] text-gray-400 font-bold uppercase">{s.contactNumber}</span>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-6 text-xs font-bold text-gray-900 uppercase">{s.location || `${s.city}, ${s.country}`}</td>
                        <td className="px-6 md:px-10 py-6 text-center">
                          <span className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                            s.rank === 'Gold' ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-50 text-gray-600'
                          }`}>
                            {s.rank}
                          </span>
                        </td>
                        <td className="px-6 md:px-10 py-6">
                          <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            s.isVerified ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                          }`}>
                            {s.isVerified ? 'VERIFIED' : 'PENDING'}
                          </span>
                        </td>
                        <td className="px-6 md:px-10 py-6 text-right pr-12">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => setSelectedSeller(s)}
                              className="bg-black text-white px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                            >
                              Details
                            </button>
                            <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Seller Details Modal */}
            {selectedSeller && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
                <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full overflow-hidden animate-scaleIn">
                  <div className="bg-purple-600 text-white p-8 flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-black italic tracking-tighter uppercase">Seller <span className="text-black underline">Profile</span></h2>
                      <p className="text-purple-100 text-[10px] font-black uppercase tracking-widest mt-2 px-1">Shop: {selectedSeller.shopName || selectedSeller.showName}</p>
                    </div>
                    <button onClick={() => setSelectedSeller(null)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all text-white"><X size={20} /></button>
                  </div>
                  <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-8 text-left">
                      <div className="space-y-4">
                        <section>
                          <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2"><UserIcon size={12}/> Personal Info</h4>
                          <p className="text-sm font-black uppercase text-gray-900">{selectedSeller.fullName}</p>
                          <p className="text-xs font-bold text-gray-500 mt-1 flex items-center gap-2"><Mail size={12}/> {selectedSeller.email}</p>
                        </section>
                        <section>
                          <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2"><Phone size={12}/> Contact</h4>
                          <p className="text-xs font-bold text-gray-900">WA: {selectedSeller.whatsapp}</p>
                          <p className="text-xs font-bold text-gray-500 mt-1">ALT: {selectedSeller.contactNumber}</p>
                        </section>
                      </div>
                      <div className="space-y-4">
                         <section>
                          <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2"><MapPin size={12}/> Location</h4>
                          <p className="text-xs font-bold text-gray-900 uppercase">{selectedSeller.city}, {selectedSeller.country}</p>
                          <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase">{selectedSeller.location}</p>
                        </section>
                        <section>
                          <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2"><ShieldCheck size={12}/> business</h4>
                          <p className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-1 rounded inline-block uppercase">{selectedSeller.businessType}</p>
                        </section>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">Financial Overview</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Available Balance</p>
                          <p className="text-xl font-black text-green-600">{formatPrice(selectedSeller.balance)}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Total Sales</p>
                          <p className="text-xl font-black text-gray-900">{selectedSeller.totalSales}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Comm. Rate</p>
                          <p className="text-xl font-black text-blue-600">{(selectedSeller.commissionRate * 100).toFixed(0)}%</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Response Time</p>
                          <p className="text-xl font-black text-gray-900">{selectedSeller.responseTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Verification Info</h4>
                      <p className="text-xs font-bold text-gray-600 flex items-center gap-2">
                        Status: <span className={`font-black uppercase ${selectedSeller.isVerified ? 'text-green-600' : 'text-orange-500'}`}>{selectedSeller.verificationStatus}</span>
                      </p>
                    </div>
                  </div>
                  <div className="p-8 pt-0 flex gap-4">
                      <button onClick={() => setSelectedSeller(null)} className="flex-grow bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-purple-600 transition-all">Close</button>
                    </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'withdrawals' && (
          <div className="space-y-8">
            <h3 className="text-3xl font-black italic tracking-tighter uppercase">Withdrawal <span className="text-blue-600 underline">Requests</span></h3>
            <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Seller</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Method</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sellers.slice(0, 3).map((s, i) => (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-10 py-6 text-xs font-bold text-gray-500 uppercase">March {28 - i}, 2024</td>
                      <td className="px-10 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-black uppercase tracking-tighter text-gray-900">{s.fullName}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{s.email}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-sm font-black text-gray-900">{formatPrice(1250)}</td>
                      <td className="px-10 py-6 text-xs font-bold text-gray-500 uppercase">{s.paymentDetails}</td>
                      <td className="px-10 py-6">
                        <div className="flex gap-4">
                          <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-green-600/20">Approve</button>
                          <button className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="animate-fadeIn space-y-8 max-w-2xl mx-auto">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-10">Cloud <span className="text-blue-600">Infrastructure</span></h3>
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 mb-8">
                <div className="flex items-center gap-4 text-blue-600 mb-4">
                  <ShieldCheck size={24} />
                  <span className="text-sm font-black uppercase tracking-widest">Live Cloud Firestore Connected</span>
                </div>
                <p className="text-[10px] font-bold text-blue-800 uppercase tracking-widest leading-loose text-left">
                  Region: asia-southeast1 <br/>
                  Project ID: gen-lang-client-0876635319 <br/>
                  Status: All systems operational
                </p>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
                User Management is now handled via Firebase Authentication. 
                Manual password hashing has been deprecated for superior security.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase">Inventory <span className="text-blue-600 underline">Management</span></h3>
              <button 
                onClick={() => setIsAddingProduct(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase shadow-xl shadow-blue-600/20 flex items-center gap-3"
              >
                <Plus size={18} /> Add New Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden group">
                  <div className="aspect-square bg-gray-100 relative group-hover:scale-105 transition-transform duration-700">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 flex gap-2">
                       <button className="bg-white text-gray-900 p-2 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition-all"><Edit2 size={14}/></button>
                       <button className="bg-white text-red-600 p-2 rounded-lg shadow-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14}/></button>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-black uppercase tracking-tight">{product.name}</h4>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{product.category}</p>
                      </div>
                      <span className="text-xl font-black tracking-tighter">{formatPrice(product.price)}</span>
                    </div>
                    <div className="flex gap-2">
                      {product.badges?.map((badge, idx) => (
                        <span key={idx} className="bg-gray-100 text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest">{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Product Modal */}
            {isAddingProduct && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                <div className="bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full overflow-hidden animate-scaleIn">
                  <div className="bg-blue-600 text-white p-10 flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-black italic tracking-tighter uppercase">Add <span className="text-black underline">Product</span></h2>
                      <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mt-2">Cloud Firestore Inventory</p>
                    </div>
                    <button onClick={() => setIsAddingProduct(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all text-white"><X size={20} /></button>
                  </div>
                  <form onSubmit={handleAddProduct} className="p-10 space-y-6 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Product Name</label>
                      <input 
                        required
                        className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                        value={newProduct.name}
                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Base Price ($)</label>
                        <input 
                          required
                          type="number"
                          className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                          value={newProduct.price}
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
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                        value={newProduct.image}
                        onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Description</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                        value={newProduct.description}
                        onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      />
                    </div>
                    <div className="pt-6">
                      <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">Publish to Global Store</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
