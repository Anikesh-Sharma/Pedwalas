import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import the JSON data (db.json in the same directory)
import productsData from "./db.json";
const products = productsData.products || productsData;
// Helper function to truncate text
const truncateText = (text, maxChars) =>
  text.length > maxChars ? text.substring(0, maxChars) + "..." : text;
const Cards = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    rows: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div>
      <div className="flex items-center justify-center py-6">
        <h1 className="text-3xl md:text-5xl font-bold">New Arrivals</h1>
      </div>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6">
        <Slider {...settings}>
          {products.map((ele, index) => (
            <div key={index} className="p-2">
              <div className="bg-gray-100 w-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col mx-auto">
                {/* Image Section */}
                <div>
                  <Link to={`/product/${ele.id || index}`}>
                    <img
                      src={ele.image}
                      alt={ele.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
                {/* Text Section with fixed min-height */}
                <div className="p-4 flex flex-col justify-between min-h-[96px]">
                  <p className="text-center font-semibold text-lg">
                    {truncateText(ele.name, 40)}
                  </p>
                  <span className="block text-center text-gray-600 mt-2">
                    {ele.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default Cards;