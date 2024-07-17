import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import Recentryviewed from "../../components/Homepage/Recentryviewed";
import Imageslider from "../../components/Homepage/Imageslider";
import Weekspecial from "../../components/products/Weekspecial";
import Latestblog from "../../components/products/Latestblog";
import Footer from "../../partials/Footer";
import Banner from "../../components/products/Banner";
import productService from "../../service/product.service";
import { MyContext } from "../../App";
import { toast } from "react-toastify";
import cartService from "../../service/cart.service";
import tokenHelper from "../../Helper/tokenHelper";
import userService from "../../service/user.service";

export const categories = [
  "Antioxidants",
  "Ayurvedic",
  "Digestive Health",
  "General Health",
  "Herbal Speciality Supplements",
  "Men Health",
  "Organic",
  "Personal Care",
  "Sexual Health",
  "Vitamines And Minarels",
  "Women Health",
];

export const CategorySideBar = () => {
  const [currCategory, setCurrCategory] = useState(null);
  const { categoryType, setCategoryType } = useContext(MyContext);

  useEffect(() => {
    const cat = window.location.href;
    console.log(cat);
    if (cat.includes("/products")) {
      console.log(cat.split("products/")[1].split("%20").join(" "));

      setCurrCategory(cat.split("products/")[1].split("%20").join(" "));
      setCategoryType(cat.split("products/")[1].split("%20").join(" "));
    }

    // console.log(cat.split("products/")[1].split("%20").join(" "));
  }, []);

  return (
    <>
      <div className="sticky top-0 z-0 w-[250px]">
        <div
          className=" shadow-lg rounded-[5px] ps-3 py-3 bg-[white] lg:block hidden"
          id="categorySideBar"
        >
          <p className="text-[#666] text-[18px]">Categories</p>
          <div className="ps-[10px] pt-3">
            <ul>
              {categories?.map((elm, id) => {
                return (
                  <>
                    <li
                      key={elm}
                      className={`text-[14px]  hover:underline py-2 ps-3 ${
                        currCategory === elm
                          ? "text-[red] underline"
                          : "text-[#666]"
                      }`}
                      onClick={() => {
                        setCurrCategory(elm);
                      }}
                    >
                      {" "}
                      <a href={`/products/${elm}`}> {elm} </a>
                    </li>
                  </>
                );
              })}

              {/* <li className='text-[14px] text-[#666] py-2 ps-3'>Antioxidants</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Ayurvedic</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Digestive Health</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>General Health</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Herbal Speciality Suppliments</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Men Health</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Organic</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Personal Care</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Sexual Health</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Vitamines And Minarels</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Women Health</li> */}
            </ul>
          </div>

          <div className="pt-4 p-2">
            <p className="text-[#666] text-[18px]">Treading Search</p>
            <div className="">
              <ul>
                <li className=" text-[14px] text-[#666] py-1 ps-3 flex flex-row gap-2 items-center">
                  {" "}
                  <SearchIcon style={{ fontSize: "18px" }} />{" "}
                  <p>ayuurvedic powder</p>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function Homepage() {
  const [products, setProducts] = useState();
  const {
    cart,
    cartLength,
    setCartLength,
    cartItems,
    setCartItems,
    userData,
    setUserData,
    refresher,
    setRefresher,
    openCart , 
    setOpenCart
  } = useContext(MyContext);
  
  const [cartItemtmp, setCartItemtmp] = useState();

  const getProducts = async (query) => {
    try {
      const res = await productService.getproducts(query);
      if (res?.status === 200) {
        console.log(res.data);
        setProducts([...res.data.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCartProducts = async () => {
    try {
      const res = await cartService.getCartItems();
      if (res?.status === 200) {
        console.log(res.data);

        setCartItems([...res.data]);
        const tmp = [...res.data].map((elm, id) => {
          return { ...elm.productDetails, quantity: 1 };
        });
        console.log("tmp", tmp);
        setCartItemtmp(tmp);
        setCartLength(res.data.length);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err?.response?.data?.message);
        return;
      }
      console.log(err);
    }
  };

  const addToCart = async (id) => {
    try {
      const res = await cartService.addToCart({ productId: id });
      if (res?.status === 200) {
        console.log(res?.data);
        toast.success("One Item Added To Cart");
        setCartLength(res.data?.cartItems?.length);
        setRefresher(refresher + 1);
      } else if (res?.status === 201) {
        console.log(res.data);
        toast.success(res.data);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        toast.error(err?.response?.data?.message);
        return;
      }
    }
  };

  const handleOpenCart = () => {
    setOpenCart(true);
  };
  useEffect(() => {
    tokenHelper.get() && getProducts("");
    tokenHelper.get() && getCartProducts();
  }, [refresher, setRefresher]);

  return (
    <>
      <Header
        getCartProducts={getCartProducts}
        setCartItemtmp={setCartItemtmp}
        cartItemtmp={cartItemtmp}
      />

      <div className="lg:px-[100px] md:px-[40px] py-3">
        <div className="lg:grid lg:grid-cols-[1fr,4fr] grid-cols-[1fr,500px] gap-3  relative">
          <div className="relative w-full">
            <CategorySideBar />
          </div>

          <div className="xl:grid 2xl:grid-rows-[300px,auto]  gap-y-[20px]">
            <div className=" md:block 2xl:grid xl:grid-cols-[3fr,1fr] xl:gap-3 md:gap-1 xl:w-full lg:w-[600px] relative">
              <div className="xl:w-full  2xl:h-full md:h-[350px] h-[250px] relative ">
                <Imageslider />
              </div>
              <div className="border md:none xl-block bg-[white] shadow-lg border-1px p-3">
                <div className="">
                  <p className="text-[#666] text-[15px]">Your Cart</p>
                  {tokenHelper.get() && <p className="text-[#666] text-[14px] font-[600]">
                    {" "}
                    there are {cartLength} items in your cart
                  </p>}
                </div>

                {cartItems?.slice(0, 1)?.map((elm, id) => {
                  return (
                    <>
                      <div
                        key={elm?._id}
                        className="flex flex-row justify-start gap-3 mt-2 bg-[#fafafa] p-3"
                      >
                        <div className="w-[60px] h-[80px]">
                          <img
                            className="w-full h-full object-cover"
                            src={elm?.productDetails?.images[0] || ''}
                            alt=""
                          />
                        </div>
                        <div className="">
                          <p className="text-[#666] text-[14px]">
                            {elm?.productDetails?.name}{" "}
                          </p>
                          <p className="text-[#666] text-[14px]">
                            {elm?.productDetails?.price}{" "}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}

                <div className="">
                  {cartLength && cartLength !== 0 && (
                    <div className="text-center bg-[black] rounded-[3px] py-2 cursor-pointer hover:bg-[#494141]">
                      <h1
                        className="text-white text-[16px]"
                        onClick={handleOpenCart}
                      >
                        View All
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-[white] md:mt-0 mt-3 border border-solid shadow-lg">
              <div className="p-2">
                <p className="text-[20px] font-sans font-[600] px-[20px] text-center">
                  Recently Viewed Products
                </p>
              </div>

              <div className=" pb-3 ">
                <div className="">
                  <Recentryviewed addToCart={addToCart} />
                </div>
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>

      <div className="md:px-[100px] px-[10px] bg-[#f1f1ff] md:pb-[50px] pb-[10px]">
        <Weekspecial addToCart={addToCart} />
        <Banner />
        <Latestblog />
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
