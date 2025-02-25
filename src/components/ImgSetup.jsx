import React from "react";

const ImgSetup = () => {
  return (
    <div className="flex flex-row w-full gap-8 py-24">
      <div className="flex w-1/3 ">
        <a href="#">
          <img
            src="https://bloomingfloret.in/cdn/shop/files/2_b8070bac-581a-4c51-b1c1-621e89262b06.jpg?v=1724524544"
            alt="img-1"
            className="w-full h-full object-cover"
          />
        </a>
      </div>

      <div className="flex flex-col w-2/3 gap-8 ">
        <div className="flex flex-row gap-8">
          <div className="flex w-2/3 ">
            <a href="#">
              <img
                src="https://bloomingfloret.in/cdn/shop/files/Untitled_design_5.jpg?v=1724526122"
                alt="top-left"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
          <div className="flex w-1/3 ">
            <a href="#">
              <img
                src="https://bloomingfloret.in/cdn/shop/files/Untitled_design_dfcf3055-b1db-43da-a267-2d777c0a3652.png?v=1724523641"
                alt="top-right"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <div className="flex w-1/3 ">
            <a href="#">
              <img
                src="https://bloomingfloret.in/cdn/shop/files/Untitled_design_1.jpg?v=1724524407"
                alt="bottom-left"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
          <div className="flex w-2/3 ">
            <a href="#">
              <img
                src="https://bloomingfloret.in/cdn/shop/files/home-st.jpg?v=1724132952"
                alt="bottom-right"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgSetup;
