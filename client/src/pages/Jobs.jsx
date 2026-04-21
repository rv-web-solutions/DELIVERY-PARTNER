import { motion } from 'framer-motion';
import { Bike, Clock, Wallet, CheckCircle2, MessageSquare, Phone } from 'lucide-react';

const Jobs = () => {
  const requirements = [
    "Valid Two-Wheeler Driving License",
    "A reliable two-wheeler (Bike/Scooter)",
    "Android/iOS Smartphone with internet",
    "Basic knowledge of local routes",
    "Proof of Identity (Aadhaar/PAN)"
  ];

  const benefits = [
    { 
      title: "Flexible Hours", 
      desc: "Be your own boss. Work whenever you want, day or night.",
      icon: <Clock className="text-primary" size={24} />,
      color: "bg-primary/10"
    },
    { 
      title: "Weekly Earnings", 
      desc: "Get your payments directly into your bank account every week.",
      icon: <Wallet className="text-green-500" size={24} />,
      color: "bg-green-500/10"
    },
    { 
      title: "Local Delivery", 
      desc: "Work within your preferred area and know your neighborhood better.",
      icon: <Bike className="text-accent" size={24} />,
      color: "bg-accent/10"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6"
        >
          We Are Hiring!
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 text-black dark:text-white"
        >
          Join the <span className="text-primary">Ring4Delivery</span> Fleet
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Become a Delivery Partner and start earning today. We are currently looking for dedicated individuals to join our growing team.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Job Description & Requirements */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-black dark:text-white">
              <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-black text-sm">01</span>
              Job Description
            </h2>
            <div className="glass p-8 rounded-[2.5rem] border-black/5 dark:border-white/5 bg-white dark:bg-black space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                As a **Delivery Partner** at Ring4Delivery, you will be responsible for picking up orders (Food, Medicines, Groceries, or Parcels) from various locations and delivering them safely to customers' doorsteps.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-bold text-primary">Note:</span> Currently, only the Delivery Partner position is available. We do not have any other openings at this time.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-black dark:text-white">
              <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-black text-sm">02</span>
              Requirements
            </h2>
            <div className="grid gap-4">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark border border-black/5 dark:border-white/5">
                  <CheckCircle2 className="text-primary" size={20} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{req}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Benefits & Contact */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-black dark:text-white">
              <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-black text-sm">03</span>
              Why join us?
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-white dark:bg-black border border-black/5 dark:border-white/5 flex gap-5 items-start hover:border-primary/30 transition-all group">
                  <div className={`p-4 rounded-2xl ${benefit.color} transform group-hover:scale-110 transition-transform`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-black dark:text-white">{benefit.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-primary rounded-[3rem] p-10 text-black overflow-hidden relative group">
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-4">Interested?</h2>
              <p className="text-black/80 font-medium mb-8 max-w-sm">
                For more information regarding the joining process, documentation, and payouts, please contact our Admin team directly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/916281407746" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl"
                >
                  <MessageSquare size={20} /> WhatsApp Us
                </a>
                <a 
                  href="tel:+916281407746" 
                  className="bg-white/20 backdrop-blur-md text-black border border-black/10 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/30 transition-all"
                >
                  <Phone size={20} /> Call Admin
                </a>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-black/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
