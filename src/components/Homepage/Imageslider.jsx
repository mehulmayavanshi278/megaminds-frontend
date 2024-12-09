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

  const images=[
              'https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148897327.jpg?w=1060&t=st=1718631916~exp=1718632516~hmac=df5d6f48de28528d62f6878d6b817f4bb175bced6cb5e7437cd6222090c3eb4c',
              'https://img.freepik.com/free-psd/banner-template-online-shopping_23-2148559048.jpg?semt=ais_hybrid'
  ]

  return (
    <>

    <div className="w-[100%] absolute ">

   
      <Slider {...settings}>
        {images?.map((elm,id) => {
          return (
            <>
              <div key={id} className="w-full md:h-[300px] h-[240px]">
                <div className="h-full">
                  <img
                    className="w-full h-full object-cover rounded-[5px]"
                    // src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                    src={elm}
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


