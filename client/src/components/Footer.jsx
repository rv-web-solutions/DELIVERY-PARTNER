import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-950/80 border-t border-black/5 dark:border-white/5 py-10 px-6 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-dark font-bold">R</span>
            </div>
            <span className="font-bold text-lg text-gradient">Ring4Delivery</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Delivering the best food, medicines, and groceries directly to your doorstep. Fast, reliable, and convenient.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Customer Support</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><a href="/faq" className="hover:text-primary transition-colors">FAQs</a></li>
            <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Info</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">WhatsApp: 6281407746</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Email: support@ring4delivery.com</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-black/5 dark:border-white/5 text-center text-xs text-gray-500 dark:text-gray-500">
        © {new Date().getFullYear()} Ring4Delivery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
