import React, { useContext, useEffect, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Signup, { Login } from "../pages/signup/Signup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import cartService from "../service/cart.service";
import axios from "axios";
import tokenHelper from "../Helper/tokenHelper";

function Header(props) {
  const history = useNavigate();
  const {cartLength , setCartLength ,cartItems , setCartItems , userData , setUserData , refresher , setRefresher} = useContext(MyContext);
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(null);
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(null);
  const [isOpenLogin, setIsOpenLogin] = useState(null);
  const [search, setSearch] = useState("");

  const [cartItemtmp , setCartItemtmp]  =  useState();

  const handleSearchOnChange = (e) => {
    setSearch(e.target.value);
  };

  const openCartPopUp = () => {
    setIsOpenPopUp(true);
    setIsOpenCart(true);
    document.body.style.overflow = "hidden";
  };
  const openSignupPopUp = () => {
    setIsOpenPopUp(true);
    setIsOpenSignup(true);
    setIsOpenLogin(false);
    document.body.style.overflow = "hidden";
  };
  const openLoginPopUp = () => {
    setIsOpenPopUp(true);
    setIsOpenLogin(true);
    setIsOpenSignup(false);
    document.body.style.overflow = "hidden";
  };
  const closePopUp = () => {
    setIsOpenPopUp(false);
    setIsOpenSearchBar(false);
    setIsOpenCart(false);
    setIsOpenSignup(false);
    setIsOpenLogin(false);
    document.body.style.overflow = "";
  };

  const getCartProducts = async()=>{
    try{
        const res = await cartService.getCartItems();
        if(res?.status===200){
          console.log(res.data);
          
          setCartItems([...res.data]);
          const tmp=[...res.data].map((elm , id)=>{
            return {...elm.productDetails , quantity:1}
          });
          console.log("tmp" , tmp);
          setCartItemtmp(tmp);
          setCartLength(res.data.length);
        }
    }catch(err){
      if (err.response && err.response.status === 400) {
        toast.error(err?.response?.data?.message);
        return;
     }
      console.log(err);
    }
  }

  const handleRemoveFromCart = async(id)=>{
     try{ 
      console.log(id);
      const res = await cartService.removeFromCart(id);
      if(res?.status===200){
        console.log(res.data);
        setCartItems([...res.data]);
        setCartLength(res.data.length)
        toast.success("Removed From Cart");
      }
     }catch(err){
      console.log(err);
      if (err.response && err.response.status === 400) {
        toast.error(err?.response?.data?.message);
        return;
     }
     }
  }


  const inCrement = (id)=>{
    console.log(id)
    const updatedCartItems = [...cartItemtmp]; // Create a copy of the cart items array
  updatedCartItems[id] = { ...updatedCartItems[id], quantity: Math.min(8 , updatedCartItems[id].quantity + 1 )};
  setCartItemtmp([...updatedCartItems]);
  }
  const decrement = (id)=>{
    const updatedCartItems = [...cartItemtmp]; // Create a copy of the cart items array
  updatedCartItems[id] = { ...updatedCartItems[id], quantity: Math.max(1 , updatedCartItems[id].quantity - 1) };
  setCartItemtmp([...updatedCartItems]);
  }

  const handleCheckout = async()=>{
    try{

      console.log(cartItemtmp)
        const res = await axios.post("http://localhost:5000/order/create-checkout-session" , {
          cartItems:cartItemtmp,
        },{
          headers:{
            Authorization:tokenHelper.get()
          }
        });
        if(res?.data?.url){
            window.location.href=res.data.url
        }
    }catch(err){
        console.log(err);
    }

}
const handleLogout = async()=>{
   tokenHelper.delete("token");
   setRefresher(refresher+1);
}
  useEffect(() => {
   tokenHelper.get() && getCartProducts();
  }, [refresher]);
  return (
    <div>
      <div
        className={`absolute h-full w-full ${
          isOpenCart ? "z-30" : ""
        } z-10 bg-[#2e2b2b] opacity-[0.6] ${isOpenPopUp ? "block" : "hidden"}`}
        onClick={closePopUp}
      ></div>
      <div className="">
        <div className="bg-[#e40046] flex flex-row justify-between items-center md:px-[100px] px-[10px] py-1">
          <ul>
            <select>
              <option className="h-[10px]">hindi</option>
              <option className="h-[10px]">English</option>
            </select>
          </ul>
          <div className=" text-[12px]">
            <ul className="flex flex-row justify-between items-center gap-3">
              <li className="text-white cursor-pointer">About Us</li>
              <li className="text-white cursor-pointer">contact Us</li>
              <li className="text-white cur flex gap-1 items-center">
                <CallIcon style={{ width: "20px" }} /> <p>9726165469</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#e40000d5]  flex md:flex-row flex-col md:gap-4 gap-2 xl:items-center items-start lg:px-[100px] px-[40px] py-2">
        <div className="flex flex-row justify-start lg:items-center items-start gap-2">
          <div className="w-[50px] h-[50px]">
            <img
              className="w-full h-full object-cover rounded-[50%]"
              src="https://nuturemite.info/wp-content/uploads/2022/10/nuturmite_logo_tranparent.png"
              alt=""
            />
          </div>
          <div className="">
            <p className="text-white text-[18px]">Nuturemite</p>
          </div>
        </div>

        <div className="flex   xl:flex-row md:flex-col flex-col-reverse justify-between w-full xl:gap-0 gap-2">
          <div className="flex lg:flex-row flex-col items-center gap-3">
            <div className="">
              <div className="relative">
                <input
                  className={`md:w-[450px] w-[320px] relative ${
                    isOpenSearchBar ? "z-20" : ""
                  } py-2 px-2 rounded-[5px] ${
                    isOpenSearchBar && !isOpenCart ? "rounded-b-none" : ""
                  } outline-none`}
                  type="text"
                  placeholder="search"
                  name="search"
                  onFocus={(e) => {
                    setIsOpenSearchBar(true);
                    setIsOpenPopUp(true);
                  }}
                  onChange={(e) => {
                    handleSearchOnChange(e);
                  }}
                />
                <div className="absolute z-20 top-0 right-0 px-3 py-2 rounded-tr-[5px] rounded-br-[5px] bg-[#39399b]">
                  <SearchIcon
                    className="text-white"
                    style={{ fontSize: "18px" }}
                  />
                </div>
                <div
                  className={` absolute md:w-[450px] w-[320px] h-[250px] z-50 bg-white rounded-[5px] rounded-t-none border-[1px] ${
                    isOpenSearchBar ? "block" : "hidden"
                  }`}
                ></div>
              </div>
            </div>

            <div className="">
              <div className="">
                <ul className="flex flex-row justify-start gap-3 items-center">
                  <li className="text-[14px] text-white">
                    <a href="/"> Home </a>
                  </li>
                  <li className="text-[14px] text-white">
                    {" "}
                    <a href="/"> Blog </a>
                  </li>
                  <li className="text-[14px] text-white">
                    {" "}
                    <a href="/products/Antioxidants"> Shop </a>
                  </li>
                  <li className="text-[14px] text-white">
                    {" "}
                    <a href="/aboutus"> About Us </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="">
            <div className="">
              <div className="">
                <ul className="flex flex-row  gap-2 items-center">
                  <li
                    className="p-2 px-[25px] border-1px-solid text-white text-[14px] cursor-pointer relative"
                    onClick={() => {
                      openCartPopUp();
                    }}
                  >
                    {" "}
                    <div className="bg-black rounded-[50%] w-[18px] h-[18px] absolute top-[0px] left-[20px] flex flex-row justify-center items-center">
                      <p className="text-[white] text-[12px]">{cartLength}</p>
                    </div>{" "}
                    <ShoppingBagIcon style={{ fontSize: "30px" }} /> Cart
                  </li>
                  <li className="group p-2 px-[25px] border border-solid text-white text-[14px] hover:bg-black relative rounded-[5px] rounded-bl-none rounded-br-none">
                    <div className="absolute z-[5] top-[44px] right-0 w-[250px] py-[25px] bg-black rounded-[5px] hidden group-hover:block">
                      <div className="flex flex-row gap-3 py-2 hover:bg-[#252121] cursor-pointer px-[25px]" onClick={()=>{history("/myaccount")}}>
                        <AccountCircleIcon style={{ fontSize: "20px" }}  />
                        <p> Your Account </p>
                      </div>
                      <div className="flex flex-row gap-3 py-2 hover:bg-[#252121] cursor-pointer px-[25px]">
                        <FavoriteBorderIcon style={{ fontSize: "20px" }} />
                        <p>Your wishlists</p>
                      </div>
                      <div className="h-[1px] bg-[#7f7e7e] mt-[25px]"></div>
                      {!userData?.firstName && <div className="mt-3">
                        <p className="text-[#8a7171] text-[12px] text-center">
                          if you are new user?
                        </p>
                        <p
                          className="text-[#c4c2c2] text-[15px] text-center hover:underline cursor-pointer"
                          onClick={openSignupPopUp}
                        >
                          Register
                        </p>
                      </div>}
                     { !userData?.firstName ? <div className="px-[20px] mt-2">
                        <button
                          className="w-full py-2 bg-[red] rounded-[3px] text-center hover:bg-[#e14c4c]"
                          onClick={openLoginPopUp}
                        >
                          Login
                        </button>
                      </div>
                      :
                      <div className="px-[20px] mt-2">
                        <button
                          className="w-full py-2 bg-[red] rounded-[3px] text-center hover:bg-[#e14c4c]"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                     }
                    </div>
                    <AccountCircleIcon style={{ fontSize: "30px" }} /> {userData?.firstName ||  "signUp" }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpenCart && (
        <div className="bg-grey-100 p-[40px] lg:w-[900px] w-[90%]  overflow-x-auto md:h-[500px] h-[90%] rounded-[10px] overflow-y-scroll z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
          <div className="">
            <div className="flex flex-row justify-between ">
              <h1 className="text-[32px] font-[600] text-black font-sans ">
                Shopping Cart
              </h1>
              <h1 className="text-[32px] font-[600] text-black font-sans">
                {cartLength} items
              </h1>
            </div>
            <div className="h-[1px]  bg-[grey]  mt-[40px]"></div>
            <div className="md:w-full w-[600px] overflow-x-auto md:px-0 px-[15px]">
              <table className="w-full overflow-x-auto mt-[40px]">
                <thead>
                  <tr className="">
                    <th className="text-start  text-[#666]">PRODUCT DETAILS</th>
                    <th className="text-center text-[#666]">QUANTITY</th>
                    <th className="text-center text-[#666]">PRICE</th>
                    <th className="text-center text-[#666]">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="pt-5"></th>
                    <th className="pt-5"></th>
                    <th className="pt-5"></th>
                    <th className="pt-5"></th>
                  </tr>

                { cartItems?.map((elm,id)=>{
                  return(
                    <>
                    <tr key={id}>
                    <td className="text-start  pt-5">
                      <div className="  flex flex-row">
                        <div className="w-[100px] h-[100px]">
                          <img
                            className="w-full h-full object-cover"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxfrd4wI6J8H-TTm5xSWZXPglddGveslM8Og3I4u_bA&s"
                            alt=""
                          />
                        </div>
                        <div className="ps-[30px]">
                          <h1 className="text-black font-sans font-[600]">
                            {elm?.proproductDetails?.name}
                          </h1>
                          <p className="text-[#666] text-[14px] pt-1">
                            {elm?.productDetails['category'][0]}
                          </p>
                          <p className="text-[red] font-sans font-[500] pt-2 hover:underline cursor-pointer "onClick={()=>{handleRemoveFromCart(elm._id)}}>
                            Remove <CloseIcon />
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center pt-5 flex flex-row gap-3 justify-center items-center">
                      <RemoveIcon onClick={()=>{decrement(id)}} className="cursor-pointer" />
                      <p className="border border-1 w-[35px] h-[35px] flex justify-center items-center text-black font-sans font-[700]">
                        {cartItemtmp && cartItemtmp[id]['quantity']}
                      </p>
                      <AddIcon onClick={()=>{inCrement(id)}}  className="cursor-pointer" />
                    </td>
                    <td className="text-center align-top pt-5 text-black font-sans font-[700]">
                    ₹{elm?.productDetails?.price}
                    </td>
                    <td className="text-center align-top pt-5  text-black font-sans font-[700]">
                      <button>₹{((elm?.productDetails?.price * cartItemtmp[id]['quantity']) ).toFixed(2)}</button>
                    </td>
                  </tr>
                    </>
                  )
                }) 
                  }
   

                  <tr>
                    <th className="pt-5"></th>
                    <th className="pt-5"></th>
                    <th className="pt-5"></th>
                    <th className="pt-5 text-[700] text-[22px]">Total 600</th>
                  </tr>
                </tbody>
              </table>

              <div className="mt-[30px] flex justify-between">
                <Button onClick={closePopUp}>
                  <KeyboardBackspaceIcon className="text-black font-[600]" />
                  <span className="ps-1 font-[600]">go to shop</span>{" "}
                </Button>
                <Button variant="contained" color="primary">
                  <ArrowRightAltIcon className="text-white font-[600]" />
                  <span className="ps-1 font-[600]" onClick={handleCheckout}>
                    PROCEED TO CHECKOUT
                  </span>{" "}
                </Button>
              </div>
              <div className="h-[1px]  bg-[grey]  mt-[40px]"></div>
            </div>
          </div>
        </div>
      )}

      {isOpenSignup && (
        <div className="">
          <Signup openLogin={openLoginPopUp} openSignup={openSignupPopUp} />
        </div>
      )}
      {isOpenLogin && (
        <div className="">
          <Login closePopUp={closePopUp}/>
        </div>
      )}
    </div>
  );
}

export default Header;
