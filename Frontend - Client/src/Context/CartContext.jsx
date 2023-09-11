import { createContext, useState, useContext } from "react";

export const CartContext = createContext({
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  updateItemQuantity: () => {},
  totalQuantity: 0,
  total: 0
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    if (isInCart(item.id)) {
      setCart(prev => prev.map(cartItem => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + quantity };
        }
        return cartItem;
      }));
    } else {
      setCart(prev => [...prev, { ...item, quantity }]);
    }
  };

  const increaseItemQuantity = (itemId) => {
    if (isInCart(itemId)) {
      setCart(prev => prev.map(item => {
        if (item.id.toString() === itemId.toString()) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }));
    }
  };

  const decreaseItemQuantity = (itemId) => {
    if (isInCart(itemId)) {
      setCart(prev => prev.map(item => {
        if (item.id.toString() === itemId.toString()) {
          const newQuantity = item.quantity - 1;
          if (newQuantity >= 0) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      }));
    }
  };


  const removeItem = (itemId) => {
    const cartUpdated = cart.filter(prod => prod.id.toString() !== itemId.toString());
    setCart(cartUpdated);
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId) => {
    return cart.find(prod => prod.id.toString() === itemId.toString());
  };

  const updateItemQuantity = (itemId, quantity) => {
    if (isInCart(itemId)) {
      setCart(prev => prev.map(item => {
        if (item.id.toString() === itemId.toString()) {
          return { ...item, quantity };
        }
        return item;
      }));
    } else {
      console.error('El producto no está en el carrito');
    }
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, updateItemQuantity, increaseItemQuantity, decreaseItemQuantity, totalQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

// Función de utilidad para acceder al contexto del carrito
export const useCart = () => {
  return useContext(CartContext);
};