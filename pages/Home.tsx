import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../constants';
import { useStore } from '../context/StoreContext';
import { getEnvironmentMode } from '../services/routingUtils';

const Home: React.FC = () => {
  const { showName: pathShowName } = useParams();
  const { activeShowName: subdomainShowName } = useStore();
  const showName = pathShowName || subdomainShowName;

  useEffect(() => {
    const mode = getEnvironmentMode();
    if (mode === 'preview' && !showName) {
      console.log("System detected preview mode.");
    }
  }, [showName]);

  const getLink = (to: string) => showName ? `/s/${showName}${to === '/' ? '' : to}` : to;

  return (
    <div className="animate-fadeIn bg-white">
      {/* Dynamic Show Banner */}
      {showName && (
        <div className="bg-yellow-400 py-3 px-4 text-center border-b border-black/10">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black">
            Welcome to the <span className="underline decoration-2">{showName.replace(/-/g, ' ')}</span> Official Sportswear Hub
          </p>
        </div>
      )}

      {/* Commission System Info Box */}
      <div className="bg-blue-600 py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center justify-center gap-4 animate-pulse">
            <span>Commission System:</span>
            <span className="bg-white/20 px-2 py-0.5 rounded">Seller Earns 5%</span>
            <span className="bg-white/20 px-2 py-0.5 rounded">Admin Earns 95%</span>
          </p>
        </div>
      </div>

      <section className="relative h-[80vh] flex items-center overflow-hidden bg-black">
        <video 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
          poster="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=2070"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-athlete-running-on-track-field-in-slow-motion-42521-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter italic">
            {showName ? showName.replace(/-/g, ' ').toUpperCase() : 'LIMITLESS'} <br/> 
            <span className="text-blue-500">{showName ? 'OFFICIAL' : 'POTENTIAL.'}</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-xl text-gray-300 font-medium">
            Professional sportswear direct from the factory. High-volume manufacturing for {showName ? showName.replace(/-/g, ' ') : 'the world\'s elite teams'}.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to={getLink('/products')} className="bg-white text-black px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 shadow-2xl">
              Shop Collection
            </Link>
            {!showName && (
              <Link to="/register-show" className="bg-blue-600 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl">
                Become a Seller
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Trending Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-5xl font-black italic tracking-tighter uppercase">Trending <span className="text-blue-500">Gear</span></h2>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-2">Admin-Added Premium Styles</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {PRODUCTS.slice(0, 6).map(p => (
            <Link to={getLink('/products')} key={p.id} className="group flex flex-col gap-3">
              <div className="aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div>
                <h4 className="font-bold text-xs line-clamp-1">{p.name}</h4>
                <div className="flex justify-between mt-1">
                  <span className="text-blue-600 font-black text-[10px]">${p.price.toFixed(2)}</span>
                  <span className="text-gray-300 font-bold text-[8px] uppercase">{showName ? 'In Stock' : 'Apex Direct'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Industrial Advantage */}
      <section className="bg-gray-50 py-20 border-y">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black tracking-tighter mb-8">TRANSPARENT PARTNERSHIP</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              <span className="text-5xl block mb-4">🏆</span>
              <h4 className="font-black uppercase text-xl mb-2">95% ADMIN SHARE</h4>
              <p className="text-gray-500 text-sm">Managing production, logistics, global exports, and quality control.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              <span className="text-5xl block mb-4">⭐</span>
              <h4 className="font-black uppercase text-xl mb-2">5% SELLER SHARE</h4>
              <p className="text-gray-500 text-sm">Empowering sellers to build their brand with our world-class inventory.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;