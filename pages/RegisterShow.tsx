
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format WhatsApp message
    const message = `NEW SELLER REGISTERED – Admin Patch Shop
Name: ${formData.fullName}
WhatsApp: ${formData.whatsapp}
Email: ${formData.email}
Country: ${formData.country}
City: ${formData.city}
Contact Number: ${formData.contactNumber}
Payment Method: ${formData.country.toLowerCase() === 'pakistan' ? 'JazzCash' : 'Bank Account'}
Details: ${formData.paymentDetails}
Desired Show Name: ${formData.showName}`;

    const waLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    
    // Redirect to WA
    window.open(waLink, '_blank');
    
    // Redirect to the new show (Simulated activation)
    alert("Registration sent to Admin! Redirecting to your show preview...");
    navigate(`/s/${formData.showName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-16 border border-gray-100">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Start Your <span className="text-blue-600 underline">Show</span></h1>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-10">Seller Commission: 5% Share of All Sales</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Full Name</label>
              <input 
                required
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Show Name</label>
              <input 
                required
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-blue-600"
                placeholder="e.g. Elite Sports"
                value={formData.showName}
                onChange={e => setFormData({...formData, showName: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">WhatsApp Number</label>
              <input 
                required
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Gmail Address</label>
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
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Country</label>
              <input 
                required
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.country}
                onChange={e => setFormData({...formData, country: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">City</label>
              <input 
                required
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">
              {formData.country.toLowerCase() === 'pakistan' ? 'JazzCash Account Number' : 'Bank Account Details (IBAN / Name)'}
            </label>
            <textarea 
              required
              rows={3}
              className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
              placeholder={formData.country.toLowerCase() === 'pakistan' ? 'e.g. 0300 1234567' : 'IBAN: PK00BANK...'}
              value={formData.paymentDetails}
              onChange={e => setFormData({...formData, paymentDetails: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-black text-white py-5 rounded-2xl font-black text-xl uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all transform active:scale-95"
            >
              🚀 Submit Registration
            </button>
            <p className="text-[9px] text-center mt-4 text-gray-400 font-bold uppercase tracking-widest">
              By submitting, your data is sent to Admin for verification and show activation.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterShow;
