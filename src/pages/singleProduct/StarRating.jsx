import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import productService from '../../service/product.service';
import { toast } from 'react-toastify';

const StarRating = ({singleProductData}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRatingBtn = async()=>{
    try{
     console.log(rating);
     const res  =  await productService.giveRating(singleProductData._id , {rate:rating});
     if(res?.status===200){
        console.log(res.data);
        toast.success('rating added successfully');
        setRating(res.data.rate)
     }
    }catch(err){
        if (err.response && err.response.status === 400) {
            toast.error(err?.response?.data?.message);
            return;
          }
        console.log(err);
    }
  }


  const getRatings = async()=>{
    try {
        const res = await productService.getSingleRating(singleProductData._id);
        if(res?.status===200){
            setRating(res.data.rate);
        }
    } catch (err) {
        if (err.response && err.response.status === 400) {
            toast.error(err?.response?.data?.message);
            return;
          }
        console.log(err);
    }
  }

  useEffect(()=>{
    getRatings();
  },[]);
  return (
    <>
    <div className="flex space-x-1">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="hidden"
              onClick={() => setRating(ratingValue)}
            />
            <svg
              className={`w-10 h-10 ${ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 24 24"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            >
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.845 1.416 8.231L12 18.902l-7.416 4.597L6 15.268 0 9.423l8.332-1.268z"/>
            </svg>
          </label>
        );
      })}
    </div>
    <div className='mt-3'>
      <Button variant='contained' color='primary' onClick={handleRatingBtn}>Submit</Button>
      </div>
      </>
  );
};

function Ratings  ({singleProductData}){
    return(
        <>
            <div className="flex flex-col items-center justify-center py-[20px]">
      <h1 className="text-2xl font-bold mb-4">Rate this product</h1>
      <StarRating singleProductData={singleProductData}/>

    </div>
        </>
    )
}

export default Ratings;
