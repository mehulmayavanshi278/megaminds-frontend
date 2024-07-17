import React, { useContext, useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PreviousArrow } from '../products/Weekspecial';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import productService from '../../service/product.service';

function Recentryviewed({addToCart}) {


  const {recentlyViewed , setRecentlyViewed} = useContext(MyContext)
  const history = useNavigate();

    const settings = {
        //   dots: true,
          infinite: true, // Infinite loop sliding
          speed: 500, // Transition speed in milliseconds
          slidesToShow: 4, // Number of slides to show at once
          slidesToScroll: 1, // Number of slides to scroll at once
          autoplay: true, // Enable autoplay
          autoplaySpeed: 2000, // Autoplay speed in milliseconds
          nextArrow: <NextArrow />,
          prevArrow: <PreviousArrow />,
          responsive: [
            {
              breakpoint:1280,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                centerPadding: '10%',
                centerMode:true
              }
            }
            ,
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                // dots: true,
                centerPadding: '10%'
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerPadding: '20%'
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerPadding: '20%'
              }
            }
          ]
        };


        const{ trendingProducts ,  setTrendingProducts} = useContext(MyContext)
  
        const getTrendingProducts = async()=>{
          try{
            const res = await productService.getRandomProducts();
            if(res?.status===200){
              console.log(res?.data);
              setTrendingProducts([...res?.data]);
            }
          }catch(err){
            console.log(err);
          }
      }
      
        useEffect(()=>{
          getTrendingProducts();
        },[]);

  return (
    <div>
      

      <div className='px-4 xl:w-[900px] lg:w-[600px] mx-auto py-2'>

        
<Slider {...settings}>


   
   {
    trendingProducts?.map((elm , id)=>{
        return(
            <>

            <div key={id} className='w-[180px] shadow-normal border border-solid relative bg-[white]  rounded-[5px] mt-1 py-[20px] mx-auto' onClick={()=>{history(`/products/type/${elm._id}`)}}>
<div className=' w-[120px] mx-auto h-[120px]'>
    <img className='w-full h-full object-cover' src={elm?.images[0]} alt=''/>
</div>
<div className='bg-[#d8d3d3] h-[1px] my-2'></div>
<div className='px-2'>
    <div className=''>
        <p className='text-[#666] text-[15px] text-center'>{elm?.category[0]}</p>
        <h1 className='text-[black] py-1 text-[14px] font-[500] font-sans'>{elm?.name?.slice(0,20)} </h1>
    </div>
    <div className=''>
          
          <div className="flex flex-row items-center pt-0 absolute top-[5px] right-[5px] ">
                        <div className="">{elm.ratings.avarage}</div>
                        <div className="">⭐</div>
                      </div>
                    

                      <div className="pt-1">
                        <div className="flex flex-row gap-3 justify-center items-center">
                          <h1 className="text-gray-500 text-[18px] line-through ">
                            ₹{elm.price+49}
                          </h1>
                          <h1 className="text-red-600 text-[18px]  font-semibold">
                            ₹{elm.price}
                          </h1>
                        </div>
                      </div>
                      {/* <div className="w-[100px] h-[1px] bg-[black] my-3"></div> */}
          </div>
</div>
</div>
            </>
        )
    })
   }



</Slider>
</div>


    </div>
  )
}

export default Recentryviewed
