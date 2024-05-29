// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Product from "./pages/productPage/Product";
import Singleproduct from "./pages/singleProduct/Singleproduct";
import Myaccount from "./components/Myaccount/Myaccount";
import Signup from "./pages/signup/Signup";
import Success from "./pages/checkout-success/Success";
import Cart from "./pages/cart/Cart";
import React, { useState, createContext } from "react";
export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [path, setPath] = useState(window.location.href);
  const [userData , setUserData] =useState();
  const [categoryType, setCategoryType] = useState("");
  const [products, setProducts] = useState();
  const [productsLength, setProductsLength] = useState();
  const [displayedProducts, setDisplayedProducts] = useState();
  const [cartLength, setCartLength] = useState();
  const [cartItems, setCartItems] = useState();

  return (
    <MyContext.Provider
      value={{
        path,
        setPath,
        categoryType,
        setCategoryType,
        products,
        setProducts,
        productsLength,
        setProductsLength,
        cartLength,
        setCartLength,
        displayedProducts,
        setDisplayedProducts,
        cartItems,
        setCartItems,
        userData , 
        setUserData
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

function App() {
  console.log("header", Homepage);
  return (
    <BrowserRouter>
      <MyProvider>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route exact path="/products" element={<Product />}></Route>

          <Route path="/products/:type/:id" element={<Singleproduct />}></Route>

          <Route path="/products/:type" element={<Product />}></Route>

          <Route path="/myaccount" element={<Myaccount />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout-success" element={<Success />}></Route>
        </Routes>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
