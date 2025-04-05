import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CiUser, CiHeart, CiShoppingTag } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "/src/assets/logo.png";
import { StoreContext } from "./StoreContext";

const Navbar = () => {
const { cartCount, wishlistCount } = useContext(StoreContext);
const [isScrolled, setIsScrolled] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isSearchOpen, setIsSearchOpen] = useState(false);

// Scroll effect
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Navigation menu items
const menuItems = [
  { name: "Home", path: "/" },
  { name: "Artificial Plants", path: "/artificial-plants" },
  { name: "Artificial Flowers", path: "/artificial-flowers" },
  { name: "Home Décor", path: "/home-decor" },
  { name: "Gifts", path: "/gifts" },
  { name: "About Us", path: "/about-us" },
  { name: "Decor Guide", path: "/decor-guide" }
];

// Navbar animation variants
const navVariants = {
  initial: { 
    backgroundColor: "rgba(255,255,255,0)",
    boxShadow: "0 0 0 0 rgba(0,0,0,0)"
  },
  scrolled: { 
    backgroundColor: "rgba(255,255,255,0.95)",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
  }
};

// Mobile menu variants
const mobileMenuVariants = {
  closed: { 
    opacity: 0, 
    x: "100%",
    transition: { duration: 0.3 }
  },
  open: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

return (
  <motion.nav 
    className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3"
    variants={navVariants}
    animate={isScrolled ? "scrolled" : "initial"}
  >
    <div className="flex justify-between items-center max-w-7xl mx-auto">
      {/* Logo */}
      <Link to="/">
        <motion.img 
          src={logo} 
          alt="Logo" 
          className="h-16 md:h-20 rounded-full"
          whileHover={{ scale: 1.05 }}
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex space-x-6 items-center">
        {menuItems.map((item, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to={item.path} 
              className="text-green-800 font-semibold hover:text-green-600 transition"
            >
              {item.name}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Icons and Actions */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <motion.button 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoIosSearch size={25} />
        </motion.button>

        {/* User, Wishlist, Cart Icons */}
        <div className="flex space-x-3">
          {[
            { icon: <CiUser size={25} />, path: "/profile" },
            { 
              icon: <CiHeart size={25} />, 
              path: "/wishlist", 
              count: wishlistCount 
            },
            { 
              icon: <CiShoppingTag size={25} />, 
              path: "/cart", 
              count: cartCount 
            }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to={item.path}>
                {item.icon}
                {item.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button 
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ rotate: 180 }}
        >
          {isMobileMenuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </motion.button>
      </div>
    </div>

    {/* Search Dropdown */}
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white shadow-lg p-4"
        >
          <input 
            type="text" 
            placeholder="Search plants, decor..." 
            className="w-full px-4 py-2 border rounded"
          />
        </motion.div>
      )}
    </AnimatePresence>

    {/* Mobile Menu */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div 
          variants={mobileMenuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="lg:hidden fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6"
        >
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="block py-2 text-green-800 hover:bg-green-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.nav>
);
};

export default Navbar;