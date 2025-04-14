import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { StoreContext } from "./StoreContext";
import logo from "/src/assets/logo.png";

const Navbar = () => {
const { cartCount, wishlistCount } = useContext(StoreContext);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Plants", path: "/artificial-plants" },
  { name: "Flowers", path: "/artificial-flowers" },
  { name: "Décor", path: "/home-decor" },
  { name: "Gifts", path: "/gifts" },
];

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

return (
  <nav
    className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
    }`}
  >
    <div className="container mx-auto px-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Blooming Flore Logo"
          className={`rounded-full transition-all duration-300 ${
            isScrolled ? "h-12 w-12" : "h-16 w-16"
          }`}
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-slate-600 hover:text-indigo-600 transition-colors font-medium"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <Link
          to="/search"
          className="text-slate-600 hover:text-indigo-600"
          aria-label="Search"
        >
          <FaSearch size={20} />
        </Link>
        <Link
          to="/profile"
          className="text-slate-600 hover:text-indigo-600"
          aria-label="Profile"
        >
          <FaUser size={20} />
        </Link>
        <Link
          to="/wishlist"
          className="text-slate-600 hover:text-indigo-600 relative"
          aria-label="Wishlist"
        >
          <FaHeart size={20} />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>
        <Link
          to="/cart"
          className="text-slate-600 hover:text-indigo-600 relative"
          aria-label="Cart"
        >
          <FaShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-600 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden px-4 py-2 space-y-1 bg-white shadow-md">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block py-2 text-slate-600 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    )}
  </nav>
);
};

export default Navbar;