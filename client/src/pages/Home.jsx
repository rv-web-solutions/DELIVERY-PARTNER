import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Heart } from 'lucide-react';

const Home = () => {
  const scrollImages = [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop", // burger
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&auto=format&fit=crop", // pasta
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop", // salad
    "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&auto=format&fit=crop", // sushi
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop", // pizza 2
  ];

  return (
    <div className="pb-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="z-10 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/20 text-yellow-800 px-4 py-2 rounded-full font-bold text-sm mb-6"
            >
              <Heart size={16} className="text-primary fill-primary" /> 
              <span>Good food is good mood!</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-white"
            >
              Whatever you need, <br />
              <span className="text-gradient drop-shadow-sm">Delivered Fast.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed"
            >
              From hot restaurant meals to essential daily groceries and life-saving medicines. We bring the city to your doorstep.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/services" className="bg-primary text-gray-900 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-primary/30">
                Start Order <ArrowRight size={20} />
              </Link>
              <a href="#about" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                Learn More
              </a>
            </motion.div>
          </div>

          {/* Image Collage */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative h-[400px] md:h-[500px] mt-16 lg:mt-0"
          >
            <div className="absolute top-0 right-0 w-[80%] lg:w-2/3 h-48 lg:h-64 rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&fit=crop" className="w-full h-full object-cover" alt="Food" />
            </div>
            <div className="absolute bottom-0 left-0 w-[80%] lg:w-2/3 h-48 lg:h-64 rounded-[2rem] overflow-hidden shadow-2xl z-10 border-4 border-gray-50 dark:border-gray-900 transition-colors">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&fit=crop" className="w-full h-full object-cover" alt="Groceries" />
            </div>
            <div className="absolute top-1/2 right-4 lg:right-10 -translate-y-1/2 w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-xl border-4 border-gray-50 dark:border-gray-900 z-20 transition-colors">
              <img src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&fit=crop" className="w-full h-full object-cover" alt="Medicines" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Scrolling Food Marquee */}
      <section className="py-10 bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-800 transition-colors overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-800 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-800 to-transparent z-10"></div>
        
        <div className="flex w-max animate-spin-slow" style={{ animation: "scroll 30s linear infinite" }}>
          {[...scrollImages, ...scrollImages].map((src, i) => (
            <div key={i} className="w-64 h-48 mx-4 rounded-3xl overflow-hidden shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">
              <img src={src} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt={`Delicious food ${i}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* About Service Section */}
      <section id="about" className="px-6 py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Us?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">We are committed to providing the most reliable and transparent delivery service in your area.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Everything in One Place", desc: "No need for multiple apps. Order hot food, medical prescriptions, and fresh supermarket groceries all from one single interface." },
              { title: "Transparent Pricing", desc: "For custom orders, you connect directly with our delivery partners via WhatsApp. You only pay the actual store cost plus our standard flat delivery fee." },
              { title: "Lightning Fast Drops", desc: "Our localized fleet ensures that your items are picked up and dropped off within minutes, not hours." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all">
                <CheckCircle2 size={40} className="text-green-500 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Link Banner */}
      <section className="px-6 py-20 max-w-7xl mx-auto text-center">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-[3rem] p-12 relative overflow-hidden border border-primary/30 dark:border-primary/10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white relative z-10">Stop Waiting. Start Eating!</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-md mx-auto relative z-10">Tap below to explore our services and get exactly what you need.</p>
          <Link to="/services" className="inline-block bg-primary text-gray-900 px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg relative z-10">
            View All Services
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
