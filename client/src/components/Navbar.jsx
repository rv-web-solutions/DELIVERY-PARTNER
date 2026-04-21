import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, MapPin, Menu, X, Sun, Moon } from 'lucide-react';

import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="glass sticky top-0 z-50 px-4 md:px-6 py-4 bg-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-1 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <span className="text-dark font-black text-xl md:text-2xl">R</span>
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight text-white hidden sm:block">Ring4Delivery</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-primary' : 'hover:text-primary'}`}>Home</Link>
          <Link to="/services" className={`transition-colors ${location.pathname === '/services' ? 'text-primary' : 'hover:text-primary'}`}>Services</Link>
          <Link to="/restaurants" className={`transition-colors ${location.pathname === '/restaurants' ? 'text-primary' : 'hover:text-primary'}`}>Restaurants</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden lg:flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-3 py-2 rounded-full border border-white/10">
            <MapPin size={14} className="text-primary" />
            <span>Select Location</span>
          </div>

          <Link to="/cart" className="relative p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors flex items-center group">
            <ShoppingCart size={22} className="text-primary" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 md:w-5 md:h-5 md:-top-1 md:-right-2 rounded-full flex items-center justify-center font-bold shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>

          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all flex items-center justify-center text-primary"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>
          
          <Link to="/admin/login" className="p-2 hover:bg-white/5 rounded-full transition-colors flex text-gray-700 dark:text-gray-300 hover:text-primary">
            <User size={22} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/5 flex flex-col gap-4 pb-2 animate-in slide-in-from-top-2 bg-dark/95">
          <Link to="/" onClick={closeMenu} className="font-medium p-2 hover:bg-white/5 rounded-lg transition-colors text-white">Home</Link>
          <Link to="/services" onClick={closeMenu} className="font-medium p-2 hover:bg-white/5 rounded-lg transition-colors text-white">Services</Link>
          <Link to="/restaurants" onClick={closeMenu} className="font-medium p-2 hover:bg-white/5 rounded-lg transition-colors text-white">Restaurants</Link>
          <div className="flex items-center gap-2 text-sm text-gray-400 p-2">
            <MapPin size={16} className="text-primary" />
            <span>Select Location</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
