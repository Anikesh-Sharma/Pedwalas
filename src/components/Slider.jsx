import { useState, useMemo, useEffect } from "react";

const Slider = () => {
// Define the list of slide images
const slides = useMemo(() => ["./1.webp", "./2.webp", "./3.webp"], []);
const totalSlides = slides.length;
const [activeIndex, setActiveIndex] = useState(0);

// Update active index and ensure it wraps properly
const updateIndex = (newIndex) => {
  setActiveIndex((newIndex + totalSlides) % totalSlides);
};

// Auto-slide using functional state update to avoid extra re-renders
useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, 3000); // Change slide every 3 seconds

  return () => clearInterval(interval);
}, [totalSlides]);

return (
  <div
    id="carousel"
    className="relative w-full h-full"
    role="region"
    aria-label="Image Carousel"
  >
    <div className="relative h-[500px] overflow-hidden rounded-lg xl:h-[600px]">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          alt={`Slide ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>

    {/* Dots Navigation */}
    <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
            activeIndex === index ? "bg-white scale-110" : "bg-gray-400"
          }`}
          aria-label={`Slide ${index + 1}`}
        />
      ))}
    </div>

    {/* Navigation Arrows */}
    <ArrowButton
      direction="left"
      onClick={() => updateIndex(activeIndex - 1)}
    />
    <ArrowButton
      direction="right"
      onClick={() => updateIndex(activeIndex + 1)}
    />
  </div>
);
};

// Reusable arrow button component with ARIA
const ArrowButton = ({ direction, onClick }) => (
<button
  onClick={onClick}
  aria-label={direction === "left" ? "Previous slide" : "Next slide"}
  className={`absolute top-1/2 z-30 flex items-center justify-center h-full px-4 cursor-pointer group transform -translate-y-1/2 ${
    direction === "left" ? "left-0" : "right-0"
  }`}
>
  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-600">
    <svg
      className={`w-4 h-4 text-white ${direction === "left" ? "" : "rotate-180"}`}
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 1L1 5l4 4"
      />
    </svg>
  </span>
</button>
);

export default Slider;