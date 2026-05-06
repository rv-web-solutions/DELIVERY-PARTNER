import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, MapPin, Menu, X, Sun, Moon } from 'lucide-react';

import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 px-4 md:px-6 
      ${isScrolled 
        ? 'py-3 mt-4 mx-4 md:mx-6 rounded-[2rem] bg-primary backdrop-blur-lg shadow-2xl border border-black/20' 
        : 'py-5 bg-primary border-b border-black/10'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-1 text-black hover:text-black/70 transition-colors"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <img
              src="/logo.jpeg"
              alt="Ring4Delivery Logo"
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-contain transform group-hover:scale-105 transition-transform shadow-md"
            />
            <span className="font-bold text-lg md:text-xl tracking-tight text-black hidden sm:block">Ring4Delivery</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium text-black">
          <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-black/70' : 'hover:text-black/70'}`}>Home</Link>
          <Link to="/services" className={`transition-colors ${location.pathname === '/services' ? 'text-black/70' : 'hover:text-black/70'}`}>Services</Link>
          <Link to="/restaurants" className={`transition-colors ${location.pathname === '/restaurants' ? 'text-black/70' : 'hover:text-black/70'}`}>Restaurants</Link>
          <Link to="/about" className={`transition-colors ${location.pathname === '/about' ? 'text-black/70' : 'hover:text-black/70'}`}>About Us</Link>
          <Link to="/contact" className={`transition-colors ${location.pathname === '/contact' ? 'text-black/70' : 'hover:text-black/70'}`}>Contact Us</Link>
          <Link to="/jobs" className={`transition-colors ${location.pathname === '/jobs' ? 'text-black/70' : 'hover:text-black/70'}`}>Jobs</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden lg:flex items-center gap-2 text-xs text-black/70 bg-black/5 px-3 py-2 rounded-full border border-black/10">
            <MapPin size={14} className="text-black" />
            <span>Select Location</span>
          </div>

          <Link to="/cart" className="relative p-2 hover:bg-black/5 rounded-full transition-colors flex items-center group">
            <ShoppingCart size={22} className="text-black" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 md:w-5 md:h-5 md:-top-1 md:-right-2 rounded-full flex items-center justify-center font-bold shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>

          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-black/5 rounded-full transition-all flex items-center justify-center text-black"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>
          
          <Link to="/admin/login" className="p-2 hover:bg-black/5 rounded-full transition-colors flex text-black hover:text-black/70">
            <User size={22} className="text-black" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-black/10 flex flex-col gap-4 pb-2 animate-in slide-in-from-top-2 bg-primary">
          <Link to="/" onClick={closeMenu} className="font-medium p-2 hover:bg-black/5 rounded-lg transition-colors text-black hover:text-black/70">Home</Link>
          <Link to="/services" onClick={closeMenu} className="font-medium p-2 hover:bg-black/5 rounded-lg transition-colors text-black hover:text-black/70">Services</Link>
          <Link to="/restaurants" onClick={closeMenu} className="font-medium p-2 hover:bg-black/5 rounded-lg transition-colors text-black hover:text-black/70">Restaurants</Link>
          <Link to="/about" onClick={closeMenu} className="font-medium p-2 hover:bg-black/5 rounded-lg transition-colors text-black hover:text-black/70">About Us</Link>
          <Link to="/contact" onClick={closeMenu} className="font-medium p-2 hover:bg-black/5 rounded-lg transition-colors text-black hover:text-black/70">Contact Us</Link>
          <Link to="/jobs" onClick={closeMenu} className="font-medium p-2 hover:bg-black/5 rounded-lg transition-colors text-black hover:text-black/70">Jobs</Link>
          <div className="flex items-center gap-2 text-sm text-black/70 p-2">
            <MapPin size={16} className="text-black" />
            <span>Select Location</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
