import React from "react";

const ImgSetup = () => {
return (
  <div className="flex flex-col md:flex-row w-full gap-8 py-24">
    {/* Left Column */}
    <div className="flex w-full md:w-1/3">
      <a href="#" className="block cursor-pointer">
        <img
          src="https://bloomingfloret.in/cdn/shop/files/2_b8070bac-581a-4c51-b1c1-621e89262b06.jpg?v=1724524544"
          alt="Blooming Flore Featured Collection"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          loading="lazy"
        />
      </a>
    </div>

    {/* Right Column */}
    <div className="flex flex-col w-full md:w-2/3 gap-8">
      {/* Top Row */}
      <div className="flex flex-row gap-8">
        <div className="flex w-full md:w-2/3">
          <a href="#" className="block cursor-pointer">
            <img
              src="https://bloomingfloret.in/cdn/shop/files/Untitled_design_5.jpg?v=1724526122"
              alt="Blooming Flore Decorative Design 1"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
              loading="lazy"
            />
          </a>
        </div>
        <div className="flex w-full md:w-1/3">
          <a href="#" className="block cursor-pointer">
            <img
              src="https://bloomingfloret.in/cdn/shop/files/Untitled_design_dfcf3055-b1db-43da-a267-2d777c0a3652.png?v=1724523641"
              alt="Blooming Flore Decorative Design 2"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
              loading="lazy"
            />
          </a>
        </div>
      </div>
      {/* Bottom Row */}
      <div className="flex flex-row gap-8">
        <div className="flex w-full md:w-1/3">
          <a href="#" className="block cursor-pointer">
            <img
              src="https://bloomingfloret.in/cdn/shop/files/Untitled_design_1.jpg?v=1724524407"
              alt="Blooming Flore Artistic Detail"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
              loading="lazy"
            />
          </a>
        </div>
        <div className="flex w-full md:w-2/3">
          <a href="#" className="block cursor-pointer">
            <img
              src="https://bloomingfloret.in/cdn/shop/files/home-st.jpg?v=1724132952"
              alt="Blooming Flore Elegant Ambiance"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
);
};

export default ImgSetup;