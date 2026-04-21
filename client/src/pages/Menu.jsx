import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Plus, Minus, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchRestaurant, fetchItems } from '../api';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const getMenuData = async () => {
      try {
        const [resData, itemsData] = await Promise.all([
          fetchRestaurant(id),
          fetchItems(id)
        ]);
        setRestaurant(resData.data);
        setItems(itemsData.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };
    getMenuData();
  }, [id]);

  if (loading) return (
    <div className="pt-32 px-6 flex flex-col items-center">
      <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-400">Loading Menu...</p>
    </div>
  );

  if (!restaurant) return (
    <div className="pt-32 px-6 text-center text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold">Restaurant not found</h2>
      <Link to="/" className="text-primary mt-4 inline-block">Back to Home</Link>
    </div>
  );

  const categories = [...new Set(items.map(item => item.category))];

  return (
    <div className="pb-20">
      {/* Restaurant Header */}
      <div className="relative h-[40vh]">
        <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply"></div>
        <img 
          src={restaurant.imageUrl} 
          alt={restaurant.name} 
          className="w-full h-full object-cover relative z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent z-10 transition-colors"></div>
        <div className="absolute bottom-10 left-6 right-6 max-w-7xl mx-auto z-20">
          <Link to="/restaurants" className="flex items-center gap-2 text-primary mb-6 hover:-translate-x-1 transition-transform inline-block font-bold">
            <ChevronLeft size={20} /> Back to Restaurants
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">{restaurant.name}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="bg-primary text-dark px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-sm">
              <Star size={14} className="fill-dark" /> {restaurant.rating}
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium bg-white/80 dark:bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
              <Clock size={16} /> {restaurant.deliveryTime}
            </div>
            <div className="text-gray-700 dark:text-gray-300 font-medium bg-white/80 dark:bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
              {restaurant.cuisine} • Delivery Fee <span className="text-accent dark:text-primary font-bold">₹{restaurant.deliveryFee}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories & Items */}
      <div className="max-w-7xl mx-auto px-6 mt-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="md:w-64 shrink-0 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          <div className="flex md:flex-col gap-2 sticky top-24">
            <h3 className="hidden md:block font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-xs mb-4">Categories</h3>
            {categories.map(cat => (
              <a 
                key={cat} 
                href={`#${cat}`}
                className="whitespace-nowrap px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors font-medium"
              >
                {cat}
              </a>
            ))}
          </div>
        </aside>

        {/* Menu Items List */}
        <div className="flex-grow space-y-16">
          {categories.map(category => (
            <div key={category} id={category} className="scroll-mt-32">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-4 text-gray-900 dark:text-white">
                {category}
                <div className="h-px flex-grow bg-gray-200 dark:bg-white/10"></div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.filter(item => item.category === category).map(item => (
                  <motion.div 
                    key={item._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 glass rounded-3xl flex gap-4 hover:shadow-md dark:hover:bg-white/5 transition-all outline outline-1 outline-gray-200 dark:outline-white/5 border-none"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-sm"
                    />
                    <div className="flex-grow">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">{item.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        {item.hasPortions ? (
                          <span className="font-bold text-accent dark:text-primary whitespace-nowrap">₹{item.singlePrice} - ₹{item.fullPrice}</span>
                        ) : (
                          <span className="font-bold text-accent dark:text-primary">₹{item.price}</span>
                        )}
                        
                        <div className="flex gap-2 ml-4">
                          {item.hasPortions ? (
                            <>
                                <button 
                                  onClick={() => addToCart(item, restaurant, 'Single')}
                                  className="text-accent dark:text-primary px-3 py-2 rounded-xl text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors outline-none border border-current"
                                >
                                  + Single
                                </button>
                                <button 
                                  onClick={() => addToCart(item, restaurant, 'Full')}
                                  className="text-accent dark:text-primary px-3 py-2 rounded-xl text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors outline-none border border-current"
                                >
                                  + Full
                                </button>
                            </>
                          ) : (
                            <button 
                              onClick={() => addToCart(item, restaurant)}
                              className="bg-primary text-dark p-2 rounded-xl hover:scale-110 active:scale-95 transition-all outline-none shrink-0"
                            >
                              <Plus size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
