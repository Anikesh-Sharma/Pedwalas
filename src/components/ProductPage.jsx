import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import Modal from "react-modal";
import Navbar from "./Navbar";
import { StoreContext } from "./StoreContext";
import productsData from "./db.json";
import Footer from "./Footer";

// Set the app element for accessibility (required for react-modal)
Modal.setAppElement("#root");

const ProductPage = () => {
const { id } = useParams();
const navigate = useNavigate();
const products = productsData.products || productsData;
// Try to find the product by matching the id; fallback based on index
const product =
  products.find((prod) => prod.id === parseInt(id)) ||
  products[parseInt(id)];

const [quantity, setQuantity] = useState(1);
const [selectedImage, setSelectedImage] = useState(product?.image);
const [activeSection, setActiveSection] = useState("description");

const { addToCart } = useContext(StoreContext);

useEffect(() => {
  if (product) {
    setSelectedImage(product.image);
    setQuantity(1);
  }
}, [product]);

const handleAddToCart = () => {
  addToCart(product, quantity);
};

const recommendedProducts = products
  .filter((p) => p.id !== product.id)
  .slice(0, 4);

// Fallback UI if the product doesn't exist
if (!product) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-xl text-gray-700">Product not found.</p>
        <div className="text-center mt-4">
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded"
            onClick={() => navigate("/")}
          >
            Go back home
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

return (
  <div className="bg-slate-50">
    <Navbar />
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto">
            {[product.image, ...(product.additionalImages || [])].map(
              (img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 p-0 border-none rounded-lg cursor-pointer transition-opacity duration-300 ${
                    selectedImage === img
                      ? "border-2 border-indigo-500 opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View ${index === 0 ? "main" : "alternative"} image`}
                >
                  <img
                    src={img}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              )
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center mb-4">
              <div
                className="flex mr-4"
                aria-label="Product rating"
              >
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < 4 ? "text-amber-500" : "text-gray-300"}
                  />
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
            {/* Quantity Control */}
            <div className=" items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-slate-600"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="w-16 text-center outline-none"
                aria-label="Quantity"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-slate-600"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            {/* Wishlist Button (Placeholder) */}
            <button
              onClick={() => {}}
              className="text-slate-600 hover:text-red-500 transition-colors"
              aria-label="Add to Wishlist"
            >
              <FaHeart />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center"
              aria-label="Add product to Cart"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="border border-indigo-600 text-indigo-600 py-3 rounded-lg hover:bg-indigo-50 transition"
              aria-label="Buy Now"
            >
              Buy Now
            </button>
          </div>

          {/* Tabbed Description Section */}
          <div>
            <div role="tablist" className="flex border-b mb-4">
              {["description", "features", "reviews"].map((section) => (
                <button
                  key={section}
                  role="tab"
                  aria-selected={activeSection === section}
                  aria-controls={`tab-${section}`}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 capitalize transition-colors ${
                    activeSection === section
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            <div
              role="tabpanel"
              id={`tab-${activeSection}`}
              className="text-slate-700"
            >
              {activeSection === "description" && (
                <p>{product.description}</p>
              )}
              {activeSection === "features" && (
                <ul className="space-y-2">
                  {Object.entries(product.features || {}).map(
                    ([key, value]) => (
                      <li key={key} className="flex">
                        <span className="font-semibold mr-2">{key}:</span>
                        <span>
                          {Array.isArray(value) ? value.join(", ") : value}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              )}
              {activeSection === "reviews" && (
                <p>No reviews available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Recommended Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedProducts.map((recProduct) => (
            <motion.div
              key={recProduct.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              onClick={() => navigate(`/product/${recProduct.id}`)}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={recProduct.image}
                alt={recProduct.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-800 truncate">
                  {recProduct.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-indigo-700 font-bold">
                    ₹{recProduct.price.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(recProduct, 1);
                    }}
                    className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition"
                    aria-label="Add recommended product to Cart"
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
    <Footer />
  </div>
);
};

export default ProductPage;