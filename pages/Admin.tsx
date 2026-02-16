
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../constants';

const Admin: React.FC = () => {
  const { products, sales, customers, addProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'sales' | 'customers' | 'settings'>('overview');
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [adminPanelUrl, setAdminPanelUrl] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // USA Code: +1, Pakistan Code: +92
    if (accessCode.startsWith('+1') || accessCode.startsWith('+92') || accessCode === 'ADMIN_SECURE') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Access Not Allowed: Invalid country code security check.');
    }
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
              type="text" 
              placeholder="+1 or +92 Access Code"
              className="w-full bg-gray-50 border p-5 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none font-black text-center text-lg tracking-widest"
              value={accessCode}
              onChange={e => setAccessCode(e.target.value)}
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
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Admin Share (95%)', val: `$${(sales.reduce((a,c)=>a+c.amount,0)*0.95).toLocaleString()}`, color: 'text-blue-600' },
              { label: 'Seller Share (5%)', val: `$${(sales.reduce((a,c)=>a+c.amount,0)*0.05).toLocaleString()}`, color: 'text-green-600' },
              { label: 'Total Global Shows', val: '1,240', color: 'text-purple-600' },
              { label: 'Awaiting Approval', val: '14', color: 'text-red-600' },
            ].map(stat => (
              <div key={stat.label} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest">{stat.label}</span>
                <div className="text-3xl font-black tracking-tighter mt-2">{stat.val}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="animate-fadeIn bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-2xl mx-auto">
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

              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <h4 className="font-black uppercase text-xs text-blue-600 mb-2">Global Routing Rule</h4>
                <p className="text-xs text-blue-900 leading-relaxed font-bold">
                  All seller-created shows automatically pull inventory from this master admin panel. 
                  Individual show links are publicly accessible and resolution-independent.
                </p>
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
