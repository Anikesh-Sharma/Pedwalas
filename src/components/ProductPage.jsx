import React, { useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import productsData from "./db.json";
import Navbar from "./Navbar";
import Modal from "react-modal";
import { StoreContext } from "./StoreContext"; // Make sure the path is correct

const products = productsData.products || productsData;

// Set the app element for accessibility
Modal.setAppElement("#root");

// Custom styles for react-modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "2rem",
    borderRadius: "1rem",
    border: "none",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    maxWidth: "600px",
    width: "90%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product =
    products.find((prod) => prod.id === parseInt(id)) || products[parseInt(id)];

  const [quantity, setQuantity] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Destructure context methods and data
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useContext(StoreContext);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) setQuantity(value);
  };

  // Handle "Add to Cart" logic and show modal
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setModalIsOpen(true);
  };

  // Handle "Buy It Now" flow: add product to cart and navigate to checkout
  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

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

  // Find the cart item for this product (if it exists)
  const cartItem = cartItems.find((item) => item.id === product.id);

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
                Rs. {product.price.toLocaleString("en-IN")}.00
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

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded text-sm"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold px-6 py-2 rounded text-sm"
                >
                  Buy It Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* React Modal for Cart Summary */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Cart Modal"
      >
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            &times;
          </button>
          {/* Modal Title */}
          <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
            Added to Cart!
          </h2>
        </div>
        <div className="mb-4">
          {cartItem ? (
            <div className="text-center">
              <p className="text-md text-gray-700">
                <strong>
                  {cartItem.quantity} unit{cartItem.quantity > 1 ? "s" : ""} of {product.name} in your cart.
                </strong>
              </p>
              <div className="flex items-center justify-center space-x-4 mt-3">
                {/* Decrement Button */}
                <button
                  onClick={() => {
                    if (cartItem.quantity > 1) {
                      updateQuantity(product.id, cartItem.quantity - 1);
                    }
                  }}
                  className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{cartItem.quantity}</span>
                {/* Increment Button */}
                <button
                  onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                  className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
                {/* Remove Button */}
                <button
                  onClick={() => {
                    removeFromCart(product.id);
                    setModalIsOpen(false);
                  }}
                  className="ml-4 text-red-600 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">No items found in cart.</p>
          )}
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          {cartItem && (
            <p className="text-lg font-semibold text-gray-800">
              Total: Rs. {(product.price * cartItem.quantity).toLocaleString("en-IN")}.00
            </p>
          )}
          <div className="space-x-3">
            <Link
              to="/cart"
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Go to Cart
            </Link>
            <Link
              to="/checkout"
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Checkout
            </Link>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            With this product also buy:
          </h3>
          <div className="flex items-center space-x-4">
            <img
              src={recommendedProduct.image}
              alt={recommendedProduct.name}
              className="w-20 h-24 object-cover rounded"
            />
            <div>
              <p className="text-md font-medium text-gray-700">
                {recommendedProduct.name}
              </p>
              <p className="text-md text-gray-600">
                Rs. {recommendedProduct.price.toLocaleString("en-IN")}.00
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductPage;
