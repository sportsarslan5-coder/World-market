
import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="animate-fadeIn bg-white">
      {/* Immersive Hero */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-black">
        <video 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 blur-[2px]"
          poster="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=2070"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-athlete-running-on-track-field-in-slow-motion-42521-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="inline-block bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 animate-pulse">
            2025 Enterprise Collection
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter italic">
            LIMITLESS <br/> <span className="text-blue-500">POTENTIAL.</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-xl text-gray-300 font-medium leading-relaxed">
            The world's largest digital sportswear catalog. 
            From pro-leagues to fitness startups, we manufacture your vision with AI precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              to="/products" 
              className="bg-white text-black px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 text-center shadow-2xl"
            >
              Enter Catalog
            </Link>
            <Link 
              to="/ai-designer" 
              className="bg-transparent border-2 border-white/20 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:border-white transition-all text-center backdrop-blur-sm"
            >
              AI Design Lab
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-gray-100 py-6 border-y">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
          {['NIKE-TECH', 'ADIDAS-PARTNER', 'FIFA-APPROVED', 'NBA-SUPPLIER', 'TEAM-USA'].map(brand => (
            <span key={brand} className="text-sm font-black tracking-widest text-gray-400">{brand}</span>
          ))}
        </div>
      </div>

      {/* Trending Now Slider (Dense Grid) */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-5xl font-black italic tracking-tighter uppercase">Trending <span className="text-blue-500">Gear</span></h2>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-2">Most manufactured styles this month</p>
          </div>
          <Link to="/products" className="group flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors">
            See all 1,000+ items <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {PRODUCTS.slice(0, 6).map(p => (
            <Link to="/products" key={p.id} className="group flex flex-col gap-3">
              <div className="aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[8px] font-black uppercase text-blue-600">
                  Popular
                </div>
              </div>
              <div>
                <h4 className="font-bold text-xs line-clamp-1">{p.name}</h4>
                <div className="flex justify-between mt-1">
                  <span className="text-blue-600 font-black text-[10px]">${p.price}</span>
                  <span className="text-gray-300 font-bold text-[8px] uppercase">Apex Direct</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Industrial Advantage */}
      <section className="bg-gray-50 py-32 border-y overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <h2 className="text-6xl font-black leading-none tracking-tighter mb-8 italic">
              95% BEAUTY. <br/>
              <span className="text-blue-600">5% DATA.</span> <br/>
              100% PERFORMANCE.
            </h2>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 text-3xl">🤖</div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-sm mb-2">AI-Driven Manufacturing</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Our neural networks analyze trend velocity to optimize fabric sourcing and reduce waste by 34%.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 text-3xl">⚡</div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-sm mb-2">Hypersonic Export</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Strategic hubs in 12 countries ensure 72-hour delivery for custom orders anywhere on earth.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-20 bg-blue-500/10 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=1000" 
              className="rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] rotate-2 relative z-10 grayscale hover:grayscale-0 transition-all duration-700" 
              alt="Factory Advantage" 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
