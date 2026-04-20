import { useState, useEffect } from 'react';
import { Search, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useService } from '../context/ServiceContext';

import { fetchRestaurants, fetchAllItems } from '../api';
import toast from 'react-hot-toast';

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { services, loading: servicesLoading } = useService();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (servicesLoading) return;

    if (services['restaurants'] === false) {
      toast.error("Restaurant ordering is currently disabled.", {
        icon: <AlertCircle className="text-red-500" />
      });
      navigate('/services');
      return;
    }

    const getData = async () => {
      try {
        const [resParams, itemsParams] = await Promise.all([
          fetchRestaurants(),
          fetchAllItems()
        ]);
        setRestaurants(resParams.data);
        setAllItems(itemsParams.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [services, servicesLoading, navigate]);

  const filteredRestaurants = restaurants.filter(r => {
    const basicMatch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       r.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
                       
    const hasMatchingItem = allItems.some(item => 
      item.restaurantId && 
      (typeof item.restaurantId === 'object' ? item.restaurantId._id === r._id : item.restaurantId === r._id) && 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return basicMatch || hasMatchingItem;
  });

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Explore Restaurants</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Discover top-rated places around you. From local favorites to premium dining.
        </p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-w-xl mx-auto"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
          <input 
            type="text" 
            placeholder="Search for restaurants, cuisines, or food items..."
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary/50 shadow-sm transition-all text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-80 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-3xl border border-gray-200 dark:border-gray-700"></div>
          ))
        ) : filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index % 3 * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer glass p-3 rounded-3xl"
            >
              <Link to={`/restaurant/${restaurant._id}`}>
                <div className="relative h-60 overflow-hidden rounded-[1.5rem] mb-4">
                  <img 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm border border-white/20 dark:border-gray-700/50">
                    <Star size={14} className="text-primary fill-primary" />
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{restaurant.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-primary text-gray-900 px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg">
                    <Clock size={14} />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors text-gray-900 dark:text-gray-100">{restaurant.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{restaurant.cuisine} • Delivery Fee ₹{restaurant.deliveryFee}</p>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400">
            No restaurants found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
