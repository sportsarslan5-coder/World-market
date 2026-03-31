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
  const seller = SELLERS[0];
  const { formatPrice } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'promote' | 'orders' | 'earnings'>('overview');
  
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
            { id: 'promote', label: 'Promote Products', icon: Package },
            { id: 'orders', label: 'My Referrals', icon: ShoppingCart },
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
                      Share this link to earn {(seller.commissionRate * 100).toFixed(0)}% commission on every sale
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
                      <p className="text-3xl font-black uppercase tracking-tighter text-white leading-none">{(seller.commissionRate * 100).toFixed(0)}%</p>
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
                value={formatPrice(seller.balance)} 
                icon={DollarSign} 
                trend="+8.2%" 
                color="bg-green-50 text-green-600" 
              />
              <StatCard 
                title="Active Referrals" 
                value="42" 
                icon={Users} 
                trend="+5" 
                color="bg-purple-50 text-purple-600" 
              />
              <StatCard 
                title="Conversion Rate" 
                value="3.2%" 
                icon={TrendingUp} 
                trend="+0.4%" 
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
              <p className="text-2xl font-black text-blue-500">{(seller.commissionRate * 100).toFixed(0)}%</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Earnings</h4>
              <p className="text-2xl font-black text-green-500">{formatPrice(seller.balance)}</p>
            </div>
          </div>

                  <button className="w-full bg-white text-gray-900 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-black/20">
                    Request Withdrawal
                  </button>
                </div>
              </div>

              {/* Recent Referrals */}
              <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tighter">Recent Referrals</h3>
                </div>
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-blue-600">
                          {String.fromCharCode(64 + i)}
                        </div>
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-tighter text-gray-900">Customer {i}</h4>
                          <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Order Completed</p>
                        </div>
                      </div>
                      <p className="text-sm font-black text-gray-900">+$12.50</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'promote' && (
          <div className="space-y-12">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">
                Promote Products
              </h3>
              <div className="relative w-96">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search products to promote..." 
                  className="w-full pl-16 pr-8 py-5 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-blue-600/5 focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all font-bold text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.slice(0, 12).map(product => (
                <div key={product.id} className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-600/5 overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 border border-white/20">
                      Commission: {formatPrice(seller.commissionRate * product.price)}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-lg font-black uppercase tracking-tighter text-gray-900 mb-2 truncate">{product.name}</h4>
                    <div className="flex justify-between items-center mb-8">
                      <p className="text-2xl font-black text-blue-600">{formatPrice(product.price)}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{product.category}</p>
                    </div>
                    <button 
                      onClick={() => {
                        const link = `${window.location.origin}/product/${product.id}?ref=${seller.showName}`;
                        navigator.clipboard.writeText(link);
                        alert('Product referral link copied!');
                      }}
                      className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                    >
                      <Plus size={16} />
                      Copy Referral Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5 overflow-hidden">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-2xl font-black uppercase tracking-tighter">My Referrals</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Commission</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-10 py-6 text-sm font-black uppercase tracking-tighter text-gray-900">#WM-REF-823{i}</td>
                      <td className="px-10 py-6 text-xs font-bold text-gray-500 uppercase">Customer {i}</td>
                      <td className="px-10 py-6 text-sm font-black text-gray-900">{formatPrice(150)}</td>
                      <td className="px-10 py-6 text-sm font-black text-green-600">+{formatPrice(150 * seller.commissionRate)}</td>
                      <td className="px-10 py-6">
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[8px] font-black uppercase tracking-widest rounded-full">Completed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-blue-600/20">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">Available Balance</h4>
                <p className="text-4xl font-black uppercase tracking-tighter">{formatPrice(seller.balance)}</p>
                <button className="w-full mt-8 bg-blue-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all">Withdraw Now</button>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-600/5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Pending Commission</h4>
                <p className="text-4xl font-black uppercase tracking-tighter text-gray-900">{formatPrice(450.25)}</p>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-600/5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Withdrawn</h4>
                <p className="text-4xl font-black uppercase tracking-tighter text-gray-900">{formatPrice(12400.00)}</p>
              </div>
            </div>

            <div className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5 overflow-hidden">
              <div className="p-10 border-b border-gray-50">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Transaction History</h3>
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
                    {[1, 2, 3].map(i => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-10 py-6 text-xs font-bold text-gray-500 uppercase">March {20 - i}, 2024</td>
                        <td className="px-10 py-6 text-sm font-black uppercase tracking-tighter text-gray-900">Commission Payout</td>
                        <td className="px-10 py-6 text-sm font-black text-green-600">+{formatPrice(1200)}</td>
                        <td className="px-10 py-6">
                          <span className="px-3 py-1 bg-green-50 text-green-600 text-[8px] font-black uppercase tracking-widest rounded-full">Paid</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboard;
