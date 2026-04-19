
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../constants';

const hashPassword = async (password: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const Admin: React.FC = () => {
  const { products, sales, customers, sellers, addProduct, updateSaleStatus, formatPrice } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'sales' | 'customers' | 'settings' | 'withdrawals'>('overview');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [adminPanelUrl, setAdminPanelUrl] = useState('');

  // Search and Detail State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Filtered sales
  const filteredSales = sales.filter(s => 
    s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.sellerShopName && s.sellerShopName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Password Update State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');

  useEffect(() => {
    const checkDefaultPassword = async () => {
      if (!localStorage.getItem('wm_admin_hash')) {
        const defaultHash = await hashPassword('ADMIN_SECURE');
        localStorage.setItem('wm_admin_hash', defaultHash);
      }
    };
    checkDefaultPassword();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputHash = await hashPassword(adminPassword);
    const storedHash = localStorage.getItem('wm_admin_hash');

    if (inputHash === storedHash) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Access Denied: Invalid Security Credentials');
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordStatus('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordStatus('Password must be at least 6 characters');
      return;
    }
    const hash = await hashPassword(newPassword);
    localStorage.setItem('wm_admin_hash', hash);
    setPasswordStatus('Password updated successfully!');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordStatus(''), 3000);
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    // In actual use, this logic is admin-only.
    alert('Products are managed by Admin Only.');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl max-w-md w-full border border-gray-200 text-center">
          <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-xl shadow-blue-500/30">
            🔐
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Admin <span className="text-blue-600">Access</span></h2>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10 leading-loose">
            High Security Gate <br/> USA (+1) / Pakistan (+92) Authorization Only
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="Enter Admin Password"
              className="w-full bg-gray-50 border p-5 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none font-black text-center text-lg tracking-widest text-black"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-[10px] font-black uppercase animate-bounce">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 transition-all"
            >
              Verify Identity
            </button>
          </form>
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
          <button onClick={() => setIsAuthenticated(false)} className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase">Logout</button>
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
                          {selectedOrder.customerAddress}<br/>
                          {selectedOrder.customerCity && `${selectedOrder.customerCity}, `}{selectedOrder.customerCountry}<br/>
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
                            <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">Edit</button>
                            <button className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline">Ban</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
              <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-10">Security <span className="text-blue-600">Upgrade</span></h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest text-left">New Admin Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest text-left">Confirm Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleUpdatePassword}
                  className="w-full bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all"
                >
                  Update Admin Password
                </button>
                {passwordStatus && (
                  <p className={`text-center text-[10px] font-black uppercase tracking-widest ${passwordStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordStatus}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-10">Advanced <span className="text-blue-600">Configuration</span></h3>
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest text-left">Admin Panel URL (Placeholder)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="flex-grow bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                      placeholder="https://admin-panel-v2.apex.com"
                      value={adminPanelUrl}
                      onChange={e => setAdminPanelUrl(e.target.value)}
                    />
                    <button className="bg-blue-600 text-white px-6 rounded-xl font-black text-xs uppercase shadow-lg">Save</button>
                  </div>
                  <p className="text-[9px] text-gray-400 mt-2 uppercase font-bold tracking-widest">Update the target URL for the centralized manufacturing controller.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="bg-white p-10 rounded-3xl shadow-sm border text-center border-gray-100 py-32">
            <div className="text-6xl mb-6 grayscale opacity-20">📦</div>
            <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Inventory <span className="text-blue-600">Control</span></h3>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest max-w-md mx-auto leading-loose">
              Only authorized Admin accounts can add, edit, or delete global products. 
              Changes reflect instantly across all 1,000+ seller shows.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
