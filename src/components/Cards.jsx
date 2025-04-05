import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import productsData from "./db.json";

const products = productsData.products || productsData;

// Function to format price in Indian Rupees
const formatIndianRupees = (price) => {
// If price is already a number, convert to string
const priceString = typeof price === 'number' ? price.toString() : price;

// Remove any existing currency symbols or commas
const numericPrice = priceString.replace(/[^\d]/g, '');

// Convert to number and format
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
  <div className="bg-green-50 py-12">
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center mb-10"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
        Artificial Plant Collection
      </h1>
      <p className="text-green-600 text-lg max-w-2xl mx-auto">
        Bring nature indoors with our stunning, low-maintenance artificial plants
      </p>
    </motion.div>

    <div className="max-w-[1400px] mx-auto px-4">
      <Slider {...settings}>
        {products.map((product, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className="p-4"
          >
            <div 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
              onMouseEnter={() => setHoveredProduct(index)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link to={`/product/${product.id || index}`}>
                <div className="relative overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  {hoveredProduct === index && (
                    <motion.div 
                      className="absolute inset-0 bg-green-500 bg-opacity-30 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <button className="bg-white text-green-800 px-6 py-2 rounded-full hover:bg-green-100 transition">
                        Quick View
                      </button>
                    </motion.div>
                  )}
                </div>
              </Link>

              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-green-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-green-700 font-bold text-lg">
                    {formatIndianRupees(product.price)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
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