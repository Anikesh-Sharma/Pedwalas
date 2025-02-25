// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import Cards from './components/Cards';
import ImgSetup from './components/ImgSetup';
import ProductPage from './components/ProductPage';

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

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />
        {/* Product detail route */}
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
