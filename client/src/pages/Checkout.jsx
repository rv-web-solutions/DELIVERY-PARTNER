import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Send, MapPin, Phone, User, MessageSquare, ClipboardCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cart, subtotal, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    locationLink: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isLocating, setIsLocating] = useState(false);
  const [locationInfo, setLocationInfo] = useState(null); // { lat, lng, address }
  const [locationError, setLocationError] = useState('');

  const deliveryFee = 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    if (!formData.locationLink.trim()) newErrors.locationLink = 'Location is required. Please pick a location or paste a map link.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError('');
    setLocationInfo(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        setFormData(prev => ({ ...prev, locationLink: mapsLink }));

        // Reverse geocode via OpenStreetMap Nominatim (free, no key needed)
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await response.json();
          const readable = data.display_name || '';
          setLocationInfo({ lat: latitude.toFixed(6), lng: longitude.toFixed(6), address: readable });
          // Auto-fill address if empty
          if (readable) {
            setFormData(prev => ({
              ...prev,
              locationLink: mapsLink,
              address: prev.address.trim() === '' ? readable : prev.address
            }));
          }
        } catch {
          // Geocode failed — still store coords, just show the link
          setLocationInfo({ lat: latitude.toFixed(6), lng: longitude.toFixed(6), address: '' });
        }
        setIsLocating(false);
      },
      (err) => {
        const messages = {
          1: 'Permission denied. Please allow location access in your browser settings.',
          2: 'Location unavailable. Try again in a moment.',
          3: 'Location request timed out. Please try again.',
        };
        setLocationError(messages[err.code] || 'Unable to retrieve your location.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    const orderId = `ORDER-${Date.now().toString().slice(-6)}`;
    
    let message = `*Ring4Delivery Order Confirmation*\n\n` +
      `*Order ID:* ${orderId}\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Delivery Address:* ${formData.address}\n` +
      (formData.locationLink ? `*Location Link:* ${formData.locationLink}\n` : '');

    const customItems = cart.filter(item => ['Parcel', 'Medicines', 'Groceries'].includes(item.category));
    const standardItems = cart.filter(item => !['Parcel', 'Medicines', 'Groceries'].includes(item.category));

    if (customItems.length > 0) {
       message += `\n\n*--- CUSTOM SERVICES ---*\n`;
       customItems.forEach(item => {
           if (item.category === 'Parcel') {
               let pickupLoc = item.pickupLocation || (item.specifications.split('\nItems: ')[0]?.replace('Pick-up from: ', '') || 'N/A');
               let packageDet = item.packageDetails || (item.specifications.split('\nItems: ')[1] || item.specifications);
               message += `*Type:* Pick Up & Drop\n` +
                          `*Pick Up Location:* ${pickupLoc}\n` +
                          `*Package Details:* ${packageDet}\n\n`;
           } else {
               message += `*Type:* ${item.category}\n` +
                          `*Requirements:* ${item.specifications}\n\n`;
           }
       });
       message += `*Note:* Extra charges will be applicable accordingly for custom services.\n`;
    }

    if (standardItems.length > 0) {
       message += `\n*--- RESTAURANT ITEMS ---*\n`;
       const itemsList = standardItems.map(item => {
         let itemStr = `• ${item.name} (${item.quantity}x) - ₹${item.price * item.quantity}`;
         if (item.specifications) itemStr += `\n  _Note: ${item.specifications}_`;
         return itemStr;
       }).join('\n');
       message += itemsList + `\n`;
    }

    message += `\n*Bill Summary:* \n` +
      `Subtotal: ₹${subtotal}\n` +
      `Delivery Fee: ₹${deliveryFee}\n` +
      `Tax (5%): ₹${tax}\n` +
      `*Total: ₹${total}*\n` +
      (formData.notes ? `\n*Special Notes:* ${formData.notes}` : '') +
      `\n\n_Thank you for ordering with Ring4Delivery!_`;

    const whatsappUrl = `https://wa.me/916281407746?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex items-center gap-4 mb-12">
        <ClipboardCheck className="text-primary" size={32} />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form Section */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-[2.5rem] border-gray-200 dark:border-white/5">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-gray-900 dark:text-white">
              <User size={20} className="text-primary" /> Delivery Information
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text"
                    placeholder="John Doe"
                    className={`w-full bg-white dark:bg-white/5 border ${errors.name ? 'border-accent' : 'border-gray-200 dark:border-white/10'} text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary/50 transition-all`}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                {errors.name && <p className="text-accent text-xs ml-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="tel"
                    placeholder="9876543210"
                    className={`w-full bg-white dark:bg-white/5 border ${errors.phone ? 'border-accent' : 'border-gray-200 dark:border-white/10'} text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary/50 transition-all`}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                {errors.phone && <p className="text-accent text-xs ml-1">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-1">Delivery Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-500" size={18} />
                  <textarea 
                    placeholder="House No, Street, Area, Landmark..."
                    rows="3"
                    className={`w-full bg-white dark:bg-white/5 border ${errors.address ? 'border-accent' : 'border-gray-200 dark:border-white/10'} text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary/50 transition-all resize-none`}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                {errors.address && <p className="text-accent text-xs ml-1">{errors.address}</p>}
              </div>

              {/* Optional Fields */}
              <div className="space-y-4 pt-4">
                <div className="h-px bg-gray-200 dark:bg-white/5"></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-1">
                      Location <span className="text-accent">*</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      className="text-xs bg-primary/20 text-primary px-3 py-1.5 rounded-xl font-bold hover:bg-primary hover:text-dark transition-all disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {isLocating ? (
                        <><span className="w-3 h-3 border-2 border-primary/40 border-t-primary rounded-full animate-spin"></span> Locating...</>
                      ) : (
                        <>📍 Use My Location</>
                      )}
                    </button>
                  </div>

                  {/* Error message */}
                  {locationError && (
                    <div className="flex items-center gap-2 text-accent text-xs bg-accent/10 border border-accent/20 px-4 py-3 rounded-xl">
                      <span>⚠️</span> {locationError}
                    </div>
                  )}

                  {/* Coordinates + address info card */}
                  {locationInfo && (
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-primary font-bold uppercase tracking-wider">
                        <MapPin size={12} /> Location Detected
                      </div>
                      <p className="text-xs font-mono text-gray-400">
                        {locationInfo.lat}°N, {locationInfo.lng}°E
                      </p>
                      {locationInfo.address && (
                        <p className="text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-2">
                          {locationInfo.address}
                        </p>
                      )}
                    </div>
                  )}

                  <input 
                    type="text"
                    placeholder="Paste Google Maps link or use the button above"
                    className={`w-full bg-white dark:bg-white/5 border ${errors.locationLink ? 'border-accent' : 'border-gray-200 dark:border-white/10'} text-gray-900 dark:text-white rounded-2xl py-4 px-6 outline-none focus:border-primary/50 transition-all text-sm`}
                    value={formData.locationLink}
                    onChange={(e) => setFormData({...formData, locationLink: e.target.value})}
                  />
                  {errors.locationLink && <p className="text-accent text-xs ml-1 mt-1">{errors.locationLink}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-1">Special Notes (Optional)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-gray-500" size={18} />
                    <textarea 
                      placeholder="Add instructions for delivery partner..."
                      rows="2"
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary/50 transition-all resize-none"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-[2.5rem] border-gray-200 dark:border-white/5">
            <h3 className="text-xl font-bold mb-8 text-gray-900 dark:text-white">Order Summary</h3>
            <div className="max-h-60 overflow-y-auto space-y-4 mb-8 pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-lg text-[10px] font-bold">
                      {item.quantity}x
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
              <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                <span>GST (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-primary pt-4">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaceOrder}
              className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 mt-10 shadow-lg shadow-[#25D366]/20 transition-all"
            >
              <Send size={20} /> Place Order via WhatsApp
            </motion.button>
            <p className="text-[10px] text-gray-500 text-center mt-4">
              By clicking "Place Order", you will be redirected to WhatsApp to confirm your delivery details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
