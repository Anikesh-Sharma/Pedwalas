import logo from "/src/assets/logo.png";
import { CiUser } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { CiShoppingTag, CiHeart } from "react-icons/ci";

const Navbar = () => {
  return (
      <div className="flex justify-between py-4 px-8 items-center sticky">
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
        <div className="flex space-x-2">
          <IoIosSearch size={25} />
          <CiUser size={25} />
          <CiHeart size={25} />
          <CiShoppingTag size={25} />
        </div>
      </div>    
  );
};

export default Navbar;
