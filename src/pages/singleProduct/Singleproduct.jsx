import React, { useEffect, useState, createContext, useContext } from "react";
import Header from "../../components/Header";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Releated from "../../components/singleproduct/Releated";
import Footer from "../../partials/Footer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoriesNavBar from "../../components/products/CategoriesNavBar";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../App";

const Description = () => {
  return (
    <>
      <div className="mt-3  w-[50%]">
        <p className="text-[14px] text-[#666]">
          A clinically tested, standardized, and full-spectrum extract
          containing curcuminoids to support joint health and reduce
          inflammation. AbsoCurcumin by Botanic healthcare pvt ltd., Hyderabad,
          An ingredient with clinical support Benefits joint health and
          inflammation, as confirmed by clinical studies Proven to be safe and
          non- toxic at the recommended dosage Chemically standardized,
          containing curcuminoids NLT 65%
        </p>
      </div>
    </>
  );
};

const AdditionalInfo = () => {
  return (
    <>
      <div className="py-4">
        <div className="grid grid-cols-[1fr,1fr] justify-center gap-2">
          <h1 className="text-center text-[#6f6363] font-[700]">Weight</h1>
          <h1 className="text-center">0.1g</h1>
          <h1 className="text-center text-[#6f6363] font-[700]">Dimention</h1>
          <h1 className="text-center">10 × 10 × 10 cm</h1>
        </div>
      </div>
    </>
  );
};

const VendorInfo = () => {
  return (
    <>
      <div className="py-4">
        <div className="">
          <h1 className="text-[black] text-[16px] font-[700]">
            Store Name :{" "}
            <span className="text-[#666] text-[14px] font-[500] ">
              NUTUREMITE
            </span>
          </h1>
          <h1 className="text-[black] text-[16px] font-[700]">
            Vendor Name :{" "}
            <span className="text-[#666] text-[14px] font-[500] ">
              NUTUREMITE
            </span>
          </h1>
          <h1 className="text-[black] text-[16px] font-[700]">
            Address :{" "}
            <span className="text-[#666]  text-[14px]font-[500] ">
              vadodara , gujarat
            </span>
          </h1>
        </div>
      </div>
    </>
  );
};

function Singleproduct() {
  const [activeTab, setActiveTab] = useState("DESCRIPTION");
  const { path, setPath } = useContext(MyContext);
  const tabs = [
    "DESCRIPTION",
    "SHIPPING",
    "ADDITIONAL INFORMATION",
    "VENDOR INFO",
    "MORE PRODUCTS",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("ok");
  }, [path]);

  return (
    <>
      <Header />
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
                      <div className="md:w-[80px] md:h-[100px] w-[50px] h-[70px] border border-1px hover:border-black mt-1">
                        <img
                          src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
                          alt=""
                        />
                      </div>
                      <div className="md:w-[80px] md:h-[100px] w-[50px] h-[70px] border border-1px hover:border-black mt-1">
                        <img
                          src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
                          alt=""
                        />
                      </div>
                      <div className="md:w-[80px] md:h-[100px] w-[50px] h-[70px] border border-1px hover:border-black mt-1">
                        <img
                          src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
                          alt=""
                        />
                      </div>
                      <div className="md:w-[80px] md:h-[100px] w-[50px] h-[70px] border border-1px hover:border-black mt-1">
                        <img
                          src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="md:w-[350px] md:h-[450px] w-[250px] h-[300px]  mx-auto">
                      <img
                        className="w-full h-full object-cover"
                        src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg?crop=1xw:1.00xh;center,top&resize=980:*"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="">
                      <h1 className="text-[28px] font-[600]">
                        Nuturemite Pineapple fruit Spray dried Powder 250 gms
                      </h1>
                      <div className="">
                        <div className="flex flex-row items-center pt-3">
                          <div className="">3.5</div>
                          <div className="">⭐</div>
                        </div>

                        <div className="w-[100px] h-[1px] bg-[black] my-3"></div>

                        <div className="">
                          <div className="flex flex-row gap-3 items-center">
                            <h1 className="text-gray-500 text-[32px] line-through ">
                              ₹{"625.00"}
                            </h1>
                            <h1 className="text-red-600 text-[38px]  font-semibold">
                              ₹{"300.00"}
                            </h1>
                          </div>
                        </div>

                        <div className="mt-[40px]">
                          <div className="flex flex-row gap-1 justify-start">
                            <p className="text-[#666] font-[500] text-[14px]">
                              CATEGORY :{" "}
                            </p>
                            <div className="flex flex-wrap">
                              <p className="text-[black] text-[14px] font-[600] mx-2">
                                {" "}
                                ANTIOXIDANTS
                              </p>
                              <p className="text-[black] text-[14px] font-[600] mx-2">
                                {" "}
                                ANTIOXIDANTS
                              </p>
                              <p className="text-[black] text-[14px] font-[600] mx-2">
                                {" "}
                                ANTIOXIDANTS
                              </p>
                              <p className="text-[black] text-[14px] font-[600] mx-2">
                                {" "}
                                ANTIOXIDANTS
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-row gap-1 justify-start mt-2">
                            <p className="text-[#666]  text-[14px] font-[500]">
                              TAGS :{" "}
                            </p>
                            <div className="flex flex-wrap">
                              <p className="text-[black] text-[14px] font-[600] mx-2">
                                {" "}
                                Pineapple fruit powder
                              </p>
                              <p className="text-[black] text-[14px] font-[600] mx-2">
                                {" "}
                                pineapple powder
                              </p>
                              <p className="text-[black] text-[14px] font-[600] mx-2">
                                {" "}
                                pineapple spraydried powder
                              </p>
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

                            <div className="bg-black hover:bg-[blue] transition-all transition-0.8 cursor-pointer flex flex-row items-center justify-center gap-2 h-[55px] px-[35px]">
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
                      {tabs.map((tab) => (
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
                    {activeTab === "DESCRIPTION" && <Description />}
                    {activeTab === "SHIPPING" && (
                      <div>Shipping content goes here</div>
                    )}
                    {activeTab === "ADDITIONAL INFORMATION" && (
                      <AdditionalInfo />
                    )}
                    {activeTab === "VENDOR INFO" && <VendorInfo />}
                    {activeTab === "MORE PRODUCTS" && (
                      <div>More products content goes here</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Releated />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Singleproduct;
