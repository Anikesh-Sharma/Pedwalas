import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
FaHeart, 
FaShoppingCart, 
FaStar, 
FaCheck 
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import Navbar from "./Navbar";
import { StoreContext } from "./StoreContext";
import productsData from "./db.json";
import Footer from "./Footer";

Modal.setAppElement("#root");

const ProductPage = () => {
const { id } = useParams();
const navigate = useNavigate();

// Fetch products
const products = productsData.products || productsData;
const product = products.find((prod) => prod.id === parseInt(id)) || products[parseInt(id)];

// State Management
const [quantity, setQuantity] = useState(1);
const [selectedImage, setSelectedImage] = useState(null);
const [activeSection, setActiveSection] = useState('description');
const [modalIsOpen, setModalIsOpen] = useState(false);

// Context
const { 
  addToCart, 
  addToWishlist, 
  wishlistItems, 
  removeFromWishlist 
} = useContext(StoreContext);

// Check if product is in wishlist
const isProductInWishlist = wishlistItems.some(item => item.id === product.id);

// Wishlist handler
const handleWishlistToggle = () => {
  if (isProductInWishlist) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
};

// Image gallery
const productImages = [product.image, ...(product.additionalImages || [])];

// Lifecycle effect to set initial selected image
useEffect(() => {
  setSelectedImage(product.image);
  setQuantity(1);
}, [product]);

// Add to cart handler
const handleAddToCart = () => {
  addToCart(product, quantity);
  setModalIsOpen(true);
};

// Buy now handler
const handleBuyNow = () => {
  addToCart(product, quantity);
  navigate("/checkout");
};

// Recommended products
const recommendedProducts = products
  .filter(p => p.id !== product.id)
  .slice(0, 4);

return (
  <div className="bg-slate-50">
    <Navbar />
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img 
              src={selectedImage || product.image} 
              alt={product.name} 
              className="w-full h-[500px] object-cover"
            />
          </div>
          
          <div className="flex space-x-4 overflow-x-auto">
            {productImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product view ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer 
                  ${selectedImage === img ? 'border-2 border-indigo-500' : 'opacity-60 hover:opacity-100'}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-amber-500 mr-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < 4 ? 'text-amber-500' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-slate-600">(4.5) 120 Reviews</span>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-xl">
            <span className="text-3xl font-bold text-indigo-700">
              ₹{product.price.toLocaleString()}
            </span>
            <p className="text-green-600 mt-2">In Stock</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-slate-600"
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
                className="px-4 py-2 text-slate-600"
              >
                +
              </button>
            </div>

            <button 
              onClick={handleWishlistToggle} 
              className={`text-slate-600 hover:text-red-500 relative ${isProductInWishlist ? 'text-red-500' : ''}`}
            >
              <FaHeart />
              {isProductInWishlist && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="border border-indigo-600 text-indigo-600 py-3 rounded-lg hover:bg-indigo-50 transition"
            >
              Buy Now
            </button>
          </div>

          {/* Tabbed Description */}
          <div>
            <div className="flex border-b mb-4">
              {['description', 'features', 'reviews'].map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 capitalize ${
                    activeSection === section 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-slate-600'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            
            {activeSection === 'description' && (
              <p className="text-slate-700">{product.description}</p>
            )}
            
            {activeSection === 'features' && (
              <ul className="space-y-2 text-slate-700">
                {Object.entries(product.features || {}).map(([key, value]) => (
                  <li key={key} className="flex">
                    <span className="font-semibold mr-2">{key}:</span>
                    <span>{Array.isArray(value) ? value.join(', ') : value}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Recommended Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedProducts.map((recProduct) => (
            <div
              key={recProduct.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              onClick={() => navigate(`/product/${recProduct.id}`)}
            >
              <img
                src={recProduct.image}
                alt={recProduct.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-800 truncate">{recProduct.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-indigo-700 font-bold">
                    ₹{recProduct.price.toLocaleString()}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(recProduct, 1);
                    }}
                    className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full"
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700 flex items-center">
          <FaCheck className="mr-2 text-green-500" /> Added to Cart
        </h2>
        <button onClick={() => setModalIsOpen(false)}>
          <IoMdClose className="text-2xl text-gray-600" />
        </button>
      </div>
      
      <div className="flex items-center mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-16 h-16 object-cover rounded mr-4" 
        />
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-gray-600">₹{product.price.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button 
          onClick={() => setModalIsOpen(false)}
          className="px-4 py-2 border border-green-600 text-green-600 rounded"
        >
          Continue Shopping
        </button>
        <button 
          onClick={() => {
            setModalIsOpen(false);
            navigate("/cart");
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          View Cart
        </button>
      </div>
    </Modal>
    
    <Footer />
  </div>
);
};

export default ProductPage;