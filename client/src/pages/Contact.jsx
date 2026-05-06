import React from 'react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center min-h-[60vh] flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">Contact Us</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        We're here to help! The fastest way to reach us is through WhatsApp.
      </p>
      <a 
        href="https://wa.me/916281407746" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform mx-auto"
      >
        Chat with us on WhatsApp
      </a>
      <div className="mt-12 space-y-2 text-gray-600 dark:text-gray-400">
        <p>Email: support@ring4delivery.com</p>
        <p>Phone: +91 6281407746</p>
      </div>
    </div>
  );
};

export default Contact;
