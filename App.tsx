
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
          {/* Main Global Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ai-designer" element={<AIDesigner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register-show" element={<RegisterShow />} />

          {/* Clean Dynamic Multi-Show Routing (e.g. /arslan, /arslan/products) */}
          <Route path="/:showName" element={<Home />} />
          <Route path="/:showName/products" element={<Products />} />
          <Route path="/:showName/ai-designer" element={<AIDesigner />} />
          <Route path="/:showName/cart" element={<Cart />} />
          <Route path="/:showName/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
