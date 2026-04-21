import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Pill, ShoppingBag, Package, AlertCircle } from 'lucide-react';
import { useService } from '../context/ServiceContext';
import toast from 'react-hot-toast';

const Services = () => {
  const { services: serviceStatus, loading } = useService();

  const services = [
    {
      title: "Restaurants",
      key: "restaurants",
      desc: "Order hot, delicious food from your favorite local restaurants.",
      icon: <Utensils size={40} className="text-primary" />,
      path: "/restaurants",
      bgImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
    },
    {
      title: "Medicines",
      key: "medicines",
      desc: "Upload a list of required medicines and get them delivered fast.",
      icon: <Pill size={40} className="text-blue-500" />,
      path: "/custom-order/medicines",
      bgImg: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop"
    },
    {
      title: "Groceries and other items",
      key: "groceries",
      desc: "Fresh vegetables, daily essentials, and household items instantly.",
      icon: <ShoppingBag size={40} className="text-green-500" />,
      path: "/custom-order/groceries",
      bgImg: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop"
    },
    {
      title: "Pick up and Drop",
      key: "pick-up-and-drop",
      desc: "Send parcels, documents, or items from your location to anywhere.",
      icon: <Package size={40} className="text-orange-500" />,
      path: "/custom-order/pick-up-and-drop",
      bgImg: "/pickup-drop-service.png"
    }
  ];

  const handleServiceClick = (e, service) => {
    if (serviceStatus[service.key] === false) {
      e.preventDefault();
      toast.error(`${service.title} is currently disabled by admin.`, {
        icon: <AlertCircle className="text-red-500" />,
        duration: 4000,
      });
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">What do you need today?</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose a service below. We'll handle the ordering and bring it directly to your door.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link 
              to={service.path} 
              className={`block group ${serviceStatus[service.key] === false ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={(e) => handleServiceClick(e, service)}
            >
              <div className="glass rounded-[2rem] overflow-hidden relative border border-black/5 dark:border-white/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  {serviceStatus[service.key] === false && (
                    <div className="absolute inset-0 bg-black/60 z-30 flex items-center justify-center p-4">
                      <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                        <AlertCircle size={14} /> CURRENTLY DISABLED
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors"></div>
                  <img src={service.bgImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={service.title} />
                  <div className="absolute bottom-4 left-4 z-20 bg-white dark:bg-black p-3 rounded-2xl shadow-lg transition-colors">
                    {service.icon}
                  </div>
                </div>
                <div className="p-8 bg-white dark:bg-black transition-colors">
                  <h3 className="text-2xl font-bold mb-2 text-black dark:text-white group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{service.desc}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
