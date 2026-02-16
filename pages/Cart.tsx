
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-gray-50">
        <div className="text-9xl mb-10 drop-shadow-2xl grayscale">🛒</div>
        <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">Your Cart is <span className="text-blue-600 underline">Empty</span></h2>
        <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em] mb-10">Start your team's transformation today</p>
        <Link to="/products" className="bg-black text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl">Explore Catalog</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-16 underline decoration-blue-600">Shopping <span className="text-blue-600">Cart</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Item List */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 group hover:shadow-xl transition-all">
                <div className="w-full md:w-40 aspect-square bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight mb-1">{item.name}</h3>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{item.category}</p>
                    </div>
                    <span className="text-2xl font-black tracking-tighter">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-4 line-clamp-2 font-medium">{item.description}</p>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2 border">
                      <span className="text-xs font-black uppercase mr-4 text-gray-400">Qty</span>
                      <span className="text-sm font-black">{item.quantity}</span>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] font-black uppercase text-red-500 hover:underline tracking-widest"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-[10px] font-black uppercase text-gray-400 hover:text-black tracking-[0.3em] transition-colors">Clear All Items</button>
          </div>

          {/* Order Summary */}
          <div className="bg-black text-white p-10 rounded-[2.5rem] sticky top-32 shadow-2xl shadow-blue-500/20">
            <h3 className="text-2xl font-black uppercase italic tracking-widest mb-10 text-blue-500">Summary</h3>
            <div className="space-y-6 border-b border-white/10 pb-10">
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-gray-400">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-10">
              <span className="text-sm font-black uppercase tracking-widest text-blue-500">Order Total</span>
              <span className="text-4xl font-black tracking-tighter">${total.toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl uppercase tracking-[0.2em] mt-12 shadow-xl shadow-blue-500/30 hover:bg-white hover:text-black transition-all transform active:scale-95">
              Secure Checkout
            </button>
            <div className="mt-8 text-center">
              <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest">Powered by Apex Global Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
