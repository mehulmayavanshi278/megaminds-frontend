import React, { useContext, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import QuickreplyIcon from "@mui/icons-material/Quickreply";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { MyContext } from "../../App";
import cartService from "../../service/cart.service";
import { toast } from "react-toastify";

function Cards({addToCart}) {
  const history = useNavigate();
  const [page, setPage] = useState(1);
  const {
    products,
    productsLength,
    displayedProducts,
    setDisplayedProducts,
    path,
    setCartLength,
    refresher,
    setRefresher
  } = useContext(MyContext);

  const handleSetPagination = (value) => {
    console.log(value);
  };

  const handleOnChangePage = (event, value) => {
    setPage(value);
    handleSetPagination(value);
    setDisplayedProducts(products.slice((value - 1) * 8, value * 8));
  };



  useEffect(() => {}, []);

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between">
        {displayedProducts?.map((elm, id) => {
          return (
            <>
              <div
              key={id+id+Date.now()}
                className="lg:w-[230px] w-[260px] mx-auto bg-white relative py-[20px] px-[10px] transition-all   hover:shadow-custom shadow-normal  rounded-[2px] mt-3 "
                onClick={() => {
                  history(`${elm._id}`);
                }}
              >
                <div className="w-[150px] mx-auto h-[150px]  bg-[red] ">
                  <img
                    className="w-full h-full object-cover"
                    src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
                    // src={`${elm['images'][0]}`}
                    alt=""
                  />
                </div>
                <div className="bg-[#d8d3d3] h-[1px] my-2"></div>
                <div className="px-2">
                  <div className="">
                    <p className="text-[#666] text-[15px] text-center">
                      {elm["category"][0]}
                    </p>
                    <h1 className="text-[black] py-1 text-center font-[500]">{elm["name"]} </h1>
                  </div>
                </div>
                <div className="">
                  <div className="flex flex-row items-center pt-0 absolute top-[5px] right-[5px] ">
                    <div className="">{elm?.ratings?.average}</div>
                    <div className="">⭐</div>
                  </div>

                  <div className="pt-1">
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <h1 className="text-gray-500 text-[18px] line-through ">
                        ₹
                        {(elm?.price+27).toFixed(2)}
                      </h1>
                      <h1 className="text-red-600 text-[18px]  font-semibold">
                        ₹{elm?.price}
                      </h1>
                    </div>
                  </div>

                  <div className="flex flex-row justify-center gap-[10px] pt-3">
                    <div className="p-2 border border-1">
                      <FavoriteBorderIcon className="text-black hover:text-[red]  transition-all ease-in-out duration-700 hover:font-[700] hover:scale-150 " />
                    </div>
                    <div
                      className="p-2 border border-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(elm._id);
                      }}
                    >
                      <ShoppingCartIcon className="text-black hover:text-[red]  hover:font-[700] hover:scale-125 transition-colors duration-300" />
                    </div>
                    <div className="p-2 border border-1">
                      <QuickreplyIcon className="text-black hover:text-[red]    hover:font-[700] hover:scale-125 transition-colors duration-300" />
                    </div>
                  </div>
                  {/* <div className="w-[100px] h-[1px] bg-[black] my-3"></div> */}
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className="flex flex-row justify-center mt-5 pt-3">
        <div className={""}>
          <Pagination
            count={Math.floor(productsLength / 8) + 1} // Total number of pages
            page={page}
            onChange={handleOnChangePage}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default Cards;
