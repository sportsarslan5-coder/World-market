import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SELLERS, PRODUCTS, MOCK_SALES, MOCK_ORDERS } from '../constants';
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
  Search,
  Truck,
  FileText,
  Award,
  ShieldCheck,
  ChevronRight,
  Upload,
  BarChart3,
  History,
  ArrowDownCircle,
  ArrowUpCircle,
  Eye
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const SellerDashboard: React.FC = () => {
  const seller = SELLERS[0];
  const { formatPrice } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'earnings' | 'verification' | 'ranking'>('overview');
  
  const referralLink = `${window.location.origin}?ref=${seller.showName}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  const RankBadge = ({ rank }: { rank: string }) => {
    switch (rank) {
      case 'Gold':
        return (
          <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-2xl border border-yellow-200">
            <Award size={18} className="text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">Gold Seller</span>
          </div>
        );
      case 'Silver':
        return (
          <div className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-2xl border border-gray-200">
            <Award size={18} className="text-gray-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Silver Seller</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl border border-blue-200">
            <Award size={18} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Standard Seller</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-900 text-white p-8 flex flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="mb-12">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">
            World <span className="text-blue-500">Seller</span>
          </h1>
        </div>

        <nav className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders & Tracking', icon: Truck },
            { id: 'earnings', label: 'Earnings & Payouts', icon: DollarSign },
            { id: 'verification', label: 'Verification/KYC', icon: ShieldCheck },
            { id: 'ranking', label: 'Seller Ranking', icon: Award },
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
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">
                Welcome back, <span className="text-blue-600">{seller.fullName.split(' ')[0]}</span>
              </h2>
              <RankBadge rank={seller.rank} />
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              Manage your global business from one place
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">System Active</span>
            </div>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Referral Link Section */}
            <div className="bg-blue-600 p-12 rounded-[3rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                  <div>
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none mb-4">
                      Your Referral Link
                    </h3>
                    <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-8">
                      Share this link to earn {(seller.commissionRate * 100).toFixed(1)}% commission on every sale
                    </p>
                    <div className="flex items-center gap-4 bg-white/10 p-2 rounded-2xl border border-white/20 backdrop-blur-md">
                      <code className="px-4 py-2 text-white font-mono text-sm truncate max-w-[200px] md:max-w-md">
                        {referralLink}
                      </code>
                      <button 
                        onClick={copyToClipboard}
                        className="bg-white text-blue-600 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-50 transition-all active:scale-95"
                      >
                        {copied ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-md text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-2">Seller Rank</p>
                      <p className="text-3xl font-black uppercase tracking-tighter text-white leading-none">{seller.rank}</p>
                    </div>
                    <div className="bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-md text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-2">Commission</p>
                      <p className="text-3xl font-black uppercase tracking-tighter text-white leading-none">{(seller.commissionRate * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard 
                title="Total Sales" 
                value={seller.totalSales} 
                icon={ShoppingCart} 
                trend="+12.5%" 
                color="bg-blue-50 text-blue-600" 
              />
              <StatCard 
                title="Total Earnings" 
                value={formatPrice(seller.totalEarnings)} 
                icon={DollarSign} 
                trend="+8.2%" 
                color="bg-green-50 text-green-600" 
              />
              <StatCard 
                title="Active Products" 
                value={PRODUCTS.filter(p => p.sellerId === seller.id).length} 
                icon={Package} 
                trend="+2" 
                color="bg-purple-50 text-purple-600" 
              />
              <StatCard 
                title="Rating" 
                value={seller.rating} 
                icon={TrendingUp} 
                trend="+0.1" 
                color="bg-orange-50 text-orange-600" 
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
                  {MOCK_ORDERS.map(order => (
                    <div key={order.id} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ShoppingCart size={20} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-black uppercase tracking-tighter text-gray-900">Order {order.id}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.date} • {formatPrice(order.amount)}</p>
                      </div>
                      <div className={`${order.status === 'Delivered' ? 'text-green-500' : 'text-blue-500'}`}>
                        {order.status === 'Delivered' ? <CheckCircle size={18} /> : <Clock size={18} />}
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="w-full mt-12 py-4 rounded-2xl border-2 border-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 hover:text-blue-600 transition-all"
                >
                  View All Orders
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">
                Manage <span className="text-blue-600 underline">Inventory</span>
              </h3>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-grow md:w-80">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full pl-16 pr-8 py-4 rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-blue-600/5 focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all font-bold text-sm"
                  />
                </div>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3 whitespace-nowrap">
                  <Plus size={18} />
                  Add New Product
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {PRODUCTS.filter(p => p.sellerId === seller.id).map(product => (
                <div key={product.id} className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-600/5 overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 border border-white/20">
                      Stock: {product.stock}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-lg font-black uppercase tracking-tighter text-gray-900 mb-2 truncate">{product.name}</h4>
                    <div className="flex justify-between items-center mb-8">
                      <p className="text-2xl font-black text-blue-600">{formatPrice(product.price)}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{product.category}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="bg-gray-100 text-gray-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all">
                        Edit
                      </button>
                      <button className="bg-red-50 text-red-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-100 transition-all">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-12">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">
                Order <span className="text-blue-600 underline">Tracking</span>
              </h3>
            </div>

            <div className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {MOCK_ORDERS.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-10 py-6 text-sm font-black uppercase tracking-tighter text-gray-900">{order.id}</td>
                        <td className="px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-xs font-black uppercase text-gray-900">{order.customerName}</span>
                            <span className="text-[10px] text-gray-400">{order.customerEmail}</span>
                          </div>
                        </td>
                        <td className="px-10 py-6 text-xs font-bold text-gray-500 uppercase">
                          {order.items && order.items.length > 0 
                            ? (order.items.length === 1 ? order.items[0].name : `${order.items[0].name} +${order.items.length - 1}`)
                            : (order as any).productName || 'Direct Order'}
                        </td>
                        <td className="px-10 py-6 text-sm font-black text-gray-900">{formatPrice(order.amount)}</td>
                        <td className="px-10 py-6">
                          <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 
                            order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 
                            'bg-orange-50 text-orange-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-10 py-6">
                          <button className="text-blue-600 hover:text-blue-700 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                            Update Status <ChevronRight size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-blue-600/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-2xl" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">Available Balance</h4>
                <p className="text-4xl font-black uppercase tracking-tighter">{formatPrice(seller.balance)}</p>
                <button className="w-full mt-8 bg-blue-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                  Withdraw Now
                </button>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-600/5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Earnings</h4>
                <p className="text-4xl font-black uppercase tracking-tighter text-gray-900">{formatPrice(seller.totalEarnings)}</p>
                <div className="mt-4 flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest">
                  <ArrowUpCircle size={14} />
                  Lifetime Profit
                </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-600/5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Withdrawn</h4>
                <p className="text-4xl font-black uppercase tracking-tighter text-gray-900">{formatPrice(seller.withdrawnAmount)}</p>
                <div className="mt-4 flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest">
                  <ArrowDownCircle size={14} />
                  Processed Payouts
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5 overflow-hidden">
              <div className="p-10 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Transaction History</h3>
                <button className="text-blue-600 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                  Download Report <FileText size={16} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Description</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[1, 2, 3, 4].map(i => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-10 py-6 text-xs font-bold text-gray-500 uppercase">March {25 - i}, 2024</td>
                        <td className="px-10 py-6 text-sm font-black uppercase tracking-tighter text-gray-900">
                          {i % 2 === 0 ? 'Commission Payout' : 'Withdrawal Request'}
                        </td>
                        <td className={`px-10 py-6 text-sm font-black ${i % 2 === 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {i % 2 === 0 ? '+' : '-'}{formatPrice(1200 * i)}
                        </td>
                        <td className="px-10 py-6">
                          <span className="px-3 py-1 bg-green-50 text-green-600 text-[8px] font-black uppercase tracking-widest rounded-full">Completed</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="space-y-12">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">
                Seller <span className="text-blue-600 underline">Verification</span>
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tighter">Verification Status</h4>
                    <p className="text-green-500 text-[10px] font-black uppercase tracking-widest">Verified Business</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-500">
                        <CheckCircle size={20} />
                      </div>
                      <span className="text-sm font-black uppercase tracking-tighter text-gray-900">Identity Verification</span>
                    </div>
                    <span className="text-[10px] font-black uppercase text-green-500">Approved</span>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-500">
                        <CheckCircle size={20} />
                      </div>
                      <span className="text-sm font-black uppercase tracking-tighter text-gray-900">Business License</span>
                    </div>
                    <span className="text-[10px] font-black uppercase text-green-500">Approved</span>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-500">
                        <CheckCircle size={20} />
                      </div>
                      <span className="text-sm font-black uppercase tracking-tighter text-gray-900">Bank Statement</span>
                    </div>
                    <span className="text-[10px] font-black uppercase text-green-500">Approved</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-12 rounded-[4rem] shadow-2xl shadow-blue-600/20">
                <h4 className="text-xl font-black uppercase tracking-tighter mb-8">KYC Documents</h4>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-12 leading-relaxed">
                  Upload your documents to maintain your verified status and unlock higher withdrawal limits.
                </p>

                <div className="space-y-6">
                  <div className="border-2 border-dashed border-white/10 rounded-[2rem] p-10 text-center hover:border-blue-500 transition-all group cursor-pointer">
                    <Upload size={32} className="mx-auto mb-4 text-gray-500 group-hover:text-blue-500 transition-all" />
                    <p className="text-sm font-black uppercase tracking-tighter mb-2">Upload New Document</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">PDF, JPG, or PNG (Max 5MB)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ranking' && (
          <div className="space-y-12">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">
                Seller <span className="text-blue-600 underline">Ranking System</span>
              </h3>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  rank: 'Gold',
                  color: 'bg-yellow-500',
                  lightColor: 'bg-yellow-50',
                  textColor: 'text-yellow-700',
                  criteria: ['> 200 Products Sold', '4.5+ Rating', 'Verified Business'],
                  commission: '8-8.5%',
                  benefits: ['Priority Listing', 'Premium Support', 'Lower Payout Fees']
                },
                {
                  rank: 'Silver',
                  color: 'bg-gray-400',
                  lightColor: 'bg-gray-50',
                  textColor: 'text-gray-700',
                  criteria: ['> 100 Products Sold', '4.0+ Rating', 'Verified Seller'],
                  commission: '4%',
                  benefits: ['Standard Listing', 'Email Support', 'Standard Fees']
                },
                {
                  rank: 'Standard',
                  color: 'bg-blue-500',
                  lightColor: 'bg-blue-50',
                  textColor: 'text-blue-700',
                  criteria: ['Basic Account', 'New Seller', 'No Sales Requirement'],
                  commission: '3%',
                  benefits: ['Basic Listing', 'Community Support', 'Standard Fees']
                }
              ].map(tier => (
                <div key={tier.rank} className={`bg-white rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5 overflow-hidden flex flex-col ${seller.rank === tier.rank ? 'ring-4 ring-blue-600 ring-offset-4' : ''}`}>
                  <div className={`${tier.color} p-12 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <Award size={48} className="mb-6" />
                    <h4 className="text-4xl font-black italic uppercase tracking-tighter mb-2">{tier.rank}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Tier Status</p>
                  </div>
                  <div className="p-12 space-y-10 flex-grow">
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Criteria</h5>
                      <ul className="space-y-4">
                        {tier.criteria.map((c, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-black uppercase tracking-tighter text-gray-900">
                            <div className={`w-2 h-2 rounded-full ${tier.color}`} />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Commission</h5>
                      <p className={`text-3xl font-black ${tier.textColor}`}>{tier.commission}</p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Benefits</h5>
                      <ul className="space-y-4">
                        {tier.benefits.map((b, i) => (
                          <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                            <CheckCircle size={14} className="text-green-500" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {seller.rank === tier.rank && (
                    <div className="px-12 pb-12">
                      <div className="bg-blue-600 text-white py-4 rounded-2xl text-center font-black uppercase text-[10px] tracking-widest">
                        Current Rank
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboard;
