import axios from "axios"
import { BaseURL, getProductsApi  , getSingleProductApi , getrandomProductsApi} from "../Api/api"


class productService{


  getRandomProducts = async()=>{
    return await axios.get(`${BaseURL+getrandomProductsApi}`)
  }
    getSingleProductDetails = async(id)=>{
      return await axios.get(`${BaseURL + getSingleProductApi+'/'+ id}`);
    }
    getproducts = async(query)=>{
      return await axios.get(BaseURL+getProductsApi+query);
    }
}

export default productService = new productService();