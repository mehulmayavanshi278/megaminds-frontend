import React, { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MyContext } from '../../App';
import productService from '../../service/product.service';
export const PreviousArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          backgroundColor: '#000080',
          borderRadius: '50%',
          left:0,
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.75,
          transition: 'opacity 0.3s',
          zIndex: 1,
        }}
        onClick={onClick}
      >
        {/* <i className="slick-prev-icon" style={{ color: 'white', fontSize: '20px' }}>‹</i> */}
      </div>
    );
  };

 export const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          right:0,
          
          backgroundColor: '#000080',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.75,
          transition: 'opacity 0.3s',
          zIndex: 1,
        }}
        onClick={onClick}
      >
        {/* <i className="slick-next-icon" style={{ color: 'white', fontSize: '20px' }}>›</i> */}
      </div>
    );
  };


const SimpleSlider = ({addToCart}) => {


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
 const {path , setPath} = useContext(MyContext);

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

    const handleNavigate = (id)=>{
      console.log(window.location);
      window.location.href = window.location.origin + "/products/1234/"+id
    }

    useEffect(()=>{

    },[])
  
    return (
      <div>



        <div className='px-4 '>

        
        <Slider {...settings}>


           
           {
             trendingProducts?.map((elm,id)=>{
                return(
                    <>
                    <div key={Date.now()+id} className='w-[250px] relative pb-4 bg-[white] shadow-normal hover:shadow-custom rounded-[5px] mt-3 mb-3 mx-auto'>
        <div className='w-[130px] mx-auto py-[20px] h-[150px]  ' onClick={()=>{handleNavigate(elm._id)}}>
            <img className='w-full h-full object-cover' src={elm?.images[0]} alt=''/>
        </div>
        <div className='bg-[#d8d3d3] h-[1px] w-[80%] mx-auto my-2'></div>
        <div className='px-[20px]'>
            <div className=''>
                <p className='text-[#666] text-[15px] text-center'>{elm?.category[0]}</p>
                <h1 className='text-[black] py-1 font-[600]'>{elm?.name?.slice(0,23)} </h1>
            </div>
            <div className=''>
          
            <div className="flex flex-row items-center pt-0 absolute top-[5px] right-[5px] ">
                          <div className="">{elm?.ratings?.average}</div>
                          <div className="">⭐</div>
                        </div>
                      

                        <div className="pt-1">
                          <div className="flex flex-row gap-3 items-center">
                            <h1 className="text-gray-500 text-[18px] line-through ">
                              ₹{(elm?.price+45).toFixed(2)}
                            </h1>
                            <h1 className="text-red-600 text-[18px]  font-semibold">
                              ₹{elm?.price.toFixed(2)}
                            </h1>
                          </div>
                        </div>

                      <div className='flex flex-row gap-[10px] pt-3'>
                      <div className='p-2 border border-1'>
                      <FavoriteBorderIcon className="text-black hover:text-[red]   hover:font-[700] hover:scale-125 transition-colors duration-300" />
                      </div>
                      <div className='p-2 border border-1'onClick={()=>{addToCart(elm._id)}}>
                      <ShoppingCartIcon className="text-black hover:text-[red]  hover:font-[700] hover:scale-125 transition-colors duration-300"/>
                      </div>
                      <div className='p-2 border border-1'>
                      <QuickreplyIcon className="text-black hover:text-[red]    hover:font-[700] hover:scale-125 transition-colors duration-300"/>
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
    );
  };
  
;
  

function Weekspecial({addToCart}) {
  const [path , setPath] = useState(window.location.href);
  const {categoryType , setCategoryType , } = useContext(MyContext);



  useEffect(()=>{
    window.scrollTo(0, 0);
   
  },[path])
  return (
    <>
      <div className=''>
      <div className='pt-5'>
        <h1 className='text-[#565656] text-[28px] font-600'>Trending Products</h1>
      </div>
         <div className='  py-4'>
            <SimpleSlider addToCart={addToCart}/>
         </div>
      </div>
    </>
  )
}

export default Weekspecial
