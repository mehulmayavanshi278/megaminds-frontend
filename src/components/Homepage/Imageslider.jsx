import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PreviousArrow } from "../products/Weekspecial";


function Imageslider() {
  const settings = {
      dots: true,
    infinite: true, // Infinite loop sliding
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at once
    // slidesToScroll: 1, // Number of slides to scroll at once
    // autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Autoplay speed in milliseconds
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '20%',
          dots:false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '20%',
          dots:false,
        }
      }
    ]

  };

  return (
    <>

    <div className="w-[100%] absolute ">

   
      <Slider {...settings}>
        {Array.from({ length: 4 }, (id) => {
          return (
            <>
              <div key={id} className="w-full md:h-[300px] h-[240px]">
                <div className="h-full">
                  <img
                    className="w-full h-full object-cover rounded-[5px]"
                    // src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                    src="https://th.bing.com/th/id/OIG4.LgUj9FIjzUbdTSMn0mRg"
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

export default Imageslider;


