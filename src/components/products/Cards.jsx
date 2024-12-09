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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {displayedProducts?.map((elm, id) => {
        return (
          <div
            key={id}
            className="w-full bg-white relative py-5 px-2 transition-all hover:shadow-custom shadow-normal rounded-2 mt-3"
            onClick={() => {
              history(`${elm._id}`);
            }}
          >
            <div className="w-[150px] mx-auto h-[150px]">
              <img
                className="w-full h-full object-cover"
                src={elm['images'][0]}
                alt=""
              />
            </div>
            <div className="bg-gray-300 h-[1px] my-2"></div>
            <div className="px-2">
              <div>
                <p className="text-gray-600 text-center text-sm">
                  {elm["category"][0]}
                </p>
                <h1 className="text-black py-1 text-center font-medium">{elm["name"]}</h1>
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center pt-0 absolute top-1 right-1">
                <div>{elm?.ratings?.avarage}</div>
                <div>⭐</div>
              </div>

              <div className="pt-1">
                <div className="flex flex-row gap-3 justify-center items-center">
                  <h1 className="text-gray-500 text-lg line-through">
                    ₹{(elm?.price + 17).toFixed(2)}
                  </h1>
                  <h1 className="text-red-600 text-lg font-semibold">
                    ₹{elm?.price}
                  </h1>
                </div>
              </div>

              <div className="flex flex-row justify-center gap-2 pt-3">
                <div className="p-2 border">
                  <FavoriteBorderIcon className="text-black hover:text-red-600 transition-transform duration-300 transform hover:scale-150" />
                </div>
                <div
                  className="p-2 border"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(elm._id);
                  }}
                >
                  <ShoppingCartIcon className="text-black hover:text-red-600 transition-transform duration-300 transform hover:scale-125" />
                </div>
                <div className="p-2 border">
                  <QuickreplyIcon className="text-black hover:text-red-600 transition-transform duration-300 transform hover:scale-125" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    <div className="flex justify-center mt-5 pt-3">
      <div>
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
