import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import productsData from "./db.json";

const products = productsData.products || productsData;

const formatIndianRupees = (price) => {
const priceString = typeof price === 'number' ? price.toString() : price;
const numericPrice = priceString.replace(/[^\d]/g, '');
return new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}).format(Number(numericPrice));
};

const Cards = () => {
const [hoveredProduct, setHoveredProduct] = useState(null);

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1280,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 960,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 }
    }
  ]
};

const cardVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300
    }
  }
};

return (
  <div className="bg-slate-50 py-12">
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center mb-10"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-2">
        Featured Products
      </h2>
      <p className="text-slate-600 text-base max-w-2xl mx-auto">
        Discover our stunning collection of artificial plants and flowers
      </p>
    </motion.div>

    <div className="max-w-7xl mx-auto px-4">
      <Slider {...settings}>
        {products.map((product, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className="px-4"
          >
            <div 
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg"
              onMouseEnter={() => setHoveredProduct(index)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link to={`/product/${product.id || index}`}>
                <div className="relative">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  {hoveredProduct === index && (
                    <motion.div 
                      className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <button className="bg-white text-slate-800 px-4 py-1 rounded-full text-sm hover:bg-indigo-50 transition">
                        View Details
                      </button>
                    </motion.div>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-semibold text-base">
                    {formatIndianRupees(product.price)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  </div>
);
};

export default Cards;