
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

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main Landing */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ai-designer" element={<AIDesigner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register-show" element={<RegisterShow />} />

          {/* Dynamic Multi-Show Routing (Ensures shareable links work across all devices) */}
          <Route path="/s/:showName" element={<Home />} />
          <Route path="/s/:showName/products" element={<Products />} />
          <Route path="/s/:showName/ai-designer" element={<AIDesigner />} />
          <Route path="/s/:showName/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
