// const BaseURL="http://localhost:5000";
const BaseURL="https://megaminds-backend.onrender.com";

const registerApi = "/user/create";
const loginApi = "/user/login";
const updateUserApi = "/user/update";
const loginWithGoogleApi = "/user/loginWithGoogle";
const getUserApi="/user/getuser"
const deleteUserApi="/user/delete"



const getProductsApi="/product/getProducts";
const getSingleProductApi="/product/getproduct";
const getrandomProductsApi = "/product/getRandomProducts"
const getReviewsApi = "/product/getReviews"
const getRepliesApi = "/product/getReplies"
const giveRatingApi = "/product/giveRating"
const getSingleRatingApi = "/product/getSingleRating"
const createReviewApi = "/product/createReview"
const addReplyApi = "/product/addReply"
const deleteReviewApi = "/product/deleteReview"
const deleteReplyApi = "/product/deleteReply"


const getCartApi = "/cart/getcart";
const addToCartApi = "/cart/create";
const updateCartApi = "/cart/update";
const removeFromCartApi = "/cart/delete";



export {BaseURL,
    registerApi,
    loginApi,
    updateUserApi,
    loginWithGoogleApi,
    getProductsApi,
    getSingleProductApi,
    getrandomProductsApi,
    getUserApi,
    deleteUserApi,
    getCartApi,
    addToCartApi,
    updateCartApi,
    removeFromCartApi,
    getReviewsApi,
    getRepliesApi,
    getSingleRatingApi,
    giveRatingApi,
    createReviewApi,
addReplyApi,
deleteReviewApi,
deleteReplyApi}

