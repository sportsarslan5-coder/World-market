
import React from 'react';
import { MOCK_SALES, MOCK_CUSTOMERS, PRODUCTS } from '../constants';

const Admin: React.FC = () => {
  const totalRevenue = MOCK_SALES.reduce((acc, curr) => acc + curr.sales, 0);
  const totalCustomers = MOCK_CUSTOMERS.length;
  const inventoryValue = PRODUCTS.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter">EXECUTIVE <span className="text-blue-600 underline">DASHBOARD</span></h1>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-1">Enterprise Sales & Logistics Control</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white px-4 py-2 border rounded font-bold text-xs uppercase hover:bg-gray-50">Export CSV</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-xs uppercase shadow-lg shadow-blue-500/20">Generate Report</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Annual Revenue', val: `$${totalRevenue.toLocaleString()}`, change: '+12.5%', color: 'text-green-600' },
            { label: 'Active Customers', val: totalCustomers, change: '+4%', color: 'text-blue-600' },
            { label: 'Inventory Value', val: `$${inventoryValue.toLocaleString()}`, change: '-2%', color: 'text-amber-600' },
            { label: 'Global Orders', val: '1,284', change: '+18%', color: 'text-purple-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">{stat.label}</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-3xl font-black tracking-tighter">{stat.val}</span>
                <span className={`text-xs font-black ${stat.color}`}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Chart Simulation */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-8">
            <h3 className="font-black uppercase text-sm mb-6 flex justify-between">
              <span>Monthly Sales Velocity</span>
              <span className="text-gray-300 font-normal italic">Last 12 Months</span>
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {MOCK_SALES.map(s => (
                <div key={s.month} className="flex-grow flex flex-col items-center gap-2 group">
                  <div 
                    style={{ height: `${(s.sales / 15000) * 100}%` }} 
                    className="w-full bg-blue-100 group-hover:bg-blue-600 transition-colors rounded-t-lg relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${s.sales}
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase">{s.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <h3 className="font-black uppercase text-sm mb-6">VIP Customer Profiles</h3>
            <div className="space-y-6">
              {MOCK_CUSTOMERS.map(c => (
                <div key={c.id} className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <div>
                    <div className="font-bold text-sm">{c.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">{c.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-blue-600">${c.totalSpent.toLocaleString()}</div>
                    <div className="text-[10px] font-bold text-gray-300 uppercase">{c.orders} Orders</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all uppercase tracking-widest">
              View All 5,000+ Customers
            </button>
          </div>
        </div>

        {/* Real-time Logistics Feed */}
        <div className="mt-8 bg-black text-white rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black uppercase italic tracking-widest text-blue-500">Live Global Logistics</h3>
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Systems Operational</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] text-gray-600 uppercase font-black border-b border-white/10">
                <tr>
                  <th className="py-3">Order ID</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Destination</th>
                  <th className="py-3">Batch Quantity</th>
                  <th className="py-3 text-right">Fulfillment</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold">
                {[
                  { id: '#9842', status: 'Manufacturing', dest: 'Berlin, DE', qty: '450 units', pct: '45%' },
                  { id: '#9843', status: 'Quality Control', dest: 'London, UK', qty: '120 units', pct: '92%' },
                  { id: '#9844', status: 'Customizing', dest: 'New York, US', qty: '1,500 units', pct: '12%' },
                  { id: '#9845', status: 'Shipping', dest: 'Tokyo, JP', qty: '50 units', pct: '100%' },
                ].map(item => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-blue-400">{item.id}</td>
                    <td className="py-4">{item.status}</td>
                    <td className="py-4 text-gray-400">{item.dest}</td>
                    <td className="py-4">{item.qty}</td>
                    <td className="py-4 text-right">
                      <div className="w-20 h-1 bg-white/10 rounded-full inline-block overflow-hidden ml-4">
                        <div style={{ width: item.pct }} className="h-full bg-blue-500"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
