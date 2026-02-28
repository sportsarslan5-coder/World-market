
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import AIDesigner from './pages/AIDesigner';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import RegisterShow from './pages/RegisterShow';
import ProductDetail from './pages/ProductDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import AboutUs from './pages/info/AboutUs';
import ContactUs from './pages/info/ContactUs';
import FAQ from './pages/info/FAQ';
import TrackOrder from './pages/info/TrackOrder';
import Terms from './pages/info/Terms';
import RefundPolicy from './pages/info/RefundPolicy';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SellerProfile from './pages/SellerProfile';
import SellerDashboard from './pages/SellerDashboard';
import SellerRanking from './pages/SellerRanking';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main Global Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/ai-designer" element={<AIDesigner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register-show" element={<RegisterShow />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/seller/:sellerId" element={<SellerProfile />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/seller-ranking" element={<SellerRanking />} />

          {/* Clean Dynamic Multi-Show Routing (e.g. /arslan, /arslan/products) */}
          <Route path="/:showName" element={<Home />} />
          <Route path="/:showName/products" element={<Products />} />
          <Route path="/:showName/products/:productId" element={<ProductDetail />} />
          <Route path="/:showName/ai-designer" element={<AIDesigner />} />
          <Route path="/:showName/cart" element={<Cart />} />
          <Route path="/:showName/contact" element={<Contact />} />
          <Route path="/:showName/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/:showName/shipping-policy" element={<ShippingPolicy />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
