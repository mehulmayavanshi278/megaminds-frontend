import axios from "axios"
import { BaseURL, addToCartApi, getCartApi, removeFromCartApi, updateCartApi } from "../Api/api";
import tokenHelper from "../Helper/tokenHelper";

class cartService{
    getCartItems= async()=>{
        try{
       return await axios.get(BaseURL+getCartApi,{
        headers:{
            Authorization:tokenHelper.get()
        }
       })
        }catch(err){
            console.log(err);
        }
    }
    addToCart = async(body)=>{
      try{
       return await axios.post(BaseURL+addToCartApi , body , {
        headers:{
            Authorization:tokenHelper.get()
        }
       });
      }catch(err){
        console.log(err);
      }
    }
    updateCart = async(body)=>{
        try{
        return await axios.post(BaseURL+updateCartApi , body) , {
            headers:{
                Authorization:tokenHelper.get()
            }
        };
        }catch(err){
          console.log(err);
        }
    }
    removeFromCart = async(id)=>{
        try{
         return axios.post(`${BaseURL}${removeFromCartApi}/${id}`, {} ,{
            headers:{
                Authorization:tokenHelper.get()
            }
         });
        }catch(err){
          console.log(err);
        }
    }
}

export default cartService = new cartService();