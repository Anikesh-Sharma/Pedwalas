import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "/src/assets/logo.png";
import { CiUser, CiHeart, CiShoppingTag } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { StoreContext } from "./StoreContext"; // Adjust the path if needed

const Navbar = () => {
  const { cartCount, wishlistCount } = useContext(StoreContext);

  return (
    <div className="flex justify-between py-4 px-8 items-center sticky top-0 bg-white shadow z-50">
      <Link to="/">
        <img src={logo} className="h-24 rounded-full cursor-pointer" alt="Logo" />
      </Link>

      <nav className="font-sans font-semibold text-lg">
        <ul className="flex space-x-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/artificial-plants">Artificial Plants</Link></li>
          <li><Link to="/artificial-flowers">Artificial Flowers</Link></li>
          <li><Link to="/home-decor">Home Décor</Link></li>
          <li><Link to="/gifts">Gifts</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/decor-guide">Decor Guide</Link></li>
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
