import React, { createContext, useState, useEffect } from "react";

// Create the StoreContext
export const StoreContext = createContext();

// Helper for safe localStorage access
const getStoredItem = (key, defaultValue) => {
try {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
} catch (error) {
  console.error(`Error reading ${key} from localStorage:`, error);
  return defaultValue;
}
};

export const StoreProvider = ({ children }) => {
// Initialize cartItems from localStorage
const [cartItems, setCartItems] = useState(() =>
  getStoredItem("cartItems", [])
);

// Initialize wishlistCount from localStorage or default to 0.
const [wishlistCount, setWishlistCount] = useState(() => {
  const savedWishlist = localStorage.getItem("wishlistCount");
  return savedWishlist ? parseInt(savedWishlist, 10) : 0;
});

// Initialize wishlistItems from localStorage
const [wishlistItems, setWishlistItems] = useState(() =>
  getStoredItem("wishlistItems", [])
);

// Persist cartItems to localStorage whenever they change
useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);

// Persist wishlistCount to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem("wishlistCount", wishlistCount);
}, [wishlistCount]);

// Persist wishlistItems to localStorage whenever they change
useEffect(() => {
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
}, [wishlistItems]);

// CART OPERATIONS

// Add a product to the cart, or update its quantity if it already exists
const addToCart = (product, quantity = 1) => {
  setCartItems((prevItems) => {
    const index = prevItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      // Create a new array with the updated quantity
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: updatedItems[index].quantity + quantity,
      };
      return updatedItems;
    } else {
      // Add new product with the provided quantity
      return [...prevItems, { ...product, quantity }];
    }
  });
};

// Remove a product from the cart entirely
const removeFromCart = (productId) => {
  setCartItems((prevItems) =>
    prevItems.filter((item) => item.id !== productId)
  );
};

// Update quantity of a specific product in the cart
const updateQuantity = (productId, newQuantity) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    )
  );
};

// Clear the whole cart
const clearCart = () => {
  setCartItems([]);
};

// Derived values for the cart:
const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
const cartTotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

// WISHLIST OPERATIONS

// Add product to wishlist (only if not already present)
const addToWishlist = (product) => {
  const isAlreadyInWishlist = wishlistItems.some(
    (item) => item.id === product.id
  );
  if (!isAlreadyInWishlist) {
    setWishlistItems((prev) => [...prev, product]);
    setWishlistCount((prev) => prev + 1);
  }
};

// Remove a product from the wishlist
const removeFromWishlist = (productId) => {
  setWishlistItems((prevItems) =>
    prevItems.filter((item) => item.id !== productId)
  );
  setWishlistCount((prev) => Math.max(0, prev - 1));
};

return (
  <StoreContext.Provider
    value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      wishlistCount,
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
    }}
  >
    {children}
  </StoreContext.Provider>
);
};