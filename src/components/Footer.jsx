import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 pt-8 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Help Links Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Help Links</h3>
            <div className="w-12 h-1 bg-black mb-4"></div>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-sm hover:underline">Terms of Service</a></li>
              <li><a href="/refund" className="text-sm hover:underline">Refund Policy</a></li>
              <li><a href="/shipping" className="text-sm hover:underline">Shipping Policy</a></li>
              <li><a href="/privacy" className="text-sm hover:underline">Privacy Policy</a></li>
              <li><a href="/cancellation" className="text-sm hover:underline">Cancellation Policy</a></li>
              <li><a href="/track" className="text-sm hover:underline">Track Order</a></li>
            </ul>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-4">
              <a href="#" className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                  <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                </svg>
              </a>
              <a href="#" className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                  <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
              </a>
              <a href="#" className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-4 h-4">
                  <path fill="currentColor" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm143.8 143.8c-3.4 3.4-18.2 18.2-41.4 41.3 1.4 29.8-4.8 57.7-18.5 82-13.9-22.9-34.2-41.1-60.3-54.7-20.5 39.9-55.3 73.7-97.6 96.3 3.2-17.7 6.9-35.3 11.2-52.9-45-18.2-89.8-39.5-133.8-63.2 40.8-36.8 91.4-59.3 146-64.2-2.3-11.2-8.5-21.7-17.8-30-13.5-8.5-31.3-8.9-43.8-3.6-3.2-11.5-8.9-22.6-17.1-31.1-33.1-16.1-76.4 9.8-77.9 48.7-11.5 12.6-19.4 29.3-19.4 48.3 0 6.6.9 13 2.6 19.1-29.1 17.7-49.1 51.8-43.4 88.8 4.3 18.4 16.3 33.3 32.8 42.7 5-1.8 9.4-4.6 13.1-8.1 13.3 14.6 35.7 19 53.9 10.5 11.3 9.1 26.8 12.3 40.7 8.5 17.7-4.7 31.1-19.2 35.3-36.7 22.4-7.2 42.3-22.3 56.7-43.2 18.5 10.6 38.2 16.5 58.7 16.8 44.3-40.5 89.9-82.3 130.2-127.8 32-45.7 11.5-112.4-47.7-121.2zm-11 54.3c-3.1 16.2-10.7 31.9-21.8 45.7-13.7 13.7-25.4 28.9-36.2 45l-43-22.4c-3.6-9.5-10-16.8-16.6-20-17.7-12.2-10.7-20.2-3.4-41.6 6.6-21.4 3.7-40.9-8.9-58.6-10.8-12.7-2.3-34.3 13.3-32.5 46.7-23.9 97.9 9 116.6 84.4z"/>
                </svg>
              </a>
              <a href="#" className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-4 h-4">
                  <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Newsletter Section */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <div className="w-12 h-1 bg-black mb-4"></div>
            <p className="text-sm mb-4">Get notified of new products, limited releases, and more.</p>
            
            {/* Email Subscription Form */}
            <div className="flex mb-6">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                className="flex-grow px-3 py-2 text-sm border border-gray-300 focus:outline-none"
              />
              <button className="bg-black text-white px-4 py-2 text-sm">
                SUBSCRIBE
              </button>
            </div>
            
            {/* Marketplace Availability */}
            <div className="mb-4">
              <p className="bg-green-500 text-white text-sm text-center py-1 px-2 inline-block mb-2">
                We are also available on
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="Amazon" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Flipkart_logo.svg/2560px-Flipkart_logo.svg.png" alt="Flipkart" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Meesho_Logo.png/1200px-Meesho_Logo.png" alt="Meesho" className="h-6" />
                <img src="https://1000logos.net/wp-content/uploads/2021/02/Myntra-logo.png" alt="Myntra" className="h-6" />
                <img src="https://logos-world.net/wp-content/uploads/2022/01/Ajio-Logo.png" alt="Ajio" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Tata_Cliq_Logo.svg" alt="TataCliq" className="h-6" />
              </div>
            </div>
            
            {/* Copyright Information */}
            <p className="text-xs text-gray-600">
              © Copyright 2024 | Blooming Flore! All Rights Reserved. Powered By NextBigBox
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;