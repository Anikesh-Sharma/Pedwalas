import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
FaHeart, 
FaShoppingCart, 
FaStar, 
FaCheck, 
FaEye 
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import Navbar from "./Navbar";
import { StoreContext } from "./StoreContext";
import productsData from "./db.json";

// Set up Modal for the app
Modal.setAppElement("#root");

const ProductPage = () => {
const { id } = useParams();
const navigate = useNavigate();

// Fetch products
const products = productsData.products || productsData;
const product = products.find((prod) => prod.id === parseInt(id)) || products[parseInt(id)];

// State Management
const [quantity, setQuantity] = useState(1);
const [modalIsOpen, setModalIsOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);
const [isWishlisted, setIsWishlisted] = useState(false);

// Context
const { addToCart, addToWishlist } = useContext(StoreContext);

// Image gallery
const productImages = [product.image, ...(product.additionalImages || [])];

// Lifecycle effect to set initial selected image
useEffect(() => {
  setSelectedImage(product.image);
}, [product]);

// Handlers
const handleWishlistToggle = () => {
  setIsWishlisted(!isWishlisted);
  addToWishlist(product);
};

const handleAddToCart = () => {
  addToCart(product, quantity);
  setModalIsOpen(true);
};

const handleBuyNow = () => {
  addToCart(product, quantity);
  navigate("/checkout");
};

// Recommended products
const recommendedProducts = products
  .filter((p) => p.category === product.category && p.id !== product.id)
  .slice(0, 3);

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300 },
  },
};

// Handle navigation to recommended product
const handleRecommendedProductClick = (productId) => {
  navigate(`/product/${productId}`);
};

return (
  <>
    <Navbar />
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-green-50 py-12"
    >
      <div className="container mx-auto px-4">
        {/* Product Details Section */}
        <motion.div
          variants={containerVariants}
          className="bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-8 p-8"
        >
          {/* Image Gallery */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              className="main-image overflow-hidden rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-4 overflow-x-auto">
              {productImages.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                    selectedImage === img ? "border-2 border-green-500" : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-green-800 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-${i < 4 ? "yellow" : "gray"}-400 mr-1`}
                  />
                ))}
                <span className="ml-2 text-gray-600">(4.5)</span>
              </div>
            </div>

            {/* Price and Actions */}
            <motion.div
              variants={itemVariants}
              className="flex justify-between items-center"
            >
              <span className="text-3xl font-bold text-green-700">
                ₹{product.price.toLocaleString()}
              </span>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleWishlistToggle}
                  className={`p-3 rounded-full ${
                    isWishlisted
                      ? "bg-red-100 text-red-500"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <FaHeart />
                </motion.button>
              </div>
            </motion.div>

            {/* Quantity Selector */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-4"
            >
              <span>Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 text-center"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600"
                >
                  +
                </button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-green-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBuyNow}
                className="border border-green-600 text-green-600 py-3 rounded-lg"
              >
                Buy Now
              </motion.button>
            </motion.div>

            {/* Product Description */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Recommended Products */}
        <motion.div
          variants={containerVariants}
          className="mt-12 bg-white rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Recommended Products
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {recommendedProducts.map((recProduct) => (
              <motion.div
                key={recProduct.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-green-50 rounded-lg overflow-hidden shadow-md relative group"
              >
                <img
                  src={recProduct.image}
                  alt={recProduct.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{recProduct.name}</h3>
                  <p className="text-green-700 font-bold">
                    ₹{recProduct.price.toLocaleString()}
                  </p>
                </div>
                
                {/* Quick View Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRecommendedProductClick(recProduct.id)}
                      className="bg-white p-3 rounded-full shadow-lg flex items-center justify-center"
                    >
                      <FaEye className="text-green-600" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        addToCart(recProduct, 1);
                        setModalIsOpen(true);
                      }}
                      className="bg-white p-3 rounded-full shadow-lg flex items-center justify-center"
                    >
                      <FaShoppingCart className="text-green-600" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>

    {/* Add to Cart Modal */}
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          borderRadius: "1rem",
          padding: "2rem",
          maxWidth: "500px",
          width: "90%",
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000,
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-700 flex items-center">
            <FaCheck className="mr-2 text-green-500" /> Added to Cart
          </h2>
          <button onClick={() => setModalIsOpen(false)}>
            <IoMdClose className="text-2xl text-gray-600" />
          </button>
        </div>
      </motion.div>
    </Modal>
  </>
);
};

export default ProductPage;