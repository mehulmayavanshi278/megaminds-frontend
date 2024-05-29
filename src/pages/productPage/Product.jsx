import React, { useState, useEffect, useContext } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";


import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import { CategorySideBar, categories } from "../Homepage/Homepage";
import Cards from "../../components/products/Cards";
import Weekspecial from "../../components/products/Weekspecial";
import Banner from "../../components/products/Banner";
import Latestblog from "../../components/products/Latestblog";
import Footer from "../../partials/Footer";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import productService from "../../service/product.service";
import CategoriesNavBar from "../../components/products/CategoriesNavBar";
import cartService from "../../service/cart.service";
import { toast } from "react-toastify";


function Product() {

  const {categoryType , setCategoryType , products , setProducts , displayedProducts , setDisplayedProducts , productsLength , setProductsLength , setCartLength} = useContext(MyContext);
  const [sortValue, setSortValue] = useState("");

  const {path , setPath} = useContext(MyContext)

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };
  const [sortByPrice, setSortByPrice] = useState(1000);

  const handleSliderChange = (event, newValue) => {
    setSortByPrice(newValue);
  };
  const getProducts = async(type)=>{
    try{
      let query = `?type=${type}`
      const res = await productService.getproducts(query);
      if(res?.status===200){
        console.log(res.data);
        setProducts([...res.data.data])
        setDisplayedProducts([...res.data?.data].slice(0,8));
        setProductsLength(res.data.length);
      }
    }catch(err){
      console.log(err);
    }
  }
  const getCartItems = async()=>{
    try{
      const res = await cartService.getCartProducts();
      if(res?.status===200){
        setCartLength(res?.data?.length)
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
        const cat = window.location.href;
    console.log(cat);
    if (cat.includes("/products")) {
      console.log(cat.split("products/")[1].split("%20").join(" "));

      // alert(cat.split("products/")[1].split("%20").join(" "))
      const category = cat.split("products/")[1].split("%20").join(" ")
      setCategoryType(category);
      getProducts(category);
      getCartItems();
    }
  },[path , categoryType])
  return (
    <div>
      <Header />

      <div className="lg:px-[100px] md:px-[40px] px-[10px] py-5">
        <CategoriesNavBar />

        <div className="lg:grid lg:grid-cols-[1fr,4fr]">
          <div style={{}}>
            {" "}
            {/*  we have used grid main div so it will apply child div directlt sticky  , it will apply childs , child     */}
            <CategorySideBar />
          </div>
          <div className="lg:gap-2 gap-3">
            <div className="bg-green-100 shadow-sm rounded-[5px] p-3">
              <div className="flex xl:flex-row flex-wrap justify-between lg:items-center  items-start">
                <div className="flex flex-row gap-3 lg:items-center">
                  <h1 className="text-[24px] text-black font font-[500]">
                    {categoryType}
                  </h1>
                  <span className="text-[#666] text-[14px] font-[500] font-sans">({productsLength} Items)</span>
                </div>

                <div className="">
                  <div style={{ width: 300 }}>
                    <div className="">
                      <h1 className="text-[15px] text-[#666]">Price</h1>
                    </div>
                    <Slider
                      value={sortByPrice}
                      onChange={handleSliderChange}
                      aria-labelledby="price-range-slider"
                      valueLabelDisplay="auto"
                      min={100}
                      max={1000}
                      sx={
                        {
                          padding:0,
                            '& .MuiSlider-root': {
                              padding: '0px'
                            },
                            '& .css-hdnczn-MuiSlider-root': {
                              padding: '0px'
                            }
                        }
                      }
                    />
                    <div className="flex flex-row justify-between">
                      <h1> {"100"}</h1>
                      <h1> {sortByPrice}</h1>
                    </div>
                  </div>
                </div>

                <div className="">
                  <Box sx={{ width: "200px" }}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="sort-label"
                        sx={{ fontSize: "14px", color: "#333" }}
                      >
                        Sort
                      </InputLabel>
                      <Select
                        labelId="sort-label"
                        id="sort-select"
                        value={sortValue}
                        label="Sort"
                        onChange={handleSortChange}
                        sx={{
                          "& .MuiSelect-select": {
                            fontSize: "14px",
                            color: "#555",
                            paddingTop: "8px",
                            paddingBottom: "8px",
                          },
                          "& .MuiSelect-icon": {
                            color: "#555",
                          },
                          "& .MuiMenuItem-root": {
                            fontSize: "10px",
                            color: "#555",
                          },
                          "& .MuiListItem-root": {
                            padding: "8px",
                          },
                        }}
                      >
                        <MenuItem sx={{ fontSize: "15px" }} value="popularity">
                          Sort by Popularity
                        </MenuItem>
                        <MenuItem sx={{ fontSize: "15px" }} value="ratings">
                          Ratings
                        </MenuItem>
                        <MenuItem sx={{ fontSize: "15px" }} value="price">
                          Price
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </div>
              <div className="bg-[#cbc7c7] h-[1px] my-2"></div>
              {/* <div className="">
                <ul className="flex flex-row justify-start gap-3">
                  <li className="text-[12px] text-[#666] py-2 px-2 border border-1px border-grey ps-3 hover:text-red-500 cursor-pointer hover:bg-[#f1f1f1] rounded-[3px]">
                    Antioxidants{" "}
                    <span>
                      <CloseIcon />
                    </span>
                  </li>
                  <li className="text-[12px] text-[#666] py-2 px-2 border border-1px border-grey ps-3  hover:bg-[#f1f1f1] rounded-[3px]">
                    Ayurvedic{" "}
                    <span>
                      <CloseIcon />
                    </span>
                  </li>
                  <li className="text-[12px] text-[#666] py-2 px-2 border border-1px border-grey ps-3  hover:bg-[#f1f1f1] rounded-[3px]">
                    under 500{" "}
                    <span>
                      <CloseIcon />
                    </span>
                  </li>
                </ul>
              </div> */}
              <Cards />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-[100px] md:px-[40px] p-[10px] bg-[#f1f1ff] pb-[50px]">
        <Weekspecial />
        <Banner />
        <Latestblog />
      </div>
      <Footer />
    </div>
  );
}

export default Product;
