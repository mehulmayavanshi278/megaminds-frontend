import axios from "axios";
import {
  BaseURL,
  addReplyApi,
  createReviewApi,
  getRepliesApi,
  getSingleRatingApi,
  giveRatingApi,
  getReviewsApi,
  deleteReplyApi,
  deleteReviewApi,
  getProductsApi,
  getSingleProductApi,
  getrandomProductsApi,
} from "../Api/api";
import tokenHelper from "../Helper/tokenHelper";

class productService {
  getRandomProducts = async () => {
    return await axios.get(`${BaseURL + getrandomProductsApi}`);
  };
  getSingleProductDetails = async (id) => {
    return await axios.get(`${BaseURL + getSingleProductApi + "/" + id}`);
  };
  getproducts = async (query) => {
    return await axios.get(BaseURL + getProductsApi + query);
  };

  getReviews = async (id) => {
    return await axios.get(BaseURL + getReviewsApi + "/" + id);
  };
  getAllReplies = async (id) => {
    return await axios.get(BaseURL + getRepliesApi + "/" + id);
  };
  getSingleRating = async (id) => {
    return await axios.get(BaseURL + getSingleRatingApi + "/" + id, {
      headers: {
        Authorization: tokenHelper.get(),
      },
    });
  };
  giveRating = async (id, data) => {
    return await axios.post(BaseURL + giveRatingApi + "/" + id, data, {
      headers: {
        Authorization: tokenHelper.get(),
      },
    });
  };
  createReview = async (id, data) => {
    return await axios.post(BaseURL + createReviewApi + "/" + id, data, {
      headers: {
        Authorization: tokenHelper.get(),
      },
    });
  };
  addReply = async (id, data) => {
    return await axios.post(BaseURL + addReplyApi + "/" + id, data, {
      headers: {
        Authorization: tokenHelper.get(),
      },
    });
  };
  deleteReview = async (id) => {
    return await axios.post(BaseURL + deleteReviewApi + "/" + id);
  };
  deleteReply = async (reviewId, id) => {
    return await axios.post(
      BaseURL + deleteReplyApi + "/" + reviewId + "/" + id
    );
  };
}

export default productService = new productService();
