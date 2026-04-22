import { motion } from 'framer-motion';
import { Bike, ShieldCheck, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    { icon: <Clock size={28} className="text-black" />, bg: "bg-primary", title: "Speed First", desc: "We promise deliveries in 30 minutes or less, because your time matters." },
    { icon: <ShieldCheck size={28} className="text-white" />, bg: "bg-accent", title: "100% Hygienic", desc: "Every order is handled with care — fresh, clean, and safely packaged." },
    { icon: <Heart size={28} className="text-black" />, bg: "bg-primary", title: "Made with Love", desc: "We partner only with trusted local restaurants who care about quality." },
    { icon: <Bike size={28} className="text-white" />, bg: "bg-accent", title: "Reliable Partners", desc: "Our delivery fleet is trained, verified, and always on time." },
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">
          Who We Are
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold mb-6">
          About <span className="text-primary">Ring4Delivery</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Ring4Delivery is a premium food and daily essentials delivery service. We bring you <strong className="text-black dark:text-white">tasty, healthy, quality, fresh &amp; hygienic food</strong> from your favourite restaurants — right to your doorstep.
        </motion.p>
      </div>

      {/* Values */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {values.map((v, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="flex gap-5 items-start p-8 rounded-[2rem] bg-gray-50 dark:bg-gray-900 border border-black/5 dark:border-white/5 hover:border-primary/40 transition-all">
            <div className={`w-14 h-14 rounded-2xl ${v.bg} flex items-center justify-center shrink-0 shadow-lg`}>{v.icon}</div>
            <div>
              <h3 className="text-xl font-bold mb-2">{v.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mission */}
      <div className="max-w-3xl mx-auto text-center p-12 rounded-[3rem] bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
          To become the most trusted delivery partner in the region by consistently delivering quality, speed, and smiles — one order at a time.
        </p>
        <Link to="/services" className="inline-block bg-primary text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg">
          Explore Our Services
        </Link>
      </div>
    </div>
  );
};

export default About;
