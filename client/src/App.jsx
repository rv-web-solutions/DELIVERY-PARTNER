import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import Jobs from './pages/Jobs';
import About from './pages/About';
import FAQ from './pages/FAQ';

import { CartProvider } from './context/CartContext';
import { ServiceProvider } from './context/ServiceContext';
import { ThemeProvider } from './context/ThemeContext';

import { Toaster } from 'react-hot-toast';

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col transition-colors duration-300">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
            <Route path="/restaurants" element={<PageWrapper><Restaurants /></PageWrapper>} />
            <Route path="/restaurant/:id" element={<PageWrapper><Menu /></PageWrapper>} />
            <Route path="/custom-order/:type" element={<PageWrapper><CustomOrder /></PageWrapper>} />
            <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
            <Route path="/jobs" element={<PageWrapper><Jobs /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
            <Route path="/admin/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/admin/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="/admin/restaurants" element={<PageWrapper><ManageRestaurants /></PageWrapper>} />
            <Route path="/admin/items" element={<PageWrapper><ManageItems /></PageWrapper>} />
            <Route path="/admin/services" element={<PageWrapper><ManageServices /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <CartPopup />
      <Toaster position="bottom-center" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ServiceProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </ServiceProvider>
    </ThemeProvider>
  );
}

export default App;
