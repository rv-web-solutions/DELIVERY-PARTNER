import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, subtotal, totalItems, updateSpecifications } = useCart();
  
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  if (cart.length === 0) {
    return (
      <div className="pt-40 px-6 text-center h-[70vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-gray-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Your cart is empty</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our top restaurants and order something delicious!
        </p>
        <Link 
          to="/" 
          className="bg-primary text-dark px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all"
        >
          Explore Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-12 flex items-center gap-4 text-gray-900 dark:text-white">
        Your Shopping Cart
        <span className="text-lg font-normal text-gray-500">({totalItems} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass p-6 rounded-3xl flex flex-col sm:flex-row gap-6 items-start"
              >
                <img 
                  src={item.imageUrl || '/pickup-drop-service.png'} 
                  alt={item.name} 
                  onError={(e) => { e.target.src = '/pickup-drop-service.png'; e.target.onerror = null; }}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shrink-0" 
                />
                <div className="flex-grow w-full">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 dark:text-white">{item.name}</h4>
                      <p className="text-sm text-primary">{item.restaurantName || item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-gray-500 hover:text-accent p-2 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Specifications Section */}
                  <div className="mt-4 space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Special Specifications</label>
                    <textarea 
                      placeholder="Need any items specify here..."
                      className="w-full bg-white/5 dark:bg-black/10 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-2xl py-3 px-4 text-sm outline-none focus:border-primary/50 transition-all resize-none h-16 placeholder:text-gray-400"
                      value={item.specifications || ''}
                      onChange={(e) => updateSpecifications(item._id, e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                    <div className="flex items-center justify-center gap-4 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 w-fit text-gray-900 dark:text-gray-100">
                      <button 
                        onClick={() => updateQuantity(item._id, -1)}
                        className="p-1 hover:text-primary transition-colors"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item._id, 1)}
                         className="p-1 hover:text-primary transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="text-xl font-bold text-accent dark:text-white">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bill Summary */}
        <div className="lg:col-span-1">
          <div className="glass p-8 rounded-3xl sticky top-32">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Bill Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Taxes (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-white/10 my-4"></div>
              <div className="flex justify-between text-xl font-bold text-accent dark:text-primary">
                <span>Grand Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            <Link 
              to="/checkout"
              className="w-full bg-primary text-dark py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
