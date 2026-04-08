
import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, MessageCircle, Star, ShieldCheck, Globe, Zap, Award, Users } from 'lucide-react';
import { ADMIN_WHATSAPP } from '../constants';

const SportStore: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "T-Shirt",
      price: 22,
      description: "Premium sublimation t-shirts with high-quality printing. Perfect for sports teams and daily wear.",
      sizes: "All sizes available",
      colors: "All colors available",
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961389/IMG-20260329-WA0006_ztxqy5.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961392/IMG-20260329-WA0001_w6wv6h.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961393/IMG-20260329-WA0002_pk31td.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961397/IMG-20260329-WA0000_muyyzt.jpg"
      ]
    },
    {
      id: 2,
      name: "Hoodie",
      price: 50,
      description: "High-quality branded hoodies with premium fabric. Comfortable, durable, and stylish.",
      sizes: "All sizes available",
      colors: "All colors available",
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960832/IMG-20260329-WA0166_ok6rhn.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960835/IMG-20260329-WA0168_ivlybd.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960848/IMG-20260329-WA0163_glsfak.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960853/IMG-20260329-WA0162_f4arjo.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960854/IMG-20260329-WA0164_pmff1o.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960855/IMG-20260329-WA0167_vez3fj.jpg"
      ]
    },
    {
      id: 11,
      name: "Cap",
      price: 30,
      description: "Premium quality sports caps with custom embroidery options.",
      sizes: "Adjustable",
      colors: "All colors available",
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961041/IMG-20260329-WA0119_ws0icb.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961050/IMG-20260329-WA0114_kp2v8q.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961049/IMG-20260329-WA0116_pndnb3.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961050/IMG-20260329-WA0112_pp3m6e.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961066/IMG-20260329-WA0113_efnujj.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961021/IMG-20260329-WA0125_p2bl6o.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961030/IMG-20260329-WA0115_disphb.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961038/IMG-20260329-WA0120_sxw9n1.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961039/IMG-20260329-WA0118_rqylia.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961040/IMG-20260329-WA0117_azcjio.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961010/IMG-20260329-WA0123_nvgdls.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961011/IMG-20260329-WA0124_mnaer3.jpg"
      ]
    },
    {
      id: 6,
      name: "Basketball Uniforms",
      price: 40,
      description: "Complete basketball kits with custom design options.",
      sizes: "All sizes available",
      colors: "All colors available",
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314404/IMG-20260403-WA0005_apw7wk.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314404/IMG-20251004-WA0021_rcxkag.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314470/IMG_20260404_122022_478_pvfm5r.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314470/IMG_20260404_122913_340_byllke.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314470/IMG_20260404_121458_602_oviyaj.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314471/IMG_20260404_130428_754_suuztm.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314471/IMG_20260404_121448_613_gpspoc.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314463/IMG_20260329_234621_277_qpj8ae.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314465/IMG_20260404_125733_655_r4rsoe.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314468/IMG_20260404_125948_358_h9jofr.jpg"
      ]
    },
    {
      id: 9,
      name: "American Football Jersey",
      price: 30,
      description: "Strong and premium quality football jerseys.",
      sizes: "All sizes available",
      colors: "All colors available",
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314440/FB_IMG_1724666104998_n8sgfo.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314441/FB_IMG_1724665865425_uuaqlv.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314441/FB_IMG_1724665878357_gn9smm.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314447/FB_IMG_1733158448323_ue2nli.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314473/IMG_20260404_130207_508_gxclti.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314424/FB_IMG_1684161955191_g7yjep.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314424/FB_IMG_1684161957207_vfjbry.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314430/received_935060828488839_zp3pck.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314432/received_999978364926997_kn4rb0.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314439/FB_IMG_1724666109368_amyy7e.jpg"
      ]
    },
    {
      id: 10,
      name: "Ice Hockey Jersey",
      price: 40,
      description: "Heavy-duty hockey jerseys designed for performance.",
      sizes: "All sizes available",
      colors: "All colors available",
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314451/IMG_20241102_105026_390_mtigej.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314455/IMG_20241102_105036_900_hswasz.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314456/IMG_20241102_105032_036_zfg38b.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314456/IMG_20241102_105034_085_afcltx.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314457/IMG_20241102_105029_502_dhvbvn.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314404/IMG-20251004-WA0021_rcxkag.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314404/IMG_20241118_080307_060_zzkm0e.webp",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314427/Iowa_Dogfish_Ice_Hockey_Jersey_etxfvt.png"
      ]
    },
    {
      id: 7,
      name: "Baseball Jersey",
      price: 35,
      description: "High-quality baseball jerseys with team customization.",
      sizes: "All sizes available",
      colors: "All colors available",
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149216/Gemini_Generated_Image_96bxvd96bxvd96bx_amsbbi.png",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149219/4fe70d5f-1738-461d-ad7d-c1250ab268cf_hmceok.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149225/Gemini_Generated_Image_9gmjgc9gmjgc9gmj_hm8thv.png",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149219/Gemini_Generated_Image_ddqesaddqesaddqe_hp1dnu.png",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149225/Gemini_Generated_Image_1x7s311x7s311x7s_kzkm3k.png",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149210/4d51148e-ce06-4509-9fc2-8f26947aba47_ito0mc.jpg"
      ]
    },
    {
      id: 8,
      name: "Baseball Bat",
      price: 150,
      description: "Durable and professional baseball bats.",
      sizes: "Standard Sizes",
      colors: "Natural Wood / Black / Custom",
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960761/IMG-20260331-WA0007_pywcoz.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960765/IMG-20260331-WA0008_dijbqz.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960774/IMG-20260331-WA0005_nqzk64.jpg"
      ]
    }
  ];

  const offers = [
    { range: "10 to 50 pieces", discount: "5%" },
    { range: "50 to 100 pieces", discount: "10%" },
    { range: "100 to 200 pieces", discount: "10%" },
    { range: "200 to 500 pieces", discount: "15%" },
    { range: "500 to 1000 pieces", discount: "20%" },
    { range: "1000 to 5000 pieces", discount: "30%" },
    { range: "5000 to 10000 pieces", discount: "50%" }
  ];

  const handleWhatsAppOrder = (productName: string) => {
    const message = encodeURIComponent(`Hello, I am interested in ordering the ${productName} from your Sport Store. Please provide more details.`);
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1920" 
            alt="Sports Stadium" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
              I Am a Manufacturer & Supplier of <span className="text-blue-500">Premium Sports Uniforms</span> Worldwide
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed mb-8">
              I am a direct factory manufacturer with years of experience in producing high-quality sports uniforms. We design and manufacture all types of uniforms including Football, Basketball, Baseball, American Football, Ice Hockey, Gym Wear, and more. Our products are exported worldwide with premium quality, custom designs, and affordable pricing. If you are looking for bulk orders or professional uniforms, you are in the right place. Visit our store and place your order today.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20"
              >
                Explore Catalog
              </button>
              <button 
                onClick={() => handleWhatsAppOrder('Bulk Uniforms')}
                className="bg-white hover:bg-gray-100 text-black px-10 py-4 rounded-full font-black uppercase tracking-widest transition-all flex items-center gap-2"
              >
                <MessageCircle size={20} />
                Contact Factory
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
              🔥 Bulk Order <span className="text-blue-600">Special Discounts</span>
            </h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">The more you order, the less you pay</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center group transition-all hover:bg-blue-600 hover:border-blue-600"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                  <Zap size={32} fill="currentColor" />
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2 group-hover:text-blue-100">{offer.range}</h4>
                <div className="text-4xl font-black text-gray-900 group-hover:text-white">
                  Get <span className="text-blue-600 group-hover:text-white">{offer.discount}</span> Off
                </div>
                <div className="mt-4 px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-white/20 group-hover:text-white">
                  Limited Time Offer
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none">
                Premium <span className="text-blue-600">Sports Gear</span> Collection
              </h2>
              <p className="text-gray-500 font-medium">Direct from factory. Professional grade materials. Global shipping.</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-400">
              <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-green-500" /> Quality Assured</span>
              <span className="flex items-center gap-1"><Globe size={14} className="text-blue-500" /> Worldwide Export</span>
            </div>
          </div>

          <div className="space-y-32">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Product Info */}
                  <div className="order-2 lg:order-1">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-gray-400">Top Rated Manufacturer</span>
                    </div>
                    
                    <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-6 leading-none group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="text-4xl font-black text-blue-600 mb-8 tracking-tighter">
                      ${product.price} <span className="text-sm text-gray-400 uppercase tracking-widest font-bold ml-2">Per Piece</span>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-8 mb-12">
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Available Sizes</h4>
                        <p className="text-sm font-bold text-gray-900">{product.sizes}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Available Colors</h4>
                        <p className="text-sm font-bold text-gray-900">{product.colors}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleWhatsAppOrder(product.name)}
                      className="w-full sm:w-auto bg-black hover:bg-blue-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-2xl shadow-black/10"
                    >
                      <MessageCircle size={24} />
                      Order Now via WhatsApp
                    </button>
                  </div>

                  {/* Product Images Grid */}
                  <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                    {product.images.slice(0, 4).map((img, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className={`relative rounded-3xl overflow-hidden bg-gray-100 ${idx === 0 ? 'row-span-2 h-[500px]' : 'h-[242px]'}`}
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} ${idx + 1}`} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000" 
            alt="Sports Background" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none">
                Why Choose Our <span className="text-blue-500">Factory?</span>
              </h2>
              <div className="space-y-8">
                {[
                  { icon: <Award className="text-blue-500" />, title: "Premium Quality", desc: "We use only the best fabrics and sublimation inks for long-lasting performance." },
                  { icon: <Zap className="text-blue-500" />, title: "Fast Production", desc: "Direct factory access means quicker turnaround times for your bulk orders." },
                  { icon: <Users className="text-blue-500" />, title: "Custom Designs", desc: "Our design team can help you create unique uniforms for your team or brand." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-black uppercase tracking-tight mb-1">{item.title}</h4>
                      <p className="text-gray-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-600 p-12 rounded-[3rem] shadow-3xl shadow-blue-600/20">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">Ready to Start Your Order?</h3>
              <p className="text-blue-100 font-medium mb-8 leading-relaxed">
                Whether you need 10 uniforms or 10,000, we have the capacity and expertise to deliver. Contact us now for a custom quote and design consultation.
              </p>
              <button 
                onClick={() => handleWhatsAppOrder('General Inquiry')}
                className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle size={24} />
                Chat with Sales Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SportStore;
