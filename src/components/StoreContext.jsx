import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
// Initialize cartItems from localStorage (or default to an empty array)
const [cartItems, setCartItems] = useState(() => {
  const savedCartItems = localStorage.getItem("cartItems");
  return savedCartItems ? JSON.parse(savedCartItems) : [];
});

// Initialize wishlistCount from localStorage (or default to 0)
const [wishlistCount, setWishlistCount] = useState(() => {
  const savedWishlist = localStorage.getItem("wishlistCount");
  return savedWishlist ? parseInt(savedWishlist, 10) : 0;
});

// Initialize wishlist items
const [wishlistItems, setWishlistItems] = useState(() => {
  const savedWishlistItems = localStorage.getItem("wishlistItems");
  return savedWishlistItems ? JSON.parse(savedWishlistItems) : [];
});

// Persist cartItems to localStorage whenever they change
useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);

// Persist wishlistCount to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem("wishlistCount", wishlistCount);
}, [wishlistCount]);

// Persist wishlistItems to localStorage
useEffect(() => {
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
}, [wishlistItems]);

// Add a product to the cart or update its quantity if it already exists
const addToCart = (product, quantity = 1) => {
  setCartItems((prevItems) => {
    const index = prevItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      // Update quantity if product exists in cart
      const updatedItems = [...prevItems];
      updatedItems[index].quantity += quantity;
      return updatedItems;
    } else {
      // Add new product with the specified quantity
      return [...prevItems, { ...product, quantity }];
    }
  });
};

// Remove a product entirely from the cart
const removeFromCart = (productId) => {
  setCartItems((prevItems) =>
    prevItems.filter((item) => item.id !== productId)
  );
};

// Update the quantity of a specific product in the cart
const updateQuantity = (productId, newQuantity) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    )
  );
};

// Clear the entire cart
const clearCart = () => {
  setCartItems([]);
};

// Derived values: total item count and total price
const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
const cartTotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

// Add to wishlist functionality
const addToWishlist = (product) => {
  // Check if product is already in wishlist
  const isAlreadyInWishlist = wishlistItems.some(item => item.id === product.id);
  
  if (!isAlreadyInWishlist) {
    // Add product to wishlist
    setWishlistItems(prev => [...prev, product]);
    
    // Increment wishlist count
    setWishlistCount(prev => prev + 1);
  }
};

// Remove from wishlist
const removeFromWishlist = (productId) => {
  setWishlistItems((prevItems) =>
    prevItems.filter((item) => item.id !== productId)
  );
  setWishlistCount(prev => Math.max(0, prev - 1));
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