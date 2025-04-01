import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from './StoreContext';
import Navbar from './Navbar';

const CartPage = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useContext(StoreContext);
  // Track modified quantities before committing changes
  const [pendingQuantities, setPendingQuantities] = useState({});
  const [quantityChanged, setQuantityChanged] = useState(false);
  
  // Calculate subtotal
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * (pendingQuantities[item.id] || item.quantity),
    0
  );
  
  // Initialize pending quantities when component mounts or cart changes
  React.useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach(item => {
      initialQuantities[item.id] = item.quantity;
    });
    setPendingQuantities(initialQuantities);
    setQuantityChanged(false);
  }, [cartItems]);
  
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      setPendingQuantities({
        ...pendingQuantities,
        [id]: newQuantity
      });
      setQuantityChanged(true);
    }
  };
  
  const handleUpdateCart = () => {
    // Update all cart items with pending quantities
    Object.keys(pendingQuantities).forEach(itemId => {
      updateCartItemQuantity(parseInt(itemId), pendingQuantities[itemId]);
    });
    setQuantityChanged(false);
  };
  
  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/" className="bg-green-600 text-white px-4 py-2 rounded">
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-white">
        {/* Banner image with text */}
        <div className="relative h-40 overflow-hidden">
          <div className="absolute inset-0 bg-green-800 opacity-30"></div>
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/path-to-banner-image.jpg')" }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold">70% off</div>
              <div className="text-3xl font-medium mt-2">Buy 3 Get Extra</div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white">
            {/* Cart table */}
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-3 text-left font-medium text-gray-600 uppercase text-xs tracking-wider">Product Name</th>
                  <th className="p-3 text-center font-medium text-gray-600 uppercase text-xs tracking-wider">Price</th>
                  <th className="p-3 text-center font-medium text-gray-600 uppercase text-xs tracking-wider">Quantity</th>
                  <th className="p-3 text-center font-medium text-gray-600 uppercase text-xs tracking-wider">Total</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 flex-shrink-0 mr-4">
                          <img src={item.image || "/placeholder-image.jpg"} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-gray-500 text-sm">Stock: 1 Pc</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="font-medium">Rs. {item.price.toFixed(2)}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <div className="flex border border-gray-300">
                          <button 
                            className="px-2 py-1 bg-white text-black"
                            onClick={() => handleQuantityChange(item.id, (pendingQuantities[item.id] || item.quantity) - 1)}
                          >
                            -
                          </button>
                          <input 
                            type="number"
                            value={pendingQuantities[item.id] || item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val) && val >= 1) {
                                handleQuantityChange(item.id, val);
                              }
                            }}
                            className="w-10 text-center border-x border-gray-300"
                          />
                          <button 
                            className="px-2 py-1 bg-white text-black"
                            onClick={() => handleQuantityChange(item.id, (pendingQuantities[item.id] || item.quantity) + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="font-medium">Rs. {(item.price * (pendingQuantities[item.id] || item.quantity)).toFixed(2)}</div>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleRemoveItem(item.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Cart Actions */}
            <div className="flex mt-6 space-x-4">
              <button 
                className={`uppercase ${quantityChanged ? 'bg-black' : 'bg-gray-400'} text-white px-6 py-2 font-medium text-sm tracking-wider`}
                onClick={handleUpdateCart}
                disabled={!quantityChanged}
              >
                Update Cart
              </button>
              <Link to="/" className="uppercase bg-green-600 text-white px-6 py-2 font-medium text-sm tracking-wider">
                Continue Shopping
              </Link>
            </div>
            
            {/* Cart Totals */}
            <div className="mt-10 border border-gray-200 max-w-md">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-sm uppercase font-medium text-gray-600">Cart Totals</h2>
              </div>
              <div className="p-4">
                <div className="flex justify-between py-2">
                  <span className="font-medium">Total</span>
                  <span className="font-medium text-blue-600">Rs. {total.toFixed(2)}</span>
                </div>
                <Link 
                  to="/checkout" 
                  className="mt-4 block text-center uppercase bg-green-700 text-white px-6 py-3 font-medium text-sm tracking-wider"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 mt-16">
          <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between">
              {/* Help Links */}
              <div className="mb-8 md:mb-0">
                <h3 className="text-sm font-semibold uppercase mb-4 border-b pb-1 inline-block">Help Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-black">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black">Refund Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black">Shipping Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black">Cancellation Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black">Track Order</a></li>
                </ul>
                
                {/* Social Media Icons */}
                <div className="flex space-x-4 mt-6">
                  <a href="#" className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="sr-only">YouTube</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Newsletter */}
              <div>
                <h3 className="text-sm font-semibold uppercase mb-4 border-b pb-1 inline-block">Newsletter</h3>
                <p className="text-sm text-gray-600 mb-4">Get notified of new products, limited releases, and more.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email..." 
                    className="px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-black"
                  />
                  <button className="bg-black text-white uppercase px-4 py-2 font-medium text-sm tracking-wider">
                    Subscribe
                  </button>
                </div>
                
                {/* Payment Methods */}
                <div className="mt-6">
                  <div className="inline-block bg-green-100 text-green-800 text-xs py-1 px-2 rounded mb-2">
                    We accept all payment methods
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <img src="/amazon-pay.png" alt="Amazon Pay" className="h-6" />
                    <img src="/flipkart.png" alt="Flipkart" className="h-6" />
                    <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                    <img src="/maestro.png" alt="Maestro" className="h-6" />
                    <img src="/rupay.png" alt="Rupay" className="h-6" />
                    <img src="/visa.png" alt="Visa" className="h-6" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
              © Copyright 2023, Blooming Floral All Rights Reserved. Powered by NerdKodus
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;