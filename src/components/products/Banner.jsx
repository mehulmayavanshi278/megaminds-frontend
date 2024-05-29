import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PreviousArrow } from "./Weekspecial";

function Banner() {
  const settings = {
      dots: true,
    infinite: true, // Infinite loop sliding
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Autoplay speed in milliseconds
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
  };

  return (
    <>

    <div className="md:mt-[100px] mt-[20px]">

   
      <Slider {...settings}>
        {Array.from({ length: 4 }, (id) => {
          return (
            <>
              <div key={id+Date.now()} className="w-full md:h-[450px] h-[240px]">
                <div className="">
                  <img
                    className="w-full h-full object-cover rounded-[5px]"
                    src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                    alt=""
                  />
                </div>
              </div>
            </>
          );
        })}
      </Slider>

      </div>
    </>
  );
}

export default Banner;
