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
    <div className="pb-20 bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero_bg.jpg" 
            className="w-full h-full object-cover" 
            alt="Premium Delivery Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
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
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white"
            >
              Welcome to <span className="text-primary">Ring4Delivery</span> <br />
              <span className="text-3xl md:text-5xl block mt-2 text-white/80">Food & Daily Essentials Delivery Service.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
            >
              Order your favorite Food from the best Restaurants in your Area. Fast Delivery, Great Prices and Premium Quality. Enjoy Your Favourite Food at Your Home.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/services" className="bg-primary text-dark px-10 py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                Start Order <ArrowRight size={20} />
              </Link>
              <a href="#about" className="glass text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center hover:bg-white/10 transition-colors">
                About Us
              </a>
            </motion.div>
          </div>
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

      <section id="about" className="px-6 py-20 bg-white dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-black dark:text-white">Why Choose <span className="text-primary">Ring4Delivery?</span></h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">Experience a delivery service built on speed, quality, and your favorite local flavors.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Fresh & Trusted", desc: "Fresh, delicious food from trusted restaurants delivered while it's hot.", color: "bg-accent" },
              { title: "Greatest Value", desc: "Competitive pricing with regular discounts and no hidden surcharges.", color: "bg-primary" },
            ].map((feature, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-gray-50 dark:bg-surface-dark border border-black/5 dark:border-white/5 hover:border-primary/30 transition-all group">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform shadow-lg`}>
                  <CheckCircle2 size={28} className={feature.color === 'bg-primary' ? 'text-black' : 'text-white'} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{feature.desc}</p>
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
