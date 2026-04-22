import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "How long does delivery take?", a: "We aim to deliver all orders within 30 minutes or less depending on your location and the restaurant's preparation time." },
  { q: "What areas do you deliver in?", a: "We currently serve local areas in our operating region. You can enter your address at checkout to confirm coverage." },
  { q: "How do I place an order?", a: "Browse restaurants, add items to your cart, provide your delivery details at checkout, and confirm your order via WhatsApp." },
  { q: "Can I add special instructions?", a: "Yes! You can add special instructions for each item and for the delivery partner at checkout." },
  { q: "What payment methods are accepted?", a: "We currently accept Cash on Delivery (COD). Online payment options are coming soon!" },
  { q: "How do I track my order?", a: "After placing your order, our delivery partner will contact you directly on the phone number you provide." },
  { q: "Can I cancel my order?", a: "Please contact us on WhatsApp immediately if you wish to cancel. Cancellation is possible before the restaurant starts preparing your order." },
  { q: "How do I apply for a Delivery Partner job?", a: "Visit our Jobs page and contact us directly on WhatsApp or Call. We'll guide you through the joining process." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">
            Got Questions?
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 text-lg">
            Everything you need to know about Ring4Delivery.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl border transition-all cursor-pointer overflow-hidden ${openIndex === i ? 'border-primary/50 bg-primary/5 dark:bg-primary/5' : 'border-black/5 dark:border-white/5 bg-gray-50 dark:bg-gray-900'}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between p-6 gap-4">
                <h3 className="font-bold text-lg">{faq.q}</h3>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={20} className="text-primary shrink-0" />
                </motion.div>
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still got questions */}
        <div className="mt-16 text-center p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
          <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Reach out to us directly on WhatsApp and we'll help you out!</p>
          <a href="https://wa.me/916281407746" target="_blank" rel="noopener noreferrer"
            className="inline-block bg-primary text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
