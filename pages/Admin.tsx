
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../constants';

const Admin: React.FC = () => {
  const { products, sales, customers, addProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'sales' | 'customers'>('overview');
  
  // Form State for Posting
  const [newP, setNewP] = useState({
    name: '',
    category: CATEGORIES[0],
    price: 0,
    description: '',
    image: `https://picsum.photos/seed/${Math.random()}/800/800`,
    stock: 100,
    rating: '5.0'
  });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      ...newP,
      price: Number(newP.price),
      stock: Number(newP.stock)
    });
    alert('Product Posted Successfully to the Global Catalog!');
    setNewP({
      name: '',
      category: CATEGORIES[0],
      price: 0,
      description: '',
      image: `https://picsum.photos/seed/${Math.random()}/800/800`,
      stock: 100,
      rating: '5.0'
    });
  };

  const totalRevenue = sales.reduce((acc, curr) => acc + curr.amount, 0);
  const avgOrderValue = totalRevenue / (sales.length || 1);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Admin Header Area */}
      <div className="bg-black text-white pt-10 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-5xl font-black italic tracking-tighter">SELLER <span className="text-blue-500 underline">CENTRAL</span></h1>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Apex Market Enterprise Node: #AF-9921
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-white/10 transition-all">Download Reports</button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all">Export Data</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        {/* Navigation Tabs */}
        <div className="flex bg-white rounded-2xl shadow-xl p-1 mb-8 border border-gray-100 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'inventory', label: 'Inventory (Posting)', icon: '📦' },
            { id: 'sales', label: 'Sales Data', icon: '💰' },
            { id: 'customers', label: 'Customer DB', icon: '👥' }
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
          <div className="animate-fadeIn">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Total Sales Revenue', val: `$${totalRevenue.toLocaleString()}`, change: '+22.4%', up: true },
                { label: 'Order Velocity', val: sales.length, change: '+12%', up: true },
                { label: 'Avg Order Value', val: `$${avgOrderValue.toFixed(2)}`, change: '-3.1%', up: false },
                { label: 'Catalog Size', val: products.length, change: '+5 New', up: true }
              ].map(stat => (
                <div key={stat.label} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col group hover:shadow-xl transition-all">
                  <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-2">{stat.label}</span>
                  <div className="flex items-end justify-between">
                    <span className="text-4xl font-black tracking-tighter group-hover:text-blue-600 transition-colors">{stat.val}</span>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full ${stat.up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sales Chart Simulation */}
              <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-black uppercase tracking-tighter text-xl italic">Sales <span className="text-blue-600 underline">Performance</span></h3>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400">
                      <span className="w-3 h-3 bg-blue-500 rounded-sm"></span> Current Year
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400">
                      <span className="w-3 h-3 bg-gray-200 rounded-sm"></span> Last Year
                    </span>
                  </div>
                </div>
                <div className="h-80 flex items-end justify-between gap-3">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex-grow group flex flex-col items-center gap-3">
                      <div className="w-full relative h-full flex items-end gap-1">
                        <div 
                          style={{ height: `${20 + Math.random() * 80}%` }} 
                          className="flex-grow bg-blue-100 group-hover:bg-blue-600 transition-all rounded-t-lg relative"
                        >
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl">
                            ${(1000 + Math.random() * 5000).toFixed(0)}
                          </div>
                        </div>
                        <div 
                          style={{ height: `${10 + Math.random() * 60}%` }} 
                          className="flex-grow bg-gray-100 rounded-t-lg"
                        ></div>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">M{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real Customer Traffic */}
              <div className="bg-black text-white rounded-3xl p-10 shadow-2xl shadow-blue-500/20">
                <h3 className="font-black uppercase tracking-widest text-sm mb-10 text-blue-500 italic">Global Traffic Source</h3>
                <div className="space-y-8">
                  {[
                    { country: 'United States', pct: '45%', orders: 540 },
                    { country: 'United Kingdom', pct: '22%', orders: 260 },
                    { country: 'Germany', pct: '18%', orders: 210 },
                    { country: 'Japan', pct: '15%', orders: 180 }
                  ].map(loc => (
                    <div key={loc.country} className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span>{loc.country}</span>
                        <span className="text-blue-400">{loc.orders} Orders</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div style={{ width: loc.pct }} className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-16 pt-8 border-t border-white/10">
                  <p className="text-xs font-bold text-gray-500 leading-relaxed uppercase italic">
                    All data is synchronized in real-time with the Apex Global Fulfillment Network.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Post New Product Form */}
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-50">
                <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-8">Post <span className="text-blue-600 underline">New Product</span></h3>
                <form onSubmit={handlePost} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Item Name</label>
                      <input 
                        required
                        type="text" 
                        value={newP.name}
                        onChange={e => setNewP({...newP, name: e.target.value})}
                        className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold"
                        placeholder="e.g. Pro-Fit Soccer Jersey"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Category</label>
                      <select 
                        className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold"
                        value={newP.category}
                        onChange={e => setNewP({...newP, category: e.target.value})}
                      >
                        {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Retail Price ($)</label>
                      <input 
                        required
                        type="number" 
                        value={newP.price}
                        onChange={e => setNewP({...newP, price: Number(e.target.value)})}
                        className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Initial Stock</label>
                      <input 
                        required
                        type="number" 
                        value={newP.stock}
                        onChange={e => setNewP({...newP, stock: Number(e.target.value)})}
                        className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Detailed Description</label>
                    <textarea 
                      required
                      rows={4}
                      value={newP.description}
                      onChange={e => setNewP({...newP, description: e.target.value})}
                      className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold"
                      placeholder="Highlight features, material, and performance benefits..."
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/40 hover:bg-black transition-all transform active:scale-95"
                  >
                    🚀 POST TO MARKET
                  </button>
                </form>
              </div>

              {/* Current Active Listings */}
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-8">Active Listings <span className="text-gray-300">({products.length})</span></h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin">
                  {products.slice(0, 10).map(p => (
                    <div key={p.id} className="flex items-center gap-4 p-4 border rounded-2xl hover:bg-gray-50 transition-colors">
                      <img src={p.image} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                      <div className="flex-grow">
                        <div className="font-bold text-sm uppercase">{p.name}</div>
                        <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{p.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-gray-900">${p.price.toFixed(2)}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase">{p.stock} units</div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-4 text-[10px] font-black uppercase text-gray-400 border-2 border-dashed rounded-2xl hover:text-blue-500 hover:border-blue-300 transition-all">
                    Load thousands more items...
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="animate-fadeIn bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-10 border-b flex justify-between items-center">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase">Fulfillment <span className="text-blue-600 underline">Ledger</span></h3>
              <div className="text-[10px] font-black uppercase text-gray-400">Showing last 50 transactions</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <tr>
                    <th className="px-10 py-6">Transaction ID</th>
                    <th className="px-10 py-6">Product</th>
                    <th className="px-10 py-6">Customer</th>
                    <th className="px-10 py-6">Amount</th>
                    <th className="px-10 py-6">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {sales.map(sale => (
                    <tr key={sale.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                      <td className="px-10 py-6 font-bold text-gray-400">{sale.id}</td>
                      <td className="px-10 py-6 font-black uppercase">{sale.productName}</td>
                      <td className="px-10 py-6 font-bold">{sale.customerName}</td>
                      <td className="px-10 py-6 font-black text-blue-600">${sale.amount.toFixed(2)}</td>
                      <td className="px-10 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${sale.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customers.map(customer => (
              <div key={customer.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">👤</div>
                <h4 className="text-xl font-black tracking-tight mb-1">{customer.name}</h4>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">{customer.email}</p>
                
                <div className="space-y-4 pt-6 border-t border-gray-50">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase">
                    <span className="text-gray-400">Total Spent</span>
                    <span className="text-blue-600">${customer.totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase">
                    <span className="text-gray-400">Order Count</span>
                    <span>{customer.orderCount} Orders</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
