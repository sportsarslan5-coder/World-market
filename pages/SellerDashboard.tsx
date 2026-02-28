import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SELLERS, PRODUCTS, MOCK_SALES } from '../constants';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Plus, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  Settings, 
  LogOut,
  Wallet,
  Clock,
  CheckCircle,
  AlertCircle,
  Search
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const SellerDashboard: React.FC = () => {
  const { formatPrice } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'earnings'>('overview');
  
  // Mock current logged in seller
  const seller = SELLERS[0];
  const sellerProducts = PRODUCTS.filter(p => p.sellerId === seller.id);

  const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-600/5">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
          <Icon size={28} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-500 text-xs font-black uppercase tracking-widest">
            <ArrowUpRight size={14} />
            {trend}
          </div>
        )}
      </div>
      <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{title}</h3>
      <p className="text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-900 text-white p-8 flex flex-col hidden lg:flex">
        <div className="mb-12">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">
            World <span className="text-blue-500">Seller</span>
          </h1>
        </div>

        <nav className="space-y-4 flex-grow">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'products', label: 'My Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'earnings', label: 'Earnings', icon: DollarSign },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/10 space-y-4">
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Settings size={20} />
            Settings
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900 leading-none mb-2">
              Welcome back, <span className="text-blue-600">{seller.fullName.split(' ')[0]}</span>
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              Manage your global business from one place
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">System Active</span>
            </div>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3">
              <Plus size={20} />
              Add Product
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard 
                title="Total Revenue" 
                value={formatPrice(seller.balance * 10)} 
                icon={DollarSign} 
                trend="+12.5%" 
                color="bg-blue-50 text-blue-600" 
              />
              <StatCard 
                title="Total Orders" 
                value={seller.totalSales} 
                icon={ShoppingCart} 
                trend="+8.2%" 
                color="bg-green-50 text-green-600" 
              />
              <StatCard 
                title="Active Products" 
                value={sellerProducts.length} 
                icon={Package} 
                color="bg-purple-50 text-purple-600" 
              />
              <StatCard 
                title="Customer Rating" 
                value={`${seller.rating} / 5.0`} 
                icon={TrendingUp} 
                color="bg-yellow-50 text-yellow-600" 
              />
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-10 rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black uppercase tracking-tighter">Sales Performance</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600">Monthly</button>
                    <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50">Weekly</button>
                  </div>
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_SALES}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900}} />
                      <Tooltip 
                        contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}
                        itemStyle={{fontWeight: 900, textTransform: 'uppercase', fontSize: '10px'}}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-10">Recent Orders</h3>
                <div className="space-y-8">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ShoppingCart size={20} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-black uppercase tracking-tighter text-gray-900">Order #WM-823{i}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">2 hours ago • $125.00</p>
                      </div>
                      <div className="text-green-500">
                        <CheckCircle size={18} />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-12 py-4 rounded-2xl border-2 border-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 hover:text-blue-600 transition-all">
                  View All Orders
                </button>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Earnings & Commission */}
              <div className="bg-gray-900 text-white p-12 rounded-[4rem] shadow-2xl shadow-blue-600/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-2">Available Balance</h3>
                      <p className="text-5xl font-black uppercase tracking-tighter">{formatPrice(seller.balance)}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
                      <Wallet size={32} className="text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Commission Rate</h4>
                      <p className="text-2xl font-black text-blue-500">5%</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Earnings</h4>
                      <p className="text-2xl font-black text-green-500">{formatPrice(seller.balance * 1.5)}</p>
                    </div>
                  </div>

                  <button className="w-full bg-white text-gray-900 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-black/20">
                    Request Withdrawal
                  </button>
                </div>
              </div>

              {/* Inventory Alert */}
              <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                    <AlertCircle size={24} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tighter">Inventory Alerts</h3>
                </div>
                <div className="space-y-6">
                  {sellerProducts.slice(0, 3).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                      <div className="flex items-center gap-4">
                        <img src={p.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-tighter text-gray-900">{p.name}</h4>
                          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Only {Math.floor(Math.random() * 10)} items left</p>
                        </div>
                      </div>
                      <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Restock</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5 overflow-hidden">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Manage Products</h3>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Search products..." className="bg-gray-50 border-none rounded-xl pl-12 pr-6 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Stock</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sellerProducts.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <img src={p.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                          <span className="text-sm font-black uppercase tracking-tighter text-gray-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-xs font-bold text-gray-500 uppercase">{p.category}</td>
                      <td className="px-10 py-6 text-sm font-black text-gray-900">{formatPrice(p.price)}</td>
                      <td className="px-10 py-6 text-sm font-black text-gray-900">{p.stock}</td>
                      <td className="px-10 py-6">
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[8px] font-black uppercase tracking-widest rounded-full">Active</span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"><Settings size={16} /></button>
                          <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"><LogOut size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboard;
