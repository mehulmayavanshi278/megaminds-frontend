import React from 'react'
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PreviousArrow } from './Weekspecial';

function Latestblog() {

    const settings = {
        //   dots: true,
          infinite: true, // Infinite loop sliding
          speed: 500, // Transition speed in milliseconds
          slidesToShow: 2, // Number of slides to show at once
          slidesToScroll: 1, // Number of slides to scroll at once
          autoplay: true, // Enable autoplay
          autoplaySpeed: 2000, // Autoplay speed in milliseconds
          nextArrow: <NextArrow />,
          prevArrow: <PreviousArrow />,
          centerMode:true,
        //   centerPadding: '10%',
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                centerPadding: '10%'
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerPadding: '20%',
                centerMode:false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerPadding: '20%',
                centerMode:false
              }
            }
          ]
        };

  return (
    <>


    <div className='md:mt-[40px] mt-[10px] py-3'>
      <div className=''>
        <h1 className='text-[28px]'>Latest Blogs</h1>
      </div>
      <div className='md:pt-[40px] pt-[10px]'>

   
    <Slider {...settings}> 

    {
        Array.from({length:5},(id)=>{
            return(
                <>
                <div key={Date.now()} className='bg-white rounded-[5px] p-[20px] w-[90%]  mx-auto'>
          <div className=''>
             <h2 className='text-[#6060dc] font-[500]'>Antidioxite</h2>
          </div>
          <div className=''>
            <h1 className='text-[30px] font-[600]'>the first look to your baby's health</h1>
            <p className='text-[#666] text-[16px]'>This example demonstrates how to create custom arrow components with inline  making the solution self-contained and easy to manage.</p>
          </div>
          <div className='flex md:flex-row  flex-col justify-start gap-3 mt-3'>
              <div className='flex flex-row justify-start gap-2 items-center'>
                <DateRangeIcon style={{color:"#666"}}/>
                <p className='text-[#666] text-[16px]'>November 9 , 2023</p>
              </div>
              <div className=''>
              <div className='flex flex-row justify-start gap-2 items-center'>
              <AccountCircleIcon style={{color:"#666"}}/>
                <p className='text-[#666] text-[16px]'>By Nuturemite</p>
              </div>
                 
              </div>

              <div className=''>
              <div className='flex flex-row justify-start gap-2 items-center'>
              <CommentIcon style={{color:"#666"}}/>
                <p className='text-[#666] text-[16px]'>0 comments</p>
              </div>
                 
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
    </>
  )
}

export default Latestblog
