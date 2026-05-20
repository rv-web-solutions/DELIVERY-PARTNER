import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Core layout components (loaded synchronously for instant layout shell)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartPopup from './components/CartPopup';
import ScrollToTop from './components/ScrollToTop';

// Lazy load page components to split javascript chunks and boost loading speed
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ManageRestaurants = lazy(() => import('./pages/admin/ManageRestaurants'));
const ManageItems = lazy(() => import('./pages/admin/ManageItems'));
const ManageServices = lazy(() => import('./pages/admin/ManageServices'));
const Services = lazy(() => import('./pages/Services'));
const Restaurants = lazy(() => import('./pages/Restaurants'));
const CustomOrder = lazy(() => import('./pages/CustomOrder'));
const Jobs = lazy(() => import('./pages/Jobs'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));

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
          <Suspense fallback={
            <div className="pt-32 flex flex-col justify-center items-center h-[60vh] bg-white dark:bg-black transition-colors">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-xs font-bold text-gray-500 tracking-widest uppercase">Loading Page...</p>
            </div>
          }>
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
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/admin/login" element={<PageWrapper><Login /></PageWrapper>} />
              <Route path="/admin/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
              <Route path="/admin/restaurants" element={<PageWrapper><ManageRestaurants /></PageWrapper>} />
              <Route path="/admin/items" element={<PageWrapper><ManageItems /></PageWrapper>} />
              <Route path="/admin/services" element={<PageWrapper><ManageServices /></PageWrapper>} />
            </Routes>
          </Suspense>
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
