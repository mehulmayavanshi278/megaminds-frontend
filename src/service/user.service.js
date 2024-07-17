import axios from "axios";

import tokenHelper from "../Helper/tokenHelper";
import {BaseURL ,  getUserApi, loginApi, registerApi, updateUserApi , deleteUserApi } from "../Api/api";

class userService {
  getUser = async () => {
    try {
      return await axios.get(BaseURL + getUserApi, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: tokenHelper.get(),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  signup = async (data) => {
    try {
      console.log("hg", data);
      return await axios.post(BaseURL + registerApi, data);
    } catch (err) {
      console.log(err);
    }
  };

  login = async (data) => {
 
      return await axios.post(BaseURL + loginApi, data);

  };
  update = async (data) => {
    try {
      console.log("tok", tokenHelper.get());
      return await axios.post(BaseURL + updateUserApi, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: tokenHelper.get(),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  delete = async (id) => {
    try {
      return await axios.post(BaseURL + deleteUserApi + `/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
}

export default userService = new userService();
