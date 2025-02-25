// src/components/StoreContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Initialize state from localStorage (or default to 0)
  const [cartCount, setCartCount] = useState(() => {
    const savedCart = localStorage.getItem("cartCount");
    return savedCart ? parseInt(savedCart, 10) : 0;
  });

  const [wishlistCount, setWishlistCount] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlistCount");
    return savedWishlist ? parseInt(savedWishlist, 10) : 0;
  });

  // Update localStorage whenever cartCount changes
  useEffect(() => {
    localStorage.setItem("cartCount", cartCount);
  }, [cartCount]);

  // Update localStorage whenever wishlistCount changes
  useEffect(() => {
    localStorage.setItem("wishlistCount", wishlistCount);
  }, [wishlistCount]);

  const addToCart = (count = 1) => {
    setCartCount((prev) => prev + count);
  };

  const addToWishlist = (count = 1) => {
    setWishlistCount((prev) => prev + count);
  };

  return (
    <StoreContext.Provider
      value={{ cartCount, wishlistCount, addToCart, addToWishlist }}
    >
      {children}
    </StoreContext.Provider>
  );
};
