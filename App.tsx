
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
