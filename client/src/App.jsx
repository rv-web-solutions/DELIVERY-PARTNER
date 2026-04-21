import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageRestaurants from './pages/admin/ManageRestaurants';
import ManageItems from './pages/admin/ManageItems';
import ManageServices from './pages/admin/ManageServices';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartPopup from './components/CartPopup';
import ScrollToTop from './components/ScrollToTop';

import Services from './pages/Services';
import Restaurants from './pages/Restaurants';
import CustomOrder from './pages/CustomOrder';

import { CartProvider } from './context/CartContext';
import { ServiceProvider } from './context/ServiceContext';
import { ThemeProvider } from './context/ThemeContext';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <ServiceProvider>
        <CartProvider>
          <Router>
              <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col transition-colors duration-300">
              <Navbar />
              <ScrollToTop />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/restaurant/:id" element={<Menu />} />
                  <Route path="/custom-order/:type" element={<CustomOrder />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/admin/login" element={<Login />} />
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/restaurants" element={<ManageRestaurants />} />
                  <Route path="/admin/items" element={<ManageItems />} />
                  <Route path="/admin/services" element={<ManageServices />} />
                </Routes>
              </main>
            <Footer />
            <CartPopup />
            <Toaster position="bottom-center" />
          </div>
        </Router>
        </CartProvider>
      </ServiceProvider>
    </ThemeProvider>
  );
}

export default App;
