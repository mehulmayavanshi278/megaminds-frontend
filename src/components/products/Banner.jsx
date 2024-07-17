import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PreviousArrow } from "./Weekspecial";
import productService from "../../service/product.service";
import { MyContext } from "../../App";

function Banner({addToCart}) {
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
                    src='https://www.shutterstock.com/image-vector/ecommerce-website-banner-template-presents-260nw-2252124451.jpg'
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
