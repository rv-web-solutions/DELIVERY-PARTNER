import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('ring4delivery_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showPopup, setShowPopup] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('ring4delivery_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, restaurant, portion = null) => {
    const cartItemId = portion ? `${item._id}-${portion}` : item._id;
    const itemName = portion ? `${item.name} (${portion})` : item.name;
    const itemPrice = portion === 'Single' ? item.singlePrice : (portion === 'Full' ? item.fullPrice : item.price);

    setCart(prevCart => {
      // Check if item already exists
      const existingItem = prevCart.find(i => i._id === cartItemId);
      if (existingItem) {
        return prevCart.map(i => 
          i._id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { 
        ...item, 
        _id: cartItemId,
        originalId: item._id,
        name: itemName,
        price: itemPrice,
        restaurantId: restaurant?._id || 'custom', 
        restaurantName: restaurant?.name || 'Custom Service', 
        quantity: 1,
        specifications: item.specifications || '' 
      }];
    });
    setLastAddedItem({ ...item, name: itemName, price: itemPrice, restaurantName: restaurant?.name || 'Custom Service' });
    setShowPopup(true);
  };

  const updateSpecifications = (itemId, specifications) => {
    setCart(prevCart => prevCart.map(i => 
      i._id === itemId ? { ...i, specifications } : i
    ));
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(i => i._id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCart(prevCart => prevCart.map(i => {
      if (i._id === itemId) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      updateSpecifications,
      subtotal,
      totalItems,
      showPopup,
      setShowPopup,
      lastAddedItem
    }}>
      {children}
    </CartContext.Provider>
  );
};
