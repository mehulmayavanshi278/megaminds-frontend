import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useRef,
} from "react";
import Header from "../../components/Header";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Releated from "../../components/singleproduct/Releated";
import Footer from "../../partials/Footer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoriesNavBar from "../../components/products/CategoriesNavBar";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../App";
import tokenHelper from "../../Helper/tokenHelper";
import productService from "../../service/product.service";
import cartService from "../../service/cart.service";
import { toast } from "react-toastify";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { boolean } from "yup";
import TurnSlightLeftIcon from "@mui/icons-material/TurnSlightLeft";
import Ratings from "./StarRating";

const Description = ({ description }) => {
  return (
    <>
      <div className="mt-3  w-[50%]">
        <p className="text-[14px] text-[#666]">{description}</p>
      </div>
    </>
  );
};

const AdditionalInfo = ({ additionalInfo }) => {
  console.log(additionalInfo);
  useEffect(() => {}, []);
  return (
    <>
      <div className="py-4">
        <div className="grid grid-cols-[1fr,1fr] justify-center gap-2">
          <h1 className="text-center text-[#6f6363] font-[700]">Weight</h1>
          <h1 className="text-center text-black">{additionalInfo?.weight}</h1>
          <h1 className="text-center text-[#6f6363] font-[700]">Dimention</h1>
          <h1 className="text-center">{additionalInfo?.dimension}</h1>
        </div>
      </div>
    </>
  );
};

const VendorInfo = ({ vendorInfo }) => {
  return (
    <>
      <div className="py-4">
        <div className="">
          <h1 className="text-[black] text-[16px] font-[700]">
            Store Name :{" "}
            <span className="text-[#666] text-[14px] font-[500] ">{""}</span>
          </h1>
          <h1 className="text-[black] text-[16px] font-[700]">
            Vendor Name :{" "}
            <span className="text-[#666] text-[14px] font-[500] ">
              {vendorInfo?.vendorName}
            </span>
          </h1>
          <h1 className="text-[black] text-[16px] font-[700]">
            Address :{" "}
            <span className="text-[#666]  text-[14px]font-[500] ">{""}</span>
          </h1>
        </div>
      </div>
    </>
  );
};

function ReviewsComponent({ singleProductData }) {
  const divRef = useRef(null);
  const replydivRef = useRef(null);

  const scrollToBottom = () => {
    if (divRef.current) {
      const divPosition =
        divRef.current.getBoundingClientRect().bottom + window.scrollY - 100;
      window.scrollTo({
        top: divPosition,
        behavior: "smooth", // Optional: smooth scrolling
      });
    }
  };
  const [review, setReview] = useState("");
  const [reply, setReply] = useState("");
  const [innerReply, setInnerReply] = useState("");
  const [currReplyRef, setCurrReplyRef] = useState("");

  const [allReviews, setAllReviews] = useState();
  const getAllReviews = async () => {
    try {
      const res = await productService.getReviews(singleProductData._id);
      if (res.status === 200) {
        console.log(res.data);
        setAllReviews(res.data);
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addReview = async () => {
    try {
      const res = await productService.createReview(singleProductData._id, {
        review,
      });
      if (res.status === 200) {
        setReview("");
        toast.success("review posted successfully");
        let currRef = document.getElementById("hidden" + currReplyRef || "");
        if (currRef) currRef.innerHTML = "";
        const isLoaded = await getAllReviews();

        // if(isLoaded) scrollToBottom();
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err?.response?.data?.message);
        return;
      }
      console.log(err);
    }
  };
  const getAllReplies = async (id) => {
    try {
      const res = await productService.getAllReplies(id);
      if (res.status === 200) {
        console.log(res.data);
        appendRepliesToDom(id, res.data);
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const appendRepliesToDom = (reviewId, replies) => {
    console.log(reviewId);
    const repliesDiv = document.getElementById("hidden" + reviewId);
    console.log(repliesDiv);
    repliesDiv.innerHTML = ""; // Clear existing replies
    replies.forEach((reply) => {
      const replyDiv = document.createElement("div");
      replyDiv.className = "ps-[45px] py-[5px] pt-0";
      replyDiv.innerHTML = `
        <div class="flex flex-row gap-1 items-center">
          <div class="w-[45px] h-[45px]">
            <img class="w-full h-full object-cover rounded-[50%]" src='https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt=""/>
          </div>
          <div class="flex flex-col justify-center gap--0">
            <h1 class="m-0 p-0 text-[14px] font-sans font-semibold">${
              reply.userId?.firstName + " " + reply?.userId?.lastName
            }</h1>
            <p class="m-0 p-0 text-[12px] font-[450]">3 h ago</p>
          </div>
        </div>
        <p class="text-[12px] ps-[47px] font-sans font-[400]">${reply.reply}</p>
      `;
      repliesDiv.appendChild(replyDiv);
    });
  };
  const addReply = async (id, reviewId) => {
    try {
      const val = document.getElementById(id);
      const innerValue = val.value;
      const res = await productService.addReply(reviewId, {
        reply: innerValue,
      });
      if (res.status === 200) {
        val.value = "";
        console.log(res.data);
        document.getElementById("hidden" + reviewId).style.display = "block";
        setCurrReplyRef(reviewId);
        getAllReplies(reviewId);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err?.response?.data?.message);
        return;
      }
      console.log(err);
    }
  };

  const changeNextStyle = (e) => {
    let div = e.target.nextElementSibling;
    div.style.display = "block";
    div.children[0].focus();
    setTimeout(() => {
      div.style.transform = "translateY(0)";
    }, [0]);
  };

  const openNextElement = (e, id) => {
    // console.log(e.currentTarget);
    let div = e.currentTarget.nextElementSibling;
    // console.log(div)
    div.style.display === "block"
      ? (div.style.display = "none")
      : (div.style.display = "block");
    // div.classList.toggle("block");

    // console.log(id);
    // console.log(object)
    if (id != currReplyRef) {
      setCurrReplyRef(id);
      getAllReplies(id);
    }
  };

  const handleChildClick = (e, id) => {
    // console.log(e.currentTarget.parentNode);
    e.stopPropagation();
    e.currentTarget = e.currentTarget.parentNode;
    openNextElement(e, id);
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <>
      <div className="p-[20px]" ref={divRef}>
        <div className={` transform transition-transform duration-300`}>
          <input
            class="w-[350px] text-[12px] font-sans mr-[5px]  border-solid border-0 py-[7px] border-b-[1px] outline-none"
            type="text"
            placeholder=""
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
          <Button
            sx={{ marginLeft: "10px" }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={addReview}
          >
            Add Comment
          </Button>
        </div>

        {allReviews?.map((elm, ind) => {
          return (
            <>
              <div key={ind} className="md:w-[600px]">
                <div className="flex flex-row gap-1 items-center">
                  <div className="w-[45px] h-[45px]">
                    <img
                      className="w-full h-full object-cover rounded-[50%]"
                      src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-center gap--0">
                    <h1 className="m-0 p-0 text-[14px] font-sans font-semibold">
                      {elm.userId?.firstName + " " + elm?.userId?.lastName}
                    </h1>
                    <p className="m-0 p-0 text-[12px] font-[450]">3 h ago</p>
                  </div>
                </div>
                <div className="ps-[45px] py-[5px] pt-0">
                  <p className="text-[12px] font-sans font-[400]">
                    {elm.review}
                  </p>
                  <p
                    className="text-[13px] font-[500] hover:underline cursor-pointer"
                    onClick={(e) => {
                      changeNextStyle(e);
                    }}
                  >
                    Reply
                  </p>
                  <div
                    className={`hidden transform transition-transform duration-300 -translate-y-[5px]`}
                  >
                    <input
                      class="w-[350px] text-[12px] font-sans mr-[5px]  border-solid border-0 py-[7px] border-b-[1px] outline-none"
                      id={"inp" + ind}
                      type="text"
                      placeholder=""
                    />
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={() => {
                        addReply("inp" + ind, elm._id);
                      }}
                    >
                      Send
                    </Button>
                  </div>

                  {elm?.replies?.length !== 0 && elm?.replies?.length !== 0 && (
                    <div
                      className="flex flex-row justify-start  items-start mt-1 gap-1"
                      onClick={(e) => {
                        openNextElement(e, elm._id);
                      }}
                    >
                      <CallMissedOutgoingIcon
                        onClick={(e) => {
                          handleChildClick(e, elm._id);
                        }}
                      />
                      <p
                        className="text-[12px] font-[550] cursor-pointer hover:underline"
                        onClick={(e) => {
                          handleChildClick(e, elm._id);
                        }}
                      >
                        view {elm?.replies?.length} reply
                      </p>
                    </div>
                  )}

                  <div
                    className="hidden"
                    ref={replydivRef}
                    id={"hidden" + elm._id}
                  >
                    {/* { Array.from({length:3},(_,indd)=>{
  return<>
  <div className="">

<div className="flex flex-row gap-1 items-center">
<div className="w-[45px] h-[45px]">
<img className="w-full h-full object-cover rounded-[50%]" src='https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt=""/>
</div>
<div className="flex flex-col justify-center gap--0">
<h1 className="m-0 p-0 text-[14px] font-sans font-semibold">mehul mayavyanshi</h1>
<p className="m-0 p-0 text-[12px] font-[450]">3 h ago</p>
</div>


</div>
<div className="ps-[45px] py-[5px] pt-0">
<p className="text-[12px] font-sans font-[400]">this product is very nice i have used for 20 days and it's really making good impact</p>
<p className="text-[13px] font-[500] hover:underline cursor-pointer" onClick={(e)=>{changeNextStyle(e)}}>Reply</p>
<div className={`hidden transform transition-transform duration-300 -translate-y-[5px]`}>
<input class="w-[350px] text-[12px] font-sans mr-[5px]  border-solid border-0 py-[7px] border-b-[1px] outline-none" id={'innerInp'+indd} type="text" placeholder="" />
<Button variant="contained" endIcon={<SendIcon />} onClick={()=>{addReply('innerInp'+indd)}}>
Send
</Button>
</div>


</div>

</div>
  </>
}) } */}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

function Singleproduct() {
  const { refresher, setRefresher, setCartItems, setCartLength } =
    useContext(MyContext);
  const [singleProductData, setSingleProductData] = useState();
  const [cartItemtmp, setCartItemtmp] = useState();

  const getSingleProductDetails = async () => {
    try {
      console.log(window.location.href.split("/"));
      const tempArr = window.location.href.split("/");
      const productId = tempArr[tempArr.length - 1];
      console.log(productId);
      const res = await productService.getSingleProductDetails(productId);
      if (res?.status === 200) {
        console.log(res.data);
        setSingleProductData(res?.data);
      }
    } catch (err) {
      console.log();
    }
  };

  const getCartItems = async () => {
    try {
      const res = await cartService.getCartItems();
      if (res?.status === 200) {
        setCartItems([...res.data]);
        const tmp = [...res.data].map((elm, id) => {
          return { ...elm.productDetails, quantity: 1 };
        });
        console.log("tmp", tmp);
        setCartItemtmp(tmp);
        setCartLength(res.data.length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const getUserData = async () => {
  //   try {
  //     const res = await userService.getUser();
  //     if (res?.status === 200) {
  //       console.log(res.data);
  //       setUserData({ ...res.data });
  //       setRefresher(refresher+1)
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    getSingleProductDetails();
    tokenHelper.get() && getCartItems();
  }, []);
  const [activeTab, setActiveTab] = useState("DESCRIPTION");
  const { path, setPath } = useContext(MyContext);
  const tabs = [
    "DESCRIPTION",
    "SHIPPING",
    "ADDITIONAL INFORMATION",
    "VENDOR INFO",
    "MORE PRODUCTS",
    "REVIEWS",
    "RATINGS"
  ];

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

  useEffect(() => {}, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("ok");
  }, [path]);

  return (
    <>
      <Header
        getCartProducts={getCartItems}
        setCartItemtmp={setCartItemtmp}
        cartItemtmp={cartItemtmp}
      />
      <div className="lg:px-[100px] md:px-[40px] px-[10px]">
        <div className="py-2">
          <CategoriesNavBar />
        </div>

        <div className="">
          <div className="">
            <div className="">
              <div className="bg-white">
                <div className="lg:grid grid-cols-[500px,1fr]">
                  <div className=" grid grid-cols-[100px,1fr] p-4">
                    <div className="">
                      {singleProductData?.images?.map((elm, id) => {
                        return (
                          <>
                            <div className="md:w-[80px] md:h-[100px] w-[50px] h-[70px] border border-1px hover:border-black mt-1">
                              <img src={elm} alt="" />
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className="md:w-[350px] md:h-[450px] w-[200px]   mx-auto">
                      <img
                        className="w-full md:h-full md:object-cover"
                        src={singleProductData?.images[0]}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="">
                      <h1 className="text-[28px] font-[600]">
                        {singleProductData?.name}
                      </h1>

                      <div className="">
                        <div className="flex flex-row items-center pt-3">
                          <div className="">
                            {singleProductData?.ratings?.avarage}
                          </div>
                          <div className="">⭐</div>
                        </div>

                        <div className="w-[100px] h-[1px] bg-[black] my-3"></div>

                        <div className="">
                          <div className="flex flex-row gap-3 items-center">
                            <h1 className="text-gray-500 text-[32px] line-through ">
                              ₹{(singleProductData?.price + 23).toFixed(2)}
                            </h1>
                            <h1 className="text-red-600 text-[38px]  font-semibold">
                              ₹{singleProductData?.price}
                            </h1>
                          </div>
                        </div>

                        <div className="mt-[40px]">
                          <div className="flex flex-row gap-1 justify-start">
                            <p className="text-[#666] font-[500] text-[14px]">
                              CATEGORY :{" "}
                            </p>
                            <div className="flex flex-wrap">
                              {singleProductData?.category?.map((elm, id) => {
                                return (
                                  <>
                                    <p className="text-[black] text-[14px] font-[600] mx-2">
                                      {" "}
                                      {elm}
                                    </p>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex flex-row gap-1 justify-start mt-2">
                            <p className="text-[#666]  text-[14px] font-[500]">
                              TAGS :{" "}
                            </p>
                            <div className="flex flex-wrap">
                              {singleProductData?.tags?.map((elm, id) => {
                                return (
                                  <>
                                    <p className="text-[black] text-[14px] font-[600] mx-2">
                                      {" "}
                                      {elm}
                                    </p>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex flex-row items-center gap-5 mt-[35px]">
                            {/* <div className="flex flex-row justify-start">
                               <div className="w-[45px] h-[55px] border border-1px flex flex-row justify-center items-center border-e-0">
                                <p className="text-[20px] text-[#666] font-[600]">-</p>
                               </div>
                               <div className="w-[45px] h-[55px] border border-1px flex flex-row justify-center items-center border-e-0">
                                <p className="text-[20px]">5</p>
                               </div>
                               <div className="w-[45px] h-[55px] border border-1px flex flex-row justify-center items-center ">
                                <p className="text-[20px] text-[#666] font-[600]">+</p>
                               </div>
                            </div> */}

                            <div
                              className="bg-black hover:bg-[blue] transition-all transition-0.8 cursor-pointer flex flex-row items-center justify-center gap-2 h-[55px] px-[35px]"
                              onClick={() => {
                                addToCart(singleProductData._id);
                              }}
                            >
                              <ShoppingCartIcon
                                style={{ color: "white", fontSize: "20px" }}
                              />
                              <p className="text-center text-white text-[16px] rounded-[5px]">
                                Add to Cart
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="">
                    <ul className="flex flex-wrap justify-start gap-4">
                      {tabs.map((tab, id) => (
                        <li
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`text-[14px] font-[700] text-[#666] py-2 ps-3 cursor-pointer ${
                            activeTab === tab
                              ? "border-b-2 border-red-600 text-red-500"
                              : "hover:text-red-500 hover:border-b-2 hover:border-red-600"
                          }`}
                        >
                          {tab}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#9e9d9d] h-[1px] "></div>

                  <div className="px-4">
                    {activeTab === "DESCRIPTION" && (
                      <Description
                        description={singleProductData?.description}
                      />
                    )}
                    {activeTab === "SHIPPING" && (
                      <div>Shipping content goes here</div>
                    )}
                    {activeTab === "ADDITIONAL INFORMATION" && (
                      <AdditionalInfo
                        additionalInfo={
                          singleProductData?.additionalInformation
                        }
                      />
                    )}
                    {activeTab === "VENDOR INFO" && (
                      <VendorInfo vendorInfo={singleProductData?.vendorInfo} />
                    )}
                    {activeTab === "MORE PRODUCTS" && (
                      <div>More products content goes here</div>
                    )}
                    {activeTab === "REVIEWS" && (
                      <ReviewsComponent singleProductData={singleProductData} />
                    )}
                    {activeTab === "RATINGS" && (
                      <Ratings singleProductData={singleProductData} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Releated addToCart={addToCart} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Singleproduct;
