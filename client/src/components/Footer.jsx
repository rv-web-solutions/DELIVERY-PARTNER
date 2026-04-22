import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black border-t border-black/5 dark:border-white/5 py-16 px-6 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-black font-black">R</span>
            </div>
            <span className="font-bold text-xl text-black dark:text-white">Ring4Delivery</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
            Delivering the best food, medicines, and groceries directly to your doorstep. Fast, reliable, and premium quality service.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-black dark:text-white mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/jobs" className="hover:text-primary transition-colors font-bold text-primary">Jobs (Hiring!)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-black dark:text-white mb-6">Customer Support</h4>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            <li><a href="https://wa.me/916281407746" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp Support</a></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-black dark:text-white mb-6">Contact Info</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">WhatsApp: <span className="text-black dark:text-white font-bold">6281407746</span></p>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">Email: <span className="text-black dark:text-white">support@ring4delivery.com</span></p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[10px] uppercase tracking-widest text-gray-600">
        © {new Date().getFullYear()} Ring4Delivery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
