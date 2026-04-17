
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const AIDesigner = lazy(() => import('./pages/AIDesigner'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const Cart = lazy(() => import('./pages/Cart'));
const RegisterShow = lazy(() => import('./pages/RegisterShow'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const AboutUs = lazy(() => import('./pages/info/AboutUs'));
const ContactUs = lazy(() => import('./pages/info/ContactUs'));
const FAQ = lazy(() => import('./pages/info/FAQ'));
const TrackOrder = lazy(() => import('./pages/info/TrackOrder'));
const Terms = lazy(() => import('./pages/info/Terms'));
const RefundPolicy = lazy(() => import('./pages/info/RefundPolicy'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const SellerProfile = lazy(() => import('./pages/SellerProfile'));
const SellerDashboard = lazy(() => import('./pages/SellerDashboard'));
const SellerRanking = lazy(() => import('./pages/SellerRanking'));
const SportStore = lazy(() => import('./pages/SportStore'));

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Loading W-LORD Experience...</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
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
          <Route path="/sport-store" element={<SportStore />} />
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
      </Suspense>
    </Layout>
  </Router>
);
};

export default App;
