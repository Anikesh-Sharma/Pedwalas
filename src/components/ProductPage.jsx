import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "./db.json";
import Navbar from "./Navbar";
import { StoreContext } from "./StoreContext"; // If you're using a context for cart/wishlist

const products = productsData.products || productsData;

const ProductPage = () => {
  const { id } = useParams();
  const product =
    products.find((prod) => prod.id === parseInt(id)) || products[parseInt(id)];

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // If you’re using a global store for cart count
  const { cartCount, addToCart } = useContext(StoreContext);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) setQuantity(value);
  };

  // Handle "Add to Cart" logic
  const handleAddToCart = () => {
    // Update cart count (if using context)
    addToCart(quantity);

    // Open the modal
    setShowModal(true);
  };

  // If product not found
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
        </div>
      </>
    );
  }

  // Hard-coded recommended product (example)
  const recommendedProduct = {
    id: 99,
    name: "Everblooming Manglore Bunch",
    price: 899,
    image: "https://via.placeholder.com/200x250?text=Manglore+Bunch",
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row">
            {/* Left: Product Image */}
            <div className="md:w-1/2 mb-4 md:mb-0 md:pr-6 flex justify-center items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded"
              />
            </div>

            {/* Right: Product Details */}
            <div className="md:w-1/2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <div className="text-xl text-gray-900 font-semibold mb-3">
                Rs. {product.price?.toLocaleString("en-IN")}.00
              </div>
              <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
                {product.description || "A perfect choice for your home décor."}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center mb-4">
                <label className="mr-4 flex items-center">
                  <span className="text-gray-700 mr-2 text-sm">Quantity:</span>
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={handleQuantityChange}
                    className="w-16 px-2 py-1 border border-gray-300 rounded"
                  />
                </label>
              </div>

              {/* Add to Cart Button */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded text-sm"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => alert("Buy Now flow")}
                  className="border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold px-6 py-2 rounded text-sm"
                >
                  Buy It Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Content */}
          <div className="bg-white w-full max-w-xl p-6 relative rounded shadow-lg">
            {/* Close Button (X) */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>

            {/* "Added to cart" Title */}
            <h2 className="text-xl font-bold text-green-600 mb-2">
              Added to cart successfully!
            </h2>

            {/* Cart Summary */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">
                  <strong>There are {cartCount} items in your cart now.</strong>
                </p>
                <p className="text-sm text-gray-600">
                  {product.name} (Qty: {quantity})
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Cart Total: Rs.{" "}
                  {(product.price * quantity).toLocaleString("en-IN")}.00
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 mb-4">
              <Link
                to="/cart"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
              >
                Go to Cart
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="border border-gray-300 hover:border-gray-400 px-4 py-2 rounded text-sm"
              >
                Continue Shopping
              </button>
              <Link
                to="/checkout"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
              >
                Proceed to Checkout
              </Link>
            </div>

            {/* "With this product also buy" Section */}
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              With this product also buy:
            </h3>
            <div className="flex items-center space-x-4">
              <img
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
                className="w-16 h-20 object-cover rounded"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {recommendedProduct.name}
                </p>
                <p className="text-sm text-gray-600">
                  Rs. {recommendedProduct.price.toLocaleString("en-IN")}.00
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
