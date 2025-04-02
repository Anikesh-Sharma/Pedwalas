// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import Cards from './components/Cards';
import ImgSetup from './components/ImgSetup';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage'; // Updated CheckoutPage component
import { StoreProvider } from './components/StoreContext'; // Ensure StoreProvider is exported from StoreContext
import ArtificialPlants from "./components/ArtificialPlants";
import Footer from './components/Footer';

// Home page component
const Home = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <Cards />
      <ImgSetup />
      <Footer />
    </>
  );
};

function App() {
  return (
    <StoreProvider>
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
          {/* Artifical-plants route */}
          <Route path="/artificial-plants" element={<ArtificialPlants />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
