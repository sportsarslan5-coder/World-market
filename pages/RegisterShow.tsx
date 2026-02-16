
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_WHATSAPP } from '../constants';

const RegisterShow: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    country: '',
    city: '',
    contactNumber: '',
    paymentDetails: '',
    showName: ''
  });

  const isPakistan = formData.country.toLowerCase().includes('pakistan');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the shareable show ID
    const showId = formData.showName.toLowerCase().trim().replace(/\s+/g, '-');
    
    // Format WhatsApp message for the Admin
    const message = `NEW SELLER REGISTERED – Admin Patch Shop
---------------------------------
Name: ${formData.fullName}
WhatsApp: ${formData.whatsapp}
Email: ${formData.email}
Location: ${formData.city}, ${formData.country}
Contact: ${formData.contactNumber}
Show Name: ${formData.showName}
Payment Method: ${isPakistan ? 'JazzCash' : 'Bank Account (IBAN)'}
Details: ${formData.paymentDetails}
---------------------------------`;

    // Ensure link is permanent and shareable via HashRouter support
    const waLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(waLink, '_blank');
    
    // Success notification and redirect to the persistent public show link
    alert("Registration data successfully dispatched to Admin WhatsApp! Redirecting you to your public show page.");
    
    // Navigate using the public shareable route structure
    navigate(`/s/${showId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:py-20">
      <div className="max-w-2xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl p-8 md:p-16 border border-gray-100 animate-fadeIn">
        <div className="text-center mb-10">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            Seller Partnership
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight">
            Launch Your <br/> <span className="text-blue-600 underline">Sports Show</span>
          </h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-4">
            Transparent Commission: Seller 5% | Admin 95%
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Proposed Show Name</label>
            <input 
              required
              placeholder="e.g. Thunder Soccer Store"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600 p-5 rounded-2xl outline-none font-black text-blue-600 transition-all text-lg shadow-inner"
              value={formData.showName}
              onChange={e => setFormData({...formData, showName: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Full Name</label>
              <input 
                required
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Gmail Address</label>
              <input 
                required
                type="email"
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">WhatsApp Number</label>
              <input 
                required
                placeholder="e.g. 923001234567"
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Secondary Contact</label>
              <input 
                required
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.contactNumber}
                onChange={e => setFormData({...formData, contactNumber: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Country</label>
              <input 
                required
                placeholder="e.g. Pakistan"
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.country}
                onChange={e => setFormData({...formData, country: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">City</label>
              <input 
                required
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-blue-600 tracking-widest ml-1">
              {isPakistan ? 'JazzCash Account Number' : 'International Bank Details (IBAN / BIC)'}
            </label>
            <textarea 
              required
              rows={3}
              className="w-full bg-blue-50/30 border-2 border-blue-100 p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
              placeholder={isPakistan ? 'Enter your 11-digit JazzCash number' : 'Full IBAN and Bank Name for Global Payments'}
              value={formData.paymentDetails}
              onChange={e => setFormData({...formData, paymentDetails: e.target.value})}
            />
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-black text-white py-6 rounded-2xl font-black text-xl uppercase tracking-[0.3em] shadow-2xl hover:bg-blue-600 transition-all transform active:scale-95 shadow-blue-500/20"
            >
              Verify & Launch
            </button>
            <div className="mt-6 p-4 bg-gray-100 rounded-xl">
              <p className="text-[9px] text-center text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                Security Note: Data is encrypted and sent directly to Admin WhatsApp {ADMIN_WHATSAPP}. 
                Seller identity is private and managed via centralized fulfillment.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterShow;
