import React, { useContext } from "react";
import logo from "/src/assets/logo.png";
import { CiUser } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { CiShoppingTag, CiHeart } from "react-icons/ci";
import { StoreContext } from "./StoreContext"; // adjust the path as needed

const Navbar = () => {
  const { cartCount, wishlistCount } = useContext(StoreContext);

  return (
    <div className="flex justify-between py-4 px-8 items-center sticky top-0 bg-white shadow z-50">
      <img src={logo} className="h-24 rounded-full" alt="Logo" />

      <nav className="font-sans font-semibold text-lg">
        <ul className="flex space-x-6">
          <li>Home</li>
          <li>Artificial Plants</li>
          <li>Artificial Flowers</li>
          <li>Home Décor</li>
          <li>Gifts</li>
          <li>About Us</li>
          <li>Decor Guide</li>
        </ul>
      </nav>

      <div className="flex space-x-4 items-center">
        <button className="relative focus:outline-none">
          <IoIosSearch size={25} />
        </button>
        <button className="relative focus:outline-none">
          <CiUser size={25} />
        </button>

        {/* Wishlist Icon with Badge */}
        <div className="relative">
          <button className="focus:outline-none">
            <CiHeart size={25} />
          </button>
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </div>

        {/* Cart Icon with Badge */}
        <div className="relative">
          <button className="focus:outline-none">
            <CiShoppingTag size={25} />
          </button>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
