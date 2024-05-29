import axios from "axios"
import { BaseURL, getProductsApi } from "../Api/api"


class productService{
    getproducts = async(query)=>{
      return await axios.get(BaseURL+getProductsApi+query);
    }
}

export default productService = new productService();