import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "./StoreContext";
import Navbar from "./Navbar";

const CheckoutPage = () => {
const { cartItems, clearCart } = useContext(StoreContext);
const navigate = useNavigate();
const [formData, setFormData] = useState({
  name: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  paymentMethod: "card",
});

// Calculate total price
const total = cartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  // In a production app, formData and cartItems would be sent to your backend.
  alert("Order placed successfully!");
  clearCart();
  navigate("/"); // Redirect to home or a confirmation page
};

if (cartItems.length === 0) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold mt-4 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-4">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Start Shopping"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    </>
  );
}

return (
  
    <Navbar />
    <main className="container mx-auto p-6 max-w-6xl">
      <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
        Checkout
      </h2>

      {/* Progress Indicator */}
      <div className="flex justify-between mb-8 max-w-3xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
            1
          </div>
          <span className="text-sm mt-1">Cart</span>
        </div>
        <div className="flex-1 h-1 bg-blue-600 self-center mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
            2
          </div>
          <span className="text-sm mt-1">Checkout</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 self-center mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-semibold">
            3
          </div>
          <span className="text-sm mt-1">Confirmation</span>
        </div>
      </div>

      {/* Combined Form for Shipping, Payment, & Order Summary */}
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Shipping Details & Payment Method */}
        <div className="w-full lg:w-2/3 space-y-8">
          {/* Shipping Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
              Shipping Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="123 Main Street, Apt 4B"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    placeholder="400001"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
              Payment Method
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="card"
                  name="paymentMethod"
                  type="radio"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600"
                />
                <label htmlFor="card" className="ml-3 block">
                  <span className="text-gray-700 font-medium">
                    Credit/Debit Card
                  </span>
                  <div className="flex space-x-2 mt-1">
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                      VISA
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                      Mastercard
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                      RuPay
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="upi"
                  name="paymentMethod"
                  type="radio"
                  value="upi"
                  checked={formData.paymentMethod === "upi"}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600"
                />
                <label htmlFor="upi" className="ml-3 block">
                  <span className="text-gray-700 font-medium">UPI</span>
                  <div className="flex space-x-2 mt-1">
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                      GooglePay
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                      PhonePe
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                      Paytm
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="cod"
                  name="paymentMethod"
                  type="radio"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600"
                />
                <label htmlFor="cod" className="ml-3 block text-gray-700 font-medium">
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-1/3 space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
              Order Summary
            </h3>
            <ul className="mb-4 divide-y">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="py-3 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-md flex-shrink-0"></div>
                    <div className="ml-3">
                      <span className="block font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-medium">
                    Rs. {(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>
                  Rs. {Math.round(total * 0.18).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>
                  Rs. {Math.round(total * 1.18).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              aria-label="Place Order"
            >
              Place Order
            </button>
            <p className="text-xs text-gray-500 mt-4 text-center">
              By placing your order, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
          <Link
            to="/cart"
            className="flex items-center justify-center mt-4 text-blue-600 hover:underline"
            aria-label="Back to Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Cart
          </Link>
        </div>
      </form>
    </main>
  </>
);
};

export default CheckoutPage;