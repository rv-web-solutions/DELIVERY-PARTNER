import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, BadgeDollarSign, UtensilsCrossed } from 'lucide-react';

const Home = () => {
  const scrollImages = [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop",
  ];

  const features = [
    {
      icon: <Zap size={30} className="text-black" />,
      emoji: "⚡",
      title: "Fast Delivery",
      desc: "Get your food delivered in 30 minutes or less",
      color: "bg-primary",
    },
    {
      icon: <BadgeDollarSign size={30} className="text-white" />,
      emoji: "💰",
      title: "Best Prices",
      desc: "Competitive pricing with regular discounts",
      color: "bg-accent",
    },
    {
      icon: <UtensilsCrossed size={30} className="text-black" />,
      emoji: "🍽️",
      title: "Quality Food",
      desc: "Fresh, delicious food from trusted restaurants",
      color: "bg-primary",
    },
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
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            {/* "Good food is good mood" badge in RED */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent px-4 py-2 rounded-full font-bold text-sm mb-6"
            >
              ❤️ <span>Good Food is Good Mood!</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-white"
            >
              Enjoy Your Favourite Food
              <br />
              <span className="text-primary">At Your Home</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/90 text-lg md:text-xl mb-3 max-w-2xl leading-relaxed"
            >
              Now get Tasty, Healthy, Quality, Fresh &amp; Hygienic Food at Your Doorstep
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-white/70 text-base md:text-lg mb-10 max-w-xl leading-relaxed"
            >
              Order Food from Your Favourite Restaurants
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/services"
                className="inline-flex bg-primary text-black px-10 py-5 rounded-2xl font-black items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-primary/30"
              >
                Start Ordering <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infinite Scrolling Food Marquee */}
      <section className="py-10 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div>
        <div className="flex w-max" style={{ animation: "scroll 30s linear infinite" }}>
          {[...scrollImages, ...scrollImages].map((src, i) => (
            <div key={i} className="w-64 h-48 mx-4 rounded-3xl overflow-hidden shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">
              <img src={src} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt={`Delicious food ${i}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Ring4Delivery */}
      <section id="about" className="px-6 py-24 bg-white dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-accent dark:text-primary font-bold uppercase tracking-widest text-sm mb-3"
            >
              Our Promise
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold mb-6 text-black dark:text-white"
            >
              Why Choose <span className="text-primary">Ring4Delivery?</span>
            </motion.h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Experience a delivery service built on speed, quality, and your favourite local flavors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900 border border-black/5 dark:border-white/5 hover:border-primary/40 transition-all group text-center"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform shadow-lg`}>
                  <span className="text-2xl">{feature.emoji}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Link Banner */}
      <section className="px-6 py-20 max-w-7xl mx-auto text-center">
        <div className="bg-gradient-to-r from-primary/20 to-accent/10 rounded-[3rem] p-12 relative overflow-hidden border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white relative z-10">Stop Waiting. Start Eating!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto relative z-10 text-lg">Explore our services and get exactly what you need — delivered fast.</p>
          <Link
            to="/services"
            className="inline-block bg-primary text-black px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg relative z-10"
          >
            View All Services
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
