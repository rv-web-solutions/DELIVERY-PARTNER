import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ClipboardList, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useService } from '../context/ServiceContext';
import toast from 'react-hot-toast';

const CustomOrder = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { services, loading } = useService();
  const [requirements, setRequirements] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  useEffect(() => {
    if (!loading) {
      const serviceKey = type === 'groceries' ? 'groceries' : (type === 'medicines' ? 'medicines' : 'pick-up-and-drop');
      if (services[serviceKey] === false) {
        toast.error(`This service is currently disabled.`, {
          icon: <AlertCircle className="text-red-500" />
        });
        navigate('/services');
      }
    }
  }, [type, navigate, services, loading]);

  if (loading) return (
    <div className="pt-32 flex justify-center min-h-screen">
      <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // Validate the type
  const isMedicine = type === 'medicines';
  const isPickupDrop = type === 'pick-up-and-drop';
  
  const displayTitle = isPickupDrop ? 'Pick up and Drop' : (isMedicine ? 'Order Medicines' : 'Order Groceries and other items');
  const displayDesc = isPickupDrop 
    ? 'Enter the details of the item to be picked up and its pickup location.' 
    : (isMedicine 
      ? 'List the medicines you need. If you have a prescription requirement, note it down below.'
      : 'List your grocery and other items, quantities, and preferred brands.');

  const handleAddToCart = () => {
    if (!requirements.trim()) {
      toast.error("Please list your requirements first!");
      return;
    }
    if (isPickupDrop && !pickupLocation.trim()) {
      toast.error("Please enter a pickup location!");
      return;
    }

    const customItem = {
      _id: `custom-${type}-${Date.now()}`,
      name: isPickupDrop ? `Pick up & Drop Order` : `Custom ${isMedicine ? 'Medicine' : 'Grocery'} Order`,
      price: 0, // Costs will be finalized later
      category: isPickupDrop ? 'Parcel' : (isMedicine ? 'Medicines' : 'Groceries'),
      imageUrl: '/pickup-drop-service.png',
      specifications: isPickupDrop ? `Pick-up from: ${pickupLocation}\nItems: ${requirements}` : requirements,
      pickupLocation: isPickupDrop ? pickupLocation : null,
      packageDetails: isPickupDrop ? requirements : null
    };

    addToCart(customItem, 1);
    navigate('/cart');
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto min-h-screen">
      <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 rounded-2xl ${isPickupDrop ? 'bg-orange-100 dark:bg-orange-900 text-orange-500 md:dark:text-orange-300' : (isMedicine ? 'bg-blue-100 dark:bg-blue-900 text-blue-500 md:dark:text-blue-300' : 'bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-300')}`}>
            <ClipboardList size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{displayTitle}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{displayDesc}</p>
          </div>
        </div>

        {isPickupDrop && (
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-2">Pick-up Location</label>
            <textarea 
              rows="3"
              placeholder="Paste Google Maps link or enter full pickup address here..."
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-2xl p-6 outline-none focus:border-primary/50 transition-all resize-none shadow-inner"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            ></textarea>
          </div>
        )}

        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-2">{isPickupDrop ? 'Parcel Details / Requirements' : 'Your Requirements'}</label>
          <textarea 
            rows="6"
            placeholder={isPickupDrop 
              ? `Describe the items to be picked up...` 
              : (isMedicine 
                ? `e.g.\n1. Paracetamol 500mg - 2 strips\n2. Vitamin C - 1 bottle` 
                : `e.g.\n1. 1kg Basmati Rice\n2. 500g Toor Dal\n3. 1L Sunflower Oil`)}
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-2xl p-6 outline-none focus:border-primary/50 transition-all resize-none shadow-inner"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          ></textarea>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 p-4 rounded-xl text-xs font-medium mb-8 border border-orange-100 dark:border-orange-800/50">
          <span className="font-bold">Note:</span> The cart will show ₹0 for custom items. Our partner will verify your list and confirm the final price directly with you before placing the delivery!
        </div>

        <button 
          onClick={handleAddToCart}
          className="w-full bg-primary text-gray-900 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg shadow-primary/20 transition-all"
        >
          <ShoppingCart size={20} /> Add Requirements to Cart
        </button>
      </div>
    </div>
  );
};

export default CustomOrder;
