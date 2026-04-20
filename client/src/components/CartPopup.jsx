import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, MessageSquare, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPopup = () => {
    const { showPopup, setShowPopup, lastAddedItem, cart, updateSpecifications } = useCart();
    const [spec, setSpec] = useState('');
    const navigate = useNavigate();

    // Find the current item's spec in cart to keep it synced
    const cartItem = lastAddedItem ? cart.find(i => i._id === lastAddedItem._id) : null;
    
    useEffect(() => {
        if (cartItem) {
            setSpec(cartItem.specifications || '');
        }
    }, [cartItem]);

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 8000); // 8 seconds, giving time to type
            return () => clearTimeout(timer);
        }
    }, [showPopup, setShowPopup]);

    const handleSpecChange = (e) => {
        const value = e.target.value;
        setSpec(value);
        if (lastAddedItem) {
            updateSpecifications(lastAddedItem._id, value);
        }
    };

    return (
        <AnimatePresence>
            {showPopup && lastAddedItem && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50, x: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                    className="fixed bottom-6 right-6 z-[100] w-[350px] overflow-hidden"
                >
                    <div className="glass border-primary/20 p-6 rounded-[2rem] shadow-2xl relative">
                        {/* Progress bar for auto-close */}
                        <motion.div 
                            initial={{ width: '100%' }}
                            animate={{ width: '0%' }}
                            transition={{ duration: 8, ease: 'linear' }}
                            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
                        />

                        <button 
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-primary/20 p-2 rounded-xl">
                                <ShoppingBag className="text-primary" size={20} />
                            </div>
                            <span className="text-sm font-bold text-primary uppercase tracking-wider">Added to Cart!</span>
                        </div>

                        <div className="flex gap-4 mb-6">
                            <img 
                                src={lastAddedItem.imageUrl || '/pickup-drop-service.png'} 
                                alt={lastAddedItem.name} 
                                onError={(e) => { e.target.src = '/pickup-drop-service.png'; e.target.onerror = null; }}
                                className="w-16 h-16 rounded-2xl object-cover shrink-0" 
                            />
                            <div>
                                <h4 className="font-bold text-lg line-clamp-1">{lastAddedItem.name}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{lastAddedItem.restaurantName}</p>
                                <p className="text-primary font-bold mt-1">₹{lastAddedItem.price}</p>
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5 ml-1">
                                <MessageSquare size={14} /> Any special specifications?
                            </label>
                            <textarea 
                                placeholder="Need any items specify here..."
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-3 px-4 text-sm outline-none focus:border-primary/50 transition-all resize-none h-20 placeholder:text-gray-500 dark:placeholder:text-gray-600"
                                value={spec}
                                onChange={handleSpecChange}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => {
                                    setShowPopup(false);
                                    navigate('/cart');
                                }}
                                className="flex-grow bg-primary text-dark py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                View Cart <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CartPopup;
