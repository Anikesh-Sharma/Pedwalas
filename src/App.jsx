// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import Cards from './components/Cards';
import ImgSetup from './components/ImgSetup';
import ProductPage from './components/ProductPage';

// Home page component
const Home = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <Cards />
      <ImgSetup />
    </>
  );
};

// Placeholder Cart Page component
const CartPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>
    </>
  );
};

// Placeholder Checkout Page component
const CheckoutPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />
        {/* Product detail route */}
        <Route path="/product/:id" element={<ProductPage />} />
        {/* Cart route */}
        <Route path="/cart" element={<CartPage />} />
        {/* Checkout route */}
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
